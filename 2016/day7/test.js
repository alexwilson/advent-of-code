const main = require('./main.js')
const assert = require('assert')
const os = require('os')


assert.strictEqual(main.isPalindrome('eye'), true) ? null : console.info('passed eye')
assert.strictEqual(main.isPalindrome('gggg'), true) ? null : console.log('passed anna')
assert.strictEqual(main.isPalindrome('anna'), true) ? null : console.log('passed anna')
assert.strictEqual(main.isPalindrome('asdf'), false) ? null : console.log('passed asdf')

assert.strictEqual(main.isUniquePalindrome('abba'), true) ? null : console.info('passed abba')
assert.strictEqual(main.isUniquePalindrome('aaaa'), false) ? null : console.info('passed aaaa')

assert.strictEqual(main.containsFourLetterPalindrome('asdfabbaasdf'), true) ? null : console.log('passed abba')
assert.strictEqual(main.containsFourLetterPalindrome('fasdfasdfasd'), false) ? null : console.log('passed asdf')

assert.strictEqual(main.supportsTls('abba[mnop]qrst'), true) ? null : console.log('passed abba[mnop]qrst')
assert.strictEqual(main.supportsTls('abcd[bddb]xyyx'), false) ? null : console.log('passed abcd[bddb]xyyx')
assert.strictEqual(main.supportsTls('aaaa[qwer]tyui'), false) ? null : console.log('passed aaaa[qwer]tyui')
assert.strictEqual(main.supportsTls('ioxxoj[asdfgh]zxcvbn'), true) ? null : console.log('passed ioxxoj[asdfgh]zxcvbn')