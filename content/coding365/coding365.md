---
date: 2099-01-01
---

# 个人的 coding 365 计划

再接下来的 365 天里，每天完成一道编程题，主要目的是提高自己的编程能力同时培养兴趣。

## DAY 1：2 进制和 10 的转换

```js
/*
 二进制
 1 -> 1
 2 -> 10
 3 -> 11
 4 -> 100
 5 -> 101
 6 -> 110
 7 -> 111
 8 -> 1000
*/

// 十进制转二进制: 回忆下我们怎样将二进制转换为十进制的，反向操作即可，取余
function decToBin(n) {
  if (n === 0) {
    return 0
  }
  const ans = []
  while (n) {
    // n > 0
    ans.unshift(n & 1) // n % 2
    n >>= 1 // 左乘右除
  }
  return parseInt(ans.join(""))
}

// 二进制转十进制
function binToDec(n) {
  ans = 0
  for (const i of n.toString()) {
    ans = ans << (1 + i)
  }
  return ans
}

// 判断是否是2的幂
/*
2 -> 10
4 -> 100
8 -> 1000
16 -> 10000


n - 1 : 01111

取 and 操作即可判断

n > 0 && (n & (n - 1) == 0)

延申
leetcode 342：判断是否是4的幂
判断是否是4的幂
n > 0 && (n & (n - 1) == 0) && n % 3 == 1
*/
```

## DAY 2: 二分查找

二分查找是一种在有序数组中查找某一特定元素的搜索算法。

搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束。

如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。

如果在某一步骤数组为空，则代表找不到。这种搜索算法**每一次比较都使搜索范围缩小一半**。

来看下面例题：leetcode 704
![](https://media.haochen.me/Snipaste_2022-01-30_19-26-54.png)

```ts
function search(nums: number[], target: number): number {
  if (target > nums[nums.length - 1]) {
    return -1
  }
  let low: number = 0
  let high: number = nums.length - 1
  while (low <= high) {
    let mid = (low + high) >> 1
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return -1
}
```

下面这题:
![](https://media.haochen.me/Snipaste_2022-01-30_21-05-28.png)

它要我们输出数组中第一个大于等于查找值的位置，我们依旧使用二分查找法。

如果中间值大于等于查找值，则这个中间值**可能**是最终答案，我们让`high`等于`mid`缩小范围并开始下一轮循环。
如果中间值小于查找值，则目标值一定在中间值的右边，我们让`low`等于`mid + 1`缩小范围并开始下一轮循环。

```ts
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 二分查找
 * @param n int整型 数组长度
 * @param v int整型 查找值
 * @param a int整型一维数组 有序数组
 * @return int整型
 */
export function upper_bound_(n: number, v: number, a: number[]): number {
  // write code here
  if (v > a[n - 1]) {
    return n + 1
  }
  let low = 0
  let high = n - 1
  while (low < high) {
    let mid = (low + high) >> 1
    if (a[mid] >= v) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  return high + 1
}
```

下面来看这一道题：leetcode 33
![](https://media.haochen.me/Snipaste_2022-01-30_20-42-25.png)

什么叫转动？来看下面的例子：

```plain
0 2 4 7 9
9 0 2 4 7
7 9 0 2 4
4 7 9 0 2
2 4 7 9 0
```

可以看出，通过所谓转动，原来有序的数组变成了一个无序的数组，但是也有很显著的特点 -- 它是由两个**有序数组**组成的！

我们只需要找到待查元素**在哪个有序区间**，然后再查找不就可以了吗？

那么问题就成了**如何找旋转临界点**。我们可以用二分查找的方式寻找临界点！

我们可以维护一个 **low** 和 一个 **high** 下标，获取中间值，如果中间值小于 `num[0]`，说明
轴点可能是个临界点，让`high = mid`,继续搜索即可！最终，`high`的值就是轴点的值。

反之，如果中间值大于 `num[0]`,说明临界值一定在轴点的右边，让`low = mid + 1`,缩小范围继续搜索。

```ts
function search(nums: number[], target: number): number {
  // if array were sorted
  if (nums[nums.length - 1] >= nums[0]) return binarySearch(0, nums.length - 1)
  // find the boundary point
  let low: number = 0
  let high: number = nums.length - 1
  while (low < high) {
    let mid = (low + high) >> 1
    if (nums[mid] < nums[0]) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  const pivot = high

  // if target >= nums[0],we find target on left sorted array,otherwise we
  //find target on right sorted array.
  return target >= nums[0]
    ? binarySearch(0, pivot)
    : binarySearch(pivot, nums.length - 1)
  // 这里不用pivot-1的原因是:如果nums为[1]的话，二分函数中的high为-1，无法返回正确的结果

  // binary search algorithm
  function binarySearch(low: number, high: number) {
    while (low <= high) {
      let mid = (low + high) >> 1
      if (nums[mid] === target) {
        return mid
      } else if (nums[mid] > target) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
    return -1
  }
}
```

## DAY 3: 实现计算斐波那契数的三种方式

```ts
// 这种方式很显然存在重复运算
function fib(n: number): number {
  if (n === 0) {
    return 0
  } else if (n === 1) {
    return 1
  } else {
    return fib(n - 1) + fib(n - 2)
  }
}
// 我们可以把求过的值缓存起来，这样就解决了重复计算的问题
function fib(n: number, cache: object = {}): number {
  if (n in cache) {
    return cache[n]
  }
  if (n === 0) {
    return 0
  } else if (n === 1) {
    return 1
  } else {
    const ans: number = fib(n - 1, cache) + fib(n - 2, cache)
    cache[n] = ans
    return ans
  }
}
// 方法三：迭代
function fib(n: number): number {
  let a = 0
  let b = 1
  for (let i = 0; i < n; i++) {
    ;[a, b] = [b, a + b]
  }
  return a
}
```

## DAY 4:使用 stack 来反转一个列表

```ts
// stack 数据结构的特点：first in last out
function reverseList(nums: number[]): number[] {
  const ans = []
  while (nums.length > 0) {
    const x: number = nums.pop()
    ans.push(x)
  }
  return ans
}
```

## DAY 5:介绍 queue 数据结构

```ts
// queue相对于stack则为first in first out
function sqr(nums: []) {
  const ans: number[] = []
  while (nums.length > 0) {
    const x: number = nums.shift()
    ans.push(x * x)
  }
  return ans
}
```

## DAY 6: 判定字符是否唯一

```ts
// 方法1：直接利用Set
function isUnique(astr: string): boolean {
    return astr.length === new Set(astr).size
};

// 方法2：遍历
function isUnique2(astr:string):boolean {
    const set:Set<string> = new Set()
    for（const i of astr）{
        if set.has(i) return false
        set.add(i)
    }
    return true
}
```

## DAY 7：判断回文字符串的几种方式

请看下题

![](https://media.haochen.me/Snipaste_2022-02-12_20-40-41.png)

```ts
// 方法一
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
  return s.split("").reverse().join("") === s
}

// 方法二
function isPalindrome(s: string): boolean {
  // first we need to get the TRUE string
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
  // second we see if it's ralindrome string
  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - 1 - i]) return false
  }
  return true
}

// 方法三：利用stack
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
  let stack = s.split("")
  for (let i = 0; i < s.length / 2; i++) {
    const x = stack.pop()
    if (x !== s[i]) return false
  }
  return true
}
// 方法四：方法二的稍微复杂版本
var isPalindrome = function (s) {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
  let left = 0
  let right = s.length - 1
  while (left < right) {
    if (s[left] !== s[right]) return false
    left += 1
    right -= 1
  }
  return true
}
```

## DAY8: Two Sum 问题

请看下面这题：leetcode 1
![](https://media.haochen.me/Snipaste_2022-02-15_19-04-47.png)

```ts
// 方法一：我们很容易想到暴力枚举  时间复杂度约等于O(n^2/2)
function twoSum(nums: number[], target: number): number[] {
  // 暴力枚举
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
// 方法二：我们可以优化一下 可以维护一个notebook 然后去检查notebook里面是否有与此值相加等于目标值的值存在 时间复杂度O(n)
function twoSum(nums: number[], target: number): number[] {
  const notebook: Map<number, number> = new Map()
  for (let i = 0; i < nums.length; i++) {
    const value = target - nums[i]
    if (notebook.has(value)) {
      return [notebook.get(value), i]
    }
    notebook.set(nums[i], i)
  }
}
// 方法三：我们可以维护left，right两个下标在数组的两端，如果left + right > target，
// 我们将right左移一位，反之将left右移一位，但是这种方法的前提条件是数组已经是排好序的了
// 所以在此题中不能使用(test case 中存在乱序的数组，且题目中需要我们返回元素下标)
function twoSum(nums: number[], target: number): number[] {
  // first of all,we need  the array to be sorted
  nums.sort((a, b) => a - b)
  let left: number = 0
  let right: number = nums.length - 1
  while (left < right) {
    if (nums[left] + nums[right] === target) {
      return [left, right]
    } else if (nums[left] + nums[right] > target) {
      right -= 1
    } else {
      left += 1
    }
  }
}
```

## DAY9: 逆阶乘

给定一个数，求它的阶乘数，不存在返回-1。

```ts
// 暴力枚举
function InverseFactorials(n) {
  if (n === 1) {
    return 1
  } else if (n < 1) {
    return -1
  }
  let i = 2
  let s = 1
  while (s < n) {
    s *= i
    i++
  }
  if (s === n) {
    return i - 1
  } else {
    return -1
  }
}

// 方法2
function InverseFactorials2(n) {
  if (n === 1) {
    return 1
  } else if (n < 1) {
    return -1
  }
  let i = 2
  while (n > 1) {
    if (n % i !== 0) {
      return -1
    }
    n /= i
    i++
  }
  return i - 1
}
```

## DAY10: sum of digits

请看 leetcode 1837：
![](https://media.haochen.me/Snipaste_2022-02-17_14-05-09.png)

```ts
// 1.
function sumBase(n: number, k: number): number {
  n = parseInt(Number(n).toString(k))
  let ans: number = 0
  while (n > 0) {
    ans += n % 10
    n = Math.floor(n / 10)
  }
  return ans
}
//2. 字符串方法
function sumBase(n: number, k: number): number {
  let s: string = Number(n).toString(k)
  let ans: number = 0
  for (const i of s) {
    ans += parseInt(i)
  }
  return ans
}
//3. 递归
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var sumBase = function (n, k) {
  if (Number.isInteger(k)) {
    n = parseInt(Number(n).toString(k))
  }
  // base case
  if (n === 0) {
    return 0
  }
  return (n % 10) + sumBase(Math.floor(n / 10))
}
```

## DAY11: 判断两个字符串是否为异位词(Anagrams)

什么叫异位词？"ate"和“eat”，"net" 和 "ten"。"baa" 和 "ba" 则不为异位词。
解决这类问题我们可以维护两个`map`去统计每个字母的数量，然后再去比较两个`map`是否相等。
请看 leetcode 438:
![](https://media.haochen.me/Snipaste_2022-02-17_16-04-30.png)

```ts
// 我们首先想到最暴力的方法：遍历 然后 去判断是否位异位词
function findAnagrams(s: string, p: string): number[] {
    let ans:Array<number> = []
    let map:Map<string,number> = new Map()
    for(const i of p){
        if(map.get(i) !== undefined){
            map.set(i,map.get(i) + 1)
        }else {
           map.set(i,1)
        }
    }
    for(let i = 0;i <= s.length - p.length; i++){
        let map2 = new Map()
        let substring = s.slice(i,i + p.length)
        for(const j of substring){
            if(map2.get(j) !== undefined){
                map2.set(j,map2.get(j) + 1)
            }else {
                map2.set(j,1)
            }
        }
        if(compareMaps(map,map2)){
            ans.push(i)
        }
    }
    return ans
};

function compareMaps(map1:Map<string,number>,map2:Map<string,number>):Boolean{
    if(map1.size !== map2.size){
        return false
    }
    for(const [key,val] of map1){
        const testVal = map2.get(key)
        if(val !== testVal || (testVal === undefined && !map2.get(key)){
            return false
        }
    }
    return true
}
```

![](https://media.haochen.me/Snipaste_2022-02-17_16-08-11.png)

可以看到实在是太慢了。

我们进一步优化

### 优化

这道题符合使用滑动窗口的条件：即

1. 处理连续的 subarray 或者 substring
2. window 是否满足条件与 window 长度相关的问题

```ts
function findAnagrams(s: string, p: string): number[] {
  let ans: Array<number> = []
  let targetMap: Map<string, number> = new Map()
  let windowMap: Map<string, number> = new Map() // 窗口counter
  for (const i of p) {
    targetMap.set(i, (targetMap.get(i) || 0) + 1)
  }
  let startIndex = 0 //窗口右边界

  for (let endIndex = 0; endIndex < s.length; endIndex++) {
    // 窗口左边界
    let char = s[endIndex]
    windowMap.set(char, (windowMap.get(s[endIndex]) || 0) + 1)
    let isVaild = windowMap.get(s[endIndex]) > (targetMap.get(s[endIndex]) || 0)
    while (isVaild) {
      // 当窗口内有元素的数量跟目标元素的数量不同时
      windowMap.set(s[startIndex], windowMap.get(s[startIndex++]) - 1) // 左边界右移
    }
    if (endIndex - startIndex + 1 === p.length) {
      // 窗口长度与目标元素长度相等，同时我们连续比较右边界与目标元素的数量，确保了当长度相等时窗口内元素与目标元素一致
      ans.push(startIndex)
    }
  }
  return ans
}
```

![](https://media.haochen.me/Snipaste_2022-03-04_19-38-48.png)

## DAY12:求最大公约数和最小公倍数

```ts
function gcd(a: number, b: number) {
  while (b > 0) {
    ;[a, b] = [b, a % b]
  }
  return a
}

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b)
}
```

## DAY13: 利用`BFS(Breadth First Search)`解决`Jump Game`问题

例如:[2,0,3,1,3,4] 以 1 为起点，0 为目标，如果能跳跃到目标位置。可以左右跳，当前元素代表你在该位置可以跳跃的最大长度。

```ts
function BFS(nums: number, start: number, target: number): boolean {
  let queue: number[] = [start]
  let seen: Set<number> = new Set()
  while (queue.length > 0) {
    const element = queue.shift()
    seen.add(element)
    if (nums[element] === target) {
      return true
    }
    for (const i of [-1, 1]) {
      const next = element + i * nums[element]
      if (next >= 0 && next <= nums.length - 1 && !seen[next]) {
        queue.push(next)
      }
    }
  }
  return false
}
```

请看下面这题：leetcode 55
![](https://media.haochen.me/Snipaste_2022-02-19_21-45-56.png)

这题我们可以维护一个最大能到达的 index 值，遍历数组并与当前下标进行比较然后更新最大 index 值。

核心思想：如果能到达一个值，则这个值左侧的值也都能到达。

```ts
function canJump(nums: number[]): boolean {
  let k: number = 0
  for (let i = 0; i < nums.length; i++) {
    if (k < i) return false
    k = Math.max(k, i + nums[i])
  }
  return true
}
```

## DAY14: 利用`DFS(Depth First Search)`解决`Jump Game`

DFS 解法:

```ts
function DFS(
  n: number[],
  s: number,
  target: number,
  seen: Set<number> | undefined
): boolean {
  if (seen === undefined) {
    seen = new Set()
  }
  if (n[s] === target) {
    return true
  }
  for (const i of [-1, 1]) {
    const next = s + i * n[s]
    if (next >= 0 && next < n.length - 1 && !seen.has(next)) {
      seen.add(next)
      if (DFS(n, next, target, seen)) {
        return true
      }
      seen.delete(next)
    }
  }
  return false
}
```

## DAY15: 数学归纳法

Sum of integers：f(n) = n(n+1)/2

1. prove the base case
   when n = 1,f(1) = 1(1+1)/2 = 1
2. Induction step
   n = k = f(k) = k(k+1)/2
   f(k + 1) => f(k) + (k + 1) === f(k+1) = (k+1)(k+1+1)/2

wiki 的解释

```plain
The first, the base case (or basis), proves the statement for n = 0 without assuming any knowledge of other cases. The second case, the induction step, proves that if the statement holds for any given case n = k, then it must also hold for the next case n = k + 1. These two steps establish that the statement holds for every natural number n. The base case does not necessarily begin with n = 0, but often with n = 1, and possibly with any fixed natural number n = N, establishing the truth of the statement for all natural numbers n ≥ N.
```

## DAY16: Big O: Time complexity

O(1) < O(log n) < O( n ^ 1/2) < O(n) < O(nlogn) < O(n ^ 2) < O(n ^ 3) < O( 2 ^ n) < O( n! )

## DAY17: 合并两个有序的列表

```ts
// 不改变原数组
function merge(a: number[], b: number[]): number[] {
  let i = 0,
    j = 0,
    c = []
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      c.push(a[i])
      i += 1
    } else {
      c.push(b[j])
      j += 1
    }
  }
  while (i < a.length) {
    c.push(a[i++])
  }
  while (j < b.length) {
    c.push(b[j++])
  }
  return c
}
// 改变原数组
function merge2(a: number[], b: number[]): number[] {
  let c = []
  while (a.length && b.length) {
    if (a[0] < b[0]) {
      c.push(a.shift())
    } else {
      c.push(b.shift())
    }
  }
  return c.concat(a, b)
}
```

## DAY18: 快排

leetcode:912
快排是一种运用分治(divide and conquer )思想的排序算法,平均时间复杂度**O(nlogn)**,最大时间复杂度**O(n^2)**。

```ts
function quickSort(arr: number[]) {
  if (arr.length < 2) {
    return arr
  }
  let left = [],
    right = []
  let pivot = arr[arr.length - 1]
  while (arr.length > 1) {
    if (arr[0] < pivot) {
      left.push(arr.shift())
    } else {
      right.push(arr.shift())
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}
```

## DAY19: 判断有效括号匹配

leetcode 20: 我们利用栈来解决

```ts
function isValid(s: string): boolean {
  const stack: string[] = []
  for (const i of s) {
    if (i === "(") {
      stack.push(")")
    } else if (i === "[") {
      stack.push("]")
    } else if (i === "{") {
      stack.push("}")
    } else {
      if (i !== stack.pop()) return false
    }
  }

  return !stack.length
}
```

## DAY20: 合并排序

合并排序也是一种运用分治思想的算法，无限将数组二分，当数组只有一个元素的时候，则数组为有序状态，我们再使用合并算法合并两个有序数组即可。时间复杂度`O(nlogn)`

```ts
function mergeSort(nums: number[]) {
  if (nums.length < 2) {
    return nums
  }
  let middle = Math.floor(nums.length / 2)
  let left = nums.slice(0, middle)
  let right = nums.slice(middle)
  let sortedLeft = mergeSort(left)
  let sortedRight = mergeSort(right)
  return merge(sortedLeft, sortedLeft)
}

function merge(left: number[], right: number[]): number[] {
  let i = 0,
    j = 0
  let ans = []
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      ans.push(left[i])
      i += 1
    } else {
      ans.push(right[j])
      j += 1
    }
  }
  if (i < left.length) {
    ans = ans.concat(left.slice(i)) // note: concat return a new array
  }
  if (j < right.length) {
    ans = ans.concat(right.slice(j))
  }

  return ans
}
```

我们使用原地归并两个数组的方式来节省空间

```ts
function sortArray(nums: number[]): number[] {
  let aux = new Array<number>(nums.length).fill(undefined)
  sort(nums, 0, nums.length - 1)
  return nums
  function merge(nums: number[], low: number, middle: number, high: number) {
    let i = low
    let j = middle + 1
    for (let k = low; k <= high; k++) {
      aux[k] = nums[k]
    }
    for (let k = low; k <= high; k++) {
      if (i > middle) {
        nums[k] = aux[j++]
      } else if (j > high) {
        nums[k] = aux[i++]
      } else if (aux[j] < aux[i]) {
        nums[k] = aux[j++]
      } else {
        nums[k] = aux[i++]
      }
    }
  }
  function sort(nums: number[], low: number, high: number) {
    if (high <= low) {
      return
    }
    let middle = (high + low) >> 1
    sort(nums, low, middle)
    sort(nums, middle + 1, high)
    merge(nums, low, middle, high)
  }
}
```

## DAY21：使括号有效的最少添加

请看 leetcode 921：
![](https://media.haochen.me/Snipaste_2022-02-26_09-37-13.png)

```ts
function minAddToMakeValid(s: string): number {
  let ans: number = 0
  let bal: number = 0
  for (const i of s) {
    if (i === "(") {
      bal += 1
    } else if (i === ")") {
      bal -= 1
      if (bal < 0) {
        bal = 0 // 当bal<0,我们需要将bal重置，因为只有”（“在前面的时候才会有balance
        ans += 1
      }
    }
  }
  return ans + bal
}
```

## DAY22：二叉树的验证

请看 leetcode: 98
![](https://media.haochen.me/Snipaste_2022-02-27_11-27-21.png)
这里我们利用递归，维护两个边界，当数值超出了边界,返回 false 即可。

```ts
function isValidBST(
  root: TreeNode | null,
  max: number = Infinity,
  min: number = -Infinity
): boolean {
  if (root === null) {
    return true
  }
  if (root.val > min && root.val < max) {
    if (
      isValidBST(root.left, root.val, min) &&
      isValidBST(root.right, max, root.val)
    ) {
      return true
    }
  }
  return false
}
```

## DAY23：二叉树的遍历

- NLR: preorder
- LNR: inorder
- LRN: postorder
- RNL
- BFS

LNR(中序遍历): 请看 leetcode 94
![](https://media.haochen.me/Snipaste_2022-02-27_10-40-18.png)

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
function inorderTraversal(root: TreeNode | null, ans: number[] = []): number[] {
  if (root === null) {
    return []
  }
  inorderTraversal(root.left, ans)
  ans.push(root.val)
  inorderTraversal(root.right, ans)
  return ans
}
```

LRN(后续遍历)：请看 leetcode 145
![](https://media.haochen.me/Snipaste_2022-02-27_10-44-39.png)

```ts
function postorderTraversal(
  root: TreeNode | null,
  ans: number[] = []
): number[] {
  if (root === null) {
    return []
  }
  postorderTraversal(root.left, ans)
  postorderTraversal(root.right, ans)
  ans.push(root.val)
  return ans
}
```

NLR(前续遍历):

```ts
function preorderTraversal(
  root: TreeNode | null,
  ans: number[] = []
): number[] {
  if (root === null) {
    return []
  }
  ans.push(root.val)
  preorderTraversal(root.left, ans)
  preorderTraversal(root.right, ans)
  return ans
}
```

## DAY24:回溯算法解决 n 皇后问题

DFS + 剪枝 -> 回溯
leetcode 51: n 皇后问题

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let current = []
  let results = DFS(current, n)
  const ans = []
  for (let i = 0; i < results.length / n; i++) {
    ans.push(results.slice(i * n, i * n + n))
  }
  return ans
}

function DFS(current, n) {
  let ans = []
  if (current.length === n) {
    let forAns = new Array(n).fill(".".repeat(n))
    for (let i = 0; i < current.length; i++) {
      forAns[i] =
        forAns[i].substring(0, current[i]) +
        "Q" +
        forAns[i].substring(current[i] + 1)
    }
    return forAns
  }
  for (let i = 0; i < n; i++) {
    if (canPlace(current, i)) {
      ans = ans.concat(DFS(current.concat(i), n))
    }
  }
  return ans
}
function canPlace(current, x) {
  for (let i = 0; i < current.length; i++) {
    if (current[i] === x || current.length - i === Math.abs(x - current[i])) {
      return false
    }
  }
  return true
}
```

再来一题回溯

leetcode:46 全排列

```ts
function permute(nums: number[]): number[][] {
  let res: number[][] = []
  let path: number[] = []
  backtrack(path, nums, res)
  return res
}

function backtrack(
  path: number[],
  nums: number[],
  res: number[][]
): number[][] {
  // 结束条件
  if (path.length === nums.length) {
    res.push(path)
    return
  }
  // 选择列表
  for (let i = 0; i < nums.length; i++) {
    // 做选择
    if (!path.includes(nums[i])) {
      // 参数即路径
      backtrack(path.concat(nums[i]), nums, res)
    }
  }

  return res
}
```

## DAY25: sum of first odd and first even number

```ts
function sumOfFirstOdd(n) {
  let ans = 0
  for (let i = 1; i < 2 * n; i = i + 2) {
    ans += i
  }
  return ans
}

function sumOfFirstEven(n) {
  let ans = 0
  for (let i = 2; i < 2 * n + 1; i = i + 2) {
    ans += i
  }
  return ans
}
```

## DAY26:完全二叉树的节点个数

leetcode 222:
![](https://media.haochen.me/Snipaste_2022-03-01_15-26-59.png)

```ts
// BFS
function countNodes(root: TreeNode | null): number {
  if (root == null) {
    return 0
  }
  let queue: TreeNode[] = [root]
  let ans: number = 0
  while (queue.length) {
    let node = queue.shift()
    ans += 1
    if (node.left != null) {
      queue.push(node.left)
    }
    if (node.right != null) {
      queue.push(node.right)
    }
  }
  return ans
}

// DFS
function countNodes(root: TreeNode | null): number {
  if (root == null) {
    return 0
  }
  return 1 + countNodes(root.left) + countNodes(root.right)
}
```

## DAY27:区间列表的交集

leetcode 986：
![](https://media.haochen.me/Snipaste_2022-03-02_09-54-50.png)

```ts
// 通过观察可知，右区间中小的减去左区间中大的即为交集
function intervalIntersection(
  firstList: number[][],
  secondList: number[][]
): number[][] {
  if (firstList.length === 0 || secondList.length === 0) {
    return []
  }
  let ans: number[][] = []
  let i: number = 0
  let j: number = 0
  while (i < firstList.length && j < secondList.length) {
    let left = Math.max(firstList[i][0], secondList[j][0])
    let right = Math.min(firstList[i][1], secondList[j][1])
    if (left <= right) {
      ans.push([left, right])
    }
    // 哪个右区间元素较小，就向前移动一位 这里很巧妙
    if (firstList[i][1] < secondList[j][1]) {
      i++
    } else {
      j++
    }
  }
  return ans
}
```

## DAY28：十进制十六进制互转

leetcode: 405

```ts
function toHex(num: number): string {
  if (num < 0) {
    num = 2 ** 32 - Math.abs(num)
  } else if (num === 0) {
    return "0"
  }
  let ans = []
  let numberMap = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "a",
    11: "b",
    12: "c",
    13: "d",
    14: "e",
    15: "f",
  }
  while (num > 0) {
    ans.unshift(numberMap[num % 16])
    num = Math.floor(num / 16)
  }
  return ans.join("")
}

// hex to decimal
function hex2Decimal(num: string) {
  let ans = 0
  let numberMap = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
  }
  for (const i of num) {
    ans = ans * 16 + numberMap[i.toLowerCase()]
  }
  return ans
}
```

## DAY29: 利用前缀和算内部某区间的和

```ts
function prefixComputeIntervalSums(
  nums: number[],
  start: number,
  end: number
): number {
  let s: number = 0
  let prefix: number[] = [0]
  for (const i of nums) {
    s += i
    prefix.push(s)
  }
  return prefix(end + 1) - prefix(start)
}
```

我们看 leetcode 930:
![](https://media.haochen.me/Snipaste_2022-03-04_09-49-36.png)
这题我们可以利用前缀和来解，记录每个前缀和的个数，那么每个位置对应的目标数就是此位置前缀和 - goal 对应的前缀和个数

```ts
function numSubarraysWithSum(nums: number[], goal: number): number {
  let s = 0
  let ans = 0
  const prefix = {}
  for (const i of nums) {
    prefix[s] = (prefix[s] || 0) + 1
    s += i
    ans += prefix[s - goal] || 0
  }
  return ans
}
```

## DAY30: 滑动窗口

leetcode 209：
![](https://media.haochen.me/Snipaste_2022-03-04_17-28-28.png)

```ts
function minSubArrayLen(target: number, nums: number[]): number {
  // sliding window
  let ans = nums.length + 1
  let startIndex = 0 // 窗口起始坐标
  let endIndex = 0 // 窗口结束坐标
  let windowSum = 0 //窗口内元素之和
  let subLength = 0
  while (end_idx < nums.length) {
    windowSum += nums[endIndex]
    while (windowSum >= target) {
      subLength = endIndex - startIndex + 1 //窗口内长度
      ans = subLength < ans ? subLength : ans
      windowSum -= nums[startIndex++]
    }
    endIndex++
  }
  return ans === nums.length + 1 ? 0 : ans
}
```

## DAY31：单链表的中间节点

leetcode 876：返回单链表的中间节点
![](https://media.haochen.me/Snipaste_2022-03-05_09-48-23.png)

我们可以定义双指针`slow`，`fast`，让`fast`右移的速度是`slow`的两倍即可

```ts
function middleNode(head: ListNode | null): ListNode | null {
  let slow = head,
    fast = head
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}
```

## DAY32: 螺旋矩阵

解螺旋矩阵的要点是：确定边界！
维护四个边界，上下左右，每跑完一条边就更新边界
leetcode：54
![](https://media.haochen.me/Snipaste_2022-03-05_14-21-39.png)

```ts
function spiralOrder(matrix: number[][]): number[] {
  let ans: number[] = []
  // 确定边界
  let beginRow: number = 0
  let endRow: number = matrix.length - 1
  let beginColumn: number = 0
  let endColumn: number = matrix[0].length - 1
  while (beginRow <= endRow && beginColumn <= endColumn) {
    for (let i = beginColumn; i <= endColumn; i++) {
      ans.push(matrix[beginRow][i])
    }
    beginRow++
    for (let i = beginRow; i <= endRow; i++) {
      ans.push(matrix[i][endColumn])
    }
    endColumn--
    if (beginRow <= endRow) {
      for (let i = endColumn; i >= beginColumn; i--) {
        ans.push(matrix[endRow][i])
      }
    }
    endRow--
    if (beginColumn <= endColumn) {
      for (let i = endRow; i >= beginRow; i--) {
        ans.push(matrix[i][beginColumn])
      }
    }
    beginColumn++
  }
  return ans
}
```

同理
leetcode: 59
![](https://media.haochen.me/Snipaste_2022-03-05_14-27-09.png)

```ts
function generateMatrix(n: number): number[][] {
  const matrix: number[][] = new Array(n).fill(null).map(() => [])
  let beginRow: number = 0
  let endRow: number = n - 1
  let beginColumn: number = 0
  let endColumn: number = n - 1
  let counter: number = 1
  while (beginRow <= endRow && beginColumn <= endColumn) {
    for (let i = beginColumn; i <= endColumn; i++) {
      matrix[beginRow][i] = counter++
    }
    beginRow++
    for (let i = beginRow; i <= endRow; i++) {
      matrix[i][endColumn] = counter++
    }
    endColumn--
    if (beginRow <= endRow) {
      for (let i = endColumn; i >= beginColumn; i--) {
        matrix[endRow][i] = counter++
      }
    }
    endRow--
    if (beginColumn <= endColumn) {
      for (let i = endRow; i >= beginRow; i--) {
        matrix[i][beginColumn] = counter++
      }
    }
    beginColumn++
  }
  return matrix
}
```

## DAY33：判断一个字符串能否构成回文字符串

很容易想到，我们只需要验证字符串中字符数为奇数的字符不大于 1 即可

```ts
function canPermutePalindrome(s: string): boolean {
  let charMap = new Map<string, number>()
  let oddNumber: number = 0
  for (const i of s) {
    charMap.set(i, (charMap.get(i) || 0) + 1)
  }

  for (const v of charMap.values()) {
    if ((v & 1) === 1) {
      oddNumber++
      if (oddNumber > 1) return false
    }
  }
  return true
}
```

## DAY34: 反转单链表 和 移除单链表节点

```ts
// 迭代法 三指针
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head
  }
  let pre = null
  let current = head
  let next = null
  while (current) {
    next = current.next
    current.next = pre
    pre = current
    current = next
  }
  return pre
}
// 递归
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head
  }
  let n = reverseList(head.next)
  head.next.next = head
  head.next = null

  return n
}

// 移除
function removeElements(head: ListNode | null, val: number): ListNode | null {
  let fakeHead = new ListNode(0, head)
  let current = fakeHead.next
  let pre = fakeHead
  while (current) {
    if (current.val === val) {
      pre.next = current.next
    } else {
      pre = current
    }
    current = current.next
  }
  return fakeHead.next
}
```

## DAY35：链表相交

![](https://media.haochen.me/Snipaste_2022-03-07_11-08-10.png)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let hA = headA,
    lenA = 0,
    hhA = headA
  let hB = headB,
    lenB = 0,
    hhB = headB
  // 求A的长度
  while (hA !== null) {
    lenA++
    hA = hA.next
  }
  // 求B的长度
  while (hB !== null) {
    lenB++
    hB = hB.next
  }
  let length = Math.abs(lenA - lenB)
  //根据长度差移动长度大的头节点
  if (lenA > lenB) {
    while (length) {
      hhA = hhA.next
      length--
    }
  } else if (lenA < lenB) {
    while (length) {
      hhB = hhB.next
      length--
    }
  }
  // 开始逐一比较
  while (hhA !== null && hhB !== null) {
    if (hhA === hhB) {
      return hhA
    }
    hhA = hhA.next
    hhB = hhB.next
  }
  return null
}

// 优化版： 如果两个链表相交 必定在相交点相遇
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  let a = headA,
    b = headB
  let counter = 0
  while (a !== b) {
    a = a.next
    if (!a) {
      // a 走到 末端, 从B开始走
      a = headB
      counter++
    }
    b = b.next
    if (!b) {
      // b 走到 末端，从A开始走
      b = headA
      counter++
    }
    if (counter > 2) {
      return null
    }
  }
  return a
}
```

## DAY36：两两交换链表中的节点

![](https://media.haochen.me/Snipaste_2022-03-08_14-41-30.png)

```ts
function swapPairs(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head
  }
  let fakeHead: ListNode = new ListNode(0, head)
  let pre: ListNode = fakeHead
  let current: ListNode | null = fakeHead.next
  while (current !== null && current.next !== null) {
    // 交换
    let next = current.next
    let temp = next.next
    pre.next = next
    next.next = current
    current.next = temp

    // 移动指针
    pre = current
    current = current.next
  }
  return fakeHead.next
}
```

## DAY37:删除链表倒数第 K 个节点

```ts
// 双指针
let counter: number = 0
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // 递归
  if (!head) {
    return null
  }
  let node = removeNthFromEnd(head.next, n)
  head.next = node
  counter++
  if (counter === n) {
    return head.next
  }
  return head

  // 快慢指针
  let slow: ListNode = head
  let fast: ListNode = head
  while (fast.next) {
    fast = fast.next
    n--
    if (n < 0) {
      slow = slow.next
    }
  }
  // 当n大于0 说明删除的是第一个
  if (n > 0) {
    return slow.next
  }
  // 此时slow是要删除的前一个节点
  slow.next = slow.next.next
  return head
}
```

## DAY38：pow(x,n)

```ts
// 递归 如果是偶数 就将指数减半
function myPow(x: number, n: number): number {
  // 首先处理边界情况
  if (x === 1 || x === 0) {
    return x
  }
  if (n === 0) {
    return 1
  }
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  // 如果是奇数
  if (n & 1) {
    return x * myPow(x, n - 1)
  }
  // 如果是偶数
  let y = myPow(x, n / 2)
  return y ** 2
}
```

## DAY39: 排序链表

```ts
// 合并排序
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head
  }

  let middle: ListNode = head
  let pointer: ListNode | null = head
  let prev: ListNode | null = null
  while (pointer && pointer.next) {
    pointer = pointer.next.next
    prev = middle
    middle = middle.next
  }
  prev.next = null
  let sortedLeft = sortList(head)
  let sortedRight = sortList(middle)
  return merge(sortedLeft, sortedRight)
}

function merge(left: ListNode, right: ListNode): ListNode {
  // 巧妙
  let dummy: ListNode = new ListNode(0)
  let p: ListNode = dummy
  while (left && right) {
    if (left.val < right.val) {
      p.next = left
      left = left.next
    } else {
      p.next = right
      right = right.next
    }
    p = p.next
  }
  if (left) {
    p.next = left
  }
  if (right) {
    p.next = right
  }
  return dummy.next
}
```

## DAY40: 三数之和

```ts
function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) {
    // 特判
    return []
  }
  let ans: number[][] = []
  let sum: number = 0
  nums.sort((a, b) => a - b)
  let n = nums.length
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      // 已经排好序，如果大于0，说明没有满足条件的另外两个数
      return ans
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      // 相邻重复的，去重
      continue
    }
    let j = i + 1
    let k = n - 1
    while (j < k) {
      sum = nums[i] + nums[j] + nums[k]
      if (sum === 0) {
        ans.push([nums[i], nums[j], nums[k]])
        while (j < k && nums[k] === nums[k - 1]) {
          // 此处保证下个指针的位置与此指针的数不同，去重
          k -= 1
        }
        while (j < k && nums[j] === nums[j + 1]) {
          j += 1
        }
        k -= 1
        j += 1
      } else if (sum > 0) {
        k -= 1
      } else {
        j += 1
      }
    }
  }
  return ans
}
```

## DAY41: 四数之和

leetcode 18:
![](https://media.haochen.me/Snipaste_2022-03-13_12-42-07.png)

```ts
function fourSum(nums: number[], target: number): number[][] {
  // 特判
  if (nums.length < 4) {
    return []
  }
  let ans: number[][] = []
  // 排序数组
  nums.sort((a, b) => a - b)
  let n: number = nums.length
  for (let i = 0; i < n - 1; i++) {
    // 保证不与前一个数相等 前一个数我们已经处理过了 且数组是排过序的 这样就保证了我们处理的都是不相等的数
    if (i > 0 && nums[i - 1] === nums[i]) {
      continue
    }
    for (let j = n; j > i; j--) {
      let left: number = i + 1
      let right: number = j - 1
      // 保证不与后一个数相等，后一个数我们已经处理过了
      if (j < n && nums[i] + nums[j] === nums[i] + nums[j + 1]) {
        continue
      }
      while (left < right) {
        if (nums[left] + nums[right] + nums[i] + nums[j] === target) {
          ans.push([nums[left], nums[right], nums[i], nums[j]])
          // 保证不与前一个数相等，前一个数我们已经处理过了
          while (left < j && nums[left] === nums[left + 1]) {
            left++
          }
          // 保证不与后一个数相等，后一个数我们已经处理过了
          while (right > i && nums[right] === nums[right - 1]) {
            right--
          }
          left++
          right--
        } else if (nums[left] + nums[right] + nums[i] + nums[j] > target) {
          right--
        } else {
          left++
        }
      }
    }
  }
  return ans
}
```

## DAY42: Symmetric & equal & copy & invert binary tree

```ts
// revert
function revert(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null
  }
  let revertedLeft = revert(root.left)
  let revertedRight = revert(root.right)
  root.right = revertedLeft
  root.left = revertedRight
  return root
}
// copy
function copy(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null
  }
  let copyedLeft = copy(root.left)
  let copyedRight = copy(root.right)
  let newNode = new TreeNode(root.val)
  newNode.right = copyedRight
  newNode.left = copyedLeft
  return newNode
}
// equal
function equal(a: TreeNode | null, b: TreeNode): boolean {
  if (a === null && b === null) {
    return true
  } else if (a === null || b === null) {
    return false
  }

  return a.val === b.val && equal(a.left, b.left) && equal(a.right, b.right)
}
// symmetric
function Symmetric(left: TreeNode | null, right: TreeNode | null): boolean {
  if (left === null && right === null) {
    return true
  } else if (left == null || right == null) {
    return false
  }
  return (
    left.val === right.val &&
    Symmetric(left.left, right.right) &&
    Symmetric(left.right, right.left)
  )
}
```

## DAY43: 有序链表构造平衡树

```ts
function sortedListToBST(head: ListNode | null): TreeNode | null {
  if (head === null) {
    return null
  } else if (head.next === null) {
    return new TreeNode(head.val)
  }
  let fast = head,
    slow = head
  let prev = null
  while (fast && fast.next) {
    fast = fast.next.next
    prev = slow
    slow = slow.next
  }
  prev.next = null
  let newNode = new TreeNode(slow.val)
  newNode.left = sortedListToBST(head)
  newNode.right = sortedListToBST(slow.next)

  return newNode
}
```

## DAY 44: 合并 K 个有序链表

```ts
// 此题和归并排序的思路一样，按照归并排序的思路写就行了，差异在于归并两个有序列表和归并两个
// 有序链表的不同，但是也不复杂，利用虚拟头节点一个个合并就行了。
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) {
    return null
  } else if (lists.length === 1) {
    return lists[0]
  }
  let middle = lists.length >> 1
  let left: Array<ListNode | null> = lists.slice(0, middle)
  let right: Array<ListNode | null> = lists.slice(middle)
  let sortedList: ListNode | null = mergeKLists(left)
  let sortedRight: ListNode | null = mergeKLists(right)

  return merge(sortedList, sortedRight)
}

function merge(a: ListNode | null, b: ListNode | null): ListNode | null {
  let dummyHead: ListNode = new ListNode(null)
  let p: ListNode = dummyHead
  let left: ListNode | null = a,
    right: ListNode | null = b
  while (left && right) {
    if (left.val > right.val) {
      p.next = right
      right = right.next
    } else {
      p.next = left
      left = left.next
    }
    p = p.next
  }
  // 处理剩余的
  if (left) {
    p.next = left
  }

  if (right) {
    p.next = right
  }
  return dummyHead.next
}
```

## DAY45： 链表两数相加

![](https://media.haochen.me/Snipaste_2022-03-18_11-43-40.png)

```ts
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let dummy = new ListNode(0)
  let p = dummy
  let carry = 0
  while (l1 || l2 || carry) {
    let currentDigital = carry
    if (l1) {
      currentDigital += l1.val
      l1 = l1.next
    }
    if (l2) {
      currentDigital += l2.val
      l2 = l2.next
    }
    p.next = new ListNode(currentDigital % 10)
    carry = Math.floor(currentDigital / 10)
    p = p.next
  }
  return dummy.next
}
```

## DAY46: 修剪二叉树

给定一个范围(都是闭区间)，剪掉二叉树中不在此范围的元素节点。

```ts
function trimBST(
  root: TreeNode | null,
  low: number,
  high: number
): TreeNode | null {
  if (root === null) {
    return null
  } else if (root.val < low) {
    return trimBST(root.right, low, high)
  } else if (root.val > high) {
    return trimBST(root.left, low, high)
  }

  root.left = trimBST(root.left, low, high)
  root.right = trimBST(root.right, low, high)
  return root
}
```

## DAY47: 位 1 的个数

leetcode 191:

```ts
// 利用 n = n & (n - 1) 来消除低位
function hammingWeight(n: number): number {
  let ans: number = 0
  while (n) {
    ans++
    n &= n - 1
  }
  return ans
}

// 移位
// P.S  此方法js过不了 但C++可以过
function hammingWeight(n: number): number {
  let ans: number = 0
  while (n) {
    ans += n & 1
    n >>= 1
  }
  return ans
}
```

## DAY48：二叉树的右视图

leetcode 199:
![](https://media.haochen.me/Snipaste_2022-03-23_10-17-31.png)

```ts
// BFS:一层一层的处理， 取最右侧的节点
function rightSideView(root: TreeNode | null): number[] {
  let ans: number[] = []
  let queue: TreeNode[] = []
  if (root === null) {
    return ans
  }
  queue.push(root)
  while (queue.length) {
    let size = queue.length
    for (let i = 0; i < size; i++) {
      let currentNode = queue.shift()
      if (i === 0) {
        ans.push(currentNode.val)
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right)
      }
      if (currentNode.left !== null) {
        queue.push(currentNode.left)
      }
    }
  }
  return ans
}
// DFS  NRL 遍历
function rightSideView(root: TreeNode | null): number[] {
  let ans: number[] = []
  dfs(root, ans, 0)
  return ans
}
function dfs(root: TreeNode | null, ans: number[], depth: number) {
  if (root === null) {
    return
  }
  if (!(depth in ans)) {
    ans[depth] = root.val
  }
  dfs(root.right, ans, depth + 1)
  dfs(root.left, ans, depth + 1)
}
```

## DAY49: 只出现一次的数字

leetcode 136:
![](https://media.haochen.me/Snipaste_2022-03-23_11-35-10.png)

```ts
// 不需要额外空间，就往位运算上想！！！
function singleNumber(nums: number[]): number {
  let ans: number = 0
  for (let i = 0; i < nums.length; i++) {
    ans ^= nums[i]
  }
  return ans
}
```

## DAY50: 链表插入排序

```ts
function insertionSortList(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(0, head)
  let pre
  while (head !== null && head.next !== null) {
    if (head.val <= head.next.val) {
      head = head.next
      continue
    }
    pre = dummy
    while (pre.next.val < head.next.val) {
      pre = pre.next
    }

    let curr = head.next
    head.next = curr.next
    curr.next = pre.next
    pre.next = curr
  }
  return dummy.next
}
```

## DAY51: sqrt

```ts
// 保留n位小数版本
function mySqrt(x: number): number {
  if (x <= 1) {
    return x
  }
  let low: number = 0
  let high: number = x
  let current = 0,
    middle = 0
  while (Math.abs(current - x) > 1e-8) {
    middle = (low + high) / 2
    current = middle * middle
    if (current < x) {
      low = middle
    } else {
      high = middle
    }
  }
  return Math.floor(middle) // toFixed()
}
```

## DAY52: DP

leetcode 198: 打家劫舍
![](https://media.haochen.me/Snipaste_2022-03-28_17-29-09.png)

```ts
// top down
// 对于k来说，可以分为选和不选,取这两种情况的最大值即为答案
// 1. 选：nums[k] + f(k - 2)
// 2. 不选： f(k - 1)
function rob(nums: number[]): number {
  return fn(nums, nums.length - 1)
}

function fn(
  nums: number[],
  k: number,
  nootbook: Map<number, number> = new Map()
): number {
  if (k === 0) {
    return nums[0]
  } else if (k === 1) {
    return Math.max(nums[0], nums[1])
  }
  if (nootbook.has(k)) {
    return nootbook.get(k)
  }
  let val = Math.max(
    nums[k] + fn(nums, k - 2, nootbook),
    fn(nums, k - 1, nootbook)
  )
  nootbook.set(k, val)
  return val
}

// bottom up
function rob(nums: number[]): number {
  let n: number = nums.length
  if (n === 1) {
    return nums[0]
  } else if (n === 2) {
    return Math.max(nums[0], nums[1])
  }
  let dp: number[] = new Array(n).fill(0)
  ;(dp[0] = 0), (dp[1] = nums[0]), (dp[2] = Math.max(nums[0], nums[1]))
  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(nums[i - 1] + dp[i - 2], dp[i - 1])
  }
  return dp[n]
}
```

## DAY53: 二叉树剪枝

![](https://media.haochen.me/Snipaste_2022-04-07_10-24-59.png)

从底部向上消除为 0 的子树即可

```ts
function pruneTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null
  }
  root.left = pruneTree(root.left)
  root.right = pruneTree(root.right)

  if (root.val === 0 && !root.left && !root.right) {
    return null
  } else {
    return root
  }
}
```

## DAY54：路径总和

leetcode 112:

```ts
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) {
    return false
  }
  let counter: number = 0
  let flag: boolean = false
  dfs(root)
  return flag
  function dfs(root: TreeNode | null) {
    if (root === null) {
      return
    }
    counter += root.val
    dfs(root.left)
    if (root.left === null && root.right === null) {
      if (counter === targetSum) {
        flag = true
      }
    }
    dfs(root.right)
    counter -= root.val
  }
}

// 简洁版
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) {
    return false
  }
  if (root.left === null && root.right === null) {
    return root.val === targetSum
  }
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  )
}
```

## DAY55

leetcode 236: 二叉树的最近公共祖先

对每个子树来说，包含这两个节点都为公共祖先，我们取第一个即可。

```ts
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  let res = null
  dfs(root, p, q)
  return res

  function dfs(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null) {
    if (root === null) {
      return 0
    }
    let left = dfs(root.left, p, q)
    let right = dfs(root.right, p, q)
    let self = root === q || root === p
    let count = left + right + Number(self)
    if (count === 2 && res === null) {
      res = root
    }
    return count
  }
}
```

leetcode 297: 序列化二叉树

层序遍历

```ts
/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  if (root === null) {
    return JSON.stringify([])
  }
  let res: Array<null | number> = []
  let queue: Array<null | TreeNode> = [root]
  while (queue.length) {
    let node = queue.shift()
    if (node) {
      res.push(node.val)
      queue.push(node.left)
      queue.push(node.right)
    } else {
      res.push(null)
    }
  }
  return JSON.stringify(res)
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  let tree = JSON.parse(data)
  if (!tree.length) {
    return null
  }
  let root: TreeNode = new TreeNode(tree.shift())
  let node: TreeNode, left: number | null, right: number | null
  let queue: TreeNode[] = [root]
  while (tree.length && tree.length) {
    node = queue.shift()
    left = tree.shift()
    right = tree.shift()
    if (left !== null) {
      node.left = new TreeNode(left)
      queue.push(node.left)
    }
    if (right !== null) {
      node.right = new TreeNode(right)
      queue.push(node.right)
    }
  }
  return root
}
```

## DAY56: 二叉树最大路径和

leetcode 124:
![](https://media.haochen.me/Snipaste_2022-04-10_15-22-45.png)

思路：将每个节点都作为一个拐点，我们先算出对此节点来说最大的路径和，然后顺便处理拐点的情况。

```ts
function maxPathSum(root: TreeNode | null): number {
  let result = Number.MIN_SAFE_INTEGER
  MaxDownPath(root)
  return result
  function MaxDownPath(node: TreeNode | null) {
    if (node === null) {
      return 0
    }
    const leftSum = MaxDownPath(node.left)
    const rightSum = MaxDownPath(node.right)

    let maxTurnSum = node.val
    if (leftSum >= 0) {
      maxTurnSum += leftSum
    }
    if (rightSum >= 0) {
      maxTurnSum += rightSum
    }
    result = Math.max(maxTurnSum, result)

    if (leftSum < 0 && rightSum < 0) {
      return node.val
    } else {
      return Math.max(leftSum, rightSum) + node.val
    }
  }
}
```

## DAY57: 比特位计数

lc 338:
![](https://media.haochen.me/Snipaste_2022-04-11_19-45-43.png)

```ts
// > O(n)
function countBits(n: number): number[] {
  const res: number[] = []
  for (let i = 0; i <= n; i++) {
    let num: number = i
    let counter: number = 0
    while (num > 0) {
      counter++
      num &= num - 1 // 消除低位1
    }
    res.push(counter)
  }
  return res
}
// O(n)
function countBits(n: number): number[] {
  const res = [0]
  for (let i = 1; i <= n; i++) {
    res[i] = res[i & (i - 1)] + 1
  }
  return res
}
```

## DAY58: 多数元素

```ts
// O(n) / O(1)
function majorityElement(nums: number[]): number {
  let majority: number = nums[0]
  let count: number = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === majority) {
      count++
    } else if (--count === 0) {
      majority = nums[i]
      count = 1
    }
  }
  return majority
}
```

## DAY59：回文子串

lc 647： 回文子串数量

```ts
// 中心扩展
function countSubstrings(s: string): number {
  let res: number = 0
  function count(left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      res++
      left--
      right++
    }
  }
  for (let i = 0; i < s.length; i++) {
    // odd number substrings
    count(i, i)
    if (i + 1 < s.length) {
      // even number substrings
      count(i, i + 1)
    }
  }
  return res
}
// 马拉车算法
function countSubstrings(s: string): number {
  let t = "#"
  for (const char of s) {
    t = t + char + "#"
  }
  const n = t.length
  const P = new Array(t.length).fill(1)
  let maxRight = -1
  let maxCenter = -1
  for (let i = 0; i < n; i++) {
    let r
    if (maxRight >= i) {
      let j = maxCenter * 2 - i
      r = Math.min(P[j], maxRight - i)
      while (i - r >= 0 && i + r < n && t[i - r] == t[i + r]) {
        r++
      }
    } else {
      r = 0
      while (i - r >= 0 && i + r < n && t[i - r] === t[i + r]) {
        r++
      }
    }
    P[i] = r - 1
    if (i + P[i] > maxRight) {
      maxRight = i + P[i]
      maxCenter = i
    }
  }
  let res = 0
  for (const r of P) {
    res += Math.floor((r + 1) / 2)
  }
  return res
}
```

此题几乎和第五题一模一样，我们同样可以用两种方法来做

```ts
// 中心扩展 O(n^2)
function longestPalindrome(s: string): string {
  let max: number = 0
  let maxString: string = ""
  function count(left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    if (right - left > max) {
      max = right - left
      maxString = s.slice(left + 1, right)
    }
  }
  for (let i = 0; i < s.length; i++) {
    count(i, i)
    if (i + 1 < s.length) {
      count(i, i + 1)
    }
  }
  return maxString
}
// 马拉车 O(n)
function longestPalindrome(s: string): string {
  // 马拉车
  let t: string = "#"
  for (const char of s) {
    t = t + char + "#"
  }
  const n = t.length
  let dp = new Array(n).fill(1)
  let maxRight = -1
  let maxCenter = -1
  let maxR = 0
  let center = 0
  for (let i = 0; i < n; i++) {
    let r
    if (maxRight >= i) {
      let j = 2 * maxCenter - i
      r = Math.min(dp[j], maxRight - i)
      while (i - r >= 0 && i + r < n && t[i - r] === t[i + r]) {
        r++
      }
    } else {
      r = 0
      while (i - r >= 0 && i + r < n && t[i - r] === t[i + r]) {
        r++
      }
    }
    dp[i] = r - 1
    if (dp[i] > maxR) {
      maxR = dp[i]
      center = i
    }
    if (dp[i] + i > maxRight) {
      maxRight = dp[i] + i
      maxCenter = i
    }
  }

  return s.slice((center - maxR) / 2, (center + maxR) / 2)
}
```

## DAY60：修复二叉树

leetcode: 99

```ts
function recoverTree(root: TreeNode | null): void {
  let pre = new TreeNode(Number.MIN_SAFE_INTEGER)
  let target1 = null
  let target2 = null
  dfs(root)
  const temp = target1.val
  target1.val = target2.val
  target2.val = temp
  function dfs(node: TreeNode | null): void {
    if (node === null) {
      return
    }
    dfs(node.left)
    if (pre.val <= node.val) {
      pre = node
    } else {
      if (!target1) {
        target1 = pre
        target2 = node
        pre = node
      } else {
        target2 = node
        return
      }
    }
    dfs(node.right)
  }
}
```

## DAY61： 二叉树的完全性检验

leetcode 958
关键： null 出现在节点之前即为非完全性二叉树

```ts
function isCompleteTree(root: TreeNode | null): boolean {
  let queue: TreeNode[] = [root]
  let hole: boolean = false
  while (queue.length) {
    let node = queue.shift()
    if (!node) {
      hole = true
    } else {
      if (hole) {
        return false
      }
      queue.push(node.left)
      queue.push(node.right)
    }
  }
  return true
}
```

## DAY62：下降路径最小和

```ts
// 时间序列性的DP
function minFallingPathSum(grid: number[][]): number {
  const n = grid.length
  const dp = new Array(n).fill(null).map(() => new Array(n).fill(0))
  dp[0] = grid[0]
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let minPathSum = Number.MAX_SAFE_INTEGER
      let index = 0
      while (index < n) {
        if (index !== j) {
          minPathSum = Math.min(minPathSum, dp[i - 1][index])
        }
        index++
      }
      dp[i][j] = minPathSum + grid[i][j]
    }
  }
  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < dp[n - 1].length; i++) {
    min = Math.min(min, dp[n - 1][i])
  }
  return min
}
```

## DAY63: 计算右侧小于当前元素的个数

Leetcode 315: ![](https://media.haochen.me/Snipaste_2022-04-25_19-58-46.png)

```ts
// 经典分治，值得细细品味
function countSmaller(nums: number[]): number[] {
  // merge sort
  const len = nums.length
  let origin = [...nums]
  const aux = new Array(len).fill(0)
  let result = new Array(len).fill(0)
  sort(nums, 0, len - 1)
  return result

  function sort(nums: number[], start: number, end: number) {
    if (start >= end) {
      return
    }
    let middle = (start + end) >> 1
    sort(nums, start, middle)
    sort(nums, middle + 1, end)
    for (let i = start; i <= middle; i++) {
      let res = end + 1
      let low = middle + 1
      let high = end
      while (low <= high) {
        let mid = (low + high) >> 1
        if (nums[mid] >= origin[i]) {
          res = mid
          high = mid - 1
        } else {
          low = mid + 1
        }
      }
      result[i] += res - middle - 1
    }
    merge(nums, start, middle, end)
  }

  function merge(nums: number[], start: number, middle: number, end: number) {
    let i = start,
      j = middle + 1
    for (let k = start; k <= end; k++) {
      aux[k] = nums[k]
    }

    for (let k = start; k <= end; k++) {
      if (i > middle) {
        nums[k] = aux[j++]
      } else if (j > end) {
        nums[k] = aux[i++]
      } else if (aux[i] < aux[j]) {
        nums[k] = aux[i++]
      } else {
        nums[k] = aux[j++]
      }
    }
  }
}
```

## DAY64: 生成括号

回溯，学习一下

关键点在于能用左右括号的条件

```ts
function generateParenthesis(n: number): string[] {
  const ret: string[] = []
  backTrace("", 0, 0)
  return ret
  function backTrace(current: string, left: number, right: number) {
    if (current.length === n * 2) {
      if (left === right) {
        ret.push(current)
      }
      return
    }
    if (left < n) {
      backTrace(current + "(", left + 1, right)
    }
    if (left > right) {
      backTrace(current + ")", left, right + 1)
    }
  }
}
```

## DAY65: 反转链表 II

这题还是很有意思的，主要是反转之后的细节处理

```ts
function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (!head.next || left === right) {
    return head
  }
  let leftP = head,
    rightP = head
  let step = right - left
  while (step) {
    rightP = rightP.next
    step--
  }
  let pre = null
  while (left - 1) {
    pre = leftP
    leftP = leftP.next
    rightP = rightP.next
    left--
  }
  const last = rightP.next
  rightP.next = null
  // do reverse
  let prev = null
  let current = leftP
  while (current) {
    let next = current.next
    current.next = prev
    prev = current
    current = next
  }
  // 分四种情况
  // 1.left right 在中间
  // 2.left 在头 right 在中间
  // 3.left 在中间 right 在尾
  // 4.left 在头 right在尾
  let ret = null
  if (last !== null && leftP !== head) {
    leftP.next = last
    pre.next = rightP
    ret = head
  } else if (leftP === head && last !== null) {
    leftP.next = last
    ret = rightP
  } else if (leftP !== head && last === null) {
    pre.next = rightP
    ret = head
  } else {
    ret = rightP
  }
  return ret
}
```

## DAY66：经典大数相乘

```ts
// lc 43
function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") {
    return "0"
  }
  const num1Array = num1.split("").reverse()
  const num2Array = num2.split("").reverse()
  let ret = new Array(num1.length + num2.length).fill(0)
  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      ret[i + j] += parseInt(num1Array[i]) * parseInt(num2Array[j])
      ret[i + j + 1] += Math.floor(ret[i + j] / 10)
      ret[i + j] %= 10
    }
  }
  // 去除前置0
  ret = ret.reverse()
  let index = 0
  while (ret[index] === 0) {
    index++
  }
  return ret.join("").slice(index)
}
```
