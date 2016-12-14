const loadFile = require('../../util/js/loadFile').default
const os = require('os')

// Load and parse the input.
const loadData = _ => loadFile().split(os.EOL)

// Quick 'n dirty palindrome detection algorithm
function isPalindrome(string) {
    let left = 0
    let right = string.length-1

    while (left < right) {
        if (string[left] !== string[right]) {
            return false
        }
        left++
        right--
    }

    return true
}

// Wrapper around palindrome so that we have unique characters.
function isUniquePalindrome(string) {
    let start = 0
    while (start < Math.floor(string.length/2)) {
        if (string[start-1] !== undefined) {
            if (string[start] === string[start-1]) {
                return false
            }
        }
        start++
    }
    return isPalindrome(string)
}

// Iterate over a string in slices of four.
function containsFourLetterPalindrome(string) {
    const slice = 4
    const endingPosition = string.length - slice
    let startingPosition = 0
    while (startingPosition <= endingPosition) {
        if (isUniquePalindrome(string.substr(startingPosition, slice))) {
            return true
        }
        startingPosition++
    }
    return false
}

function supportsTls(ipAddress) {
    // Extract all hypernet addresses.
    const hypernets = ipAddress.match(/\[[a-z]+\]/gi).map(i => i.replace(/\[|\]/g, ''))

    // If any of these are palindromes, we can discount them.
    if (hypernets.filter(containsFourLetterPalindrome).length > 0) {
        return false
    }

    // Else if we have any OTHER palindromes, this is probably legit.
    return containsFourLetterPalindrome(ipAddress)
}

const totalIpsSupportingTls = data => data.filter(supportsTls).length

// Main function.
function main() {
    const data = loadData()
    console.info(`Answer to part 1, total is: ${totalIpsSupportingTls(data)}`)
}

main()

module.exports = { isPalindrome, isUniquePalindrome, containsFourLetterPalindrome, supportsTls }