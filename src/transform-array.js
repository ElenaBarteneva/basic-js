const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */

const controlSequences = [
  "--discard-next", // excludes the next element of the array from the transformed array.
  "--discard-prev", // excludes the previous element of the array from the transformed array.
  "--double-next", // duplicates the next element of the array in the transformed array.
  "--double-prev", // duplicates the previous element of the array in the transformed array.
];

function transform(arr) {
  if (!(arr instanceof Array)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const arrCopy = arr.slice();
  const transformedArray = [];
  let index = 0;

  arrCopy.forEach((element) => {
    if (element && element !== "discarded") {
      if (controlSequences.includes(element)) {
        switch (element) {
          case "--discard-next":
            arrCopy[index + 1] = "discarded";
            break;
          case "--discard-prev":
            if (arrCopy[index - 1] !== "discarded") {
              transformedArray.pop();
            }
            break;
          case "--double-next":
            if (arrCopy[index + 1]) {
              transformedArray.push(arrCopy[index + 1]);
            }
            break;
          case "--double-prev":
            if (transformedArray[index - 1]) {
              transformedArray.push(transformedArray[index - 1]);
            }
            break;
        }
      } else {
        transformedArray.push(element);
      }
    }
    index += 1;
  });

  return transformedArray;
}



module.exports = {
  transform
};
