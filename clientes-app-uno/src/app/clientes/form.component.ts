import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './Region';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  errores: string[] = [];
  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {}
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';
  public regiones: Region[] = [];

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    });

    this.clienteService.getRegiones().subscribe(
      regiones => this.regiones = regiones
    );
    
  }

  public update(): void {
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes']);
      swal.fire(
        'Cliente Actualizado',
        `Cliente actualizado con éxito!`,
        'success'
      );
    },err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
      }
  );
  }



  public crearCliente(): void {
    this.clienteService.create(this.cliente).subscribe((respose) => {
      this.router.navigate(['/clientes']);
      swal.fire(
        'Nuevo cliente',
        `Cliente ${respose.nombre} creado con éxito!`,
        'success'
      );
    },err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
      }
  
  );
  }

  compararRegion(o1: Region, o2: Region): boolean {
    
    let bandera : boolean;
    
    if (o1 == undefined && o2 == undefined) {
      bandera = true;
    }
    else if(o1 == null || o2 == null || o1 == undefined || o2 == undefined){
      bandera = false;
    }
    else if(o1.id == o2.id){
      bandera = true;
    }
    else{
      bandera = false;
    }
    return bandera;
  }

}
