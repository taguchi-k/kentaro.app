---
title: '[Swift]ジェネリクスについて'
date: '2021-01-25'
---
## 1.ジェネリクスとは

そもそもジェネリクス（Generics）とは何なのか。  
The Swift Programming Languageには以下のように記載されています。  
『ジェネリクスを利用することで自分が定義した要件、もしくは任意の様々な型を扱うことができ、柔軟で再利用可能な関数や型を記事することができます。』  

IntやStringなどの具体的な型の代わりに型パラメータ（Type Parameters）を使い、柔軟に型を指定します。  

なんだかとっつきにくいかもしれませんが、実はSwiftに少しでも触れたことのある人はいつの間にかジェネリクスの恩恵を受けています。  
何気なく使っているArrayやDictionaryにもジェネリクスが取り入れられているからです。  
例えば、下記のようにArrayの中にはIntでもStringでも同じように格納できます。  

```swift
// 例
let intArray = [2, 4, 6]
let stringArray = ["a", "b", "c"]
```

## 2.ジェネリック関数（Generic Functions）

### 2-1.ジェネリック関数の基本

これ以降はコードを用いて説明していきます。  
playground等で実際に書きながらご覧いただくと理解しやすいかもしれません。  

まずは関数におけるジェネリクスについてです。  
引数の値をタプルにして返す、簡単な関数を作ってみました。  

具体的に型を指定すると以下のような感じになります。  
とりあえずIntを指定しています。  

```swift
func makeTuple(_ a: Int, _ b: Int) -> (Int, Int) {
    return (a, b)
}

let intTuple = makeTuple(24, 32)
// intTupleは (24, 32)
```

Stringでも同じことがしたいので、上記関数のIntの部分をStringに変えた関数を作ります。

```swift
func makeTuple(_ a: String, _ b: String) -> (String, String) {
    return (a, b)
}

let stringTuple = makeTuple("前", "うしろ")
// stringTupleは("前", "うしろ")
```

あ！Doubleでも同じことしたい！となったら…  
また作るのイヤですよね。Don't repeat yourself.

そこで、ジェネリックな関数を作ってみましょう。  
こんな感じです。

```swift
func makeTuple<T>(_ a: T, _ b: T) -> (T, T) {
    return (a, b)
}
```

`<T>`が型パラメータです。  
慣例としてTが使われることが多いですが、Tでなければならないわけではありません。  
任意の名前で定義可能です。

```swift
let t1 = 1
let t2 = 10

let testTuple = makeTuple(t1, t2)
// testTupleは(1, 10)

let t3 = "文字列"
let t4 = "string"

let testTuple2 = makeTuple(t3, t4)
// testTuple2は("文字列", "string")
```

このように、IntでもStringでもOKです。  
（ちなみに、ジェネリック関数では引数や返り値から型を推論しています）  
同じような関数をたくさん作らなくてよくなりました。  

ただし、以下のように書くとエラーになるのでご注意ください。  

```swift
// エラーになる
let testTuple3 = makeTuple(t1, t3)
```

`makeTuple`関数を使うときには、Tは同じ型である必要があります。  
上の場合、`t1`はInt、`t2`はStringであるためエラーとなってしまいました。

### 2-2.型パラメータの制約

先ほどの`makeTuple`関数に少し手を入れてみましょう。  
第二引数が第一引数未満の値だった場合、タプルの要素が全て第一引数の値になるようにします。

```swift
func makeTuple<T>(_ a: T, _ b: inout T) -> (T, T) {
    if b < a {
        b = a
    }
    return (a, b)
}
```

一見問題なさそうですが、「`<`で比較できるかわからん！！」と怒られます。  
大小比較をするためにプロトコル`Comparable`に準拠する必要があります。

```swift
func makeTuple<T: Comparable>(_ a: T, _ b: inout T) -> (T, T) {
    if b < a {
        b = a
    }
    return (a, b)
}
```

`<T: Comparable>`とすることでTがプロトコル`Comparable`に準拠する制約をつけられます。  
これにより`<`で比較できることが明確になり、怒られることがなくなります。  
実際に使ってみましょう。

```swift
let t1 = 2
var t2 = 3

let test = makeTuple(t1, &t2)
// testは(2, 3)
// 第二引数が第一引数未満ではないため

let t3 = 3
var t4 = 2

let test2 = makeTuple(t3, &t4)
// test2は(3, 3)
// 第二引数が第一引数未満であるため
```

## 3.ジェネリック型(Generic Types)

構造体、クラス、列挙型が型パラメータを持つように定義できます。  
関数のときと同様`<T>`のように記述し、プロトコルなどの制約をつけることも可能です。  

x、yのプロパティおよびxとyが等しいか判定するメソッドを持つ構造体を作ってみます。

```swift
struct SomeStruct<T:Equatable> {
    let x: T
    let y: T

    func isEqual() -> Bool {
        return x == y
    }
}
```

使うときは以下のような感じです。

```swift
let someStringStruct = SomeStruct<String>(x: "hoge", y: "fuga")
let a = someStringStruct.isEqual()
```

ジェネリックな型は`SomeClass<String>`のように型を明示して使いますが、容易に型が推論できる場合は型パラメータを省略できます。

```swift
let someIntStruct = SomeStruct(x: 12, y: 34)
let b = someIntStruct.isEqual()
```

ただし、The Swift Programming Languageの例のようなパターンだと型パラメータを明示的に指定しないとエラーになります。

```swift
// 明示的に型パラメータを指定する
struct Stack<Element> {
    var items = [Element]()
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
}

// var stackOfStrings = Stack() だとエラーになる！
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")
```

理由はインスタンス生成時に型パラメータを推論する材料がないためです。  
`Stack<String>()` →OK  
`Stack() `        →NG  

## 4.プロトコルでの利用

プロトコルでもジェネリクスを使ってみましょう。  
プロトコルでは型パラメータでの宣言ができません。  
associatedtypeを利用して宣言します。

elementsプロパティを持ち、elementsに要素を追加するメソッドを持つプロトコルを作成します。

```swift
protocol Addable {
    associatedtype Element
    var elements: [Element] { get }
    mutating func append(element:Element)
}
```

ここではElementという汎用的な型を定義してみました。  
プロトコルに準拠する構造体はこんな感じ。

```swift
struct SomeAddableStruct<T>: Addable {
    typealias Element = T
    var elements: [Element]

    mutating func append(element: Element) {
        elements.append(element)
    }
}
```

使ってみる。

```swift
// Int
var intAddableStruct = SomeAddableStruct<Int>(elements: [1, 3, 5])
intAddableStruct.elements // elementsは[1, 3, 5]
intAddableStruct.append(element: 7)
intAddableStruct.elements // elementsは[1, 3, 5, 7]

// String
var stringAddableStruct = SomeAddableStruct(elements: ["a", "b", "c"])
stringAddableStruct.elements // elementsは["a", "b", "c"]
stringAddableStruct.append(element: "d")
stringAddableStruct.elements // elementsは["a", "b", "c", "d"]
```
