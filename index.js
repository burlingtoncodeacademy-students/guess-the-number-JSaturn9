const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//start();

//a game where the computer tries to guess my (human) number

//async function to start the game
async function start() {
  //console logs greeting to start the game
  console.log(
    "Please think of a number between 1-100. I will try to guess it!"
  );
  //awaits player to enter a secret number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  //console logs the secret number that you player picks
  console.log("You entered: " + secretNumber);
  //turn the secretNumber from a string to a number
  secretNumber = parseInt(secretNumber);
  console.log(typeof secretNumber);
  //function for random number generator
  function randomNumber(min, max) {
    let range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
  }
  //computer guesses secret number using random number generator
  let secretNumberGuessed = await ask(
    `Is your secret number ${randomNumber(1, 100)}?`
  );
  //conditional if else statement to determine if computer guessed the correct number
  if (secretNumberGuessed === "yes" || secretNumberGuessed === "y") {
    //console logs message that correct number was guessed
    console.log(`Your number is ${secretNumber}! Huzzah!`);
    process.exit();
  } else {
    //console logs message to try again if computer guesses wrong
    console.log(`Try again!`);
  }
  //modifying guess range
  //given that the computer guesses the incorrect number
 
  //player responds with "higher" or "lower"
  //give the computer no more than 7 tries to guess the correct number using higher(h) and lower(l) to shorten guessing range
 
  //computer asks if number is higher or lower
  let nextGuess = await ask(`Is your number higher or lower?`);
  
  while (nextGuess) {
    if (nextGuess === "higher" || nextGuess === "h") {
      //if nextGuess is higher or h player responds with the guess is higher
      console.log("The secret number is higher.");
    } else if (nextGuess === "lower" || nextGuess === "l"){
      //if nextGuess is anything other than higher or h player responds with the guess is lower
      console.log("The secret number is lower.");
    } else {
      console.log("That is not an answer. Please guess higher or lower!")
    }
    break;
  }
  //console logs that turn is up if secret number has not been guessed within seven tries
  console.log("Sorry! You are out of turns. :(");

  //the computer modifies the range it guess within based on the answer

  //give the computer no more than 7 tries
  //extend the guess range
  //cheat detector

  process.exit();
}

//calls the function to start the game
start();
