const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
const decimalBtn = document.querySelector('.decimal');

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nope 😏";
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

function updateDisplay(content) {
  display.textContent = content;
}

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetScreen) {
    display.textContent = "";
    shouldResetScreen = false;
  }
  display.textContent += number;
}

function chooseOperator(op) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = op;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondNumber = display.textContent;
  const result = operate(currentOperator, firstNumber, secondNumber);
  updateDisplay(roundResult(result));
  currentOperator = null;
}

function clear() {
  display.textContent = "0";
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
}

function deleteNumber() {
  display.textContent = display.textContent.toString().slice(0, -1) || "0";
}

function appendDecimal() {
  if (shouldResetScreen) {
    display.textContent = "0";
    shouldResetScreen = false;
  }
  if (!display.textContent.includes('.')) {
    display.textContent += ".";
  }
}

function roundResult(num) {
  if (typeof num === "string") return num;
  return Math.round(num * 1000) / 1000;
}

digits.forEach(btn => btn.addEventListener('click', () => appendNumber(btn.textContent)));
operators.forEach(btn => btn.addEventListener('click', () => chooseOperator(btn.textContent)));
equals.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
backspaceBtn.addEventListener('click', deleteNumber);
decimalBtn.addEventListener('click', appendDecimal);

window.addEventListener('keydown', handleKeyboard);

function handleKeyboard(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendDecimal();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') deleteNumber();
  if (e.key === 'Escape') clear();
  if (['+', '-', '*', '/'].includes(e.key)) chooseOperator(e.key);
}
