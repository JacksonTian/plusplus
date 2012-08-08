var Underscore = function () {};

var hasOwnProperty = Object.prototype.hasOwnProperty;

Underscore.isFunction = function (val) {
  return typeof val === 'function';
};

Underscore.values = function (obj) {
  var ret = [];
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      ret.push(obj[key]);
    }
  }
};

Underscore.groupBy = function (obj, val) {
  var result = {};
  var iterator = Underscore.isFunction(val) ? val : function (item) { return item[val]; };
  for (var i = 0, l = obj.length; i < l; i++) {
    var item = obj[item];
    var key = iterator(item, index);
    (result[key] || (result[key] = [])).push(item);
  }
  return result;
};

module.exports = Underscore;