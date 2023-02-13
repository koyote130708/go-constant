var newType = require("./newType");

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
