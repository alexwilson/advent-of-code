const os = require('os')
const main = require('./main.js')
const assert = require('assert')

const roomNames = [
    'aaaaa-bbb-z-y-x-123[abxyz]',
    'a-b-c-d-e-f-g-h-987[abcde]',
    'not-a-real-room-404[oarel]',
    'totally-real-room-200[decoy]',
]

assert.strictEqual(main.isValidRoom(roomNames[0]), true)
assert.strictEqual(main.isValidRoom(roomNames[1]), true)
assert.strictEqual(main.isValidRoom(roomNames[2]), true)
assert.strictEqual(main.isValidRoom(roomNames[3]), false)

assert.strictEqual(main.sumOfSectors([roomNames[0], roomNames[1], roomNames[2]]), 1514)

assert.strictEqual(main.shiftCipher('hello world', 13), 'uryyb jbeyq')
assert.strictEqual(main.shiftCipher('hello world', 26), 'hello world')

assert.strictEqual(main.decodeRoomName('qzmt-zixmtkozy-ivhz-343[asdf]'), 'very encrypted name')