const Cell = () => {
  let mark = "";
  let index = undefined;

  const setMark = (playerMark) => {
    mark = playerMark;
  }

  const getMark = () => {
    return mark;
  }

  const setIndex = (indexToSet) => {
    index = indexToSet;
  }

  const getIndex = () => {
    return index;
  }
  
  return {
    setMark,
    getMark,
    setIndex,
    getIndex
  }
};

const Gameboard = (() => {
  let gameboard = [];
  
  for (let i=0; i<9; i++) {
    let cell = Cell();
    cell.setIndex(i);
    gameboard.push(cell);
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
  }

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const getTurn = () => {
    return `It's ${currentPlayer.name}'s turn now !`;
  }

  return {
    playMove,
    getTurn
  }
})();

const displayController = (() => {
  const board = Gameboard.get();
  const game = Gameplay;
  const gameContainer = document.querySelector(".game-container");
  const announcer = document.querySelector(".announcer");
  
  const renderAnnouncer = () => {
    announcer.innerText = game.getTurn();
  }

  const renderCell = (cell) => {
    let cellRender = document.createElement("button");
    cellRender.classList.add("cell");
    cellRender.id = cell.getIndex();
    cellRender.innerText = cell.getMark();
    cellRender.addEventListener("click",playRound);
    gameContainer.appendChild(cellRender);   
  }
  
  const updateGameDisplay = () => {
    renderAnnouncer();

    gameContainer.innerHTML = "";
    board.forEach( cell => renderCell(cell));
  }

  const playRound = (event) => {
    const cellPosition = event.target.id;
    game.playMove(cellPosition);
    updateGameDisplay();
  }

  updateGameDisplay();
})();