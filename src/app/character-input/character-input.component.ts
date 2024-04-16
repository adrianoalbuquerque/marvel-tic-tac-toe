import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarvelService } from '../service/service.service';

@Component({
  selector: 'app-character-input',
  templateUrl: './character-input.component.html',
  styleUrls: ['./character-input.component.scss']
})
export class CharacterInputComponent implements OnInit {

  characterName: string = '';
  errorMessage: string = '';
  hero: string = '';

  @Input() label: string = "";
  @Input('error') set setError(value: string) {
    this.errorMessage = value;
    if (value !== "") {
      this.characterName = "";
    }
  }
  @Output() nameEntered = new EventEmitter<string>();

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {

  }

  onInputChange() {
    this.errorMessage = '';
    this.hero = '';

    if (this.characterName !== '') {
      this.marvelService.getCharacterThumbnail(this.characterName).subscribe(
        thumbnail => {
          this.hero = thumbnail;

          this.nameEntered.emit(this.characterName);
        },
        error => {
          this.errorMessage = error;
        })
    }
  }
}
