import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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
