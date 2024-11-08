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
function guessLetter() {
    const input = document.getElementById("letter-input");
    const letter = input.value.toLowerCase();
    input.value = "";

    if (!letter || guessedLetters.includes(letter)) {
        document.getElementById("message").innerText = "Letra ya ingresada o entrada inválida.";
        return;
    }

    guessedLetters.push(letter);

    if (word.includes(letter)) {
        document.getElementById("message").innerText = "¡Bien hecho! La letra está en la palabra.";
    } else {
        attemptsLeft--;
        document.getElementById("message").innerText = "Letra incorrecta. Intentos restantes: " + attemptsLeft;
        document.getElementById("attempts").innerText = attemptsLeft;
        
        // Actualiza la imagen del ahorcado y reproduce el sonido de error
        updateHangmanImage();
        const wrongSound = document.getElementById("wrong-sound");
        wrongSound.play();
    }

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
    }
}

// Reiniciar el juego
function resetGame() {
    attemptsLeft = 9;
    guessedLetters = [];
    document.getElementById("attempts").innerText = attemptsLeft;
    document.getElementById("message").innerText = "";
    updateWordDisplay();
    updateHangmanImage(); // Restablece la imagen del ahorcado
}

updateWordDisplay();
document.getElementById("attempts").innerText = attemptsLeft;
updateHangmanImage(); // Inicializa la imagen del ahorcado
