const path = require('path');
const fs = require('fs');

// Load and parse the input.
const loadFile = _ => fs.readFileSync(path.resolve(__dirname, "./input.txt")).toString().split(', ');

function main() {
    console.log(loadFile().join('-'));
}

main();