let num1 = '';
let num2 = '';
let operator = '';
let result = '';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handle clear
        if (value === 'clear') {
            num1 = '';
            num2 = '';
            operator = '';
            display.value = '';
            return;
        }

        // Handle numbers
        if (!isNaN(value)) {
            if (operator === '') {
                num1 += value; // still entering first number
            } else {
                num2 += value; // now entering second number
            }
            display.value += value;
            return;
        }

        // Handle operators (+, -, *, /)
        if (['+', '-', '*', '/'].includes(value)) {
            if (num1 === '') return; // can't have operator before number
            if (operator !== '' && num2 !== '') {
                // If user chains operations (e.g. 5 + 3 + 2)
                num1 = operate(operator, +num1, +num2).toString();
                num2 = '';
            }
            operator = value;
            display.value += value;
            return;
        }

        // Handle equals (=)
        if (value === '=') {
            if (num1 !== '' && operator !== '' && num2 !== '') {
                result = operate(operator, +num1, +num2);
                display.value = result;
                // reset for next operation
                num1 = result.toString();
                num2 = '';
                operator = '';
            }
        }
    });
});

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error' : a / b; }

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return 'Invalid';
    }
}
