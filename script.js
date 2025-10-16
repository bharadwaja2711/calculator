let num1 = '';
let num2 = '';
let operator = '';
let justCalculated = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

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
            return;
        }

        // Number or decimal
        if (!isNaN(value) || value === '.') {
            // Start fresh if just calculated
            if (justCalculated) {
                num1 = '';
                operator = '';
                num2 = '';
                display.value = '';
                justCalculated = false;
            }

            // Prevent multiple decimals
            if (value === '.' && ((operator === '' && num1.includes('.')) || (operator !== '' && num2.includes('.')))) {
                return;
            }

            if (operator === '') {
                num1 += value;
            } else {
                num2 += value;
            }
            display.value += value;
            return;
        }

        // Operators (+, -, *, /)
        if (['+', '-', '*', '/'].includes(value)) {
            if (num1 === '') return; // cannot start with operator

            // Replace operator if consecutive operators pressed
            if (operator !== '' && num2 === '') {
                // Remove last operator from display
                display.value = display.value.slice(0, -1);
                operator = value;
                display.value += value;
                return;
            }

            // Evaluate previous pair if both numbers exist
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

        // Equals button
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
        return parseFloat(res.toFixed(8)); // 8 decimal places max
    }
    return res; // for divide by 0 error string
}
