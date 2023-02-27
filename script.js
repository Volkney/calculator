let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];
let clear = document.getElementById('clearAll');
let backSpace = document.getElementById('btnDelete');

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

let isCalculationPairInProgress = false;


backSpace.addEventListener('click', function(){
  let lastChar = display.textContent.slice(-1);
  display.textContent = display.textContent.slice(0,-1);
});

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Cannot divide by zero";
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

buttons.forEach(button => {
  button.addEventListener('click', function() {
    let btnValue = button.value;
    if (btnValue === '.') {
      if (currentOperator === null) {
        if (firstNumber === null) {
          firstNumber = '0.';
        } else if (!firstNumber.includes('.')) { // check if firstNumber already contains a decimal point
          firstNumber += '.';
        }
      } else {
        if (secondNumber === null) {
          display.textContent = '0.';
          secondNumber = '0.';
        } else if (!secondNumber.includes('.')) { // check if secondNumber already contains a decimal point
          secondNumber += '.';
        }
      }
      if (!display.textContent.includes('.')) { // check if display already contains a decimal point
        display.textContent += '.';
      }
    } else if (btnValue >= '0' && btnValue <= '9') {
      if (currentOperator === null) {
        if (firstNumber === null) {
          if (btnValue === '0') {
            firstNumber = '0';
          } else {
            firstNumber = btnValue;
          }
        } else {
          firstNumber += btnValue;
        }
      } else {
        if (secondNumber === null) {
          display.textContent = '';
          secondNumber = btnValue;
        } else {
          secondNumber += btnValue;
        }
      }
      display.textContent += btnValue;
    } else if (btnValue === '+' || btnValue === '-' || btnValue === 'x' || btnValue === '÷') {
      currentOperator = btnValue;
      button.style.backgroundColor = 'hsl(240, 1%, 80%)';
    } else if (btnValue === '=') {
      if (firstNumber !== null && secondNumber !== null && currentOperator !== null) {
        let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.textContent = result.toString();
        firstNumber = result.toString();
        secondNumber = null;
        currentOperator = null;
        buttons.forEach(opButton => {
          if (opButton.value === '+' || opButton.value === '-' || opButton.value === 'x' || opButton.value === '÷') {
            opButton.style.backgroundColor = 'hsl(240, 1%, 70%)';
          }
        });
      }
    }
  });
});
clear.addEventListener('click',function(){
  display.textContent = '';
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
});