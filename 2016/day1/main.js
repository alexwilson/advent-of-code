const path = require('path');
const fs = require('fs');

// Load and parse the input.
const loadFile = _ => fs.readFileSync(path.resolve(__dirname, "./input.txt")).toString().split(', ')

function calculateDistance(data) {

    // 360 degrees in a circle.
    const circle = 360;

    // path finder struct.
    const pathFinder = {

        // Distance walked in each given direction.
        delta: {
            0: 0,
            90: 0,
            180: 0, 
            270: 0
        },

        // Direction facing.
        facing: 0
    }

    // Ensure that our directions wrap around a circle.
    const wrapDirection = newDirection => (newDirection < 0) ? circle + newDirection : newDirection % circle

    // From a given direction, apply an instruction to receive a new direction.
    const newDirection = (currentDirection, instruction) => wrapDirection(currentDirection + newDirectionDelta(instruction))
    const newDirectionDelta = directionInstruction => directionInstruction === 'L' ? -90 : 90

    // Walk over input with pathfinder, to reduce to a delta.
    const delta = data.reduce((pathFinder, instruction) => {

        // Direction faced is stateful, we need to preserve this in order to turn.
        pathFinder.facing = newDirection(pathFinder.facing, instruction[0])

        // Delta is incremental, we add on the current distance.
        pathFinder.delta[pathFinder.facing] += parseInt(instruction.slice(1))
        return pathFinder

    }, pathFinder).delta

    // Subtract distance travelled South from North, and East from West.
    const totalDistance = Math.abs(delta[0] - delta[180]) + Math.abs(delta[90] - delta[270])
    return totalDistance
}

function main() {
    console.info(`Total distance travelled: ${calculateDistance(loadFile())}`)
}

module.exports = { calculateDistance }

main()