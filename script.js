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

let compute;

const handleClearDisplay = () => {
	currentDisplay.innerText = "";
	previousDisplay.innerText = "";
};

const handleNumberClick = (number) => {
	if (number === "." && currentDisplay.innerText.includes(".")) return;
	currentDisplay.innerText += number;
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
