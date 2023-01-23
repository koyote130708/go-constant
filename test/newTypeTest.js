/* global AssertionError */
"use strict";

var assert = require("chai").assert;

var newType = require("../src/newType");

suite("newType", function () {

    var Color = newType("Color", ["hex"]);

    var RED = new Color("#FF0000");
    var BLUE = Color("#0000FF");

    var Day = newType("Day", ["dayOfWeek", "name"], {
        valueOf: "dayOfWeek"
    });

    var MONDAY = new Day(1, "Monday");
    var TUESDAY = Day(2, "Tuesday");


    var Month = newType("Month", ["monthOfYear", "name", "shortName"], {
        valueOf: function () {
            return this.monthOfYear;
        },
        validate: function (monthOfYear, name, shortName) {
            if (!(monthOfYear >= 1 && monthOfYear <= 12)) {
                throw RangeError();
            }
            return [Number(monthOfYear), String(name), String(shortName)];
        },
        saveInstances: true
    });

    var JAN = new Month(1, "January", "Jan");
    var FEB = Month(2, "February", "Feb");


    test("instances", function () {
        assert.deepEqual(Color.instances, undefined);
        assert.deepEqual(Day.instances, undefined);
        assert.deepEqual(Month.instances, [JAN, FEB]);
    });


    test("constructor name", function () {
        assert.equal(Color.name, "Color");
        assert.equal(Day.name, "Day");
        assert.equal(Month.name, "Month");
    });


    test("equal instances", function () {
        assert.deepEqual(new Color("#FFF"), Color("#FFF"));
        assert.deepEqual(new Day(5, "Friday"), Day(5, "Friday"));
    });


    test("without new operator", function () {
        assert.equal(Color(RED), RED);
        assert.equal(Color(BLUE), BLUE);
        assert.equal(Day(MONDAY), MONDAY);
        assert.equal(Day(TUESDAY), TUESDAY);
        assert.equal(Month(JAN), JAN);
        assert.equal(Month(FEB), FEB);
    });


    test("validated constructor params", function () {
        var m = Month("1", 2, true);

        assert.equal(m.monthOfYear, 1);
        assert.equal(m.name, "2");
        assert.equal(m.shortName, "true");

        assert.throw(function () {
            Month(0);
        }, RangeError);

        assert.throw(function () {
            Month(13);
        }, RangeError);
    });


    test("props", function () {
        assert.equal(RED.hex, "#FF0000");
        assert.equal(BLUE.hex, "#0000FF");

        assert.equal(MONDAY.dayOfWeek, 1);
        assert.equal(MONDAY.name, "Monday");
        assert.equal(TUESDAY.dayOfWeek, 2);
        assert.equal(TUESDAY.name, "Tuesday");

        assert.equal(JAN.monthOfYear, 1);
        assert.equal(JAN.name, "January");
        assert.equal(JAN.shortName, "Jan");
        assert.equal(FEB.monthOfYear, 2);
        assert.equal(FEB.name, "February");
        assert.equal(FEB.shortName, "Feb");
    });


    test("unmodifiable props", function () {
        assert.throw(function () {
            RED.hex = "";
        }, TypeError);

        assert.throw(function () {
            BLUE.hex = "";
        }, TypeError);

        assert.throw(function () {
            MONDAY.dayOfWeek = 0;
        }, TypeError);

        assert.throw(function () {
            MONDAY.name = "";
        }, TypeError);

        assert.throw(function () {
            TUESDAY.dayOfWeek = 0;
        }, TypeError);

        assert.throw(function () {
            TUESDAY.name = "";
        }, TypeError);

        assert.throw(function () {
            JAN.monthOfYear = 0;
        }, TypeError);

        assert.throw(function () {
            JAN.shortName = "";
        }, TypeError);

        assert.throw(function () {
            FEB.monthOfYear = 3;
        }, TypeError);

        assert.throw(function () {
            FEB.shortName = "";
        }, TypeError);

        assert.throw(function () {
            Object.defineProperty(RED, "hex", {
                writable: true,
                value: ""
            });
        }, TypeError);

        assert.throw(function () {
            Object.defineProperty(BLUE, "hex", {
                writable: true,
                value: ""
            });
        }, TypeError);

        assert.throw(function () {
            Object.defineProperty(MONDAY, "dayOfWeek", {
                writable: true,
                value: 0
            });
        }, TypeError);

        assert.throw(function () {
            Object.defineProperty(TUESDAY, "dayOfWeek", {
                writable: true,
                value: 0
            });
        }, TypeError);

        assert.throw(function () {
            Object.defineProperty(JAN, "shortName", {
                writable: true,
                value: ""
            });
        }, TypeError);

        assert.throw(function () {
            Object.defineProperty(FEB, "shortName", {
                writable: true,
                value: ""
            });
        }, TypeError);

    });


    test("enumerable props", function () {
        var keys1 = Object.keys(RED);
        assert.equal(keys1.length, 1);
        assert(keys1.includes("hex"));

        var keys2 = Object.keys(TUESDAY);
        assert.equal(keys2.length, 2);
        assert(keys2.includes("dayOfWeek"));
        assert(keys2.includes("name"));

        var keys3 = Object.keys(FEB);
        assert.equal(keys3.length, 3);
        assert(keys3.includes("monthOfYear"));
        assert(keys3.includes("name"));
        assert(keys3.includes("shortName"));
    });


    test("valueOf", function () {
        assert.equal(MONDAY.valueOf(), 1);
        assert.equal(TUESDAY.valueOf(), 2);

        assert.equal(JAN.valueOf(), 1);
        assert.equal(FEB.valueOf(), 2);
    });


    test("unmodifiable instances prop", function () {
        assert.throw(function () {
            Month.instances = [];
        }, TypeError);
    });


    test("odd names", function () {
        assert.equal(newType(1).name, "1");
        assert.equal(newType("1foo").name, "1foo");
    });


    test("exceptions", function () {
        assert.throw(function () {
            newType("Foo", ["name"], {
                validate: true
            });
        }, TypeError);
    });

});