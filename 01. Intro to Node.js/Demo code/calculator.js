const sum = (a, b) => a + b;

const multiply = function (a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}


// default export
const calculator = {
    sum,
    multiply,
    subtract
};

module.exports = calculator;