const loadFile = require('../../util/js/loadFile').default
const os = require('os')

// Load and parse the input.
const loadData = _ => loadFile().split(os.EOL)

// Filter function; returns true for a valid sector name.
function isValidRoom(roomName) {
    const metadata = parseRoomName(roomName)
    const metadataSplit = metadata.name.replace(/-/g, '').split('')

    // Count letters so we can sort.
    const lettercount = metadataSplit.reduce((previous, current) => {
        if (previous[current] === undefined) {
            previous[current] = 0
        }
        previous[current]++
        return previous
    }, {})

    // Sort primarily by letter-count, and then in alphabetic order.
    const sortedSet = new Set(
        metadataSplit
            .sort((a, b) => {
                if (lettercount[a] < lettercount[b]) return 1
                if (lettercount[a] > lettercount[b]) return -1
                if (a > b) return 1
                return -1
            })
    )

    // Generate checksum based on the sorted set.
    const roomNameChecksum = [...sortedSet].slice(0, 5).join('')

    return roomNameChecksum === metadata.checksum
}

// Sums up sectors.
const sumOfSectors = (sectors) => sectors.reduce((previous, current) => previous + parseRoomName(current).sectorId, 0)

// Parses a room-name so that we may reason about it in a consistent manner.
function parseRoomName(roomName) {
    const regex = /([a-zA-Z\-]+)\-([0-9]+)\[(\w+)\]/gi.exec(roomName)
    return {
        name: regex[1], 
        sectorId: parseInt(regex[2]),
        checksum: regex[3]
    }
}

// Quick/dirty implementation of a shift cipher...
// Converts to lower-case values, converts to unicode, subtracts lower bound (96 - the unicode char for lowercase A)
// determines the modulo of the result to ensure we don't exceed the alphabet, then converts back to ASCII by adding on the lower bound (96).
// TODO - Maybe adapt this to work with uppercase values?
function shiftCipher(string, rotate) {
    const normalisedRotationLength = rotate % 26
    const lowerBoundCharCode = 'a'.charCodeAt(0)
    return string.toLowerCase().replace(
        /[a-z]/g,
        char => String.fromCharCode(lowerBoundCharCode + (char.charCodeAt(0) - lowerBoundCharCode + normalisedRotationLength) % 26)
    )
}

// Decodes a room name so we may search through it.
function decodeRoomName(roomName) {
    const room = parseRoomName(roomName)
    return shiftCipher(room.name, room.sectorId).replace(/-/g, ' ')
}

// Perform a filter to find "northpole object storage", and then return its Sector ID.
const findNorthPoleObjects = (rooms) => parseRoomName(rooms.filter(room => decodeRoomName(room).match(/northpole object storage/))).sectorId

// Filter out invalid rooms, useful for saving time!
const allValidRooms = (rooms) => rooms.filter(isValidRoom) 

function main() {
    const data = loadData()
    console.info(`Answer to part 1, sum of sector IDs is: ${sumOfSectors(allValidRooms(data))}`)
    console.info(`Answer to part 2, "NorthPole Object Storage" Sector ID is: ${findNorthPoleObjects(allValidRooms(data))}`)
}

main()

module.exports = { isValidRoom, sumOfSectors, decodeRoomName, shiftCipher }