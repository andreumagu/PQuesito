import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-frases-motivadoras',
  standalone: true,
  imports: [],
  templateUrl: './frases-motivadoras.component.html',
  styleUrl: './frases-motivadoras.component.css'
})
export class FrasesMotivadorasComponent implements OnInit{

  frases: string[] = [
    "Vamos que tu puedes! #YPOYAQUE.",
    "La perseverancia es la clave del éxito.",
    "El único modo de hacer un gran trabajo es amar lo que haces.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día."
  ];
  frase: string = '';

  constructor() {
  }

  ngOnInit(): void {
  this.cambiarFrase();
  }

  cambiarFrase() {
  setInterval(() => {
    const index = Math.floor(Math.random() * this.frases.length);
    this.frase = this.frases[index];
  }, 9000); // Cambia la frase cada 9 segundos
}

}
