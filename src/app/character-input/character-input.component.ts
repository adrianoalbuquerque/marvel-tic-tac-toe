import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarvelService } from '../service/service.service';
import { Subscription } from "rxjs"

@Component({
  selector: 'app-character-input',
  templateUrl: './character-input.component.html',
  styleUrls: ['./character-input.component.scss']
})
export class CharacterInputComponent implements OnInit {

  characterName: string = '';
  errorMessage: string = '';
  hero: string = '';
  disabled: boolean = false;

  @Input() label: string = "";
  @Input() player: string = "";
  @Input('error') set setError(value: string) {
    this.errorMessage = value;
    if (value !== "") {
      this.characterName = "";
      this.disabled = false;
    }
  }
  @Output() nameEntered = new EventEmitter<string>();

  private subscriptions = new Subscription();

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {

  }

  onInputChange() {
    this.errorMessage = '';
    this.hero = '';

    if (this.characterName !== '') {
      this.subscriptions.add(this.marvelService.getCharacterThumbnail(this.characterName).subscribe(
        thumbnail => {
          this.hero = thumbnail;

          this.nameEntered.emit(this.characterName);
          this.disabled = true;

          if (this.disabled) {
            setTimeout(() => {
              this.subscriptions.unsubscribe();
            }, 1000);
          }
        },
        error => {
          this.errorMessage = error;
          this.disabled = false;
        }));
    }
  }
}
