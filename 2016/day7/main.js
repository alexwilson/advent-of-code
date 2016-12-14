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

// Iterate over strings in slices of n
function containsPalindromeOfLength(string, length) {
    const endingPosition = string.length - length
    let startingPosition = 0
    while (startingPosition <= endingPosition) {
        if (isUniquePalindrome(string.substr(startingPosition, length))) {
            return true
        }
        startingPosition++
    }
    return false
}

// Slices of four.
const containsFourLetterPalindrome = string => containsPalindromeOfLength(string, 4)

// Slices of three.
const containsThreeLetterPalindrome = string => containsPalindromeOfLength(string, 3)


const hypernetRegex = /\[[a-z]+\]/gi
const extractSupernets = ipAddress => ipAddress.split(hypernetRegex)
const extractHypernets = ipAddress => ipAddress.match(hypernetRegex).map(i => i.replace(/\[|\]/g, ''))  

// Returns true if an IP address supports TLS.
function supportsTls(ipAddress) {
    // An IP address supports TLS if it has a hypernet containing a four letter palindrome.

    // If any of these are palindromes, we can discount them.
    if (extractHypernets(ipAddress).filter(containsFourLetterPalindrome).length > 0) {
        return false
    }

    // Else if we have any OTHER palindromes, this is probably legit.
    return containsFourLetterPalindrome(ipAddress)
}

// Total number of IP addresses supporting TLS.
const totalIpsSupportingTls = data => data.filter(supportsTls).length

// Returns true if an IP address supports SSL.
function supportsSsl(ipAddress) {
    // An IP address supports SSL if its supernets contain a three letter palindrome
    // and its hypernets contain the same palindrome, with the letters flipped.

    const supernetSequences = extractSupernets(ipAddress)
    const hypernetSequences = extractHypernets(ipAddress)
    const possibleSupernetSequences = supernetSequences.filter(containsThreeLetterPalindrome)
    const possibleHypernetSequences = hypernetSequences.filter(containsThreeLetterPalindrome) 

    // Weed out any obvious failures; we need at least two palindromes present.
    if (possibleSupernetSequences.length === 0 || possibleHypernetSequences.length === 0) {
        return false
    }

    // Iterate over all possible supernets, extract their palindromes.
    const flippedPalindromes = possibleSupernetSequences.reduce((array, current) => {
        const slice = 3
        const endPosition = current.length - slice
        let currentPosition = 0
        while (currentPosition <= endPosition) {

            // If this is a valid 3-letter-unique-palindrome, push it to our array.
            const potentialPalindrome = current.substr(currentPosition, slice) 
            if (isUniquePalindrome(potentialPalindrome)) {
                array.push(potentialPalindrome)
            }
            currentPosition++
        }
        return array
    }, []).map(string => `${string[1]}${string[0]}${string[1]}`)

    // If any of the flipped palindromes we've found are contained within the hypernets...
    const isValidSsl = possibleHypernetSequences
        .filter(sequence => flippedPalindromes.filter(palindrome => sequence.indexOf(palindrome) !== -1).length !== 0)
        .length !== 0

    return isValidSsl
}

// Total number of IP addresses supporting SSL.
const totalIpsSupportingSsl = data => data.filter(supportsSsl).length

// Main function.
function main() {
    const data = loadData()
    console.info(`Answer to part 1, total IPs supporting TLS is: ${totalIpsSupportingTls(data)}`)
    console.info(`Answer to part 2, total IPs supporting SSL is: ${totalIpsSupportingSsl(data)}`)
}

main()

module.exports = { isPalindrome, isUniquePalindrome, containsFourLetterPalindrome, supportsTls, supportsSsl }