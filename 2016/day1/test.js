const main = require('./main.js');
const assert = require('assert');

assert.strictEqual(main.calculateDistance(['R2', 'L3']), 5)
assert.strictEqual(main.calculateDistance(['R2', 'R2', 'R2']), 2)
assert.strictEqual(main.calculateDistance(['R5', 'L5', 'R5', 'R3']), 12)

assert.strictEqual(main.calculateDistance(['R1', 'R1', 'R1', 'R1']), 0)
assert.strictEqual(main.calculateDistance(['R1', 'R1', 'R1', 'R1', 'L2', 'R250']), 252)

assert.strictEqual(main.firstDuplicateLocation(['R8', 'R4', 'R4', 'R8']), 4)