import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-thumbnail',
  templateUrl: './character-thumbnail.component.html',
  styleUrls: ['./character-thumbnail.component.scss']
})
export class CharacterThumbnailComponent implements OnInit {

  constructor() { }

  path: string = "";
  @Input() label: string = "";
  @Input() hero: string = "";
  @Input() characterName: string = "";

  ngOnInit(): void {
    if(this.label === "Player 1") {
      this.path = `../../assets/img/hero/${this.hero}.jpg`
    } else {
      this.path = `../../assets/img/villain/${this.hero}.jpg`
    }
    console.log(this.path);

  }
}
