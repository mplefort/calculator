let first_operand = null;
let second_operand = null;
let operator = null;
let result = null;
let display_value = null;

function simulatedClick(element) {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

function updateDisplay(value) {
  if (value === null || value === undefined) {
    value = 0;
  }
  const display = document.querySelector(".display");
  display.textContent = value.toString();
  if (display.textContent.length > 10) {
    display.textContent = display.textContent.slice(0, 10);
  }
  display_value = value;
}
updateDisplay(display_value);

// Attach button query selectors to variables
const buttons = document.querySelectorAll("button");
function clickButton() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains("operator")) {
      buttons[i].addEventListener("click", () => {
        inputOperator(buttons[i].value);
      });
    } else if (buttons[i].classList.contains("operand")) {
      buttons[i].addEventListener("click", () => {
        inputOperand(buttons[i].value);
      });
    } else if (buttons[i].classList.contains("sign")) {
      buttons[i].addEventListener("click", () => {
        inputSign();
      });
    } else if (buttons[i].classList.contains("percent")) {
      buttons[i].addEventListener("click", () => {
        inputPercent();
      });
    } else if (buttons[i].classList.contains("clear")) {
      buttons[i].addEventListener("click", () => {
        inputClear();
      });
    } else if (buttons[i].classList.contains("eval")) {
      buttons[i].addEventListener("click", () => {
        inputEval();
      });
    }
  }
}

clickButton();

function inputOperand(operand) {
  if( first_operand === null && second_operand === null) {
    first_operand = operand;
    updateDisplay(first_operand);
  } else if (first_operand !== null && operator === null && second_operand === null) {
    first_operand += operand;
    updateDisplay(first_operand);
  } else if (first_operand !== null && operator !== null && second_operand === null) {
    second_operand = operand;
    updateDisplay(second_operand);
  } else if (first_operand !== null && operator !== null && second_operand !== null) {
    second_operand += operand;
    updateDisplay(second_operand);
  }
}

function inputOperator(input_operator) {
  if (first_operand !== null && second_operand === null) {
    operator = input_operator;
  } else if (first_operand !== null && second_operand !== null) {
    first_operand = operate(operator, first_operand, second_operand);
    second_operand = null;
    operator = input_operator;
    updateDisplay(first_operand);
  }
}



function inputSign() {
  display_value = (parseFloat(display_value) * -1.0).toString()
  if(second_operand !== null){
    second_operand = display_value
    updateDisplay(second_operand)
  }
  else{
    first_operand = display_value
    updateDisplay(first_operand)
  }
}

function inputClear() {
   first_operand = null;
   second_operand = null;
   operator = null;
   result = null;
   display_value = null;
   updateDisplay(display_value);
}

function inputPercent() {
  display_value = (parseFloat(display_value) * 0.01).toString()
  if(second_operand !== null){
    second_operand = display_value
    updateDisplay(second_operand)
  }
  else{
    first_operand = display_value
    updateDisplay(first_operand)
}
}

function inputEval() {
  if(operator === null) {
    return;
  }
  first_operand = operate(operator, first_operand, second_operand);
  second_operand = null;
  updateDisplay(first_operand);
}

function operate(operator, operand, second_operand) {
  if (operator === "+") {
    return add(parseFloat(operand), parseFloat(second_operand));
  } else if (operator === "-") {
    return subtract(parseFloat(operand), parseFloat(second_operand));
  } else if (operator === "*") {
    return multiply(parseFloat(operand), parseFloat(second_operand));
  } else if (operator === "/") {
    return divide(parseFloat(operand), parseFloat(second_operand));
  }
}

function add(operand, second_operand) {
  return operand + second_operand;
}

function subtract(operand, second_operand) {
  return operand - second_operand;
}

function multiply(operand, second_operand) {
  return operand * second_operand;
}

function divide(operand, second_operand) {
  if (second_operand === 0) {
    return "Error";
  }
  return operand / second_operand;
}

window.addEventListener("keydown", function (e) {
  console.log(e)
  const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
  simulatedClick(key);
});



// Flow of a calulator operation
// 1. User clicks on a number and store it in first_operand (null, null, null, null)
// 2. second click (val, null, null, null)
//  - if operand clicked, append to first_operand 
//  - if operator clicked, store operator 
// 3. third click (val, null, operator, null)
//  - if operand clicked, append to second_operand
//  - if operator clicked, operate(), 
// 4. fourth click (val, val, operator, null)
//  - if operand clicked, append to second operand
//  - if operator clicked, operate(val, val, operator, null)
//    - first operand = result
//    - second operand = null
//    - operator = new operator, 
//    - result = result
// 5. fifth click (val, null, operator, result)
