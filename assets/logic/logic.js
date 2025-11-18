const state = {
  board: []
}

const ARRAY_LENGTH = 3;

const render = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Tic Tac Toe Game</h1>
  <Score></Score>
  <section><RowOne></RowOne></section>
  <section><RowTwo></RowTwo></section>
  <section><RowThree></RowThree></section>
  `;
}

render();