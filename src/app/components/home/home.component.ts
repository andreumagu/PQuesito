import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Usuario} from "../../models/usuario";
import {DatosService} from "../../services/datos.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuario = new Usuario("", "", "", "", "");

  email = 'eva.e@example.com';

  constructor(private service: DatosService) {
  }

  ngOnInit() {
    this.service.getDatos(this.email).subscribe(response => {
      this.usuario = response;
    })
  }
}
