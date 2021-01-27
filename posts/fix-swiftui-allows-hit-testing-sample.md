---
title: '[SwiftUI]Gestureの活性・非活性をコントロールするサンプルのiOS14バグ修正'
date: '2020-01-27'
---
以前[allowsHitTestingを利用してGestureの活性・非活性をコントロールする](https://qiita.com/ktaguchi/items/931078c204512a18090d)という記事を書いたのだが、iOS14で動作しなくなっていたので修正した。

## 元記事の内容
タイトルのとおり `allowsHitTesting()` を利用して `Gesture` の活性・非活性をコントロールするというもの。  
この記事の場合 `VStack` 内にある `Toggle` は常に活性とさせておきたいので、 `VStack` 自体に`disabled(_:)` をセットすると`Toggle` まで影響を受けてしまい都合が悪い。  
基本的には `disabled(_:)` の利用で問題ないケースが多いと思う。


```swift
// iOS13
VStack {
    Toggle(
        "allowsHitTestingのON / OFF",
        isOn: $allowsHitTesting
    )

    Divider()

    Text("allowsHitTestingがONのときは、ダブルタップで背景色が変化します。")
        .frame(
            maxWidth: .infinity,
            maxHeight: .infinity
        )
}
.contentShape(Rectangle())
.padding()
.foregroundColor(
    Color(isDark ? .systemBackground : .label)
)
// ここでGestureの活性・非活性をコントロールしていた
.allowsHitTesting(allowsHitTesting)
.gesture(
    TapGesture(count: 2)
        .onEnded {
            self.isDark.toggle()
        }
)
        .background(
    Color(isDark ? .label : .systemBackground)
        .edgesIgnoringSafeArea(.all)
)
```

## allowsHitTestingを利用する方法だとiOS14で動作しない
iOS13では上記で動作していたのだが、iOS14から `Toggle` まで ` allowsHitTesting` の影響を受けるようになってしまい、期待する動作をしなくなった。 

> Configures whether this view participates in hit test operations.

↑と[ドキュメント](https://developer.apple.com/documentation/swiftui/form/allowshittesting(_:))にあるので、そもそもiOS14での動作のほうが自然な気がする。  

## 対応
Tapを無視したい場合は、 `onEnded` で何もしない `TapGesture` を返すようにした。  

もうちょい一般的な表現だと、`disable` な場合に `onEnded` 等で何もしないクロージャーを返すようにする、かな。

```swift
// iOS14

// contentはiOS13の例に記載しているVStackを返す
content
    .contentShape(Rectangle())
    .padding()
    .foregroundColor(
        Color(isDark ? .systemBackground : .label)
    )
    .gesture(
        allowsDoubleTap
            ? TapGesture(count: 2).onEnded { isDark.toggle() }
            // Tapを無視したい場合は、onEndedで何もしないTapGestureを返す
            : TapGesture().onEnded({})
    )
    .background(
        Color(isDark ? .label : .systemBackground)
            .edgesIgnoringSafeArea(.all)
    )
```

### 結果
動くようになった🎉  

![iOS14](https://user-images.githubusercontent.com/17519073/105905281-9902e800-6065-11eb-9d40-94c327aad77a.gif)

### GitHub
* [リポジトリ](https://github.com/taguchi-k/swiftui-allows-hit-testing-sample)
  * [Issue](https://github.com/taguchi-k/swiftui-allows-hit-testing-sample/issues/5)
  * [PR](https://github.com/taguchi-k/swiftui-allows-hit-testing-sample/pull/6)