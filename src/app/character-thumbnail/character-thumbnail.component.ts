import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-thumbnail',
  templateUrl: './character-thumbnail.component.html',
  styleUrls: ['./character-thumbnail.component.scss']
})
export class CharacterThumbnailComponent implements OnInit {

  constructor() { }

  @Input() hero: string = "";
  @Input() characterName: string = "";

  ngOnInit(): void {
  }

}
