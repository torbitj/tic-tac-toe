const state = {
  board: [],
  turn: 'X',
  keepBoard: true
}

const ARRAY_LENGTH = 3;

const createBoard = () => {
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

const updateTurn = () => {
  if (state.turn === `X`) {
    state.turn = `O`;
  }
  else {
    state.turn = `X`
  }
}

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
    alert(`Insert Test Win Function`)
  } 
}

const Board = () => {
  if (!state.keepBoard) {

  } else {
    const $board = document.createElement(`section`);
    $board.innerHTML = `
    <figure></figure>
    <figure></figure>
    <figure></figure>
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
        if (selectedBox.innerHTML !== ``) {
          alert(`Space already filled`)
        } else {
          selectedBox.innerHTML = state.turn;
          updateTurn();
        }
        isBoardFull();
      });
    })
    return $board;
  }
}

const render = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Tic Tac Toe Game</h1>
  <Score></Score>
  <Board></Board>
  `;

  document.querySelector(`Board`).replaceWith(Board());
}

createBoard();
render();