const main = require('./main.js')
const assert = require('assert')
const os = require('os')

const easter = 
`eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`.split(os.EOL)

assert.strictEqual(main.decode(main.rowsToColumns(easter), main.mostFrequentSort), 'easter');
assert.strictEqual(main.decode(main.rowsToColumns(easter), main.leastFrequentSort), 'advent');