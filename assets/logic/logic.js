// State variables
const state = {
  board: [],
  turn: 'X',
  fullBoard: false,
}
// Board and winning combo array length
const ARRAY_LENGTH = 3;
// Winning combinations of boxes
const WIN_COMBOS = [
  // Rows
  [`box1`, `box2`, `box3`],
  [`box4`, `box5`, `box6`],
  [`box7`, `box8`, `box9`],
  // Columns
  [`box1`, `box4`, `box7`],
  [`box2`, `box5`, `box8`],
  [`box3`, `box6`, `box9`],
  // Diagonals
  [`box1`, `box5`, `box9`],
  [`box3`, `box5`, `box7`]
]
// Creates h2 elements to fill the board state variable
const createBoard = () => {
  state.board = [];
  state.turn = `X`;
  state.fullBoard = false;
  let headingCount = 1;
  for (let i = 0; i < ARRAY_LENGTH; i++) {
    const rowArray = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      const $h2 = document.createElement(`h2`);
      $h2.id = `box${headingCount}`;
      rowArray.push($h2);
      headingCount++;
    }
    state.board.push(rowArray);
  }
}
// Update whose turn it is
const updateTurn = () => {
  if (state.turn === `X`) {
    state.turn = `O`;
  }
  else {
    state.turn = `X`
  }
}
// Test X and O positions against winning combinations
const testWinCombos = (array) => {
  const idArray = array.map((h) => h.id);
  // Pull down and inspect each winning combination until a match is found
  for (let i = 0; i < WIN_COMBOS.length; i++) {
    const currCombo = WIN_COMBOS[i];
    let matchCount = 0;
    // Inspect winning combo array
    for (let i = 0; i < currCombo.length; i++) {
      const currBoxId = currCombo[i];
      // Check X and O arrays against current winning combo array
      for (let i = 0; i < idArray.length; i++) {
        if (idArray[i] === currBoxId) {
          matchCount++
        }
      }
    }
    // If there is a match, return true
    if (matchCount === ARRAY_LENGTH) {
      return true;
    }
  }
  // Return false if no match is found
  return false;
}
// Check if the board is full and update state variable
const isBoardFull = () => {
  const spacesNodes = document.querySelectorAll(`h2`);
  const spacesArray = [...spacesNodes];
  let boxFullCount = 0
  for (let i = 0; i < spacesArray.length; i++) {
    if (spacesArray[i].innerHTML !== ``) {
      boxFullCount++
    }
  }
  if (boxFullCount === 9) {
    state.fullBoard = true;
  } 
}
// Create X and O arrays for arguments for testing against winning combo function
const currentWin = () => {
  const boxesNodes = document.querySelectorAll(`h2`);
  const boxesArray = [...boxesNodes];
  // If there is a win boolean initialization
  let oWin = false;
  let xWin = false;
  // X and O arrays
  const xArray = boxesArray.filter((h) => h.innerText === `X`);
  const oArray = boxesArray.filter((h) => h.innerText === `O`);
  // Test if X or O has winning combination
  if (xArray.length > 2) {
    xWin = testWinCombos(xArray);
    if (!xWin) {
      oWin = testWinCombos(oArray);
    }
  }
  // Display if X or O wins, or if it is a Cat's Game (tie) and create new board
  if (xWin) {
    setTimeout(() => {
      alert(`X wins!`);
      createBoard();
      render();
    }, 250);
  } else if (oWin) {
    setTimeout(() => {
      alert(`O wins!`);
      createBoard();
      render();
    }, 250); 
  } else if (!xWin && !oWin && state.fullBoard) {
    setTimeout(() => {
      alert(`Cat's Game!`)
      createBoard();
      render();
    } , 250);
  }
}
// Create the board componenet function
const Board = () => {
  const $board = document.createElement(`section`);
  $board.innerHTML = `
  <figure id="row1"></figure>
  <figure id="row2"></figure>
  <figure id="row3"></figure>
  `;
  const allFigs = $board.querySelectorAll(`figure`);
  const figArray = [...allFigs];
  for (let i = 0; i < figArray.length; i++) {
    const currRow = state.board[i];
    const currFig = figArray[i]
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      currFig.append(currRow[i]);
    }
  }

  // Create an event listener
  const allBoxes = $board.querySelectorAll(`h2`);
  allBoxes.forEach((fig) => {
    fig.addEventListener("click", (event) => {
      const selectedBox = event.target;
      // Check if space clicked already has a value
      if (selectedBox.innerHTML !== ``) {
        alert(`Space already filled`)
      } else {
        selectedBox.innerHTML = state.turn;
        updateTurn();
      }
      isBoardFull();
      currentWin();
    });
  })
  return $board;
}
// Render the document updates
const render = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Tic Tac Toe Game</h1>
  <Board></Board>
  `;

  document.querySelector(`Board`).replaceWith(Board());
}

// Create board elements and render to document
createBoard();
render();