let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];
let clear = document.getElementById('clearAll');

let numberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let actionButtons = document.querySelectorAll('.action');

let decimalClicked = false; // flag to track if decimal point has been clicked
let currentResult = null; // variable to store the current result

numberButtons.forEach(button => {
  button.addEventListener('click', function(){
    let btnValue = button.value;
    if (btnValue) {
      if (currentResult !== null) {
        display.textContent = btnValue;
        currentResult = null;
      } else {
        display.textContent += btnValue;
      }
    }
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', function(){
    let operator = button.value;
    let lastChar = display.textContent.slice(-1);

    if (operator && lastChar && lastChar !== '.') {
      if (display.textContent.includes('=')) {
        display.textContent = display.textContent.slice(display.textContent.indexOf('=')+1);
      }
      display.textContent += operator;
      decimalClicked = false; // reset flag for next number
      currentResult = null; // reset current result if an operator is clicked
    } else if (operator && lastChar && lastChar === '.') {
      display.textContent = display.textContent.slice(0, -1) + operator;
      currentResult = null; // reset current result if an operator is clicked
    } else if (operator === '=' && currentResult === null) {
      let expression = display.textContent;
      currentResult = evaluateExpression(expression);
      display.textContent += operator + currentResult;
    }
  });
});

actionButtons.forEach(button => {
  button.addEventListener('click', function(){
    if (button.id === 'btnDelete') {
      let lastChar = display.textContent.slice(-1);
      if (lastChar === '.') {
        decimalClicked = false; // reset flag if deleting decimal point
      }
      display.textContent = display.textContent.slice(0, -1);
      currentResult = null; // reset current result if a number is deleted
    } else if (button.id === 'btnEnter') {
      let expression = display.textContent;
      let result = evaluateExpression(expression);
      if (currentResult !== null) {
        // If there is a current result, use it as the first operand
        result = evaluateExpression(currentResult + expression);
      }
      currentResult = result; // Store the current result
      display.textContent = result;
      decimalClicked = false; // reset flag for next calculation
    }
  });
});

clear.addEventListener('click', function(){
    display.textContent = '';
    decimalClicked = false; // reset flag when clearing display
    currentResult = null; // reset current result when clearing display
});

function evaluateExpression(expression) {
  let numbers = expression.split(/[^0-9.]+/);
  let operators = expression.split(/[0-9.]+/).filter(Boolean);
  let result = parseFloat(numbers[0]);

  for (let i = 0; i < operators.length; i++) {
    let number = parseFloat(numbers[i + 1]);
    switch (operators[i]) {
      case '+':
        result += number;
        break;
      case '-':
        result -= number;
        break;
      case '*':
        result *= number;
        break;
      case '/':
        result /= number;
        break;
      default:
        break;
    }
  }

  return result;
}