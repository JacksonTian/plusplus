var Plus = function () {};

Plus.VERSION = require("../package.json").version;

var hasOwnProperty = Object.prototype.hasOwnProperty;
Plus.has = function (obj, key) {
  return hasOwnProperty.call(obj, key);
};

Plus.isFunction = function (val) {
  return typeof val === 'function';
};

Plus.each = function (obj, iterator) {
  if (Array.isArray(obj)) {
    obj.forEach(iterator);
  } else {
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        iterator(obj[key], key);
      }
    }
  }
};

/**
 * 将一个对象集合转化为二维表格
 */
Plus.tablify = function (list) {
  if (!list.length) {
    return [];
  }
  var keys = Object.keys(list[0]);
  var ret = [keys];
  Plus.each(list, function (obj, index) {
    ret.push(Plus.values(obj));
  });
  return ret;
};

/**
 * tablify的反向工程
 */
Plus.collectionify = function (table) {
  var ret = [];
  if (table.length < 2) {
    return ret;
  }
  var keys = table[0];
  Plus.each(table.slice(1), function (row) {
    var obj = {};
    Plus.each(keys, function (key, index) {
      obj[key] = row[index];
    });
    ret.push(obj);
  });
  return ret;
};

Plus.values = function (obj) {
  var ret = [];
  Plus.each(obj, function (val, key) {
    ret.push(val);
  });
  return ret;
};

Plus.groupBy = function (list, val) {
  var result = {};
  var iterator = Plus.isFunction(val) ? val : function (item) { return item[val]; };
  for (var i = 0, l = list.length; i < l; i++) {
    var item = list[i];
    var key = iterator(item);
    (result[key] || (result[key] = [])).push(item);
  }
  return result;
};

/**
 * 重命名一个对象的字段
 */
Plus.rename = function (obj, field, to) {
  obj[to] = obj[field];
  delete obj[field];
  return obj;
};

/**
 * 返回一个由对象的指定字段列表组成的新对象
 */
Plus.pick = function (obj, fields) {
  var ret = {};
  Plus.each(fields, function (field, index) {
    ret[field] = obj[field];
  });
  return ret;
};

/**
 * 将数组平流化
 */
Plus.flatten = function (array, shallow) {
  return array.reduce(function (memo, val) {
    if (Array.isArray(val)) {
      return memo.concat(shallow ? Plus.flatten(val): val);
    }
    memo[memo.length] = val;
    return memo;
  }, []);
};

/**
 * 提取二维表的某列数据
 * @return 单列数据组成的数组
 */
Plus.column = function (table, column) {
  var ret = [];
  Plus.each(table, function (row, index) {
    ret.push(row[column]);
  });
  return ret;
};

/**
 * 提取二维表的某几列数据
 * @return 几列数据组成的二维表
 */
Plus.columns = function (table, columns) {
  columns = Plus.flatten(Array.prototype.slice.call(arguments, 1), true);
  var ret = [];
  Plus.each(table, function (row, index) {
    var _row = [];
    Plus.each(columns, function (cols) {
      _row.push(row[cols]);
    });
    ret.push(_row);
  });
  return ret;
};

module.exports = Plus;
