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

function main() {
    const data = loadData()
    console.info(`Answer to part 1 is: ${sumOfSectors(data.filter(isValidRoom))}`)
}

main()

module.exports = { isValidRoom, sumOfSectors }