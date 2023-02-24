const fs = require('fs');
const util = require('util');

/**
 *  Function to read file given a destination
 *  @param {string} destination The file you want to read
 *  @returns {string} Returns all text on the file in a string (must be parsed back to json)
 */
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to
 *  @param {object} content The content you want to write to the file
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) => 
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    if(err){
      console.error(err);
    }
  });

/**
 *  Function to read data from a given a file and append some content
 *  @param {string} file The path to the file you want to save to
 *  @param {object} content The content you want to append to the file
 *  @returns {void} Nothing
 */
const readAndAppend = (file, content) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

/**
 *  Function to read data from a given a file and delete some content
 *  @param {string} file The path to the file you want to delete from
 *  @param {string} id The id of the Object you want to remove from the file
 *  @returns {boolean} Returns true or false if an item has been found and removed
 */
const readAndDelete = (file, id) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        for(var i = 0; i < parsedData.length; i++){
            if(parsedData[i].id === id){
                parsedData.splice(i, 1);
                writeToFile(file, parsedData);
                return false
            }
        }
        return false;
    }
    });
  };

module.exports = { 
  readFromFile, 
  writeToFile, 
  readAndAppend, 
  readAndDelete 
};