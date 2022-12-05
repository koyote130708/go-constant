
/**
 * Creates a wrapper object which has unmodifiable value and name properties.
 * @param {*} value The value of the constant.
 * @param {string} name The name of the constant.
 * @since 1.0.0
 */
function Constant(value, name) {
    if (this instanceof Constant) {
        Object.defineProperty(this, 'value', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: value
        });

        Object.defineProperty(this, 'name', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: name != null ? String(name) : null
        });

    } else {
        if (value instanceof Constant) {
            return value;
        }
        return new Constant(value, name);
    }
}

Object.assign(Constant.prototype, {
    valueOf: function () {
        return this.value;
    }
});


module.exports = Constant;