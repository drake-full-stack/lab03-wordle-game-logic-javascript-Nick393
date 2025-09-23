// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

document.addEventListener("keydown", (event) => {
    letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","Q","R","S","T","U","V","W","X","Y","Z"]//list for add letter
    console.log("A key was pressed:", event.key);
    guess=event.key.toUpperCase()
    message="a key was pressed:"+ guess;

    logDebug(message);
    if(gameOver)//if gameover stop
    {
        
    }
    else if(guess=="BACKSPACE"){//call delete function
        deleteLetter();
    }
    else if(guess=="ENTER")//call submit guess
    {
        submitGuess();
    }
    else if (letters.includes(guess)){//call add letter
            addLetter(guess)
        }
    
        
    }
);

function addLetter(letter) {
    logDebug(`🎯 addLetter("${letter}") called`, 'info');
    if(currentTile>=5)//See if row is full
    {
        logDebug("Row Full-error" )
        return
    }
    const currentRowElement = rows[currentRow];//get the row
    const tiles = currentRowElement.querySelectorAll('.tile');//get tiles
    const tile = tiles[currentTile];//get the tile to modify
    tile.textContent = letter;//install the letter
    tile.classList.add('filled');//format as filled
    currentTile++;//incrememnt tile
    logDebug(`Letter "${letter}" added at position ${currentTile - 1}`);//log
    logDebug(`current word: ${getCurrentWord()}`)
}

function deleteLetter() {
    logDebug(`🗑️ deleteLetter() called`, 'info');
// Check if there are letters to delete
    if (currentTile <= 0) {
        // No letters in current row
        logDebug("Row empty-error" )
        return;
    }

    // Move back one position FIRST, then clear that tile
    currentTile--; // This decrements by 1 (same as currentTile = currentTile - 1)
    
    // Now currentTile points to the tile we want to clear
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    const tileToDelete = tiles[currentTile]; // currentTile now points to the right tile
    logDebug(`Letter "${tileToDelete.textContent}" deleted at position ${currentTile}`);//log
    
    tileToDelete.textContent="";//delete the letter
    tileToDelete.classList.remove("filled")//remove the filled border
    logDebug(`current word: ${getCurrentWord()}`)//log
}

// TODO: Implement submitGuess function
function submitGuess() {
    if (currentTile !== 5) {
        // Row is not full - need exactly 5 letters
        alert("Please enter 5 letters!");
        logDebug("Row not full error" )
        return; // exit early

    }
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let guess = ''; // start with empty string

    // Loop through all tiles and build the word
    tiles.forEach(tile => {
        guess += tile.textContent; // add each letter to our word
    });
    logDebug(`Guess: ${guess}, target word: ${TARGET_WORD}`)
    checkGuess(guess,tiles)
}
function checkGuess(guess,tiles)
    {
        currentRow++;     // move to next row (0→1, 1→2, etc.)
        currentTile = 0;  // reset to start of new row
        if (guess === TARGET_WORD) {
            gameOver = true; // player won!
            setTimeout(() => alert("Congratulations! You won!"), 500);
        } else if (currentRow >= 6) {
        gameOver = true; // player used all 6 rows - game over
        setTimeout(() => alert("You Lose!"), 500);
    }
    
    // Now 'guess' contains the full word like "HELLO"
    

}

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }