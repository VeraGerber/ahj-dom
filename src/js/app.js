class GameBoard {
  constructor(boardSize) {
    this.boardSize = boardSize ** 2;
    this.previousIndexCell = 0;
    this.currentIndexCell = 0;
  }

  drawBoard() {
    const board = document.getElementById('board');
    for (let i = 0; i < this.boardSize; i += 1) {
      const itemBoard = document.createElement('div');
      itemBoard.className = 'cell';
      itemBoard.id = `cell${i}`;
      board.appendChild(itemBoard);
    }

    this.randomImg();
  }

  randomImg() {
    this.intervalId = setInterval(() => {
      do {
        this.currentIndexCell = Math.floor(Math.random() * this.boardSize);
      } while (this.currentIndexCell === this.previousIndexCell);

      if (this.previousIndexCell >= 0) {
        const previousCell = document.getElementById(`cell${this.previousIndexCell}`);
        previousCell.innerHTML = '';
      }

      const currentCell = document.getElementById(`cell${this.currentIndexCell}`);
      currentCell.innerHTML = '<img src = "./img/goblin.png">';
      this.previousIndexCell = this.currentIndexCell;
    }, 1000);
  }
}

const newBoard = new GameBoard(4);

newBoard.drawBoard();
