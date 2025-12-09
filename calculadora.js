// Variables para almacenar la operación 
let firstOperand = null;
let secondOperand = false;
let operator = null;
let currentDisplayValue = '0';

// Referencia a la pantalla
const screen = document.querySelector('.calculator-screen');

// Función para actualizar la pantalla
function updateScreen() {
    screen.value = currentDisplayValue;
}
updateScreen(); // Inicializar la pantalla

// Función que maneja la entrada de dígitos y puntos
function inputDigit(digit) {
    if (secondOperand === true) {
        // Si ya hay un operador seleccionado, borra la pantalla
        currentDisplayValue = digit;
        secondOperand = false;
    } else {
        // Evita múltiples ceros iniciales
        currentDisplayValue = currentDisplayValue === '0' ? digit : currentDisplayValue + digit;
    }
}

// Función que maneja el punto decimal
function inputDecimal(dot) {
    if (!currentDisplayValue.includes(dot)) {
        currentDisplayValue += dot;
    }
}

// Función que maneja los operadores (+, -, *, /)
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentDisplayValue);

    // Si ya hay un operador y esperamos el segundo número, ignora
    if (operator && secondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        // Realiza el cálculo si ya existe un operador y el primer operando
        const result = performCalculation[operator](firstOperand, inputValue);

        // Limita el número de decimales
        currentDisplayValue = String(parseFloat(result.toFixed(7)));
        firstOperand = result;
    }

    secondOperand = true;
    operator = nextOperator;
}

// Objeto que define las funciones de cálculo
const performCalculation = {
    '/': (first, second) => first / second,
    '*': (first, second) => first * second,
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    '=': (first, second) => second 
};

// Función para resetear todo (AC)
function resetCalculator() {
    firstOperand = null;
    secondOperand = false;
    operator = null;
    currentDisplayValue = '0';
}


// ----------------------------------------------------
// MANEJO DE EVENTOS (Detectar clics en los botones)
// ----------------------------------------------------

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event; // El botón que se hizo clic
    
    // Si el clic no fue en un botón, ignora
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateScreen();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateScreen();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateScreen();
        return;
    }

    // Si es un dígito
    inputDigit(target.value);
    updateScreen();
});