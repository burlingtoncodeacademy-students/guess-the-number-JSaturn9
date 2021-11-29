const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//random number generator function
function randomNumber(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

//function to update the guess
function updateGuess(min, max) {
  return Math.floor((max - min) / 2 + min);
}

//to start the game min is equal to 1
let min = 1;

start(); //calls function to start the game

//async function to start the game
async function start() {
  //computer asks for a max range higher than 1
  let max = await ask(
    "Please enter a number for the maximum that is greater than 1. "
  );
  //console logs greeting to start the game
  console.log(
    `Let's play a game where you (human) pick a number between ${min} and ${max} and I (computer) try to guess it.`
  );
  //awaits user (human) to enter a secret number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  //console logs the secret number that user inputs
  console.log("You entered: " + secretNumber);
  secretNumber = parseInt(secretNumber);

  //guess variable calls random number generator
  let guess = randomNumber(min, max);
  //computer guesses number between min-max range
  let response = await ask(`Is your secret number ${guess}?`);
  //if the response is not "yes" and is not "y" the program starts looping asking if number is higher or lower;
  //once correct number is guessed program exits.
  while (response.toLowerCase() !== "yes" && response.toLowerCase() !== "y") {
    //program asks if number is higher or lower
    let highOrLow = await ask("Is your number higher(h) or lower(l)?");
    //if higher or lower response contradicts earlier response the game exits
    if (guess === max && highOrLow === "h") {
      console.log(
        `You cheated! You said it was lower than ${
          max + 1
        }, so it can't also be higher than ${guess}.`
      );
      process.exit();
    } else if (guess === min && highOrLow === "l") {
      console.log(
        `You cheated! You said it was higher than ${
          min - 1
        }, so it can't also be lower than ${guess}.`
      );
      process.exit();
    }

    //if higher, a new minimum number is assigned to range
    if (
      highOrLow.toLowerCase() === "higher" ||
      highOrLow.toLowerCase() === "h"
    ) {
      //sets highOrLow variable to string "h" so that any higher response is put to "h"
      highOrLow = "h";
      //the min is set to current guess
      min = guess + 1;
    } else {
      //sets highOrLow variable to string "l" so that any lower response is put to "l"
      highOrLow = "l";
      //the max is set to current guess
      max = guess - 1;
    }
    //guess is set to updateGuess function, returning the middle value between the min and max values
    guess = updateGuess(min, max);
    //computer responds with updated guess
    response = await ask(`Is your secret number ${guess}?`);
  }
  //once correct number is guessed program exits while loop
  console.log(`HUZZAH YOU GUESSED IT! #${guess} PARTY TIME!`);
}
