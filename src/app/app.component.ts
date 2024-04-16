import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Marvel tic-tac-toe';

  player1: string = "Player 1";
  player2: string = "Player 2";
  winner: string = '';
  clearWinner: boolean = false;

  @Output() error = new EventEmitter<string>();

  onWin(event: string) {
    this.winner = '';
    if(event !== "") {
      this.winner = event;
    }
  }

  onClearWinner(event: boolean) {
    this.clearWinner = event;
  }

  players(event: string, order: number) {
    if(order === 1) {
      this.player1 = event.toUpperCase();
    } else {
      this.player2 = event.toUpperCase();
    }
    this.verificarEntrada();
  }

  errorMessage: string = "";

  verificarEntrada(): void {
    if (this.player1 === this.player2) {
      this.errorMessage = "Os personagens não podem ser iguais";
    } else {
      this.errorMessage = "";
    }
    this.error.emit(this.errorMessage);
  }
}
