import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable, catchError, throwError } from 'rxjs';
import { of } from 'rxjs';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Region } from './Region';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8085/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  //consimiendo el servicio
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint+'/regiones');
  }
  
  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }


  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.mensaje);
          swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
