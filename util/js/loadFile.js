const path = require('path')
const fs = require('fs')

// Load and parse the input.
const loadFile = _ => fs.readFileSync(path.resolve("./input.txt")).toString()

module.exports.default = loadFile;