(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Constant"] = factory();
	else
		root["Constant"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var newType = __webpack_require__(2);

/**
 * Creates a wrapper object which has constant value and name properties.
 * @param {*} value The value of the constant.
 * @param {string} name The name of the constant.
 * @example 
 * const RED = Constant("#FF0000", "Red");
 * 
 * console.log(RED.value);          // => "#FF0000"
 * console.log(RED.valueOf());      // => "#FF0000"
 * console.log(RED.name);           // => "Red"
 * @since 1.0.0
 */
var Constant = newType("Constant", ["value", "name"], {
    validate: function (value, name) {
        return [value, name != null ? String(name) : null];
    },
    valueOf: "value"
});


Constant.newType = newType;

module.exports = Constant;


/***/ }),
/* 2 */
/***/ ((module) => {

/**
 * Creates a new constant type constructor.
 * @param {string} name The name of the constructor.
 * @param {string[]} propNames The names of the constructor parameters which will be constant properties.
 * @param {Object} [options] Constructor options.
 * @param {function} [options.validate] The constructor parameter validator.
 * @param {(function|string)} [options.valueOf] The name of the property to return as the value of the instance or the function to use to return the value of the instance.
 * @param {boolean} [options.saveInstances] Whether to save instances or not. The instances are saved in an array, <code>{ConstantType}.instances</code>.
 * @return {function} The new constant type constructor.
 * @example
 * const Day = Constant.newType("Day", ["dayOfWeek", "name", "shortName"], { 
 *    valueOf: "dayOfWeek", 
 *    saveInstances: true 
 * });
 * 
 * const MONDAY = Day(1, "Monday", "Mon");
 * 
 * console.log(MONDAY.dayOfWeek);   // => 1
 * console.log(MONDAY.valueOf());   // => 1
 * console.log(MONDAY.name);        // => "Monday"
 * console.log(MONDAY.shortName);   // => "Mon"
 * console.log(Day.instances);      // [ Day { dayOfWeek: 1, name: "Monday", shortName: "Mon" } ]
 * @static
 * @since 1.1.0
 */
function newType(name, propNames, options) {
    if (options && options.validate != null && typeof options.validate !== "function") {
        throw new TypeError("Expected a function for validate, but found: ", options.validate);
    }


    var ConstantType = function (arg) {

        if (this instanceof ConstantType) {
            var args;

            if (options && options.validate != null) {
                args = options.validate.apply(this, arguments);
            }

            args = args === undefined ? arguments : args;


            if (propNames != null) {
                for (var i = 0; i < propNames.length; i++) {
                    Object.defineProperty(this, propNames[i], {
                        enumerable: true,
                        configurable: false,
                        writable: false,
                        value: args[i]
                    });
                }
            }

            if (options && options.saveInstances) {
                ConstantType.instances.push(this);
            }

        } else {
            if (arg instanceof ConstantType) {
                return arg;
            }
            return new ConstantType(...arguments);
        }
    };

    if (options && options.saveInstances) {
        Object.defineProperty(ConstantType, "instances", {
            enumerable: true,
            configurable: false,
            writable: false,
            value: []
        });
    }

    if (options) {
        if (typeof options.valueOf === "string") {
            ConstantType.prototype.valueOf = function () {
                return this[options.valueOf];
            };
        } else if (typeof options.valueOf === "function") {
            ConstantType.prototype.valueOf = options.valueOf;
        }
    }


    if (name != null) {
        Object.defineProperty(ConstantType, "name", {
            configurable: false,
            writable: false,
            value: name
        });
    }

    return ConstantType;
}


module.exports = newType;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});