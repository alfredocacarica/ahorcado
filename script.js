
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


function guessLetter() {
    const input = document.getElementById("letter-input");
    const letter = input.value.toLowerCase();

    if (!letter || guessedLetters.includes(letter)) {
        document.getElementById("message").textContent = "Letra inválida o ya utilizada";
        return;
    }

    guessedLetters.push(letter);
    input.value = ""; 


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
    }
}


function resetGame() {
    startGame();
}

document.getElementById("letter-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});


startGame();
