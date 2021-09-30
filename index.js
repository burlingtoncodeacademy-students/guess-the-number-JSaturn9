const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//start();

//async function to start the game
async function start() {
  //console logs greeting to start the game
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  //awaits human to enter a secret number
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  //console logs the secret number that you (human) pick
  console.log('You entered: ' + secretNumber);
  //computer guesses secret number
  await ask(`Is your secret number ${secretNumber}?`);
  //console logs message re: correctly guessed number
  console.log(`Your number was ${secretNumber}!`);
  process.exit();
}

//calls the function to start the game
start();