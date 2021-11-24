import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '8Y9iQ9O5doXu7diu6R2eX54fN1Bi2h7f';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  constructor( private http: HttpClient) {
    //this._historial = localStorage.getItem('historial');
    /*
    if( localStorage.getItem('historial') ){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }
    */
   this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
   this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
  }

  get historial() {

    return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );

    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query)
    ;

    //utilización de observables
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params})
    .subscribe(
      ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados) );
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
