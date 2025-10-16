let num1 = '';
let num2 = '';
let operator = '';
let justCalculated = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const decimalButton = Array.from(buttons).find(b => b.textContent === '.');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Clear button
        if (value === 'clear') {
            num1 = '';
            num2 = '';
            operator = '';
            display.value = '';
            justCalculated = false;
            decimalButton.disabled = false; // enable decimal button again
            return;
        }

        // Number
        if (!isNaN(value)) {
            if (justCalculated) {
                // Start new calculation
                num1 = '';
                operator = '';
                num2 = '';
                display.value = '';
                justCalculated = false;
            }

            if (operator === '') {
                num1 += value;
            } else {
                num2 += value;
            }
            display.value += value;
            return;
        }

        // Decimal point
        if (value === '.') {
            if (operator === '') {
                // num1 decimal
                if (!num1.includes('.')) {
                    num1 += '.';
                    display.value += '.';
                }
            } else {
                // num2 decimal
                if (!num2.includes('.')) {
                    num2 += '.';
                    display.value += '.';
                }
            }
            return;
        }

        // Operator
        if (['+', '-', '*', '/'].includes(value)) {
            if (num1 === '') return;

            // Replace operator if consecutive pressed
            if (operator !== '' && num2 === '') {
                display.value = display.value.slice(0, -1);
                operator = value;
                display.value += value;
                return;
            }

            if (operator !== '' && num2 !== '') {
                let result = operate(operator, parseFloat(num1), parseFloat(num2));
                result = roundResult(result);
                display.value = result;
                num1 = result.toString();
                num2 = '';
            }

            operator = value;
            display.value += value;
            justCalculated = false;
            return;
        }

        // Equals
        if (value === '=') {
            if (num1 !== '' && operator !== '' && num2 !== '') {
                let result = operate(operator, parseFloat(num1), parseFloat(num2));
                result = roundResult(result);
                display.value = result;
                num1 = result.toString();
                num2 = '';
                operator = '';
                justCalculated = true;
            }
        }
    });
});

// Math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Ha! Can't divide by 0 😏" : a / b; }

function operate(op, a, b) {
    switch(op) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return 'Invalid';
    }
}

// Round long decimals
function roundResult(res) {
    if (typeof res === 'number') {
        return parseFloat(res.toFixed(8));
    }
    return res;
}
