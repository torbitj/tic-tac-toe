const state = {
  board: []
}

const ARRAY_LENGTH = 3;

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