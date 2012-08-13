var plus = require('../lib/plusplus');
var should = require('should');

describe("PlusPlus", function () {
  it("VERSION", function () {
    plus.VERSION.should.equal(require('../package.json').version);
  });

  it("has", function () {
    var Person = function () {
      this.username = "JacksonTian";
    };
    Person.prototype.hello = "World!";
    var jackson = new Person();
    plus.has(jackson, "username").should.be.true;
    plus.has(jackson, "hello").should.be.false;
    jackson.hasOwnProperty = function () {
      return true;
    };
    plus.has(jackson, "username").should.be.true;
    plus.has(jackson, "hello").should.be.false;
    plus.has(jackson, "inexsit").should.be.false;
  });

  it('isFunction', function () {
    plus.isFunction(function () {}).should.be.true;
    plus.isFunction({}).should.be.false;
    plus.isFunction(true).should.be.false;
    plus.isFunction(1).should.be.false;
    plus.isFunction(undefined).should.be.false;
  });

  it('each for Array', function () {
    var arr = [0, 1, 2, 3, 4, 5];
    var counter = 0;
    plus.each(arr, function (val, index) {
      counter += val;
    });
    counter.should.be.equal(15);
  });

  it('each for Object', function () {
    var obj = {key1: 0, key2: 1, key3: 2, key4: 3, key5: 4, key6: 5};
    var counter = 0;
    plus.each(obj, function (val, key) {
      counter += val;
    });
    counter.should.be.equal(15);
    var Map = function () {
      this.key0 = 0;
      this.key1 = 1;
      this.key2 = 2;
      this.key3 = 3;
      this.key4 = 4;
    };
    Map.prototype.key5 = 5;
    counter = 0;
    plus.each(new Map(), function (val, key) {
      counter += val;
    });
    counter.should.be.equal(10);
  });

  it("tablify", function () {
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

  it("collectionify", function () {
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
  
  it("values for Array", function () {
    var arr = [0, 1, 2, 3, 4, 5];
    plus.values(arr).should.eql([0, 1, 2, 3, 4, 5]);
  });

  it("values for Object", function () {
    var obj = {key1: 0, key2: 1, key3: 2, key4: 3, key5: 4, key6: 5};
    plus.values(obj).should.eql([0, 1, 2, 3, 4, 5]);
  });

  it("groupBy", function () {
    var list = [
      {"username": "JacksonTian", "nick": "朴灵", "location": "Hangzhou"},
      {"username": "Fengmk2", "nick": "苏千", "location": "Hangzhou"},
      {"username": "xibei", "nick": "玄澄", "location": "Beijing"}
    ];

    var expect = {
      Hangzhou: [
        { username: 'JacksonTian', nick: '朴灵', location: 'Hangzhou' },
        { username: 'Fengmk2', nick: '苏千', location: 'Hangzhou' }
      ],
      Beijing: [
        { username: 'xibei', nick: '玄澄', location: 'Beijing' }
      ]
    };
    plus.groupBy(list, "location").should.be.eql(expect);
  });

  it("rename", function () {
    var obj = {"from": "I am value."};
    plus.rename(obj, "from", "to").should.be.eql({"to": "I am value."});
  });

  it("pick", function () {
    var obj = {
      "username": "JacksonTian",
      "password": "I am password ^_^",
      "_csrf": "you know."
    };
    var expect = {
      username: 'JacksonTian',
      password: 'I am password ^_^'
    };
    plus.pick(obj, ["username", "password"]).should.be.eql(expect);
  });

  it("flatten", function () {
    var arr = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9]
    ];
    plus.flatten(arr).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var arr2 = [
      [0, [1, 2], 3, 4],
      [5, 6, 7, 8, 9]
    ];
    plus.flatten(arr2).should.be.eql([0, [1, 2], 3, 4, 5, 6, 7, 8, 9]);
    var arr3 = [
      [0, [1, 2], 3, 4],
      [5, 6, 7, 8, 9]
    ];
    plus.flatten(arr3, true).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("column", function () {
    var arr = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9]
    ];
    plus.column(arr, 0).should.be.eql([0, 5]);
    plus.column(arr, -1).should.be.eql([undefined, undefined]);
  });

  it("columns", function () {
    var arr = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9]
    ];
    plus.columns(arr, [0, 1]).should.be.eql([[0, 1], [5, 6]]);
    plus.columns(arr, 0, 1).should.be.eql([[0, 1], [5, 6]]);
    plus.columns(arr, [0], 1).should.be.eql([[0, 1], [5, 6]]);
  });
});
