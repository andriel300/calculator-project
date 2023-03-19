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
        currentDisplay.innerText = "Error: Division by zero";
        currentDisplay.style.fontSize = "12px";
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
