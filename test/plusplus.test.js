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

  describe("groupBy", function () {
    it("rename", function () {
      var obj = {"from": "I am value."};
      plus.rename(obj, "from", "to").should.be.eql({"to": "I am value."});
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
    it("column", function () {
      var arr = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9]
      ];
      plus.column(arr, 0).should.be.eql([0, 5]);
      plus.column(arr, -1).should.be.eql([undefined, undefined]);
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
  
});
