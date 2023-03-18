// Select the buttons
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator__display");
const previousDisplay = calculator.querySelector(".calculator__previous");
const keys = document.querySelector(".calculator__keys");
const operators = keys.querySelectorAll(".key--operator");
const numbers = keys.querySelectorAll(".key--number");
const clear = keys.querySelector("[data-action=clear]");
const deleteButton = keys.querySelector("[data-action=delete]");
const decimal = keys.querySelector("[data-action=decimal]");
const equal = keys.querySelector("[data-action=calculate]");

let previousValue = null;
let operator = null;
let currentValue = null;
let result = 0;

const reset = () => {
	previousValue = null;
	operator = null;
	currentValue = null;
	result = null;
};

const calculate = () => {
	switch (operator) {
		case "+":
			result = parseFloat(previousValue) + parseFloat(currentValue);
			break;
		case "-":
			result = parseFloat(previousValue) - parseFloat(currentValue);
			break;
		case "*":
			result = parseFloat(previousValue) * parseFloat(currentValue);
			break;
		case "÷":
			if (parseFloat(currentValue) === 0) {
				display.textContent = "Nice try, this is not allowed!";
				reset();
				return;
			} else {
				result = parseFloat(previousValue) / parseFloat(currentValue);
			}
			break;
	}
	if (result.toString().length > 15) {
		result = result.toFixed(5);
	}
};

const updateDisplay = () => {
	let displayText = "";
	if (previousValue !== null) {
		displayText += previousValue;
	}
	if (operator !== null) {
		displayText += ` ${operator} `;
	}
	if (currentValue !== null) {
		displayText += currentValue;
	}
	display.textContent = Number(displayText).toLocaleString();
	previousDisplay.textContent = Number(displayText).toLocaleString();
};

// Add event listeners for numbers
const handleNumberClick = (event) => {
	const clickedNumber = event.target.textContent;
	if (operator === null) {
		previousValue =
			previousValue === null ? clickedNumber : previousValue + clickedNumber;
		display.textContent = previousValue;
		updateDisplay();
	} else {
		currentValue =
			currentValue === null ? clickedNumber : currentValue + clickedNumber;
		display.textContent = currentValue;
		updateDisplay();
	}
};

const handleOperatorClick = (event) => {
	const clickedOperator = event.target.dataset.action;
	if (previousValue === null) return;
	if (previousValue === null && currentValue !== null) {
		calculate();
		previousValue = result;
		operator = clickedOperator;
		currentValue = 0;
	} else {
		operator = clickedOperator;
	}
	updateDisplay();
	return;
};

// Add event listener for clear button
const handleClearButton = () => {
	reset();
	updateDisplay();
	display.textContent = "0";
};

const handleEqualClick = () => {
	if (operator === null || currentValue === null) return;
	calculate();
	if (result !== null) {
		previousValue = result;
		operator = null;
		currentValue = null;
		updateDisplay();
		result = null;
	}
};

// Add event listener for delete button
const handleDeleteButton = () => {
	let displayText = display.textContent.trim();

	if (displayText.length > 0) {
		displayText = displayText.slice(0, -1);
	}

	if (operator === null) {
		previousValue = displayText || null; // reset previousValue to null when display is cleared
	} else {
		currentValue = displayText || null; // reset currentValue to null when display is cleared
	}

	display.textContent = displayText || "0";
};

const handleDecimalClick = () => {
	const currentOperand = operator === null ? previousValue : currentValue;

	if (currentOperand === null || currentOperand.indexOf(".") === -1) {
		const decimalValue = currentOperand === null ? "0." : ".";
		display.textContent =
			currentOperand === null ? decimalValue : currentOperand + decimalValue;
		operator === null
			? (previousValue += decimalValue)
			: (currentValue += decimalValue);
	}
};

// Add event listener to the buttons

numbers.forEach((button) => {
	button.addEventListener("click", handleNumberClick);
});

operators.forEach((button) => {
	button.addEventListener("click", handleOperatorClick);
});

equal.addEventListener("click", handleEqualClick);
clear.addEventListener("click", handleClearButton);
decimal.addEventListener("click", handleDecimalClick);
deleteButton.addEventListener("click", handleDeleteButton);
