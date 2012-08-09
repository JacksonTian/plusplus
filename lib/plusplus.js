var Plus = function () {};

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

Plus.groupBy = function (obj, val) {
  var result = {};
  var iterator = Plus.isFunction(val) ? val : function (item) { return item[val]; };
  for (var i = 0, l = obj.length; i < l; i++) {
    var item = obj[item];
    var key = iterator(item, index);
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
Plus.columns = function (obj, fields) {
  var ret = {};
  Plus.each(fields, function (field, index) {
    ret[field] = obj[field];
  });
  return ret;
};

module.exports = Plus;
