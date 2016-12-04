const loadFile = require('../../util/js/loadFile').default
const os = require('os')

// Load and parse the input.

const loadData = _ => loadFile().split(os.EOL)

// A nice "normal" kaypad...
const partOneKeypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

// Define a few helpers to make this grid look prettier.
const X = undefined
const A = 'A'
const B = 'B'
const C = 'C'
const D = 'D'

// Part two has the world's most awkward keypad!
const partTwoKeypad = [
    [X, X, 1, X, X],
    [X, 2, 3, 4, X],
    [5, 6, 7, 8, 9],
    [X, A, B, C, X],
    [X, X, D, X, X]
]

// Determines the coordinates from a board.
function findCoordinatesInBoard(board, value) {
    let x = 0;
    let y = 0;

    board.forEach((row, index) => {
        const valIndex = row.indexOf(value)
        if (valIndex !== -1) {
            x = index
            y = valIndex
        }
    })

    return [x, y]
}

// Utilise a switch to alter and test coordinates, and then return the next value.
function moveBoardPositionByInstruction(board, currentPosition, instruction) {
    let [x, y] = currentPosition
    let nextKey = null
    switch (instruction) {

        // We cannot go to row that doesn't exist, or to a non-existent cell.
        case 'U':
            nextKey = x-1
            x = (board[nextKey] !== undefined && board[nextKey][y] !== undefined) ? nextKey : x
            break

        // We cannot go to row that doesn't exist, or to a non-existent cell.
        case 'D':
            nextKey = x+1
            x = (board[nextKey] !== undefined && board[nextKey][y] !== undefined) ? nextKey : x
            break

        // We cannot go to cell that doesn't exist in the current row.
        case 'L':
            nextKey = y-1
            y = (board[x][y-1] !== undefined) ? y-1 : y
            break

        // We cannot go to cell that doesn't exist in the current row.
        case 'R':
            nextKey = y+1
            y = (board[x][nextKey] !== undefined) ? nextKey : y
            break
    }
    return [x, y]
}

// Function for use inside a reduce, returns the new board position.
function traverseKeypad(currentPosition, instruction) {
    const keypad = this
    const newPosition = moveBoardPositionByInstruction(keypad, currentPosition, instruction)
    return newPosition
}

// Solve the damn thing!
function solve(data, keypad, start) {
    const keypadTraversal = traverseKeypad.bind(keypad)
    const keyPresses = []
    let currentPosition = findCoordinatesInBoard(keypad, start)

    data = data.map(_ => _.split(''))

    for (row in data) {
        currentPosition = data[row].reduce(keypadTraversal, currentPosition)
        keyPresses.push(currentPosition)
    }

    // Trace path by process of reduction.
    return keyPresses
        // Resolve to the final number.
        .map(res => keypad[res[0]][res[1]])
        .join('')
}

// Binds the part 1 keypad to traverseKeypad.
function solvePartOne(data) {
    return solve(data, partOneKeypad, 5)
}

// Binds the part 2 keypad to traverseKeypad.
function solvePartTwo(data) {
    return solve(data, partTwoKeypad, 5)
}

function main() {
    const data = loadData()
    console.info(`Answer to part 1 is: ${solvePartOne(data)}`)
    console.info(`Answer to part 2 is: ${solvePartTwo(data)}`)
}

module.exports = { solvePartOne, solvePartTwo }

main()
