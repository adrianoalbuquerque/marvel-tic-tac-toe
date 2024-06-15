import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { Observable, catchError, map, throwError } from 'rxjs';
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

    const params = new HttpParams()
      .set('name', characterName)
      .set('apikey', this.apiKey)
      .set('ts', timestamp)
      .set('hash', hash);

    return this.http.get<any>(`${this.apiUrl}/characters`, { params }).pipe(
      map(response => {
        const character = response.data.results[0];
        return `${character.thumbnail.path}.${character.thumbnail.extension}`;
      }),
      catchError(error => {
        return throwError(() => new Error('Personagem não encontrado.'));
      })
    );
  }
}
