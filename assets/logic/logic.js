const state = {
  board: []
}

const ARRAY_LENGTH = 3;

const addRows = () => {
  let figCount = 1;
  for (let i = 0; i < ARRAY_LENGTH; i++) {
    const rowArray = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      const $fig = document.createElement(`h2`);
      $fig.id = `fig${figCount}`;
      rowArray.push($fig);
      figCount++;
    }
    state.board.push(rowArray);
  }
}

const Board = () => {
  const $board = document.createElement(`section`);
  $board.innerHTML = `
  <RowOne></RowOne>
  <RowTwo></RowTwo>
  <RowThree></RowThree>`;
}

const render = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Tic Tac Toe Game</h1>
  <Score></Score>
  <Board></Board>
  `;
}

render();
addRows();