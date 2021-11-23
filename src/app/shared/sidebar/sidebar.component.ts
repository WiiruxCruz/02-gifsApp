import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get historial() {
    //regresar el historial que está en el servicio
    return this.gifsService.historial;
  }

}
