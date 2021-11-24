import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '8Y9iQ9O5doXu7diu6R2eX54fN1Bi2h7f';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  constructor( private http: HttpClient) {}

  get historial() {

    return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    //utilización de observables

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8Y9iQ9O5doXu7diu6R2eX54fN1Bi2h7f&q=${ query }&limit=10`)
    .subscribe(
      ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
      }
    )

    /* forma tradicional
    fetch('https://api.giphy.com/v1/gifs/search?api_key=8Y9iQ9O5doXu7diu6R2eX54fN1Bi2h7f&q=dbz&limit=10')
    .then(
      resp => {
        resp.json().then( data => {
          console.log(data);
        })
      }
    );
    */

    /*
    //forma limpia agregar el async al metodo
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=8Y9iQ9O5doXu7diu6R2eX54fN1Bi2h7f&q=dbz&limit=10');
    const data = await resp.json();
    console.log(data);
    */

    console.log(this._historial);
  }
}
