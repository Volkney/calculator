let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];
let clear = document.getElementById('clearAll');

let numberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let actionButtons = document.querySelectorAll('.action');


let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

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
    case "*":
      return multiply(num1, num2);
    case "/":
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
          secondNumber = btnValue;
        } else {
          secondNumber += btnValue;
        }
      }
      display.textContent += btnValue;
    } else if (btnValue === '+' || btnValue === '-' || btnValue === '*' || btnValue === '/') {
      currentOperator = btnValue;
      display.textContent += btnValue;
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