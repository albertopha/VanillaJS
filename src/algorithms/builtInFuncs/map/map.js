Array.prototype.mapp = function(callback) {
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    const iterationResult = callback(this[i], i, this);
    result[i] = iterationResult;
  }
  return result;
};

// Test cases
const arr1 = [1,2,3,4,5];
console.log(arr1.mapp((elem, index, list) => elem*5));
console.log([].mapp((elem, index, list) => elem));

