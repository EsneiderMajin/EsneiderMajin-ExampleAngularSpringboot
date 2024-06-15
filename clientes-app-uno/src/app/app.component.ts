import { Component,OnInit } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { ClienteService } from './clientes/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clientes-app-uno';
  nombre:string='Arquitecturas empresariales';
}
