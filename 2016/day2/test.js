const os = require('os')
const main = require('./main.js')
const assert = require('assert')

const testInstructions =
`ULL
RRDDD
LURDL
UUUUD`.split(os.EOL)

assert.strictEqual(main.solvePartOne(testInstructions), '1985')
assert.strictEqual(main.solvePartTwo(testInstructions), '5DB3')