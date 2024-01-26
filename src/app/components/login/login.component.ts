import { Component } from '@angular/core';
import {Usuario} from "../../models/usuario";
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

  // @ts-ignore
  posts = new Usuario('', '');

  /* Creamos una instancia (objeto) de la clase Service */
  constructor(private service:LoginService) {}

  emailUsuario: string = "";
  contra: string = "";

  onClick(){
   const jsonData: string = JSON.stringify({
     email: this.emailUsuario,
     password: this.contra
   })
     console.log(jsonData);

  }

}
