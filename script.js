let words = ["javascript", "ahorcado", "computadora", "programacion","terror","locura","extasis","kircher","psicologia","banfield","villa","manaos","pichita","zavaleta","preceptor"]; // Array de palabras
let word = ""; 
let attemptsLeft = 9;
let guessedLetters = [];

function chooseRandomWord() {
    word = words[Math.floor(Math.random() * words.length)];
}


function updateWordDisplay() {
    let display = word.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
    document.getElementById("word-display").innerText = `Palabra: ${display}`;
}


function updateHangmanImage() {
    const parts = ["base", "palo", "parte-arriba", "left-leg", "right-leg", "body", "left-arm", "right-arm", "head"];
    const visibleParts = 9 - attemptsLeft;

    
    parts.forEach(part => {
        document.getElementById(part).style.display = "none";
    });

    
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
    chooseRandomWord(); // Selecciona una nueva palabra
    document.getElementById("attempts").innerText = attemptsLeft;
    document.getElementById("message").innerText = "";
    updateWordDisplay();
    updateHangmanImage(); // Restablece la imagen del ahorcado
}
document.getElementById("letter-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});

chooseRandomWord();
updateWordDisplay();
document.getElementById("attempts").innerText = attemptsLeft;
updateHangmanImage(); 
