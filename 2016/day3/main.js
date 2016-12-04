const loadFile = require('../../util/js/loadFile').default
const os = require('os')

// Load and parse the input.
const loadData = _ => loadFile().split(os.EOL).map(val => {
    const res = /([0-9]+)\s+([0-9]+)\s+([0-9]+)/gi.exec(val)
    return [parseInt(res[1]), parseInt(res[2]), parseInt(res[3])]
})

// Filter function; returns true when given lengths of a "valid" triangle.
function isValidTriangle(sides) {
    // Copy the array ...
    let sorted = [].slice.call(sides)
    sorted = sorted.sort((a, b) => a - b)
    return (sorted[0] + sorted[1]) > sorted[2]
}

// Returns count of invalid triangles in a given collection. 
function findInvalidTriangles(data) {
    console.log(data[0])
    return data.filter(isValidTriangle).length
}

// Squash lists into one, ordered by column.
function squash(data) {
    const length = data[0].length
    const bufferedLists = []
    for (let i = 0; i < length; i++) {
        bufferedLists[i] = []
        data.forEach(row => bufferedLists[i].push(row[i]))
    }
    return [].concat.apply([], bufferedLists)
}

// Chunk arrays by a given size.
function chunk(list, size) {
    const newList = []
    while (list.length) {
        newList.push(list.splice(0, size))
    }
    return newList
}

function main() {
    const data = loadData()
    console.info(`Answer to part 1 is: ${findInvalidTriangles(data)}`)
    console.info(`Answer to part 2 is: ${findInvalidTriangles(chunk(squash(data), 3))}`)
}

main()
