const path = require('path');
const fs = require('fs');

// Load and parse the input.
const loadFile = _ => fs.readFileSync(path.resolve(__dirname, "./input.txt")).toString().split(', ')

function calculateDistanceDelta(data) {

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

    return delta;
}

function calculateDistance(data) {
    const delta = calculateDistanceDelta(data)
 
    // Subtract distance travelled South from North, and East from West.
    const totalDistance = Math.abs(delta[0] - delta[180]) + Math.abs(delta[90] - delta[270])
    return totalDistance
}

// Utilises the calculateDistanceDelta function to determine when we cross ourselves.
function firstDuplicateLocation(data) {

    // Utilise a Set as these allow us to easily query for a value. 
    const visited = new Set()
    let distance = 0

    try {
        data.reduce((path, instruction) => {

            const directionInstruction = instruction[0]
            const stepsInstruction = instruction.slice(1)

            // Build an array from each of the "steps" we must take.
            // Subtract, as we start at 0, use the spread operator to fill new array with numbered keys. 
            const arrayFromSteps = Array.from([...Array(stepsInstruction-1).keys()]) 

            arrayFromSteps.forEach(count => {
                // Call for the current distance delta.
                const subInstruction = `${directionInstruction}${count}`
                const delta = calculateDistanceDelta([...path, subInstruction])

                // Extract coordinates.
                const x = delta[0] - delta[180]
                const y = delta[90] - delta[270]

                const coordinates = `${x},${y}`

                // If exists in set, break out of the reduce!
                if (visited.has(coordinates)) {
                    throw new Error(Math.abs(x)+Math.abs(y))
                }

                // Push to Set.
                visited.add(coordinates)
            })

            // Push overarching path.
            path.push(instruction)

            return path
        }, [])
    } catch (e) {
        distance = parseInt(e.message)
    }

    return distance
}

function main() {
    const data = loadFile()
    console.info(`Part 1 - Total distance travelled: ${calculateDistance(data)}`)
    console.info(`Part 2 - First duplicate location is this far away: ${firstDuplicateLocation(data)}`)
}

module.exports = { calculateDistance, firstDuplicateLocation }

main()
