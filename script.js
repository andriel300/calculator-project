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

// Add event listeners for numbers
const handleNumberClick = (event) => {
	const clickedNumber = event.target.textContent;
	let currentDisplay = display.textContent;

	if (currentDisplay === "0") {
		display.textContent = clickedNumber;
	} else if (currentDisplay.length < 15) {
		// limit to 15 digits
		if (currentDisplay.includes(".")) {
			// append to the decimal
			const parts = currentDisplay.split(".");
			const wholeNumber = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			const decimal = parts[1] + clickedNumber;
			display.textContent = `${wholeNumber}.${decimal}`;
		} else {
			// append to the whole number
			const newDisplay = currentDisplay + clickedNumber;
			const parts = newDisplay.split(".");
			const wholeNumber = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			const decimal = parts[1] ? `.${parts[1]}` : "";
			display.textContent = wholeNumber + decimal;
		}
	}
};

numbers.forEach((button) => {
	button.addEventListener("click", handleNumberClick);
});

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

// Add event listeners for operators
operators.forEach((operator) => {
	operator.addEventListener("click", () => {
		const operatorAction = operator.getAttribute("data-action");
		console.log(`Operator ${operatorAction} clicked`);
		// TODO: Add functionality to handle operator buttons
	});
});

// Add event listener for equal button
equal.addEventListener("click", () => {
	console.log("Equal button clicked");
	// TODO: Add functionality to handle equal button
});
