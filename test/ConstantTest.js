/* global AssertionError */
"use strict";

var assert = require("chai").assert;

var Constant = require("../src/Constant");

suite("Constant", function () {

    suite("#constructor", function () {

        test("no arguments", function () {
            var level = new Constant();
            assert.equal(level.value, undefined);
            assert.equal(level.name, null);
        });


        test("value only", function () {
            var level = new Constant(1);
            assert.equal(level.value, 1);
            assert.equal(level.name, null);
        });


        var level = new Constant(1, "foo");

        test("value and name", function () {
            assert.equal(level.value, 1);
            assert.equal(level.name, "foo");
        });


        test("unmodifiable props", function () {
            assert.equal(level.value, 1);
            assert.equal(level.name, "foo");

            assert.throw(function () {
                level.value = 2;
            }, TypeError);

            assert.equal(level.value, 1);


            assert.throw(function () {
                level.name = "bar";
            }, TypeError);

            assert.equal(level.name, "foo");
        });


        test("enumerable props", function () {
            var keys = Object.keys(level);

            assert.equal(keys.length, 2);
            assert(keys.includes("value"));
            assert(keys.includes("name"));
        });


        test("without new operator", function () {
            var level = Constant(1, "foo");
            assert.equal(level.value, 1);
            assert.equal(level.name, "foo");

            assert.equal(level, Constant(level));
        });

    });


    suite("#valueOf", function () {

        test("undefined", function () {
            var level = new Constant();
            assert.equal(level.valueOf(), undefined);
        });

        test("number", function () {
            var level = new Constant(1);
            assert.equal(level.valueOf(), 1);
            assert(level == 1);
        });

        test("string", function () {
            var level = new Constant("a");
            assert.equal(level.valueOf(), "a");
            assert(level == "a");
        });
    });


    suite("#newType", function () {


    });


});