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
import {Chart, ChartEvent, LegendElement, LegendItem} from "chart.js/auto";
import {MatTableModule} from '@angular/material/table';
import {max} from "rxjs";

export interface TableElement {
  header: string;
  content1: string;
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


  constructor(private router: Router, private datos: DatosService) {}
  displayedColumns: string[] = ['header', 'content1'];
  dataSource: TableElement[] = [];
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
      this.usuario.curso = "2023-2024";
      this.usuario.ciclo = data.ciclo;

      // Llama al servicio para obtener las notas medias
      this.datos.getMedias("2324", this.usuario.dni).subscribe(
        response => {
          console.log(response);
          // Comprueba si hay datos de notas medias recibidos
          if (response) {
            // Mapea los datos recibidos para adaptarlos a la estructura de la tabla
            this.dataSource = Object.keys(response).map(key => ({ header: key, content1: response[key].Media }));

            // Actualiza los datos del gráfico con los datos de la tabla
            this.chartData = {
              labels: this.dataSource.map(item => item.header),
              datasets: [{
                data: this.dataSource.map(item => item.content1),
                showLine: false,
              }],
            };

            // Actualiza el gráfico con los nuevos datos
            this.chart.data = this.chartData;
            this.chart.update();
          } else {
            console.log('No hay datos de notas medias disponibles para mostrar.');
          }
        },
        error => {
          console.log(error);
        }
      );

    }else {
      this.router.navigate(['/login']);
    }

    /*this.chartData = {
      labels: ['DWEC', 'DWES', 'DIW', 'DAW', 'EIE'],
      datasets: [{
        data: [2,5,3,6,7],
        showLine: false,
      },
     ],
    }; */

    this.chart = new Chart('canvas', {
      type: 'polarArea',
      data: this.chartData,
      options: {
        scales: {
          r:{
            max:10,
          }
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

