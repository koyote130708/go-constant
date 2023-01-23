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