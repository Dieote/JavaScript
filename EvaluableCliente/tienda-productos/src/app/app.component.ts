import { Component } from '@angular/core';
import { TiendaComponent } from './componentes/tienda/tienda.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TiendaComponent],
  templateUrl: './app.component.html'
})
export class AppComponent { }
