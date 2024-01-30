import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Usuario} from "../../models/usuario";
import {DatosService} from "../../services/datos.service";
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
  title: string ='home';

  usuario = new Usuario("", "", "", "", "");

  email = 'eva.e@example.com';

  constructor(private service: DatosService, private router: Router) {
  }

  ngOnInit() {
    this.service.getDatos(this.email).subscribe(response => {
      this.usuario = response;
    })
  }

  onClick(){
    this.router.navigate(['/modulos']);
  }
}
