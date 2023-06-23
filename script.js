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

const GameOverCheck = (() => {
  const board = Gameboard.get();

  const checkIfThreeMatches = (firstPosition,secondPosition,thirdPosition) => {
    const firstMark = board[firstPosition].getMark();
    const secondMark = board[secondPosition].getMark();
    const thirdMark = board[thirdPosition].getMark();
    
    if(firstMark === "" ||
        secondMark === "" ||
        thirdMark === "")
        return false;

    return ( firstMark === secondMark &&
              secondMark === thirdMark &&
              firstMark === thirdMark);
  }
  
  const checkWinHorizontal = () => {
    for(let i=0; i<board.length; i+=3) {
      if(checkIfThreeMatches(i,i+1,i+2))
        return true; 
    }
    return false;    
  }

  const checkWinVertical = () => {
    for(let i=0; i<3; i++) {
      if(checkIfThreeMatches(i,i+3,i+6))
        return true; 
    }
    return false;
  }

  const checkWinDiagonal = () => {
    if(checkIfThreeMatches(0,4,8) ||
        checkIfThreeMatches(2,4,6))
      return true; 
    
    return false;
  }

  const checkWin = () => {
    if(checkWinHorizontal() ||
      checkWinVertical() ||
      checkWinDiagonal())
      return true;
    
    return false;
  }

  const checkTie = () => {
    for (const cell of board) {
      if(cell.getMark() === "") 
        return false;
    }
    return true;
  }

  return {
    checkWin,
    checkTie
  }
  
})();

const Gameplay = (() => {
  const player1 = Player("Player One","O");
  const player2 = Player("Player Two", "X");
  const board = Gameboard.get();
  const gameOver = GameOverCheck;
  let currentPlayer = player1;

  const playMove = (cellPosition) => {
    if(gameOver.checkWin())
      return;

    const cellToSetMark = board[cellPosition];
    const markToSet = currentPlayer.mark;

    if(cellToSetMark.getMark() !== "") 
      return;

    cellToSetMark.setMark(markToSet);

    if(!gameOver.checkWin())
      switchTurn();
  }

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const getTurn = () => {
    return `It's ${currentPlayer.name}'s turn now !`;
  }

  const getCurrentPlayer = () => {
    return currentPlayer.name;
  }

  return {
    playMove,
    getTurn,
    getCurrentPlayer
  }
})();

const displayController = (() => {
  const board = Gameboard.get();
  const game = Gameplay;
  const gameOver = GameOverCheck;
  const gameContainer = document.querySelector(".game-container");
  const announcer = document.querySelector(".announcer");
  
  const renderAnnouncer = () => {
    announcer.innerText = game.getTurn();
  }

  const renderWinner = () => {
    announcer.innerText = `${game.getCurrentPlayer()} is the winner !`;
  }

  const renderTieMessage = () => {
    announcer.innerText = "Welp, it's a tie !";
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
    if(gameOver.checkWin())
      renderWinner();
    if(gameOver.checkTie())
      renderTieMessage();
  }

  updateGameDisplay();
})();