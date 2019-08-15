// create an array with words to choose from
var wordList = ["hoth", "tattoine", "luke", "lightsaber", "solo", ""];

// counter variables
var wins = 0;
var losses = 0;
var numGuesses = 10;

// holds computer choice
var chosenWord = "";

// need an array to break word into individual letters
var lettersInChosenWord = [];

// number of blanks we show based on chosen word
var blanks = 0;

// need an array to holds blanks and solved letters
var blanksAndSuccesses = [];

// array of wrong guesses
var wrongGuesses = [];

// hold the letter guessed
var letterGuessed = "";

function startGame() {
    numGuesses = 10;

    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

    // chosen word is broken up into individual letters
    lettersInChosenWord = chosenWord.split("");

    blanks = lettersInChosenWord.length;
    console.log(chosenWord);
    wrongGuesses = [];
    blanksAndSuccesses = [];

    // fill up blanksAndSuccesses list with blanks based on number of letters in solution
    for(var i = 0; i < blanks; i++) {
        blanksAndSuccesses.push("_");
    }
    console.log(blanksAndSuccesses);

    document.getElementById("guesses-left").innerHTML = numGuesses;
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// check letters function
function checkLetters(letter) {

    // need a boolean to toggle when the user has found a letter
    var letterInWord = false;

    for(var i = 0; i < blanks; i++) {

        if(chosenWord[i] === letter) {
            letterInWord = true;
        }
    }

    // if the letter exists inside the word, figure out where
    if (letterInWord) {

        for(var j = 0; j < blanks; j++) {

            if(chosenWord[j] === letter) {
                blanksAndSuccesses[j] = letter;
            }
        }
        console.log(blanksAndSuccesses);
    }

    else {
        wrongGuesses.push(letter);
        numGuesses--;
    }
}

// here will be the function that runs when a round of the game is finished
function roundComplete() {

    document.getElementById("guesses-left").innerHTML = numGuesses;
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    if(lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        wins++;
        alert("you win!");
        document.getElementById("win-counter").innerHTML = wins;
        startGame();
    }

    else if(numGuesses === 0) {
        losses++;
        alert("you lose");
        document.getElementById("loss-counter").innerHTML = losses;
        startGame();
    }
}

startGame();

document.onkeyup = function(event) {

    letterGuessed = String.fromCharCode(event.which).toLowerCase();

    checkLetters(letterGuessed);

    roundComplete();
};


