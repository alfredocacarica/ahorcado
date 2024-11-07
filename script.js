// Palabras posibles para el juego
const words = ["javascript", "ahorcado", "programacion", "juego", "web"];
let chosenWord = ""; // Palabra que el jugador tiene que adivinar
let attempts = 6; // Intentos permitidos
let guessedLetters = []; // Letras adivinadas hasta ahora
let hiddenWord = ""; // Palabra en formato "_ _ _"

// Seleccionar palabra al azar y ocultarla
function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = "_ ".repeat(chosenWord.length).trim();
    attempts = 6;
    guessedLetters = [];
    updateDisplay();
    drawHangman();
}

// Actualizar la pantalla
function updateDisplay() {
    document.getElementById("word-display").textContent = `Palabra: ${hiddenWord}`;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("message").textContent = "";
}

// Función para adivinar una letra
function guessLetter() {
    const input = document.getElementById("letter-input");
    const letter = input.value.toLowerCase();

    if (!letter || guessedLetters.includes(letter)) {
        document.getElementById("message").textContent = "Letra inválida o ya utilizada";
        return;
    }

    guessedLetters.push(letter);
    input.value = ""; // Limpiar el campo de entrada

    // Verificar si la letra está en la palabra
    if (chosenWord.includes(letter)) {
        let newHiddenWord = "";
        for (let i = 0; i < chosenWord.length; i++) {
            newHiddenWord += guessedLetters.includes(chosenWord[i]) ? chosenWord[i] : "_";
            newHiddenWord += " ";
        }
        hiddenWord = newHiddenWord.trim();
    } else {
        attempts--;
        drawHangman();
        
        const wrongSound = document.getElementById("wrong-sound");
        wrongSound.play();
    }

    updateDisplay();

    // Verificar si ganó o perdió
    if (!hiddenWord.includes("_")) {
        document.getElementById("message").textContent = "¡Felicidades, ganaste!";
        const winSound = document.getElementById("win-sound");
        winSound.play();
        setTimeout(() => {
            window.location.href = 'ganaste.html'; // Página de victoria
        }, 2000); // Espera de 2 segundos antes de redirigir
    } else if (attempts === 0) {
        document.getElementById("message").textContent = `Perdiste, la palabra era "${chosenWord}"`;
        const loseSound = document.getElementById("lose-sound");
        loseSound.play();
        setTimeout(() => {
            window.location.href = 'perdiste.html'; // Página de derrota
        }, 2000); // Espera de 2 segundos antes de redirigir
    }
}

// Dibujar el ahorcado en el canvas
function drawHangman() {
    const canvas = document.getElementById("hangman");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;

    // Dibujar partes del ahorcado según intentos
    if (attempts <= 5) ctx.strokeRect(10, 150, 100, 10); // Base
    if (attempts <= 4) ctx.strokeRect(40, 10, 10, 140); // Poste vertical
    if (attempts <= 3) ctx.strokeRect(40, 10, 60, 10); // Poste horizontal
    if (attempts <= 2) ctx.beginPath(), ctx.arc(90, 40, 10, 0, Math.PI * 2), ctx.stroke(); // Cabeza
    if (attempts <= 1) ctx.moveTo(90, 50), ctx.lineTo(90, 100), ctx.stroke(); // Cuerpo
    if (attempts === 0) {
        ctx.moveTo(90, 60), ctx.lineTo(80, 80), ctx.moveTo(90, 60), ctx.lineTo(100, 80), ctx.stroke(); // Brazos
        ctx.moveTo(90, 100), ctx.lineTo(80, 120), ctx.moveTo(90, 100), ctx.lineTo(100, 120), ctx.stroke(); // Piernas
    }
}

// Reiniciar el juego
function resetGame() {
    startGame();
}

// Añadir evento para detectar tecla Enter
document.getElementById("letter-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});

// Iniciar el juego al cargar la página
startGame();
