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

module.exports = Overscore;