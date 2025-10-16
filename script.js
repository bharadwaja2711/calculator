let num1 = 3;
let operator = '+';
let num2 = 5;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    if(operator === '+') {
        return add(num1, num2);
    } else if(operator === '-') {
        return subtract(num1, num2);
    } else if(operator === '*') {
        return multiply(num1, num2);
    } else if(operator === '/') {
        return divide(num1, num2);
    } else {
        return "Invalid operator";
    }
}

console.log(operate('+', 4, 5));
console.log(operate('-', 10, 4));
console.log(operate('*', 18, 8));
console.log(operate('/', 64, 8));
console.log(operate('$', 12, 6));

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    const value = button.textContent;

    if(!isNaN(value)) {
        button.addEventListener('click', () => {
            display.value += value;
        });
    }

    if(value === 'clear') {
        button.addEventListener('click', () => {
            display.value = "";
        });
    }
});
