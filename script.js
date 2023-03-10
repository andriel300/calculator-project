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
				display.textContent = "Nice try, this is not allowed!";
				reset();
				return;
			} else {
				result = parseFloat(firstOperand) / parseFloat(secondOperand);
			}
			break;
		default:
			display.textContent = "Invalid operator";
			reset();
			return;
	}
	if (result.toString().length > 15) {
		result = result.toFixed(5);
	}
	display.textContent = Number(result).toLocaleString();
};

const updateDisplay = () => {
	let displayText = "";
	if (firstOperand !== null) {
		displayText += firstOperand;
	}
	if (operator !== null) {
		displayText += ` ${operator} `;
	}
	if (secondOperand !== null) {
		displayText += secondOperand;
	}
	display.textContent = displayText;
};

// Add event listeners for numbers
const handleNumberClick = (event) => {
	const clickedNumber = event.target.textContent;
	if (operator === null) {
		firstOperand =
			firstOperand === null ? clickedNumber : firstOperand + clickedNumber;
		display.textContent = Number(firstOperand).toLocaleString();
		document
			.querySelector(`[data-value="${firstOperand}"]`)
			?.classList?.add("is-selected"); // add optional chaining here
		updateDisplay();
	} else {
		secondOperand =
			secondOperand === null ? clickedNumber : secondOperand + clickedNumber;
		display.textContent = Number(secondOperand).toLocaleString();
		document
			.querySelector(`[data-value="${secondOperand}"]`)
			?.classList?.add("is-selected"); // add optional chaining here
		updateDisplay();
	}
	const MAX_DISPLAY_LENGTH = 15;
	if (display.textContent.length > MAX_DISPLAY_LENGTH) {
		display.textContent = display.textContent.substring(0, MAX_DISPLAY_LENGTH);
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
	updateDisplay();
	document
		.querySelectorAll(".key--operator")
		.forEach((el) => el.classList.remove("is-selected"));
	event.target.classList.add("is-selected");
};

// Add event listener for clear button
const handleClearButton = () => {
	reset();
	updateDisplay();
	display.textContent = "0";
};

const handleEqualClick = () => {
	if (operator === null || secondOperand === null) return;
	calculate();
	firstOperand = result;
	operator = null;
	secondOperand = null;
	updateDisplay();
};

function removeSelectClass() {
	operators.forEach((button) => button.classList.remove("is-selected"));
}

function addSelectClass(button) {
	button.classList.add("is-selected");
}

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
	button.addEventListener("click", () => {
		removeSelectClass();
		addSelectClass(button);
	});
});

operators.forEach((button) => {
	button.addEventListener("click", handleOperatorClick);
});

equal.addEventListener("click", handleEqualClick);
clear.addEventListener("click", handleClearButton);
decimal.addEventListener("click", handleDecimalClick);
del.addEventListener("click", handleDeleteButton);

//  Add event listener for keyboard input
