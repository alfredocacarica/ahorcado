<<<<<<< HEAD
let words = ["ejemplo", "javascript", "programacion", "ahorcado", "desarrollador", "frontend", "backend", "html", "css", "algoritmo"]; // Array con palabras
let word = words[Math.floor(Math.random() * words.length)]; // Palabra aleatoria
let attemptsLeft = 9; // Ahora hay 9 intentos
let guessedLetters = []; // Letras que el usuario ha adivinado

// Mostrar la palabra oculta en el juego
function updateWordDisplay() {
    let display = word.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
    document.getElementById("word-display").innerText = `Palabra: ${display}`;
}

// Función para actualizar la imagen del ahorcado según los intentos restantes
function updateHangmanImage() {
    const parts = ["base", "palo", "parte-arriba", "left-leg", "right-leg", "left-arm", "right-arm", "body", "head"];
    const visibleParts = 9 - attemptsLeft;

    // Oculta todas las partes primero
    parts.forEach(part => {
        document.getElementById(part).style.display = "none";
    });

    // Muestra las partes necesarias según los intentos restantes
    for (let i = 0; i < visibleParts; i++) {
        document.getElementById(parts[i]).style.display = "block";
    }
}

// Verificar la letra ingresada por el usuario
=======

const words = ["javascript", "ahorcado", "programacion", "juego", "web"];
let chosenWord = ""; 
let attempts = 6; 
let guessedLetters = [];
let hiddenWord = ""; 


function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = "_ ".repeat(chosenWord.length).trim();
    attempts = 6;
    guessedLetters = [];
    updateDisplay();
    drawHangman();
}


function updateDisplay() {
    document.getElementById("word-display").textContent = `Palabra: ${hiddenWord}`;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("message").textContent = "";
}


>>>>>>> 46734d4db938983ace916a36518f3abf360474ec
function guessLetter() {
    const input = document.getElementById("letter-input");
    const letter = input.value.toLowerCase();
    input.value = "";

    if (!letter || guessedLetters.includes(letter)) {
        document.getElementById("message").innerText = "Letra ya ingresada o entrada inválida.";
        return;
    }

    guessedLetters.push(letter);
<<<<<<< HEAD

    if (word.includes(letter)) {
        document.getElementById("message").innerText = "¡Bien hecho! La letra está en la palabra.";
=======
    input.value = ""; 


    if (chosenWord.includes(letter)) {
        let newHiddenWord = "";
        for (let i = 0; i < chosenWord.length; i++) {
            newHiddenWord += guessedLetters.includes(chosenWord[i]) ? chosenWord[i] : "_";
            newHiddenWord += " ";
        }
        hiddenWord = newHiddenWord.trim();
>>>>>>> 46734d4db938983ace916a36518f3abf360474ec
    } else {
        attemptsLeft--;
        document.getElementById("message").innerText = "Letra incorrecta. Intentos restantes: " + attemptsLeft;
        document.getElementById("attempts").innerText = attemptsLeft;
        
        // Actualiza la imagen del ahorcado y reproduce el sonido de error
        updateHangmanImage();
        const wrongSound = document.getElementById("wrong-sound");
        wrongSound.play();
    }

<<<<<<< HEAD
    updateWordDisplay();
    checkGameOver();
}

// Verificar si el juego ha terminado
function checkGameOver() {
    const displayWord = word.split("").every(letter => guessedLetters.includes(letter));

    if (displayWord) {
        document.getElementById("message").innerText = "¡Ganaste! Redirigiendo...";
        document.getElementById("win-sound").play();

        // Espera a que se reproduzca el sonido de victoria y luego redirige a ganaste.html
        setTimeout(() => {
            window.location.href = "ganaste.html";
        }, 2000); // Espera 2 segundos antes de redirigir
    } else if (attemptsLeft <= 0) {
        document.getElementById("message").innerText = "Has perdido. Redirigiendo...";
        document.getElementById("lose-sound").play();

        // Espera a que se reproduzca el sonido de pérdida y luego redirige a perdiste.html
        setTimeout(() => {
            window.location.href = "perdiste.html";
        }, 2000); // Espera 2 segundos antes de redirigir
=======
    updateDisplay();

    
    if (!hiddenWord.includes("_")) {
        document.getElementById("message").textContent = "¡Felicidades, ganaste!";
        const winSound = document.getElementById("win-sound");
        winSound.play();
        setTimeout(() => {
            window.location.href = 'ganaste.html';
        }, 3000); 
    } else if (attempts === 0) {
        document.getElementById("message").textContent = `Perdiste, la palabra era "${chosenWord}"`;
        const loseSound = document.getElementById("lose-sound");
        loseSound.play();
        setTimeout(() => {
            window.location.href = 'perdiste.html';
        }, 3000); 
    }
}


function drawHangman() {
    const canvas = document.getElementById("hangman");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;


    if (attempts <= 5) ctx.strokeRect(10, 150, 100, 10);
    if (attempts <= 4) ctx.strokeRect(40, 10, 10, 140); 
    if (attempts <= 3) ctx.strokeRect(40, 10, 60, 10);
    if (attempts <= 2) ctx.beginPath(), ctx.arc(90, 40, 10, 0, Math.PI * 2), ctx.stroke();
    if (attempts <= 1) ctx.moveTo(90, 50), ctx.lineTo(90, 100), ctx.stroke(); 
    if (attempts === 0) {
        ctx.moveTo(90, 60), ctx.lineTo(80, 80), ctx.moveTo(90, 60), ctx.lineTo(100, 80), ctx.stroke(); 
        ctx.moveTo(90, 100), ctx.lineTo(80, 120), ctx.moveTo(90, 100), ctx.lineTo(100, 120), ctx.stroke(); 
>>>>>>> 46734d4db938983ace916a36518f3abf360474ec
    }
}


function resetGame() {
    attemptsLeft = 9;
    guessedLetters = [];
    document.getElementById("attempts").innerText = attemptsLeft;
    document.getElementById("message").innerText = "";
    updateWordDisplay();
    updateHangmanImage(); // Restablece la imagen del ahorcado
}

<<<<<<< HEAD
updateWordDisplay();
document.getElementById("attempts").innerText = attemptsLeft;
updateHangmanImage(); // Inicializa la imagen del ahorcado
=======
document.getElementById("letter-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});


startGame();
>>>>>>> 46734d4db938983ace916a36518f3abf360474ec
