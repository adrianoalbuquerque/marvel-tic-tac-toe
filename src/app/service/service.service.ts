import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private apiUrl = 'https://gateway.marvel.com/v1/public';
  private apiKey = '930d72c86a4da58ede8cc1b610d1f89b';
  private privateKey = '27bfc3d97a43cbab95080d437c15fde16271fc0e';

  constructor(private http: HttpClient) { }

  getCharacterThumbnail(characterName: string): Observable<string> {
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + this.privateKey + this.apiKey).toString();
    const url = `${this.apiUrl}/characters?name=${characterName}&apikey=${this.apiKey}&ts=${timestamp}&hash=${hash}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const character = response.data.results[0];
        return `${character.thumbnail.path}.${character.thumbnail.extension}`;
      }),
      catchError(error => {
        throw new Error('Personagem não encontrado.');
      })
    );
  }
}
