---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---
# H1のテスト
We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

[リンクのTest]()

```swift
struct Hoge {
    let name: String
    let age: Int
}

let hoge = Hoge(name: "hogehoge", age: 20)
```

これは `コード` のテストです

## H2のテスト
画像のTest

![kobaton](https://www.pref.saitama.lg.jp/a0301/kobaton/design-life/01/images/1-1-02.png)

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

![kobaton2](https://www.pref.saitama.lg.jp/a0301/kobaton/design-others/02/images/5-2-32.png)

### H3のテスト
You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

### H4のテスト
On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

### H5のテスト
In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
