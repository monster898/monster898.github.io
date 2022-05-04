---
title: JavaScript高频面试题
date: "2022-03-20"
tags:
  - JavaScript
---

## 基本数据类型

- null
- undefined
- number
- string
- boolean
- symbol(es6 新增)
- bigint(es10 新增)

`symbol`主要是用来解决全局变量冲突的问题，例如我们分析过的`vue-router`就使用了`symbol`类型的键来注入路由对象。
`react`也使用了`symbol`来防止`XSRF`攻击。

`bigint` 是 es10 新增的原始类型，用来解决`number`类型最大安全数为 2 ^ 53 - 1 的限制。

```js
const maxSafeNumber = 2 ** 53 - 1 // 9007199254740991
console.log(maxSafeNumber + 1 === maxSafeNumber + 2) //true  What the fxxk？？
```

这是因为`number`类型使用 IEEE 754 格式表示整数和浮点数，是用 4 字节也就是 64 位来储存数字的，其中一位是符号位(代表正负)，11 位来储存指数，剩下 52 位来表示尾数。那么能安全表示的最大数字就是当这 52 位都为 1 的时候，而 IEEE754 规定，在计算机内部保存有效数字时，默认第一位总是 1，所以舍去，只保留后面的部分，所以其实是 53 个 1，转换为十进制就是 2^53 - 1。

而 bigint 可以突破这种限制

```js
// 末尾加n或者使用BigInt构造函数来实例化一个bigint
const bigint1 = 9007199254740991n // or BigInt(9007199254740991)
// bigint 不能和 number 混用

console.log(bigint1 + 1n === bigint1 + 2n) // false
```

## 原型、原型链

```plain
在js中我们是通过构造函数来创建对象的，构造函数有一个`prototype`属性，用来存放实例共享的属性值和方法，实例中有一个[[prototype]]指针指向构造函数`prototype`属性的值。一般来说我们是没办法访问到这个[[prototype]]属性的，但是现代浏览器都提供了一个__proto__的属性来让我们访问这个属性。当我们访问一个属性的时候，如果这个对象内部不存在这个属性，则会去原型对象中找这个属性，这个原型对象又有自己的原型，就这么一直找下去，也就是原型链的概念，一般来说原型链的尽头是`Object.prototype`。
```
