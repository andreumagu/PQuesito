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
  modulo: string;
  nota: string;
}

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatSelectModule, MatIconModule, MatDividerModule, MatTableModule, MatRippleModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})

export class ModulosComponent {
  showFiller = false;
  chart: any = [];
  chartData: any = [];

  usuario = new Usuario("", "", "", "", "", "", "");

  datosMedias: any;

  constructor(private router: Router, private datos: DatosService) {}

  displayedColumns: string[] = ['header', 'content1'];
  dataSource: { content1: string; header: string }[] = [];


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
      this.usuario.curso = "2324";
      this.usuario.ciclo = data.ciclo;
      console.log(this.usuario);

      this.datos.getMedias(this.usuario.curso, this.usuario.dni).subscribe(
        response => {
          //Almacenamos y asignamos los datos (clave,valor) en la array de la tabla
          this.dataSource =  Object.keys(response).map(key => ({header: key, content1: response[key].Media.toFixed(2)}));

        },
        error => {
          console.log(error);
        }
      );

      // this.datos.getDatos(modulos[1], this.usuario.curso, this.usuario.dni).subscribe(
      //   response => {
      //     console.log(1);
      //     notas = response;
      //     console.log(notas);
      //   },
      //   error => {
      //     console.log(2);
      //     console.log(error);
      //   }
      // );
      //
      // let media = notas['Media'];
      //
      // if (notasModulos.hasOwnProperty(2)){
      //   notasModulos[1] = media;
      // }

      // for (let i in modulos){
      //   this.datos.getDatos(modulos[i], this.usuario.curso, this.usuario.dni).subscribe(
      //     response => {
      //       notas = response;
      //       console.log(notas);
      //     },
      //     error => {
      //       console.log(2);
      //       console.log(error);
      //     }
      //   );
      //
      //   let media = notas['Media'];
      //
      //   if (notasModulos.hasOwnProperty(i)){
      //     notasModulos[i] = media;
      //   }
      // }

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

  onClickHome(){
    this.router.navigate(['/home']);
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
    //Eliminamos el token una vez hecho logout
    localStorage.removeItem('token');
  }
}

