# Go Constant

**A wrapper object with unmodifiable value and name properties.**

![codecov.io Code Coverage](https://img.shields.io/badge/coverage-100%25-green.svg)
[![jsdoc](https://img.shields.io/badge/docs-100%25-green.svg)](https://github.com/koyote130708/go-constant#documentation)
[![donation](https://img.shields.io/badge/donate-blue.svg)](https://www.paypal.com/donate/?business=T7Q29NNMZVW98\&no_recurring=0\&item_name=Your+support+will+help+us++continue+our+work+and+improve+the+quality+of+our+products.+Thank+you!\&currency_code=USD)

*   **version**: 1.0.0
*   **license**: GNU LGPLv3

<br />

## Installation

```javascript
npm i go-constant
```

or

```javascript
yarn add go-constant
```

<br />

## Usage

### ES6

```javascript
import Constant from 'go-constant'

const SIZE = {
	SMALL: Constant(3, "Small"),
	MEDIUM: Constant(5, "Medium")
};

 
let item = { size: 6 };

let message;

if (item.size > SIZE.MEDIUM) {
	message = "Item is too big!;
}

console.log(message); // => Item is too big!

```

### Node

```javascript
const Constant = require('go-constant');

const SIZE = {
	SMALL: Constant(3, "Small"),
	MEDIUM: Constant(5, "Medium")
};

 
let item = { size: 6 };

let message;

if (item.size > SIZE.MEDIUM) {
	message = "Item is too big!;
}

console.log(message); // => Item is too big!
```

### Web browser

```javascript
<script src="dist/go-constant.min.js"></script>
<script>
	const SIZE = {
		SMALL: Constant(3, "Small"),
		MEDIUM: Constant(5, "Medium")
	};

	 
	let item = { size: 6 };

	let message;

	if (item.size > SIZE.MEDIUM) {
		message = "Item is too big!;
	}

	console.log(message); // => Item is too big!
</script>

```

<br />

## Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [Constant](#constant)
    *   [Parameters](#parameters)

### Constant

Creates a wrapper object which has unmodifiable value and name properties.

#### Parameters

*   `value` **any** The value of the constant.
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the constant.

**Meta**

*   **since**: 1.0.0
