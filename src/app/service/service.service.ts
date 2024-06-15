import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private privateKey = environment.privateKey;

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
