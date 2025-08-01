import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

class Player {
  state: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  @Input('player1') set setPlayer1(value: string) {
    this.player1 = value;
    this.player_1.name = value;
  }
  @Input('player2') set setPlayer2(value: string) {
    this.player2 = value;
    this.player_2.name = value;
  }

  @Output() winner = new EventEmitter<any>();
  @Output() clearWinner = new EventEmitter<boolean>();

  player1: string = "";
  player2: string = "";

  player_1 = new Player(this.player1);
  player_2 = new Player(this.player2);

  moveCounter = 0;
  currentPlayer = this.player_1;
  count: number = 0;
  board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  btnReset: boolean = false;

  isFirstGame: boolean = true;
  lastWinner: string = ''; // 'player1', 'player2'

  ngOnInit(): void { }

  move(index: number, player: Player) {
    if (this.player_1.state[index] === 0 && this.player_2.state[index] === 0) {
      this.clearWinner.emit(false);
      player.state[index] = 1;
      this.moveCounter++;
      this.board[index] = this.currentPlayer === this.player_1 ? 'x' : 'o';

      const winner = this.checkWinner();

      if (winner) {
        this.endGame(winner);
      } else {
        this.currentPlayer = this.switchCurrentPlayer();
      }
    } else {
      // alert("Movimento inválido 😤");
      this.showToast("Movimento inválido 😤");
    }
  }

  switchCurrentPlayer() {
    return this.currentPlayer === this.player_1 ? this.player_2 : this.player_1;
  }

  checkWinner(): string | null {
    const linesToCheck = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
      [0, 4, 8], [2, 4, 6] // Diagonais
    ];

    for (const line of linesToCheck) {
      const [a, b, c] = line;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a]; // 'x' ou 'o'
      }
    }

    if (this.moveCounter === 9) {
      return 'draw'; // Empate
    }

    return null;
  }

  endGame(result: string) {
    this.count++;

    if (result === 'draw') {
      this.winner.emit({ play: 'draw', count: this.count, name: 'Empate 🤝' });
      // Não altera lastWinner
    } else {
      const isPlayer1 = this.currentPlayer === this.player_1;
      const play = isPlayer1 ? 'player1' : 'player2';
      const name = isPlayer1 ? this.player1 : this.player2;

      this.lastWinner = play;
      this.winner.emit({ play, count: this.count, name });
    }

    this.clearWinner.emit(true);
    this.resetGame();
  }


  resetGame() {
    this.player_1 = new Player(this.player1);
    this.player_2 = new Player(this.player2);

    this.board = Array(9).fill(null);
    this.moveCounter = 0;
    this.btnReset = false;

    if (!this.lastWinner) {
      this.currentPlayer = this.player_1; // Primeira partida
    } else {
      this.currentPlayer = this.lastWinner === 'player1' ? this.player_1 : this.player_2;
    }
  }

  toastVisible: boolean = false;
  toastMessage: string = '';

  showToast(message: string, duration: number = 3000): void {
    this.toastMessage = message;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, duration);
  }

}
