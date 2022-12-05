/* global AssertionError */
"use strict";

var assert = require("chai").assert;

var Constant = require("../src/Constant");

suite("Level", function () {

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


        test("immutability", function () {
            assert.equal(level.value, 1);
            assert.equal(level.name, "foo");

            try {
                level.value = 2;
            } catch (err) {
            }

            assert.equal(level.value, 1);


            try {
                level.name = "bar";
            } catch (err) {
            }

            assert.equal(level.name, "foo");
        });


        test("enumerability", function () {
            var json = JSON.parse(JSON.stringify(level));

            assert.equal(json.value, 1);
            assert.equal(json.name, "foo");
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


});