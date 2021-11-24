import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '8Y9iQ9O5doXu7diu6R2eX54fN1Bi2h7f';
  private _historial: string[] = [];

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
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=8Y9iQ9O5doXu7diu6R2eX54fN1Bi2h7f&q=dbz&limit=10')
    .subscribe(
      ( resp: any ) => {
        console.log(resp.data);
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
