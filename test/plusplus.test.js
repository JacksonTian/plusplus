var plus = require('../lib/plusplus');
var should = require('should');

describe("PlusPlus", function () {
  
  it("Tablify", function () {
    var list = [
        {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
        {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
    ];
    var ret = plus.tablify(list);
    var expect = [
     ["username", "nick", "hometown"],
     ["JacksonTian", "朴灵", "Chongqing"],
     ["Fengmk2", "苏千", "Guangzhou"]
    ];
    ret.should.eql(expect);
  });

  it("Collectionify", function () {
    var table = [
     ["username", "nick", "hometown"],
     ["JacksonTian", "朴灵", "Chongqing"],
     ["Fengmk2", "苏千", "Guangzhou"]
    ];
    var ret = plus.collectionify(table);
    var expect = [
        {"username": "JacksonTian", "nick": "朴灵", "hometown": "Chongqing"},
        {"username": "Fengmk2", "nick": "苏千", "hometown": "Guangzhou"}
    ];
    ret.should.eql(expect);
  });
  // TODO
});
