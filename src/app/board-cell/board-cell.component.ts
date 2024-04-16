import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.scss']
})
export class BoardCellComponent implements OnInit {

  @Input('player1') set setPlayer1(value: string) {
    this.player1 = value;
  }
  @Input('player2') set setPlayer2(value: string) {
    this.player2 = value;
  }

  @Input('winner') set setWinner(value: any) {
    let count = 0;
    if (count !== value.count) {
      count = value.count;
      this.win = "";

      if (value.play === 'player1') {
        this.scoreboard1++;
        this.win = value.name;
      } else if (value.play === 'player2') {
        this.scoreboard2++;
        this.win = value.name;
      } else {
        this.noMove++;
      }
    }
  }

  @Input('clearWinner') set setClearWinner(value: boolean) {
    this.clearWinner = value;
    if (value) {
      this.win = '';
    }
  }

  player1: string = "";
  player2: string = "";
  win: string = "";
  clearWinner: boolean = false;

  scoreboard1: number = 0;
  scoreboard2: number = 0;
  noMove: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
