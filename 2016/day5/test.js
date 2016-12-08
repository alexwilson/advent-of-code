const os = require('os')
const main = require('./main.js')
const assert = require('assert')

// assert.strictEqual(main.generatePasswordPartOne('abc', 8), '18f47a30')
assert.strictEqual(main.generatePasswordPartTwo('abc', 8), '05ace8e3')

