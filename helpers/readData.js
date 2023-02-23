const fs = require('fs');
const util = require('util');

const readData = util.promisify(fs.readFile);

module.exports = readData;