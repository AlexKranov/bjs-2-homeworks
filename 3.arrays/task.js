function compareArrays(arr1, arr2) {
    let result = arr1.every((n, i) => n === arr2[i] && arr1.length === arr2.length);
    return result; // boolean
}
console.log(compareArrays([8, 9], [6]));
console.log(compareArrays([8, 9, 5, 4], [8, 9, 5, 4, 8, 3, 5]));
console.log(compareArrays([9, 2, 4, 8, 2], [9, 2, 4]));
console.log(compareArrays([1, 2, 3], [2, 3, 1]));
console.log(compareArrays([8, 1, 2], [8, 1, 2]));


function advancedFilter(arr) {
    let resultArr = arr.filter((i) => i > 0).filter((i) => i % 3 == 0).map((i) => i * 10);
    return resultArr; // array
}
console.log(advancedFilter([-1, 6, -9, 3]));
console.log(advancedFilter([-10, -21, 12, 123]));
console.log(advancedFilter([-1, -2]));