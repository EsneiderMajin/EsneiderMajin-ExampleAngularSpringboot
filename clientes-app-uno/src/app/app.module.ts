import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteService } from './clientes/cliente.service';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes} from '@angular/router';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';

import { from } from 'rxjs';

const routes: Routes = [
  {path:'',redirectTo:'/clientes',pathMatch:'full'},
  {path:'clientes',component: ClientesComponent},
  {path:'cliente/form',component: FormComponent},
  {path:'cliente/form/:id',component: FormComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FooterComponent,
    HeaderComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
