import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DecodedToken } from "../../interfaces/decoded-token";
import { jwtDecode } from "jwt-decode";
import { Usuario } from "../../models/usuario";
import { DatosService } from "../../services/datos.service";
import { ComprobartokenService } from "../../services/comprobartoken.service";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import {Chart, ChartEvent, LegendElement, LegendItem} from "chart.js/auto";

import {MatTableModule} from '@angular/material/table';
import {max} from "rxjs";

export interface TableElement {
  header: string;
  content1: string;
  content2: string;
}
@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatSelectModule, MatIconModule, MatDividerModule, MatTableModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  showFiller = false;
  chart: any = [];
  chartData: any = [];

  usuario = new Usuario("", "", "", "", "", "", "");


  constructor(private comprobar: ComprobartokenService, private router: Router) {}
  displayedColumns: string[] = ['header', 'content1', 'content2'];
  dataSource: TableElement[] = [
    {header: 'Header 1', content1: 'Data 1.1', content2: 'Data 1.2'},
    {header: 'Header 2', content1: 'Data 2.1', content2: 'Data 2.2'},
    {header: 'Header 3', content1: 'Data 3.1', content2: 'Data 3.2'},
  ];
  ngOnInit(){
    // Recuperar el el token
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);

      // Acceder a la información de data
      const data = decodedToken.data;

      // Asignar propiedades del usuario
      this.usuario.dni = data.dni;
      this.usuario.nombre = data.nombre;
      this.usuario.apellido1 = data.apellido1;
      this.usuario.apellido2 = data.apellido2;
      this.usuario.email = data.Email;
      this.usuario.curso = "2n";
      this.usuario.ciclo = "Desarrollo de Aplicaciones Web";

    }else {
      this.router.navigate(['/login']);
    }

    this.chartData = {
      labels: ['DWEC', 'DWES', 'DIW', 'DAW', 'EIE'],
      datasets: [{
        data: [2,5,3,6,7],
        showLine: false,
      },

      ],
    };

    this.chart = new Chart('canvas', {
      type: 'polarArea',
      data: this.chartData,
      options: {
        scales: {

        },
        aspectRatio: 1.5,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                family: 'Montserrat',
                weight: 800,
              }
            }
          }
        },
      },
    });

  }

  onClickHome (){
    this.router.navigate(['/home']);
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
    //Eliminamos el token una vez hecho logout
    localStorage.removeItem('token');
  }
}

