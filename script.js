// Select the buttons
const calculator = document.querySelector(".calculator");
const currentDisplay = document.querySelector(".calculator__display");
const previousDisplay = calculator.querySelector(".calculator__previous");
const keys = document.querySelector(".calculator__keys");
const operators = keys.querySelectorAll(".key--operator");
const numbers = keys.querySelectorAll(".key--number");
const clearBtn = keys.querySelector("[data-action=clear]");
const deleteButton = keys.querySelector("[data-action=delete]");
const decimal = keys.querySelector("[data-action=decimal]");
const equal = keys.querySelector("[data-action=calculate]");
let operation;

const handleClearDisplay = () => {
	currentDisplay.innerText = "";
	previousDisplay.innerText = "";
};

const handleNumberClick = (number) => {
	if (number === "." && currentDisplay.innerText.includes(".")) return;
	currentDisplay.innerText += number;
};

const chooseOperation = (symbol) => {
	if (currentDisplay.innerText === "") return;
	calculatorCompute(symbol);
	operation = symbol;
	currentDisplay.innerText += symbol;
	previousDisplay.innerText = currentDisplay.innerText;
	currentDisplay.innerText = "";
};

const calculatorCompute = (symbol) => {
	let result;
	const secondValue = parseFloat(previousDisplay.innerText);
	const currentValue = parseFloat(currentDisplay.innerText);

	if (isNaN(secondValue) || isNaN(currentValue)) return;

	switch (operation) {
		case "+":
			result = secondValue + currentValue;
			break;
		case "-":
			result = secondValue - currentValue;
			break;
		case "×":
			result = secondValue * currentValue;
			break;
		case "÷":
			result = secondValue / currentValue;
			break;
		default:
			return;
	}
	currentDisplay.innerText = result;
};

// Handle Event Listeners click

numbers.forEach((number) => {
	number.addEventListener("click", () => {
		handleNumberClick(number.innerText);
	});
});

deleteButton.addEventListener("click", () => {
	currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
});

clearBtn.addEventListener("click", handleClearDisplay);

operators.forEach((symbol) => {
	symbol.addEventListener("click", () => {
		chooseOperation(symbol.innerText);
	});
});

equal.addEventListener("click", () => {
	calculatorCompute();
	previousDisplay.innerText = "";
});
