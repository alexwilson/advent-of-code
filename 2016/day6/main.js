const loadFile = require('../../util/js/loadFile').default
const os = require('os')

// Load and parse the input.
const loadData = _ => loadFile().split(os.EOL)

function rowsToColumns(data) {
    const totalColumns = data[0].length

    // Construct an empty mutable array to push values into.
    const emptyArray = Array.from([...Array(totalColumns).keys()]).map(_ => [])

    // Reduce list of rows, so we can push into collection of columns.
    return data.reduce((previous, current) => {
        current.split('').forEach((value, index) => {
            previous[index].push(value)
        })
        return previous
    }, emptyArray)
}

// Decode by finding the most common character.
function decode(data, sortFunction) {

    // Map over columns and return most frequent character.
    return data.map(value => {
        const histogram = {}
        value.forEach(letter => histogram[letter] = (histogram[letter] || 0) + 1)
        return Object.keys(histogram).sort(sortFunction.bind({ histogram: histogram })).pop()
    }).join('')
}

// Most frequent sort.
function mostFrequentSort (a, b) { return this.histogram[a] - this.histogram[b] }

// Least frequent sort.
function leastFrequentSort (a, b) { return this.histogram[b] - this.histogram[a] }

// Main function.
function main() {
    const data = loadData()
    console.info(`Answer to part 1, message is: ${decode(rowsToColumns(data), mostFrequentSort)}`)
    console.info(`Answer to part 2, message is: ${decode(rowsToColumns(data), leastFrequentSort)}`)
}

main()

module.exports = { decode, leastFrequentSort, mostFrequentSort, rowsToColumns }