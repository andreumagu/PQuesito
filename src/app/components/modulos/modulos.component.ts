import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatSelectModule, MatIconModule, MatDividerModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  showFiller = false;

  constructor(private router: Router) {}
  onClickHome (){
    this.router.navigate(['/home']);
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
    //Eliminamos el token una vez hecho logout
    localStorage.removeItem('token');
  }
}
