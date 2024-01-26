import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  /* Creamos una instancia (objeto) de la clase Service */
  constructor(private service:LoginService) {}

  emailUsuario: string = "";
  contra: string = "";

  onIniciarClick() {
    const jsonData = JSON.stringify({
      email: this.emailUsuario,
      password: this.contra
    })
    //
    // const jsonData = {
    //     email: this.email,
    //     password: this.passwd
    // };
    console.log(jsonData);

    this.service.getToken(jsonData).subscribe(
      // next: (response) => {
      //   console.log(response);
      //   // Maneja la respuesta aquí
      // },
      response => {
        console.log(response);
      },
      error => {
        console.log("No se han obtenido los datos");
      }
    );

  }

}
