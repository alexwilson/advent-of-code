const main = require('./main.js')
const assert = require('assert')
const os = require('os')


assert.strictEqual(main.isPalindrome('eye'), true) ? null : console.info('2016 day7: passed eye')
assert.strictEqual(main.isPalindrome('gggg'), true) ? null : console.log('2016 day7: passed anna')
assert.strictEqual(main.isPalindrome('anna'), true) ? null : console.log('2016 day7: passed anna')
assert.strictEqual(main.isPalindrome('asdf'), false) ? null : console.log('2016 day7: passed asdf')

assert.strictEqual(main.isUniquePalindrome('abba'), true) ? null : console.info('2016 day7: passed abba')
assert.strictEqual(main.isUniquePalindrome('aaaa'), false) ? null : console.info('2016 day7: passed aaaa')

assert.strictEqual(main.containsFourLetterPalindrome('asdfabbaasdf'), true) ? null : console.log('2016 day7: passed abba')
assert.strictEqual(main.containsFourLetterPalindrome('fasdfasdfasd'), false) ? null : console.log('2016 day7: passed asdf')

assert.strictEqual(main.supportsTls('abba[mnop]qrst'), true) ? null : console.log('2016 day7: passed - abba[mnop]qrst supports tls')
assert.strictEqual(main.supportsTls('abcd[bddb]xyyx'), false) ? null : console.log('2016 day7: passed - abcd[bddb]xyyx does not support tls')
assert.strictEqual(main.supportsTls('aaaa[qwer]tyui'), false) ? null : console.log('2016 day7: passed - aaaa[qwer]tyui does not support tls')
assert.strictEqual(main.supportsTls('ioxxoj[asdfgh]zxcvbn'), true) ? null : console.log('2016 day7: passed - ioxxoj[asdfgh]zxcvbn supports tls')

assert.strictEqual(main.supportsSsl('aba[bab]xyz'), true) ? null : console.log('2016 day7: passed - aba[bab]xyz supports ssl')
assert.strictEqual(main.supportsSsl('xyx[xyx]xyx'), false) ? null : console.log('2016 day7: passed - xyx[xyx]xyx does not support ssl')
assert.strictEqual(main.supportsSsl('aaa[kek]eke'), true) ? null : console.log('2016 day7: passed - aaa[kek]eke supports ssl')
assert.strictEqual(main.supportsSsl('zazbz[bzb]cdb'), true) ? null : console.log('2016 day7: passed - zazbz[bzb]cdb supports ssl')