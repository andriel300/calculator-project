// Select the buttons
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");
const operators = keys.querySelectorAll(".key--operator");
const numbers = keys.querySelectorAll(".key--number");
const clear = keys.querySelector("[data-action=clear]");
const del = keys.querySelector("[data-action=delete]");
const decimal = keys.querySelector("[data-action=decimal]");
const equal = keys.querySelector("[data-action=calculate]");

let firstOperand = null;
let operator = null;
let secondOperand = null;
let result = null;

const reset = () => {
	firstOperand = null;
	operator = null;
	secondOperand = null;
	result = null;
};

const calculate = () => {
	switch (operator) {
		case "add":
			result = parseFloat(firstOperand) + parseFloat(secondOperand);
			break;
		case "subtract":
			result = parseFloat(firstOperand) - parseFloat(secondOperand);
			break;
		case "multiply":
			result = parseFloat(firstOperand) * parseFloat(secondOperand);
			break;
		case "divide":
			if (parseFloat(secondOperand) === 0) {
				display.textContent = "Nice try, this is not allowed";
				reset();
				return;
			} else {
				result = parseFloat(firstOperand) / parseFloat(secondOperand);
			}
			break;
	}
	display.textContent = result;
};

// Add event listeners for numbers
const handleNumberClick = (event) => {
	const clickedNumber = event.target.textContent;
	if (operator === null) {
		firstOperand =
			firstOperand === null ? clickedNumber : firstOperand + clickedNumber;
		display.textContent = firstOperand;
	} else {
		secondOperand =
			secondOperand === null ? clickedNumber : secondOperand + clickedNumber;
		display.textContent = secondOperand;
	}
};

const handleOperatorClick = (event) => {
	const clickedOperator = event.target.dataset.action;
	if (firstOperand === null) return;
	if (operator !== null && secondOperand !== null) {
		calculate();
		firstOperand = result;
		operator = clickedOperator;
		secondOperand = null;
	} else {
		operator = clickedOperator;
	}
};

// Add event listener for clear button
const handleClearButton = () => {
	reset();
	display.textContent = "0";
};

const handleEqualClick = () => {
	if (operator === null || secondOperand === null) return;
	calculate();
	firstOperand = result;
	operator = null;
	secondOperand = null;
};

// Add event listener for delete button
const handleDeleteButton = () => {
	let displayText = display.textContent;
	if (displayText.length > 0) {
		displayText = displayText.substring(0, displayText.length - 1);
	}
	display.textContent = displayText.length > 0 ? displayText : 0;
};

const handleDecimalClick = () => {
	if (
		operator === null &&
		(firstOperand === null || !firstOperand.includes("."))
	) {
		if (firstOperand === null) {
			firstOperand = "0.";
		} else {
			firstOperand += ".";
		}
		display.textContent = firstOperand;
	} else if (
		operator !== null &&
		(secondOperand === null || !secondOperand.includes("."))
	) {
		if (secondOperand === null) {
			secondOperand = "0.";
		} else {
			secondOperand += ".";
		}
		display.textContent = secondOperand;
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
del.addEventListener("click", handleDeleteButton);
