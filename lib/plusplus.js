var Plus = function () {};

Plus.VERSION = require("../package.json").version;

var has = Object.prototype.hasOwnProperty;
Plus.has = function (obj, key) {
  return has.call(obj, key);
};

Plus.isFunction = function (val) {
  return typeof val === 'function';
};

Plus.each = function (obj, iterator) {
  if (Array.isArray(obj)) {
    obj.forEach(iterator);
  } else {
    for (var key in obj) {
      if (has.call(obj, key)) {
        iterator(obj[key], key);
      }
    }
  }
};

/**
 * 将一个对象集合转化为二维表格，第一行为key，后续为每个对象的数据
 *  [
 *    {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
 *    {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
 *  ];
 * =>
 *  [
 *    ["username", "nick", "hometown"],
 *    ["JacksonTian", "朴灵", "Chongqing"],
 *    ["Fengmk2", "苏千", "Guangzhou"]
 *  ]
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
 * tablify的反向工程，第一列取出作为key，后续当作数据
 *  [
 *    ["username", "nick", "hometown"],
 *    ["JacksonTian", "朴灵", "Chongqing"],
 *    ["Fengmk2", "苏千", "Guangzhou"]
 *  ]
 * =>
 *  [
 *    {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
 *    {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
 *  ];
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

/**
 * 取出对象的值，以数组的方式返回
 * [0, 1, 2, 3, 4, 5] => [0, 1, 2, 3, 4, 5]
 * {key1: 0, key2: 1, key3: 2, key4: 3, key5: 4, key6: 5}
 * =>
 * [0, 1, 2, 3, 4, 5]
 */
Plus.values = function (obj) {
  var ret = [];
  Plus.each(obj, function (val, key) {
    ret.push(val);
  });
  return ret;
};

Plus.groupBy = function (list, val) {
  var result = {};
  var iterator = Plus.isFunction(val) ? val : function (item) {
    return item[val];
  };
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
  // 目标key不在时，不做任何处理
  if (Plus.has(obj, field)) {
    obj[to] = obj[field];
    delete obj[field];
  }
  return obj;
};

/**
 * 返回一个由对象的指定字段列表组成的新对象
 *  {
 *    "username": "JacksonTian",
 *    "password": "I am password ^_^",
 *    "_csrf": "you know."
 *  };
 *  =>
 *  {
 *    username: 'JacksonTian',
 *    password: 'I am password ^_^'
 *  };
 */
Plus.pick = function (obj, fields) {
  var ret = {};
  Plus.each(fields, function (field, index) {
    if (Plus.has(obj, field)) {
      ret[field] = obj[field];
    }
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
Plus.column = Plus.pluck = function (table, column) {
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

Plus.without = function (arr1, arr2) {
  var ret = [];

  for (var i = 0, l = arr1.length; i < l; i++) {
    var item = arr1[i];
    if (arr2.indexOf(item) === -1) {
      ret.push(item);
    }
  }

  return ret;
};

/**
 * 将一个数组变成一个对象，从数组元素中指定一个key作为新对象的key
 * @param {Array} arr 数组对象
 * @example
 * [{id: "id1"}, {id: "id2"}, {id: "id3"}] => {id1: {id: "id1"}, id2: {id: "id2"}, id3: {id: "id3"}};
 */
Plus.objectify = function (arr, key) {
  if (!Array.isArray(arr)) {
    return {};
  }
  var obj = {};
  arr.forEach(function (item, index) {
    if (!Plus.has(item, key)) {
      return;
    }
    var type = typeof item[key];
    if (type === 'string' || type === 'number') {
      obj[item[key]] = item;
    }
  });
  return obj;
};

/**
 * 从稀疏二维表中，从上到下，从左到右取出前K个元素作为一个新的数组
 */
Plus.top = function (list, k) {
  if (k < 1) {
    return [];
  }
  var ret = [];
  var columnIndex = 0;
  var n = list.length;
  while (n > 0) {
    for (var rowIndex = 0, rows = list.length; rowIndex < rows; rowIndex++) {
      var row = list[rowIndex];
      if (columnIndex < row.length) {
        ret.push(row[columnIndex]);
        if (ret.length === k) {
          return ret;
        }
      } else {
        n--;
      }
    }
    columnIndex++;
  }
  return ret;
};

/**
 * 从数组中取出较小的N个值，得出新数组中的元素顺序与原数组保持一致
 * @param {Array} arr 数组
 * @param {Number} k 前N个值
 * @param {String} by 按字段取值
 */
Plus.lessN = function (arr, n, by) {
  var len = arr.length;
  // 数组长度不够，直接返回
  if (len <= n) {
    return arr;
  } else {
    var arr2 = arr.slice(0);
    arr2.sort(function (a, b) {
      if (by) {
        return a[by] - b[by];
      } else {
        return a - b;
      }
    });
    // 找出中断值
    var inter = by ? arr2[n - 1][by] : arr2[n - 1];
    var ret = [];
    for (var j = 0; j < len; j++) {
      var val = by ? arr[j][by] : arr[j];
      if (val <= inter) {
        ret.push(arr[j]);
        if (ret.length === n) {
          break;
        }
      }
    }
    return ret;
  }
};

/**
 * 从数组中取出较小的N个值，得出新数组中的元素顺序与原数组保持一致
 * @param {Array} arr 数组
 * @param {Number} k 前N个值
 * @param {String} by 按字段取值
 */
Plus.greatN = function (arr, n, by) {
  var len = arr.length;
  // 数组长度不够，直接返回
  if (len <= n) {
    return arr;
  } else {
    var arr2 = arr.slice(0);
    arr2.sort(function (a, b) {
      if (by) {
        return b[by] - a[by];
      } else {
        return b - a;
      }
    });
    // 找出中断值
    var inter = by ? arr2[n - 1][by] : arr2[n - 1];
    var ret = [];
    for (var j = 0; j < len; j++) {
      var val = by ? arr[j][by] : arr[j];
      if (val >= inter) {
        ret.push(arr[j]);
        if (ret.length === n) {
          break;
        }
      }
    }
    return ret;
  }
};

module.exports = Plus;
