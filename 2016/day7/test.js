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

assert.strictEqual(main.supportsTls('abba[mnop]qrst'), true) ? null : console.log('passed - abba[mnop]qrst supports tls')
assert.strictEqual(main.supportsTls('abcd[bddb]xyyx'), false) ? null : console.log('passed - abcd[bddb]xyyx does not support tls')
assert.strictEqual(main.supportsTls('aaaa[qwer]tyui'), false) ? null : console.log('passed - aaaa[qwer]tyui does not support tls')
assert.strictEqual(main.supportsTls('ioxxoj[asdfgh]zxcvbn'), true) ? null : console.log('passed - ioxxoj[asdfgh]zxcvbn supports tls')

assert.strictEqual(main.supportsSsl('aba[bab]xyz'), true) ? null : console.log('passed - aba[bab]xyz supports ssl')
assert.strictEqual(main.supportsSsl('xyx[xyx]xyx'), false) ? null : console.log('passed - xyx[xyx]xyx does not support ssl')
assert.strictEqual(main.supportsSsl('aaa[kek]eke'), true) ? null : console.log('passed - aaa[kek]eke supports ssl')
assert.strictEqual(main.supportsSsl('zazbz[bzb]cdb'), true) ? null : console.log('passed - zazbz[bzb]cdb supports ssl')