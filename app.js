/*----- constants -----*/
// This is where I am going to go ahead and define
// the constants in this program that will be reused.

let myBoxes = {
  '1': 'purple',
  '-1': 'lime',
  'null': 'white'
}

//these are all the possible winning combinations in a TTT
// I should do this so that I can create a system that allows
// me to loop through this array on any winning combos
let winningCombos = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
 ];

// the state of my app i.e where
// what is statE?

let board, turn, winner

let squares = document.querySelectorAll('td div');
let message = document.querySelector('h1');

// let's take care of our event listeners here
document.querySelector('table').addEventListener('click', handleMove);

document.querySelector('button').addEventListener('click', initialize)


// so up to this point we have taken care of housekeeping
// we've defined a few things in a way that we are going
// to use them in some capacity. now let's write all the functions



/*----- functions -----*/

initialize();

function handleMove(event) {
// in handling a move I need to figure out a way to
// grab the index of a square - let's write that function here
  let idx = parseInt(event.target.id.replace('sq', ''));
  // what is parseInt doing here? What is event.target?
  // and why are we replacing things here?
  // I also need to check if the square is open
  // or else need to say it ain't
  if (board[idx] || winner) return;
  // gotta update state (remember our variables? board, turn, winner)
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

// we just handled the moves logic and now its time to
// figure out how to grab a winner

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3)
    return board[winningCombos[i][0]];
  }
  if (board.includes(null))
  return null;
  return 'T';
}

// what did we do here?
// we looped through the combos array and then
// made a condition - what is it?
// also what is math.abs?

//let's figure out how to throw this up on the page huh?

function render() {
  board.forEach(function(sq, idx) {
    // what is this line doing here? Hint what DOM Manipulation are we doing?
    squares[idx].style.background = myBoxes[sq];
  })
  if (winner === 'T') {
    message.innerHTML = 'Tie game! Why? Do it again!';

  } else if (winner) {
    message.innerHTML = `Congrats ${myBoxes[winner].toUpperCase()}!`;
  } else {
    message.innerHTML = `${myBoxes[turn].toUpperCase()}'s Turn`
  }
}
// finally we are going to write the initialize function
// since it is not inherent to js we gonna have to do it

function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  rener();
}

// OTHER CODE ----
