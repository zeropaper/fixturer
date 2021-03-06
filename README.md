fixturer
========

A small module to generate fixtures

## Installation

The project is not yet in the npm registry but you can install it as follow
```sh
npm install --save-dev zeropaper/fixturer
```

## Usage

Can be used as a tool-belt
```js
var fixturer = require('fixturer');
var randomInterger = fixturer.random(3, 10);
```
or with a JSON definition.
```js
var json = {
    "id": "<%= uuid() %>",
    "name": {
        "first": "<%= personeName(true, false, false) %>",
        "last": "<%= personeName(false, true, false) %>",
        "middle": "<%= personeName(false, false, true) %>"
    }
};

fixturer(json);
```

It should be possible to use it in a browser.. but... I didn't test it.


## Methods

### loremIpsum
Generate a random text

### random

### randomItem

### randomString

### randomDate

### evilScript

### evilLink

### personName
Person name generation

__Params__

 *  {bool} first      - if strictly `false`, no first name part
 *  {bool} last       - if strictly `false`, no last name part
 *  {bool} middle     - if truthy, adds a middle name part
 *  {string} gender   - can be 'male', 'female', random if not defined
                        (I know it's a bit limited)

### thingName
Thing name generation

__Params__

 *  {int} count       - the number of words used

## License
The MIT License (MIT)