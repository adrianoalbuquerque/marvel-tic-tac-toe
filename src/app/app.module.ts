import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardCellComponent } from './board-cell/board-cell.component';
import { CharacterInputComponent } from './character-input/character-input.component';
import { CharacterThumbnailComponent } from './character-thumbnail/character-thumbnail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarvelService } from './service/service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardCellComponent,
    CharacterInputComponent,
    CharacterThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MarvelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
