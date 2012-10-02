var plus = require('../lib/plusplus');
var should = require('should');

describe("PlusPlus", function () {
  describe("VERSION", function () {
    it("VERSION", function () {
      plus.VERSION.should.equal(require('../package.json').version);
    });
  });

  describe("has", function () {
    it("has", function () {
      var Person = function () {
        this.username = "JacksonTian";
      };
      Person.prototype.hello = "World!";
      var jackson = new Person();
      plus.has(jackson, "username").should.be.equal(true);
      plus.has(jackson, "hello").should.be.equal(false);
      jackson.hasOwnProperty = function () {
        return true;
      };
      plus.has(jackson, "username").should.be.equal(true);
      plus.has(jackson, "hello").should.be.equal(false);
      plus.has(jackson, "inexsit").should.be.equal(false);
    });
  });

  describe("isFunction", function () {
    it('isFunction', function () {
      plus.isFunction(function () {}).should.be.equal(true);
      plus.isFunction({}).should.be.equal(false);
      plus.isFunction(true).should.be.equal(false);
      plus.isFunction(1).should.be.equal(false);
      plus.isFunction(undefined).should.be.equal(false);
    });
  });
  
  describe("each", function () {
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
  });

  describe("tablify", function () {
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
  });

  describe("collectionify", function () {
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
  });

  describe("values", function () {
    it("values for Array", function () {
      var arr = [0, 1, 2, 3, 4, 5];
      plus.values(arr).should.eql([0, 1, 2, 3, 4, 5]);
    });

    it("values for Object", function () {
      var obj = {key1: 0, key2: 1, key3: 2, key4: 3, key5: 4, key6: 5};
      plus.values(obj).should.eql([0, 1, 2, 3, 4, 5]);
    });
  });

  describe("groupBy", function () {
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
  });

  describe("rename", function () {
    it("rename", function () {
      var obj = {"from": "I am value."};
      plus.rename(obj, "from", "to").should.be.eql({"to": "I am value."});
    });

    it("rename when key is inexsit", function () {
      var obj = {};
      plus.rename(obj, "from", "to").should.be.eql({});
    });
  });

  describe("pick", function () {
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
  });

  describe("flatten", function () {
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
  });

  describe("column", function () {
    it("column for matrix", function () {
      var arr = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9]
      ];
      plus.column(arr, 0).should.be.eql([0, 5]);
      plus.column(arr, -1).should.be.eql([undefined, undefined]);
    });
  });

  describe("pluck", function () {
    it("pluck", function () {
      var list = [
        {"username": "JacksonTian", "nick": "朴灵", "location": "Hangzhou"},
        {"username": "Fengmk2", "nick": "苏千", "location": "Hangzhou"},
        {"username": "xibei", "nick": "玄澄", "location": "Beijing"}
      ];
      plus.pluck(list, "username").should.be.eql(['JacksonTian', 'Fengmk2', 'xibei']);
      plus.pluck(list, "inexsit").should.be.eql([undefined, undefined, undefined]);
    });
  });

  describe("columns", function () {
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

  describe("without", function () {
    it("without", function () {
      var arr1 = [1, 2, 3, 4, 5, 6];
      var arr2 = [4, 5, 6, 7, 8];
      plus.without(arr1, arr2).should.be.eql([1, 2, 3]);
    });
  });

  describe("objectify", function () {
    it("objectify", function () {
      var list = [
        {"username": "JacksonTian", "nick": "朴灵", "location": "Hangzhou"},
        {"username": "Fengmk2", "nick": "苏千", "location": "Hangzhou"},
        {"username": "xibei", "nick": "玄澄", "location": "Beijing"}
      ];

      var expect1 = {
        JacksonTian: { username: 'JacksonTian', nick: '朴灵', location: 'Hangzhou' },
        Fengmk2: { username: 'Fengmk2', nick: '苏千', location: 'Hangzhou' },
        xibei: { username: 'xibei', nick: '玄澄', location: 'Beijing' }
      };

      var expect2 = {
        Hangzhou: { username: 'Fengmk2', nick: '苏千', location: 'Hangzhou' },
        Beijing: { username: 'xibei', nick: '玄澄', location: 'Beijing' }
      };

      plus.objectify(list, "username").should.be.eql(expect1);
      plus.objectify(list, "location").should.be.eql(expect2);
    });

    it("objectify when arr isn't Array", function () {
      var list = "I am string";
      plus.objectify(list, "username").should.be.eql({});
    });
  });

  describe("top", function () {
    it("top", function () {
      var list = [
        [1],
        ["a", "b"],
        ["甲", "乙", "丙"],
        ["子", "丑", "寅", "卯"],
        ["一", "二", "三", "四", "五"]
      ];
      var expect1 = [1, "a", "甲", "子", "一"];
      var expect2 = [1, "a", "甲", "子", "一", "b"];
      var expect3 = [];
      var expect4 = [1, "a", "甲", "子", "一", "b", "乙"];
      plus.top(list, 5).should.be.eql(expect1);
      plus.top(list, 6).should.be.eql(expect2);
      plus.top(list, 0).should.be.eql(expect3);
      plus.top(list, 7).should.be.eql(expect4);

      var expect5 = [1, 'a', '甲', '子', '一', 'b', '乙', '丑', '二', '丙', '寅', '三', '卯', '四'];
      plus.top(list, 100).should.be.eql(expect5);
    });
  });

  describe("lessN", function () {
    it("lessN without field", function () {
      var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      plus.lessN(list, 15).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      plus.lessN(list, 10).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      plus.lessN(list, 9).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      plus.lessN(list, 8).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7]);
      plus.lessN(list, 5).should.be.eql([0, 1, 2, 3, 4]);
    });

    it("lessN without field when reserved", function () {
      var list = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
      plus.lessN(list, 15).should.be.eql([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
      plus.lessN(list, 10).should.be.eql([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
      plus.lessN(list, 9).should.be.eql([8, 7, 6, 5, 4, 3, 2, 1, 0]);
      plus.lessN(list, 8).should.be.eql([7, 6, 5, 4, 3, 2, 1, 0]);
      plus.lessN(list, 5).should.be.eql([4, 3, 2, 1, 0]);
    });

    it("lessN without field when mixed", function () {
      var list = [1, 4, 7, 8, 5, 2, 3, 6, 9, 0];
      plus.lessN(list, 15).should.be.eql([1, 4, 7, 8, 5, 2, 3, 6, 9, 0]);
      plus.lessN(list, 10).should.be.eql([1, 4, 7, 8, 5, 2, 3, 6, 9, 0]);
      plus.lessN(list, 9).should.be.eql([1, 4, 7, 8, 5, 2, 3, 6, 0]);
      plus.lessN(list, 8).should.be.eql([1, 4, 7, 5, 2, 3, 6, 0]);
      plus.lessN(list, 5).should.be.eql([1, 4, 2, 3, 0]);
    });

    it("lessN without field when same value", function () {
      var list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      plus.lessN(list, 15).should.be.eql([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      plus.lessN(list, 10).should.be.eql([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      plus.lessN(list, 9).should.be.eql([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      plus.lessN(list, 8).should.be.eql([1, 1, 1, 1, 1, 1, 1, 1]);
      plus.lessN(list, 5).should.be.eql([1, 1, 1, 1, 1]);
    });

    it("lessN with field", function () {
      var list = [
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9},
        {count: 90, score: 0}
      ];
      plus.lessN(list, 15, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9},
        {count: 90, score: 0}
      ]);
      plus.lessN(list, 10, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9},
        {count: 90, score: 0}
      ]);
      plus.lessN(list, 9, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 90, score: 0}
      ]);
      plus.lessN(list, 8, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 90, score: 0}
      ]);
      plus.lessN(list, 5, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 90, score: 0}
      ]);
    });

    it("lessN with field when same value", function () {
      var list = [
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1},
        {count: 90, score: 1}
      ];
      plus.lessN(list, 15, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1},
        {count: 90, score: 1}
      ]);
      plus.lessN(list, 10, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1},
        {count: 90, score: 1}
      ]);
      plus.lessN(list, 9, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1}
      ]);
      plus.lessN(list, 8, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1}
      ]);
      plus.lessN(list, 5, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1}
      ]);
    });
  });

  describe("greatN", function () {
    it("greatN without field", function () {
      var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      plus.greatN(list, 15).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      plus.greatN(list, 10).should.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      plus.greatN(list, 9).should.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      plus.greatN(list, 8).should.be.eql([2, 3, 4, 5, 6, 7, 8, 9]);
      plus.greatN(list, 5).should.be.eql([5, 6, 7, 8, 9]);
    });

    it("greatN without field when reserved", function () {
      var list = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
      plus.greatN(list, 15).should.be.eql([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
      plus.greatN(list, 10).should.be.eql([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
      plus.greatN(list, 9).should.be.eql([9, 8, 7, 6, 5, 4, 3, 2, 1]);
      plus.greatN(list, 8).should.be.eql([9, 8, 7, 6, 5, 4, 3, 2]);
      plus.greatN(list, 5).should.be.eql([9, 8, 7, 6, 5]);
    });

    it("greatN without field when mixed", function () {
      var list = [1, 4, 7, 8, 5, 2, 3, 6, 9, 0];
      plus.greatN(list, 15).should.be.eql([1, 4, 7, 8, 5, 2, 3, 6, 9, 0]);
      plus.greatN(list, 10).should.be.eql([1, 4, 7, 8, 5, 2, 3, 6, 9, 0]);
      plus.greatN(list, 9).should.be.eql([1, 4, 7, 8, 5, 2, 3, 6, 9]);
      plus.greatN(list, 8).should.be.eql([4, 7, 8, 5, 2, 3, 6, 9]);
      plus.greatN(list, 5).should.be.eql([7, 8, 5, 6, 9]);
    });

    it("greatN with field", function () {
      var list = [
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9},
        {count: 90, score: 0}
      ];
      plus.greatN(list, 15, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9},
        {count: 90, score: 0}
      ]);
      plus.greatN(list, 10, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9},
        {count: 90, score: 0}
      ]);
      plus.greatN(list, 9, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9}
      ]);
      plus.greatN(list, 8, "score").should.be.eql([
        {count: 98, score: 4},
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 94, score: 2},
        {count: 93, score: 3},
        {count: 92, score: 6},
        {count: 91, score: 9}
      ]);
      plus.greatN(list, 5, "score").should.be.eql([
        {count: 97, score: 7},
        {count: 96, score: 8},
        {count: 95, score: 5},
        {count: 92, score: 6},
        {count: 91, score: 9}
      ]);
    });

    it("greatN with field when same value", function () {
      var list = [
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1},
        {count: 90, score: 1}
      ];
      plus.greatN(list, 15, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1},
        {count: 90, score: 1}
      ]);
      plus.greatN(list, 10, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1},
        {count: 90, score: 1}
      ]);
      plus.greatN(list, 9, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1},
        {count: 91, score: 1}
      ]);
      plus.greatN(list, 8, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1},
        {count: 94, score: 1},
        {count: 93, score: 1},
        {count: 92, score: 1}
      ]);
      plus.greatN(list, 5, "score").should.be.eql([
        {count: 99, score: 1},
        {count: 98, score: 1},
        {count: 97, score: 1},
        {count: 96, score: 1},
        {count: 95, score: 1}
      ]);
    });
  });

  describe("listify", function () {
    it("listify", function () {
      var obj = {"key1": "value1", "key2": "value2", "key3": "value3"};
      var expect1 = [
        {mykey: "key1", myvalue: "value1"},
        {mykey: "key2", myvalue: "value2"},
        {mykey: "key3", myvalue: "value3"}
      ];
      var expect2 = [
        {mykey: "key1", value: "value1"},
        {mykey: "key2", value: "value2"},
        {mykey: "key3", value: "value3"}
      ];
      var expect3 = [
        {key: "key1", value: "value1"},
        {key: "key2", value: "value2"},
        {key: "key3", value: "value3"}
      ];
      plus.listify(obj, "mykey", "myvalue").should.be.eql(expect1);
      plus.listify(obj, "mykey").should.be.eql(expect2);
      plus.listify(obj).should.be.eql(expect3);
      plus.listify(obj, undefined, undefined).should.be.eql(expect3);
    });
  });

  describe("uniqueBy", function () {
    it("uniqueBy", function () {
      var list = [
        {key: "key1", value: "value1"},
        {key: "key2", value: "value2"},
        {key: "key3", value: "value3"},
        {key: "key1", value: "value4"}
      ];
      var expect1 = [
        {key: "key1", value: "value1"},
        {key: "key2", value: "value2"},
        {key: "key3", value: "value3"}
      ];
      var expect2 = [
        {key: "key1", value: "value1"},
        {key: "key2", value: "value2"},
        {key: "key3", value: "value3"},
        {key: "key1", value: "value4"}
      ];

      plus.uniqueBy(list, "key").should.be.eql(expect1);
      plus.uniqueBy(list, "value").should.be.eql(expect2);
    });
  });

  describe("unique", function () {
    it("unique", function () {
      var list = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
      var expect1 = [1, 2, 3, 4, 5, 6];
      plus.unique(list).should.be.eql(expect1);
    });
  });
});
