const loadFile = require('../../util/js/loadFile').default
const crypto = require('crypto')
const os = require('os')

// Load and parse the input.
const loadData = _ => loadFile()

// Helper function to make generating an md5 hash way less painful.
const generateHash = (val) => crypto.createHash('md5').update(val).digest('hex')

// GUI interface in visual basic to track the killer's IP address
const guiInVisualBasic = (ipAddress, length, replaceLine) => console.log(`${replaceLine ? '\033[1A\r':''}Password: ${ipAddress.join('')}`)

// Hack the planet!
// Refactored this to use a generator, as it allows me to maintain state in an iterator.
function *bruteforceHash (string) {
    let counter = 0;
    // Increment counter...
    while (true) {
        const currentHash = generateHash(string+counter)
        counter++
        if (currentHash.indexOf('00000') === 0) {
            yield currentHash
        }
    }
}

// Generate password for part one, relies on the stateful nature of the Bruteforce method.
function generatePasswordPartOne(data, desiredLength) {
    const password = []
    guiInVisualBasic(password, desiredLength, false)

    for (hash of bruteforceHash(data)) {
        password.push(hash[5])
        guiInVisualBasic(password, desiredLength, true)

        // Break out of the loop if we've achieved our desired length...
        if (password.length >= desiredLength) {
            break
        }
    }
    return password.join('')
}

// Generate password for part two, relies on the stateful nature of the Bruteforce method.
function generatePasswordPartTwo(data, desiredLength) {
    const password = Array.from([...Array(desiredLength).keys()]).map(_ => '_')
    guiInVisualBasic(password, desiredLength, false)

    for (hash of bruteforceHash(data)) {

        // The generator will return for every "valid" hash, our rules are a little different ...
        if (password[hash[5]] === '_') {
            password[hash[5]] = hash[6]
            guiInVisualBasic(password, desiredLength, true)

            // Break out of the loop if we've achieved the desired length
            if (password.filter(l => l !== '_').length >= desiredLength) {
                break
            }
        }
    }
    return password.join('')
}

function main() {
    const data = loadData()
    console.info(`Answer to part 1, the correct password is: ${generatePasswordPartOne(data, 8)}`)
    console.info(`Answer to part 2, the correct password is: ${generatePasswordPartTwo(data, 8)}`)
}

main()

module.exports = { generatePasswordPartOne, generatePasswordPartTwo }