import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Usuario} from "../../models/usuario";
import {DatosService} from "../../services/datos.service";
import {ComprobartokenService} from "../../services/comprobartoken.service";
import { jwtDecode } from "jwt-decode";
import {DecodedToken} from "../../interfaces/decoded-token";
import {FrasesMotivadorasComponent} from "../frases-motivadoras/frases-motivadoras.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FrasesMotivadorasComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title: string = 'home';

  usuario = new Usuario("", "", "", "", "", "");

  constructor(private service: DatosService, private comprobar: ComprobartokenService, private router: Router) {}

    ngOnInit(){

      // Recuperar el el token
      const token = localStorage.getItem('token');

      if (token && this.comprobar.comprobar(token)) {
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log(decodedToken);

        // Acceder a la información de data
        const data = decodedToken.data;
        console.log('Información de data:', data);

        // Asignar propiedades del usuario
        this.usuario.dni = data.dni;
        this.usuario.nombre = data.nombre;
        this.usuario.apellido1 = data.apellido1;
        this.usuario.apellido2 = data.apellido2;
        this.usuario.email = data.Email;

      }
    }

  onClick (){
    this.router.navigate(['/modulos']);
  }
}

