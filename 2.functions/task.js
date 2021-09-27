// Задание 1
function getArrayParams(arr) {
    let min = Infinity,
        max = -Infinity,
        sum = 0,
        avg;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
        sum += arr[i];
        avg = +(sum / arr.length).toFixed(2);
    }

    return { min: min, max: max, avg: avg };
}

// Задание 2
function worker(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return +sum;
}

function makeWork(arrOfArr, func) {
    let max = -Infinity;
    for (let i = 0; i < arrOfArr.length; i++) {
        let result = func(arrOfArr[i]);
        if (max < result) {
            max = result;
        }
    }
    return max
}

// Задание 3
function worker2(arr) {
    let difference = getArrayParams(arr);
    return Math.abs(difference.max - difference.min);
}