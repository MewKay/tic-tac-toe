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

const Player = (name,mark) => {
  return {name,mark}
}

const Gameplay = (() => {
  const player1 = Player("Player One","O");
  const player2 = Player("Player Two", "X");
  const game = Gameboard.get();
  let currentPlayer = player1;

  const playMove = (cellPosition) => {
    const cellToSetMark = game[cellPosition];
    const markToSet = currentPlayer.mark;

    if(cellToSetMark.getMark() !== "") 
      return;

    cellToSetMark.setMark(markToSet);

    switchTurn();

    console.log(game[cellPosition].getMark());
  }

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  return {
    playMove
  }
})();

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