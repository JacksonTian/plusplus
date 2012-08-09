var Overscore = function () {};

var hasOwnProperty = Object.prototype.hasOwnProperty;

Overscore.isFunction = function (val) {
  return typeof val === 'function';
};

Overscore.each = function (obj, iterator) {
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

Overscore.values = function (obj) {
  var ret = [];
  Overscore.each(obj, function (val, key) {
    ret.push(val);
  });
  return ret;
};

Overscore.groupBy = function (obj, val) {
  var result = {};
  var iterator = Overscore.isFunction(val) ? val : function (item) { return item[val]; };
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
Overscore.rename = function (obj, field, to) {
  obj[to] = obj[field];
  delete obj[field];
  return obj;
};

/**
 * 返回一个由对象的指定字段列表组成的新对象
 */
Overscore.columns = function (obj, fields) {
  var ret = {};
  Overscore.each(fields, function (field, index) {
    ret[field] = obj[field];
  });
  return ret;
};

module.exports = Overscore;
