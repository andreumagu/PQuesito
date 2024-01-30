import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { Router} from "@angular/router";

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
  constructor(private service:LoginService, private router: Router) {}

  email: string = "";
  password: string = "";

  onIniciarClick() {
    this.service.getToken(this.email, this.password).subscribe(
      response => {
        console.log(response);
        //Redireccionamos a la página de home
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      }
    );

  }

}
