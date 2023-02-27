let buttons = document.querySelectorAll('[id^="btn"]');
let display = document.getElementsByClassName('display')[0];
let secondDisplay = document.getElementById('untitled');
let clear = document.getElementById('clearAll');
let backSpace = document.getElementById('btnDelete');
const popUp = document.querySelectorAll('.popup-left, .content-2, .close-btn, .top-bar-left, .btnClose-left, .btnError, .error');
let closePopUp = document.getElementById('close-popUp');

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

let isCalculationPairInProgress = false;

//backspace functionality//
backSpace.addEventListener('click', function(){
  let lastChar = display.textContent.slice(-1);
  display.textContent = display.textContent.slice(0,-1);
});

//operations functions//
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
    popUp.forEach(element => {
      element.style.visibility = 'visible';
    });
    return "Cannot divide by zero";
  }
  return num1 / num2;
}

//close popup//
closePopUp.addEventListener('click', function(){
  popUp.forEach(element =>{
    element.style.visibility = 'hidden';
  });
});

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
          display.textContent = '';   //uncheck this if don't want to show the second number//
          secondNumber = btnValue;
        } else {
          secondNumber += btnValue;
        }
      }
      display.textContent += btnValue;
    } else if (btnValue === '+' || btnValue === '-' || btnValue === 'x' || btnValue === '÷') {
      currentOperator = btnValue;
      secondDisplay.textContent += ' ' + btnValue + ' ';
      display.textContent += ' ' + btnValue + ' ';  //adds the symbol to the second display//
      button.style.backgroundColor = 'hsl(240, 1%, 80%)';
    } else if (btnValue === '=') {
      if (firstNumber !== null && secondNumber !== null && currentOperator !== null) {
        let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        secondDisplay.textContent = '';
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
  secondDisplay.textContent = '';
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
});

//enable numpad keys to work with code//
document.addEventListener('keydown', function(event) {
  let key = event.key;
  let button;

  switch(key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      button = document.querySelector(`button[value="${key}"]`);
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      button = document.querySelector(`button[value="${key.replace('*', 'x').replace('/', '÷')}"]`);
      break;
    case '.':
      button = document.querySelector(`button[value="."]`);
      break;
    case 'Enter':
      button = document.querySelector(`button[value="="]`);
      break;
    case 'Backspace':
      button = backSpace;
      break;
    case 'Escape':
      button = clear;
      break;
    default:
      return;
  }

  button.click();
});