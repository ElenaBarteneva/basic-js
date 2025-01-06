const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  let myFiles = new Set();
  for (const value of names) {
      if (myFiles.has(value) != false) {
          let i = 1
          while (myFiles.has(`${value}(${i})`) != false) {
              i += 1
          }
          myFiles.add(`${value}(${i})`);
      } else {
          myFiles.add(value);
      }
  }
  return Array.from(myFiles);
}

module.exports = {
  renameFiles
};
