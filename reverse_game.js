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

//calls the function to start the game
start();

//async function to start the game
async function start() {
  let number = randomNumber(1, 10);
  console.log(number);
  //Computer asks me (user) to guess a number
  let guess = await ask("Please guess a number between 1 - 10.\n");
  //Turns the string guess variable into a number
  guess = parseInt(guess);

  while (guess !== number) {
    //If the guess is greater than the number
    if (guess > number) {
      //Computer states the guess was too high
      console.log(`I'm sorry, the number is lower than ${guess}.`);
      //Computer prompts to guess again
      guess = await ask("Please guess again...\n");
      guess = parseInt(guess);
      //If the guess is less than the number
    } else if (guess < number) {
      //Computer states the guess was too low
      console.log(`I'm sorry, the number is higher than ${guess}.`);
      //Computer prompts to guess again
      guess = await ask("Please guess again...\n");
      guess = parseInt(guess);
    }
  }
  //If number is guessed correctly the computer congratulates the user
  console.log(`Huzzah! You guessed correctly the number was ${number}!`);
  process.exit();
}
