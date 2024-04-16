import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

class Player {
  state: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const winStates = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1]
];

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

  ngOnInit(): void { }

  move(index: number, player: Player) {
    if (this.player_1.state[index] === 0 && this.player_2.state[index] === 0) {
      this.clearWinner.emit(false);
      player.state[index] = 1;
      this.moveCounter++;
      this.board[index] = this.currentPlayer === this.player_1 ? 'x' : 'o';
      if (this.moveCounter > 4) {
        this.checkWin(this.currentPlayer);
      }
      this.currentPlayer = this.switchCurrentPlayer();
    } else {
      if(this.board[8]) {
        this.btnReset = true;
        alert("Que pena, acabaram movimentos 😩");
      } else {
        alert("Movimento inválido 😤");
      }
    }
    if(this.board[0] !== null) {

    }
  }

  switchCurrentPlayer() {
    return this.currentPlayer === this.player_1 ? this.player_2 : this.player_1;
  }

  checkWin(player: Player) {
    winStates.map(state => {
      const res = state.map((currElement, index) => {
        return player.state[index] * currElement;
      })
      if (state.toString().includes(res.toString())) {
        this.endGame(player);
      }
    })
  }

  endGame(player: any) {
    console.log(player)
    this.count++;
    // alert(this.currentPlayer.name + ' é o vencedor 🎈🎉🐱‍💻');
    this.player_1 = new Player(this.player1);
    this.player_2 = new Player(this.player2);
    this.board = [null, null, null, null, null, null, null, null, null];
    this.moveCounter = 0;

    if (this.currentPlayer.name === this.player1) {
      this.winner.emit({ play: 'player1', count: this.count, name: player.name });
      this.clearWinner.emit(true);
    } else if (this.currentPlayer.name === this.player2) {
      this.winner.emit({ play: 'player2', count: this.count, name: player.name });
      this.clearWinner.emit(true);
    } else {
      this.winner.emit({ play: 'cant move', count: this.count, name: '' });
    }
  }

  resetGame() {
    // Lógica para redefinir o estado do jogo
    this.player_1 = new Player(this.player1);
    this.player_2 = new Player(this.player2);
    this.board = [null, null, null, null, null, null, null, null, null];
    this.moveCounter = 0;
    this.currentPlayer = this.player_1;
    this.btnReset = false;
  }

}
