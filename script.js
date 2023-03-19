const calculator = document.querySelector(".calculator");
const currentDisplay = calculator.querySelector(".calculator__display");
const previousDisplay = calculator.querySelector(".calculator__previous");
const keys = calculator.querySelector(".calculator__keys");
const clearBtn = keys.querySelector("[data-action=clear]");
const deleteBtn = keys.querySelector("[data-action=delete]");
const equalBtn = keys.querySelector("[data-action=calculate]");
const operatorBtn = keys.querySelectorAll(".key--operator");
const numberBtn = keys.querySelectorAll(".key--number");

let operator;

const clearDisplay = () => {
  currentDisplay.innerText = "";
  previousDisplay.innerText = "";
};

const addNumber = (number) => {
  if (number === "." && currentDisplay.innerText.includes(".")) return;
  currentDisplay.innerText += number;
};

const chooseOperator = (selectedOperator) => {
  if (currentDisplay.innerText === "") return;
  calculate();
  operator = selectedOperator;
  currentDisplay.innerText += selectedOperator;
  previousDisplay.innerText = currentDisplay.innerText;
  currentDisplay.innerText = "";
};

const calculate = () => {
  const previousValue = parseFloat(previousDisplay.innerText);
  const currentValue = parseFloat(currentDisplay.innerText);
  if (isNaN(previousValue) || isNaN(currentValue)) return;

  let result;
  switch (operator) {
    case "+":
      result = previousValue + currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "×":
      result = previousValue * currentValue;
      break;
    case "÷":
      if (currentValue === 0) {
        currentDisplay.innerText = "Not possible to divide by zero";
        return;
      }
      result = previousValue / currentValue;
      break;
    default:
      return;
  }
  currentDisplay.innerText = result;
};

// Add event listeners
clearBtn.addEventListener("click", clearDisplay);

deleteBtn.addEventListener("click", () => {
  currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
});

equalBtn.addEventListener("click", calculate);
numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    addNumber(button.innerText);
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.innerText);
  });
});

// Listen for keyboard events on the window object
window.addEventListener("keydown", (event) => {
  const { key } = event; // Destructure key property from event object

  // Check if key pressed is a number or a decimal point
  if (/\d|\./.test(key)) {
    addNumber(key);
  }

  // Check if key pressed is an operator
  if (/[-+*/×÷]/.test(key)) {
    // Convert key to the corresponding operator symbol
    const operatorSymbol =
      {
        "/": "÷",
        "*": "×",
      }[key] || key;
    chooseOperator(operatorSymbol);
  }

  // Check if key pressed is the equal sign or Enter key
  if (key === "Enter" || key === "=") {
    calculate();
  }

  // Check if key pressed is the Backspace key
  if (key === "Backspace") {
    currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
  }

  // Check if key pressed is the Escape key
  if (key === "Escape") {
    clearDisplay();
  }
});
