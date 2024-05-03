import { AppRoutingModulesRoutes } from './app-routing-modules';
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
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardCellComponent,
    CharacterInputComponent,
    CharacterThumbnailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModulesRoutes
  ],
  providers: [
    MarvelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
