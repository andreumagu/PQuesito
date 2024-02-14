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
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import {Chart} from "chart.js/auto";
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';

export interface TableElement {
  header: string;
  content1: string;
}

@Component({
  selector: 'app-ra',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatSelectModule, MatIconModule, MatDividerModule, MatTableModule, MatRippleModule],
  templateUrl: './ra.component.html',
  styleUrl: './ra.component.css'
})

export class RaComponent {
  showFiller = false;
  chart: any = [];
  chartData: any = [];

  usuario = new Usuario("", "", "", "", "", "", "");


  constructor(private router: Router, private datos: DatosService) {}

  displayedColumns: string[] = ['header', 'content1'];
  dataSource: TableElement[] = [
    {header: 'RA1', content1: 'Data 1.1'},
    {header: 'RA2', content1: 'Data 2.1'},
    {header: 'RA3', content1: 'Data 3.1'},
    {header: 'RA4', content1: 'Data 3.1'},
    {header: 'RA5', content1: 'Data 3.1'},
  ];
  ngOnInit(){
    // Recuperar el el token
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);

      // Acceder a la información de data
      const data = decodedToken.data;
      console.log(data);

      // Asignar propiedades del usuario
      this.usuario.dni = data.dni;
      this.usuario.nombre = data.nombre;
      this.usuario.apellido1 = data.apellido1;
      this.usuario.apellido2 = data.apellido2;
      this.usuario.email = data.Email;
      this.usuario.curso = "2023-2024";
      this.usuario.ciclo = "Desarrollo de Aplicaciones Web";

      this.datos.getMedias("2324", this.usuario.dni).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    }else {
      this.router.navigate(['/login']);
    }

    this.chartData = {
      labels: ['DWEC', 'DWES', 'DIW', 'DAW', 'EIE'],
      datasets: [{
        data: [2,4,6,8,10],
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: [
          'rgba(147,202,226,0.7)',
          'rgba(95,176,211,0.7)',
          'rgba(64,160,201,0.7)',
          'rgba(44,123,160,0.7)',
          'rgba(50,107,136,0.7)',
          'rgba(44,81,99,0.7)',
        ],
      }],
    };

    this.chart = new Chart('canvas', {
      type: 'polarArea',
      data: this.chartData,
      options: {
        scales: {
          r: {
            max: 10,
          },
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

