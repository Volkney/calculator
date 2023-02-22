let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];
let clear = document.getElementById('clearAll');

let numberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let actionButtons = document.querySelectorAll('.action');

let decimalClicked = false; // flag to track if decimal point has been clicked

numberButtons.forEach(button => {
  button.addEventListener('click', function(){
    let btnValue = button.value;
    if(btnValue) {
      display.textContent += btnValue;
    }
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', function(){
    let operator = button.value;
    let lastChar = display.textContent.slice(-1);

    if (operator && lastChar && lastChar !== '.') {
      display.textContent += operator;
      decimalClicked = false; // reset flag for next number
    } else if (operator && lastChar && lastChar === '.') {
      display.textContent = display.textContent.slice(0, -1) + operator;
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
    } else if (button.id === 'btnEnter') {
      let result = evaluateExpression(display.textContent);
      display.textContent = result;
      decimalClicked = false; // reset flag for next calculation
    }
  });
});

clear.addEventListener('click', function(){
    display.textContent = '';
    decimalClicked = false; // reset flag when clearing display
});

function evaluateExpression(expression) {
  let numbers = expression.split(/[^0-9.]+/).map(Number);
  let operators = expression.split(/[0-9.]+/).filter(Boolean);
  let result = numbers[0];
  
  for (let i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case '+':
        result += numbers[i + 1];
        break;
      case '-':
        result -= numbers[i + 1];
        break;
      case '*':
        result *= numbers[i + 1];
        break;
      case '/':
        result /= numbers[i + 1];
        break;
      default:
        break;
    }
  }
  
  return result;
}