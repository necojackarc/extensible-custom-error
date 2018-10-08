# Extensible Custom Error

[![npm version](https://badge.fury.io/js/extensible-custom-error.svg)](https://badge.fury.io/js/extensible-custom-error)
[![Build Status](https://travis-ci.com/necojackarc/extensible-custom-error.svg?branch=master)](https://travis-ci.com/necojackarc/extensible-custom-error)
[![Coverage Status](https://coveralls.io/repos/github/necojackarc/extensible-custom-error/badge.svg?branch=master)](https://coveralls.io/github/necojackarc/extensible-custom-error?branch=master)

JavaScript extensible custom error that can take a message and/or an Error object

```js
class MyError extends ExtensibleCustomError {}

new MyError('message'); // Take a message
new MyError(error); // Take an error
new MyError('message', error); // Take a message and an error
```

## Contents

* [Features](#features)
  * [Define custom errors easily](#define-custom-errors-easily)
  * [Wrap errors without losing any data](#wrap-errors-without-losing-any-data)
* [Installation](#installation)
* [Usage](#usage)
  * [Define custom errors](#define-custom-errors)
  * [Instantiate custom errors](#instantiate-custom-errors)
* [Examples](#examples)
  * [Wrap an error](#wrap-an-error)
  * [Wrap an error while passing a new message](#wrap-an-error-while-passing-a-new-message)
* [Special Thanks](#special-thanks)
* [License](#license)

## Features

There are some pains around JavaScript error handling.
Two of them are:

1. Define custom errors easily
2. Wrap errors without losing any data

This `ExtensibleCustomError` class enables you to do both - you can define your custom errors easily and wrap errors with them while merging stack traces prettily.

### Define custom errors easily

To define custom errors in Vanilla JS, you need to set names and stack traces manually, but you no longer need to do that with `ExtensibleCustomError`.

```js
class MyError extends ExtensibleCustomError {}
```

### Wrap errors without losing any data

Built-in errors only take a message, so they can't wrap any errors, which means stack traces so far will be lost.
However, `ExtensibleCustomError` can take a message and/or an Error object while merging stack traces.

```js
catch (error) {
  throw new MyError(error);
}
```

```js
catch (error) {
  throw new MyError('message', error);
}
```

## Installation

Using npm:

```bash
$ npm install extensible-custom-error
```

Using Yarn:

```bash
$ yarn add extensible-custom-error
```

## Usage

### Define custom errors

```js
const ExtensibleCustomError = require('extensible-custom-error');

// That's it!
class MyError extends ExtensibleCustomError {}
```

```js
// Should you need to set custom properties
class MyErrorWithCustomProperty extends ExtensibleCustomError {
  constructor(...args) {
    // Ensure calling the super constructor
    super(...args);

    Object.defineProperty(this, 'customProperty', {
      configurable: true,
      enumerable : false,
      value : 'I am the Bone of my Sword',
      writable : true,
    });
  }
}
```

N.B. With an uglifier, class names might get obsecure. See [this issue comment](https://github.com/bjyoungblood/es6-error/issues/31#issuecomment-301128220).

### Instantiate custom errors

You can instantiate your custom errors in the same way as built-in errors.

```js
// Throw it as usual!
throw new MyError('Steel is my Body and Fire is my Blood');
```

```js
try {
  // Do something that may cause errors
} catch (error) {
  // Pass an error instance, then stack traces will be merged
  throw new MyError(error);
}
```

```js
try {
  // Do something that may cause errors
} catch (error) {
  // Pass a message and an error instance, then stack traces will be merged
  throw new MyError('I have created over a Thousand Blades', error);
}
```

## Examples

### Wrap an error

If you run:

```js
const ExtensibleCustomError = require('extensible-custom-error');

class MyError extends ExtensibleCustomError {}

function throwBuiltinError() {
  throw new Error('Unknown to Death, Nor known to Life');
}

function wrapErrorWithMyError() {
  try {
    throwBuiltinError();
  } catch (error) {
    throw new MyError(error);
  }
}

function main() {
  try {
    wrapErrorWithMyError();
  } catch (error) {
    console.log(error);
  }
}

main();
```

you'll get:

```bash
MyError: Error: Unknown to Death, Nor known to Life
    at wrapErrorWithMyError (/home/necojackarc/custom_error.js:101:11)
Error: Unknown to Death, Nor known to Life
    at throwBuiltinError (/home/necojackarc/custom_error.js:94:9)
    at wrapErrorWithMyError (/home/necojackarc/custom_error.js:99:5)
    at main (/home/necojackarc/custom_error.js:107:5)
    at Object.<anonymous> (/home/necojackarc/custom_error.js:113:1)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
```

### Wrap an error while passing a new message

If you run:

```js
const ExtensibleCustomError = require('extensible-custom-error');

class MyError extends ExtensibleCustomError {}

function throwBuiltinError() {
  throw new Error('Have withstood Pain to create many Weapons');
}

function wrapErrorWithMyError() {
  try {
    throwBuiltinError();
  } catch (error) {
    throw new MyError('Unlimited Blade Works', error);
  }
}

function main() {
  try {
    wrapErrorWithMyError();
  } catch (error) {
    console.log(error);
  }
}

main();
```

you'll get:

```bash
MyError: Unlimited Blade Works
    at wrapErrorWithMyError (/home/necojackarc/custom_error.js:101:11)
Error: Have withstood Pain to create many Weapons
    at throwBuiltinError (/home/necojackarc/custom_error.js:94:9)
    at wrapErrorWithMyError (/home/necojackarc/custom_error.js:99:5)
    at main (/home/necojackarc/custom_error.js:107:5)
    at Object.<anonymous> (/home/necojackarc/custom_error.js:113:1)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
```

## Special Thanks

* [@yszk0123](https://github.com/yszk0123) as a reviewer
* [bjyoungblood/es6-error](https://github.com/bjyoungblood/es6-error) as a reference

## License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
