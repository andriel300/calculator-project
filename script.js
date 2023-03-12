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
			result = parseFloat(firstOperand) / parseFloat(secondOperand);
			break;
	}
	display.textContent = result;
};

// Add event listeners for numbers
const handleNumberClick = (event) => {
	const clickedNumber = event.target.dataset.action;
	if (operator === null) {
		firstOperand === null
			? (firstOperand = clickedNumber)
			: (firstOperand += clickedNumber);
		display.textContent = firstOperand;
	} else {
		secondOperand === null
			? (secondOperand = clickedNumber)
			: (secondOperand += clickedNumber);
		display.textContent = secondOperand;
	}
};

const handleOperatorClick = () => {
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
	display.textContent = 0;
};

clear.addEventListener("click", handleClearButton);

// Add event listener for delete button
const deleteButton = () => {
	let displayText = display.textContent;
	if (displayText.length > 0) {
		displayText = displayText.substring(0, displayText.length - 1);
	}
	display.textContent = displayText.length > 0 ? displayText : 0;
};

del.addEventListener("click", deleteButton);

// Add event listener for decimal button
const decimalKey = () => {
	const currentDisplay = display.textContent;
	if (!currentDisplay.includes(",")) {
		display.textContent = `${currentDisplay},`;
	}
};

decimal.addEventListener("click", decimalKey);

// Add event listener for equal button
equal.addEventListener("click", () => {
	const operatorAction = equal.getAttribute("data-action");
	if (operatorAction === "calculate") {
		const secondValue = display.textContent;
	}
});

numbers.forEach((button) => {
	button.addEventListener("click", handleNumberClick);
});
