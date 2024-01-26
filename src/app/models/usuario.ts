export class Usuario {
  dni: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  curso: string;

  constructor(dni: string, nombre: string, apellido1: string, apellido2: string, curso: string) {
    this.dni= dni;
    this.nombre= nombre;
    this.apellido1= apellido1;
    this.apellido2= apellido2;
    this.curso = curso;
  }
}
