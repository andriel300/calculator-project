// Select the buttons
const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");
const operators = keys.querySelectorAll(".key--operator");
const numbers = keys.querySelectorAll(".key--numbers");
const clear = keys.querySelector("[data-action=clear]");
const del = keys.querySelector("[data-action=delete]");
const decimal = keys.querySelector("[data-action=decimal]");
const equal = keys.querySelector("[data-action=calculate]");

// Add event listeners for numbers
numbers.forEach((button) => {
	button.addEventListener("click", () => {
		console.log(`Button ${button.textContent} clicked`);
		// TODO: Add functionality to handle number buttons
	});
});

// Add event listeners for operators
operators.forEach((operator) => {
	operator.addEventListener("click", () => {
		console.log(`Operator ${operator.textContent} clicked`);
		// TODO: Add functionality to handle operator buttons
	});
});

// Add event listener for clear button
clear.addEventListener("click", () => {
	console.log(`Clear button clicked`);
	// TODO: Add functionality to handle clear button
});

// Add event listener for delete button
del.addEventListener("click", () => {
	console.log(`Delete button clicked`);
	// TODO: Add functionality to handle delete button
});

// Add event listener for decimal button
decimal.addEventListener("click", () => {
	console.log(`Decimal button clicked`);
	// TODO: Add functionality to handle decimal button
});

// Add event listener for equal button
equal.addEventListener("click", () => {
	console.log(`Equal button clicked`);
	// TODO: Add functionality to handle equal button
});
