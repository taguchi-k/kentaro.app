---
title: '[msw, Jest, Node.js] mswを利用してHTTP境界のテストを書く'
date: '2022-03-07'
---
JestでHTTPリクエストをインターセプトしてモックを返すのに利用した[Mock Service Worker（msw）](https://mswjs.io/ )の紹介をしたいと思います。環境はNodeです。  

## テスト対象の実装
`http://example.com/examples` からデータを取得する、という想定の実装です。   

```ts
import fetch from 'isomorphic-unfetch';

export class GetExampleError extends Error {}

export async function getExamples(): Promise<string> {
  const result = await fetch('http://example.com/examples');

  if (!result.ok) {
    throw new GetExampleError('Received get examples error');
  }

  return 'Get examples';
}
```

データをfetchできたらそのデータを返す、という想定で仮の文字列を返しています。  
レスポンスが200系以外のステータスコードだったら独自定義した `GetExampleError` を投げます。 

## テストの実装
`getExamples()` をテストする実装です。  
ステータスコードが200のケース、500のケース、ネットワークエラーのケースをテストしてみます。

```ts
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { GetExampleError, getExamples } from './get-examples';

describe('getExamples()', () => {
  const server = setupServer(
    rest.get('http://example.com/examples', (req, res, ctx) => {
      // http://example.com/examples へのリクエストをインターセプトして
      // ステータスコード200を返す
      return res(ctx.status(200));
    })
  );

  // Establish API mocking before all tests.
  beforeAll(() => server.listen());
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  // Clean up after the tests are finished.
  afterAll(() => server.close());

  test('レスポンスのステータスコードが200だったら期待する文字列が返ってくる', async () => {
    const result = await getExamples();
    expect(result).toEqual('Get examples');
  });

  test('レスポンスのステータスコードが500だったらGetExampleErrorが投げられる', async () => {
    // server.use() を使うとこのケースでのレスポンスをカスタマイズできる
    server.use(
      rest.get('http://example.com/examples', (req, res, ctx) => {
        // このケースではステータスコード500を返すようにした
        return res(ctx.status(500));
      })
    );

    // 独自定義したGetExampleErrorがthrowされることを確認する
    await expect(getExamples()).rejects.toThrow(GetExampleError);
  });

  test('ネットワークエラーの場合GetExampleErrorではないErrorがthrowされる', async () => {
    server.use(
      rest.get('http://example.com/examples', (req, res) => {
        // このケースではネットワークエラーを発生させる
        return res.networkError('Failed to connect');
      })
    );

    await expect(getExamples()).rejects.not.toThrow(GetExampleError);
  });
});
```

### mockサーバーのsetup
```ts
const server = setupServer(
  rest.get('http://example.com/examples', (req, res, ctx) => {
    // http://example.com/examples へのリクエストをインターセプトして
    // ステータスコード200を返す
    return res(ctx.status(200));
  })
);
```

上記のコードでは `setupServer()` に `RequestHandler` を渡してmockサーバーをsetupしています。  
これにより `http://example.com/examples` へのリクエストをインターセプトしてステータスコード200を返すようになりました。  
この例では `RequestHandler` をひとつだけ渡していますが、複数渡すことも可能です。

また、 `json()` を使ってJSON形式のデータを返すようにすることもできます。

```ts
const server = setupServer(
  rest.get('http://example.com/examples', (req, res, ctx) => {
    return res(
      ctx.status(200),
      // JSON形式のデータを返す
      ctx.json({ id: 'example-id', name: 'example-name' })
    );
  })
);
```

### `RequestHandler` のoverride
```ts
// server.use() を使うとこのケースでのレスポンスをカスタマイズできる
server.use(
  rest.get('http://example.com/examples', (req, res, ctx) => {
    // このケースではステータスコード500を返すようにした
    return res(ctx.status(500));
  })
);
```

`server.use()` を使い、既存のpathの `RequestHandler` をoverrideできます。  
このケースではステータスコード500を返すようにしています。

下記のようにネットワークエラーのモックも可能です。

```ts
server.use(
  rest.get('http://example.com/examples', (req, res) => {
    // このケースではネットワークエラーを発生させる
    return res.networkError('Failed to connect');
  })
);
```

エラー周りのテストも簡単に実装できますね。  

## おわりに
mswでHTTPリクエストの結果に応じた処理のテストが書きやすくなり、だいぶ捗りました。  

ちなみに今回はREST APIのモックの例を紹介しましたが、mswはGraphQLにも対応しています。  
（[ドキュメント](https://mswjs.io/docs/getting-started/mocks/graphql-api)にサンプルコード付きで記載されています）   
