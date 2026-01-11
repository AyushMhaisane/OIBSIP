let currentInput = "";
let previousAns = "";

const resultDisplay = document.getElementById("result");
const historyDisplay = document.getElementById("history");

function appendCharacter(char) {
    if (currentInput === "0" && char !== ".") {
        currentInput = char;
    } else {
        currentInput += char;
    }
    updateDisplay();
}

function updateDisplay() {
    resultDisplay.innerText = currentInput || "0";
}

function clearScreen() {
    currentInput = "";
    historyDisplay.innerText = "";
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function useAns() {
    if (previousAns) {
        currentInput += previousAns;
        updateDisplay();
    }
}

function calculateSquareRoot() {
    try {
        const value = eval(currentInput);
        if (value < 0) {
            resultDisplay.innerText = "Error";
            currentInput = "";
        } else {
            const result = Math.sqrt(value);
            currentInput = result.toString();
            updateDisplay();
        }
    } catch (error) {
        resultDisplay.innerText = "Error";
    }
}

function toggleSign() {
    if (currentInput) {
        if (currentInput.startsWith("-")) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = "-(" + currentInput + ")";
        }
        updateDisplay();
    }
}

function calculateResult() {
    try {
        historyDisplay.innerText = currentInput;
        let result = eval(currentInput);
        
        if (result === Infinity || isNaN(result)) {
            resultDisplay.innerText = "Error";
            currentInput = "";
        } else {
            previousAns = result;
            currentInput = result.toString();
            updateDisplay();
        }
    } catch (error) {
        resultDisplay.innerText = "Error";
        currentInput = "";
    }
}