// Define constants for the calculator elements
const calculator = document.querySelector(".calculator");
const currentDisplay = calculator.querySelector(".calculator__display");
const previousDisplay = calculator.querySelector(".calculator__previous");
const keys = calculator.querySelector(".calculator__keys");
const clearBtn = keys.querySelector("[data-action=clear]");
const deleteBtn = keys.querySelector("[data-action=delete]");
const equalBtn = keys.querySelector("[data-action=calculate]");
const operatorBtn = keys.querySelectorAll(".key--operator");
const numberBtn = keys.querySelectorAll(".key--number");

// Declare the operator variable for use in calculations
let operator;

// Define functions for calculator operations
const clearDisplay = () => {
  // Clear both display fields
  currentDisplay.innerText = "";
  previousDisplay.innerText = "";
};

const addNumber = (number) => {
  // Check if a decimal point is already present
  if (number === "." && currentDisplay.innerText.includes(".")) return;

  // Append the pressed number to the current display
  currentDisplay.innerText += number;
};

const chooseOperator = (selectedOperator) => {
  // Do not select an operator if current display is empty
  if (currentDisplay.innerText === "") return;

  // Perform calculation and update displays
  calculate();
  operator = selectedOperator;
  currentDisplay.innerText += selectedOperator;
  previousDisplay.innerText = currentDisplay.innerText;
  currentDisplay.innerText = "";
};

const calculate = () => {
  // Parse previous and current display values as numbers
  const previousValue = parseFloat(previousDisplay.innerText);
  const currentValue = parseFloat(currentDisplay.innerText);

  // Exit calculation if either value is not a number
  if (isNaN(previousValue) || isNaN(currentValue)) return;

  // Calculate result based on selected operator
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

  // Update current display with the result of calculation
  currentDisplay.innerText = result;
};

// Add event listeners
clearBtn.addEventListener("click", clearDisplay);
equalBtn.addEventListener("click", calculate);

deleteBtn.addEventListener("click", () => {
  // Remove the last character from current display
  currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
});

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    // Add the pressed number to the current display
    addNumber(button.innerText);
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    // Select the pressed operator and perform calculation
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
