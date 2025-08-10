import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HERO_LIST, VILLAIN_LIST } from '../shared/contants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  player1: string = "Player 1";
  player2: string = "Player 2";
  winner: string = '';
  clearWinner: boolean = false;

  dataAtual = new Date();
  anoAtual = this.dataAtual.getFullYear();

  @Output() error = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.player1 = this.getRandomName(HERO_LIST);
    this.player2 = this.getRandomName(VILLAIN_LIST);
  }

  onWin(event: string) {
    this.winner = '';
    if (event !== "") {
      this.winner = event;
    }
  }

  onClearWinner(event: boolean) {
    this.clearWinner = event;
  }

  players(event: string, order: number) {
    if (order === 1) {
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

  getRandomName(list: string[]): string {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  }


}
