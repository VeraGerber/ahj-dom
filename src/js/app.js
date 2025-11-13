class GameBoard {
  constructor(boardSize) {
    this.boardSize = boardSize ** 2;
    this.previousIndexCell = -1; // Лучше начать с -1, чтобы первое появление было в любой ячейке
    this.currentIndexCell = 0;
    this.intervalId = null; // Хорошая практика - инициализировать как null
    this.moves = 0; // Счётчик ходов для демонстрации
    this.maxMoves = 10; // Лимит ходов
  }

  drawBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''; // Очищаем доску перед перерисовкой, если это нужно
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
      this.moves++;
      console.log(`Ход номер ${this.moves}`);

      if (this.moves > this.maxMoves) {
        console.log("Игра окончена по лимиту ходов!");
        this.stopGame();
        alert("Время вышло!");
        return; // Выходим из функции, чтобы код ниже не выполнился
      }

      do {
        this.currentIndexCell = Math.floor(Math.random() * this.boardSize);
      } while (this.currentIndexCell === this.previousIndexCell);

      // Очищаем предыдущую ячейку, только если она была
      if (this.previousIndexCell >= 0) {
        const previousCell = document.getElementById(`cell${this.previousIndexCell}`);
        if(previousCell) previousCell.innerHTML = ''; // Проверка на всякий случай
      }

      const currentCell = document.getElementById(`cell${this.currentIndexCell}`);
      if(currentCell) currentCell.innerHTML = '<img src = "./img/goblin.png">';
      this.previousIndexCell = this.currentIndexCell;
    }, 1000);
  }

  // Новый метод для остановки игры
  stopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null; // Сбрасываем ID, показывая, что интервал больше не активен
      console.log("Интервал остановлен.");
    }
  }
}

const newBoard = new GameBoard(4);
newBoard.drawBoard();

// Пример кнопки для остановки игры вручную
const stopButton = document.createElement('button');
stopButton.textContent = 'Остановить игру';
document.body.appendChild(stopButton);

stopButton.addEventListener('click', () => {
  newBoard.stopGame();
  alert('Игра остановлена вручную!');
});
