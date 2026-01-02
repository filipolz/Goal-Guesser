// --- 1. GAME DATA ---
// We copy-paste our JSON data directly into the script.

// This is our database of all guessable players
// Notice the keys are simple, lowercase: "yamal", "lewandowski", "pedri"
const playersDB = {
  "terstegen": {
    "displayName": "Marc-André ter Stegen",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Germany",
    "position": "Goalkeeper",
    "number": 1,
    "age": 33 
  },
    "joangarcia": {
    "displayName": "Joan García",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Goalkeeper",
    "number": 13,
    "age": 24 
  },
    "szczesny": {
    "displayName": "Wojciech Szczęsny",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Poland",
    "position": "Goalkeeper",
    "number": 25,
    "age": 35 
  },
    "balde": {
    "displayName": "Alejandro Balde",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Defender",
    "number": 3,
    "age": 22 
  },
    "araujo": {
    "displayName": "Ronald Araújo",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Uruguay",
    "position": "Defender",
    "number": 4,
    "age": 26 
  },
    "cubarsi": {
    "displayName": "Pau Cubarsí",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Defender",
    "number": 5,
    "age": 18 
  },
    "christensen": {
    "displayName": "Andreas Christensen",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Denmark",
    "position": "Defender",
    "number": 15,
    "age": 29 
  },
    "gerardmartin": {
    "displayName": "Gerard Martín",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Defender",
    "number": 18,
    "age": 23 
  },
    "kounde": {
    "displayName": "Jules Koundé",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "France",
    "position": "Defender",
    "number": 23,
    "age": 26 
  },
    "ericgarcia": {
    "displayName": "Eric García",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Defender",
    "number": 24,
    "age": 24 
  },
    "gavi": {
    "displayName": "Gavi",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Midfielder",
    "number": 6,
    "age": 21 
  },
    "fermin": {
    "displayName": "Fermín López",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Midfielder",
    "number": 16,
    "age": 22 
  },
    "casado": {
    "displayName": "Marc Casadó",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Midfielder",
    "number": 17,
    "age": 22 
  },
    "olmo": {
    "displayName": "Dani Olmo",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Midfielder",
    "number": 20,
    "age": 27 
  },
    "dejong": {
    "displayName": "Frenkie de Jong",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Netherlands",
    "position": "Midfielder",
    "number": 21,
    "age": 28 
  },
    "bernal": {
    "displayName": "Marc Bernal",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Midfielder",
    "number": 22,
    "age": 18 
  },
    "ferrantorres": {
    "displayName": "Ferran Torres",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Forward",
    "number": 7,
    "age": 25 
  },
    "lewandowski": {
    "displayName": "Robert Lewandowski",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Poland",
    "position": "Forward",
    "number": 9,
    "age": 37 
  },
    "yamal": {
    "displayName": "Lamine Yamal",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Spain",
    "position": "Forward",
    "number": 10,
    "age": 18 
  },
    "raphinha": {
    "displayName": "Raphinha",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Brazil",
    "position": "Forward",
    "number": 11,
    "age": 28 
  },
    "rashford": {
    "displayName": "Marcus Rashford",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "England",
    "position": "Forward",
    "number": 14,
    "age": 28 
  },
    "bardghji": {
    "displayName": "Roony Bardghji",
    "club": "Barcelona",
    "league": "LaLiga",
    "country": "Sweden",
    "position": "Forward",
    "number": 28,
    "age": 19 
  }
};

// This is our puzzle for the day
const puzzle = {
  "puzzleId": "goal-001",
  "playerKey": "yamal", // This simple key matches the key in playersDB
  "videoUrl": "Yamal1.mp4",
  "BlurredvideoUrl": "YamalBlurred.mp4"
};


// --- 2. GAME STATE ---
let currentGuess = 1;
const MAX_GUESSES = 6;
const answerKey = puzzle.playerKey;
const answerData = playersDB[answerKey];
let gameOver = false;


// --- 3. GET HTML ELEMENTS ---
const videoPlayer = document.getElementById("goal-video");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const grid = document.getElementById("guess-grid");
const gameMessage = document.getElementById("game-message");


// --- 4. GAME FUNCTIONS ---

/**
 * Loads the initial puzzle video
 */
function setupGame() {
    // Find the <source> tag inside the <video> tag and set its src
    const videoSource = videoPlayer.querySelector("source");
    videoSource.src = puzzle.BlurredvideoUrl;
    videoPlayer.load(); // Tell the player to load the new source
}

/**
 * Called when the user clicks the "Guess" button
 */
function handleSubmitGuess() {
    if (gameOver) return; // Don't do anything if game is won or lost

    const guessText = guessInput.value.trim().toLowerCase();

    // 1. Check if the guess is a valid player key
    if (!playersDB[guessText]) {
        alert("Player not found. Use a valid key (e.g., yamal, pedri).");
        return;
    }

    // 2. Get the data for the guess
    const guessData = playersDB[guessText];

    // 3. Compare the guess to the answer
    const hints = comparePlayers(guessData, answerData);

    // 4. Display the hints in the current row
    displayHints(guessData, hints, currentGuess);

    // 5. Clear the input box
    guessInput.value = "";

    // 6. Check for win or lose
    if (guessData.displayName === answerData.displayName) {
        // WIN
        gameMessage.textContent = "You got it!";
        gameMessage.style.color = "green";
        endGame(true);
    } else {
        // WRONG GUESS
        currentGuess++;
        if (currentGuess > MAX_GUESSES) {
            // LOSE
            gameMessage.textContent = `You're out of guesses! The player was ${answerData.displayName}.`;
            gameMessage.style.color = "red";
            endGame(false);
        }
    }
}

/**
 * Compares the guessed player to the answer player
 * @returns {object} An object with hint results
 */
function comparePlayers(guess, answer) {
    let hints = {};

    // Check each property
    hints.club = (guess.club === answer.club) ? 'correct' : 'incorrect';
    hints.league = (guess.league === answer.league) ? 'correct' : 'incorrect';
    hints.country = (guess.country === answer.country) ? 'correct' : 'incorrect';
    hints.position = (guess.position === answer.position) ? 'correct' : 'incorrect';
    
    // Check numbers (with high/low arrows)
    if (guess.number === answer.number) {
        hints.number = 'correct';
    } else if (guess.number > answer.number) {
        hints.number = 'lower'; // Need to guess lower
    } else {
        hints.number = 'higher'; // Need to guess higher
    }

    // Check age (with high/low arrows)
    if (guess.age === answer.age) {
        hints.age = 'correct';
    } else if (guess.age > answer.age) {
        hints.age = 'lower'; // Need to guess lower
    } else {
        hints.age = 'higher'; // Need to guess higher
    }
    
    return hints;
}

/**
 * Fills a grid row with the guess data and hint colors
 */
function displayHints(guessData, hints, rowNum) {
    const row = document.getElementById(`row-${rowNum}`);
    const cells = row.querySelectorAll(".grid-cell");

    // Column 0: Player Name
    cells[0].textContent = guessData.displayName;
    cells[0].classList.add(guessData.displayName === answerData.displayName ? 'cell-correct' : 'cell-incorrect');
    
    // Column 1: Club
    cells[1].textContent = guessData.club;
    cells[1].classList.add(hints.club === 'correct' ? 'cell-correct' : 'cell-incorrect');

    // Column 2: League
    cells[2].textContent = guessData.league;
    cells[2].classList.add(hints.league === 'correct' ? 'cell-correct' : 'cell-incorrect');
    
    // Column 3: Country
    cells[3].textContent = guessData.country;
    cells[3].classList.add(hints.country === 'correct' ? 'cell-correct' : 'cell-incorrect');
    
    // Column 4: Position
    cells[4].textContent = guessData.position;
    cells[4].classList.add(hints.position === 'correct' ? 'cell-correct' : 'cell-incorrect');
    
    // Column 5: Number
    let numberText = guessData.number;
    if (hints.number === 'lower') numberText += ' ↓';
    if (hints.number === 'higher') numberText += ' ↑';
    cells[5].textContent = numberText;
    cells[5].classList.add(hints.number === 'correct' ? 'cell-correct' : 'cell-incorrect');

    // Column 6: Age
    let ageText = guessData.age;
    if (hints.age === 'lower') ageText += ' ↓';
    if (hints.age === 'higher') ageText += ' ↑';
    cells[6].textContent = ageText;
    cells[6].classList.add(hints.age === 'correct' ? 'cell-correct' : 'cell-incorrect');
}

/**
 * Called on a win or loss
 */
function endGame(didWin) {
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;

    // Show the unblurred goal!
    const videoSource = videoPlayer.querySelector("source");
    videoSource.src = puzzle.videoUrl;
    videoPlayer.load();
    videoPlayer.play(); // Autoplay the answer
}


// --- 5. START THE GAME ---
setupGame();
// Listen for the user to click the button
guessButton.addEventListener("click", handleSubmitGuess);
// Allow pressing "Enter" to submit
guessInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        handleSubmitGuess();
    }
});