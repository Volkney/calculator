let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];
let clear = document.getElementById('clearAll');

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

let isCalculationPairInProgress = false;

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
  button.addEventListener('click',function(){
    let btnValue = button.value;


    if (btnValue >= '0' && btnValue <= '9') {
      if (currentOperator === null) {
        if (firstNumber === null) {
          firstNumber = btnValue;
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
      
      button.style.backgroundColor = 'gray';
      button.addEventListener('mousedown', function() {
        button.style.backgroundColor = 'blue';
      });
      
      button.addEventListener('mouseup', function() {
        button.style.backgroundColor = 'gray';
      });
    } else if (btnValue === '=') {
      if (firstNumber !== null && secondNumber !== null && currentOperator !== null) {
        let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.textContent = result.toString();
        firstNumber = result.toString();
        secondNumber = null;
        currentOperator = null;
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