PlusPlus
================
# 项目目的
补充一些常用方法，这类方法通常不被`ECMAScript5`直接提供，也不被`Underscore`提供，却是我们经常需要写的代码，作者饱受代码量之苦，决定写作这样一个模块，这包括对数组的操作，对对象的操作等。

# 文档
## API说明
本模块采用的API接口保持与Underscore一致。由于本模块仅为Node专门写就，淘汰部分原生就支持的API，不再继续提供，其中部分由于在Node环境中存在问题，也给予淘汰，并给出正确的方案。  
斜体的方法，则是来自于PlusPlus的原创。

## API
### VERSION
返回PlusPlus的版本号

### forEach -> each(obj, iterator)
如果obj是数组，直接调用forEach。如果是对象，通过`for in`的方式调用，并判断`hasOwnProperty`，防止到原型链上查找。  
迭代器接受三个参数`[value, index, object]`。

### ~~collect -> map~~ -> Array.prototype.map
PlusPlus不重复提供此API

### ~~inject -> foldl -> reduce~~ -> Array.prototype.reduce
PlusPlus不重复提供此API

### ~~foldr -> reduceRight~~ -> Array.prototype.reduceRight
PlusPlus不重复提供此API

### detect -> find

### ~~select -> filter~~ -> Array.prototype.filter
PlusPlus不重复提供此API

### reject

### ~~all -> every~~ -> Array.prototype.every
PlusPlus不重复提供此API

### ~~any -> some~~ -> Array.prototype.some
PlusPlus不重复提供此API

### contains -> include

### invoke

### pluck

### max

### min

### shuffle

### ~~sortBy~~ -> Array.prototype.sort

### groupBy(obj, key)
分组数据。key可以传入一个迭代器，也可以传入一个索引值。

### sortedIndex

### toArray

### size

### take -> head -> first

### initial

### last

### tail

### rest

### compact

### flatten

### without

### uniq -> unique

### union

### intersect

### intersection

### difference

### zip

### ~~indexOf~~ -> Array.prototype.indexOf

### lastIndexOf
### range

### ~~bind~~ -> Function.bind

### bindAll

### ~~memoize~~
不推荐在Node中无限制使用。

### ~~delay~~ -> setTimeout
Node对参数支持良好，无需实现delay方法。

### defer
### throttle
### debounce
### once
### wrap
### compose
### after
### ~~keys~~ -> Object.keys

### values(obj)
返回由对象的所有值（不包括原型链上）组成的数组。

### methods
### functions
### extend
### pick
### defaults
### clone
### tap
### isEqual
### isEmpty
### isElement
### ~~isArray~~ -> Array.isArray
PlusPlus不重复提供此API

### isObject
### isArguments

### isFunction(val)
返回对象是否function。

### isString

### isNumber

### isFinite

### isNaN
### isBoolean
### isDate
### isRegExp
### isNull
### isUndefined
### has
### ~~noConflict~~
后端环境无需提供此函数

### identity
### times
### escape
### result
### mixin
### uniqueId

### ~~templateSettings~~
不推荐使用。

### ~~template~~
不推荐使用，Node中有更强大的模板引擎，Underscore的该方法也不便于调试。

### chain

### _rename(obj, from, to)_
重命名一个对象的字段。多用于数据矫正。

```
var obj = {"from": "I am value"};
plus.rename(obj, "from", "to");
// obj = {"to": "I am value"};
```

### _columns(obj, fields)_
返回一个对象指定字段构成的新对象，多用于过滤传入数据。

```
// req.query = {
//  "username": "Jackson",
//  "password": "I am password",
//  "_": "random string for no cache."
// };
var obj = plus.columns(req.query, ["username", "password"]);
// obj = {
//  "username": "Jackson",
//  "password": "I am password"
// };
```
搭配`Array.prototype.map`，可以对一个数组进行数据抽取。

### _tablify(list)_
将一个对象集合转化为二维表格。也许你为了节省网络传输的带宽而选择这么做。

```
var list = [
    {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
    {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
];
plus.tablify(list);
//[
//  ["username", "nick", "hometown"],
//  ["JacksonTian", "朴灵", "Chongqing"],
//  ["Fengmk2", "苏千", "Guangzhou"]
//]
```
### _collectionify(table)_
tablify的反向工程。为了代码的调用更舒适，多半你喜欢将二维表还原。  

```
var table = [
  ["username", "nick", "hometown"],
  ["JacksonTian", "朴灵", "Chongqing"],
  ["Fengmk2", "苏千", "Guangzhou"]
];

plus.collectionify(list);
//[
//  {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
//  {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
//];
```