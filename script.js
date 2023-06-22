const Cell = () => {
  let mark = "";

  const setMark = (playerMark) => {
    mark = playerMark;
  }

  const getMark = () => {
    return mark;
  }
  
  return {
    setMark,
    getMark
  }
};

const Gameboard = (() => {
  let gameboard = [];
  
  for (let i=0; i<9; i++) {
    gameboard.push(Cell());
  }

  const get = () => {
    return gameboard;
  }

  return {
    get
  }
})();

const Player = (name,playerMark) => {
  return {name,playerMark}
}

const displayController = (() => {
  const board = Gameboard.get();
  const gameContainer = document.querySelector(".game-container");

  const renderCell = (cell) => {
    let cellRender = document.createElement("button");
    cellRender.classList.add("cell");
    cellRender.innerText = cell.getMark();
    gameContainer.appendChild(cellRender);   
  }
  
  const updateGameDisplay = () => {
    gameContainer.innerHTML = "";
    board.forEach( cell => renderCell(cell));
  }

  updateGameDisplay();
})();