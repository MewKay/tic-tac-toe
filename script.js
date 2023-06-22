const Cell = () => {
  let mark = 0;

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