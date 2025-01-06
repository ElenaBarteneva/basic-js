const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} members names of the members 
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  let count = [];
  if (Array.isArray(members)) {
  for (let name of members) {
    if (typeof name === "string"){
      let br = name.trim();
      count.push(br[0].toUpperCase());
      }
    }
    count.sort();
    let result = count.join('');
    return result;
  }
  else {
    return false;
  }
}

module.exports = {
  createDreamTeam
};
