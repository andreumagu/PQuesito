export class Usuario {
  dni: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  curso: string;
  email: string;

  constructor(dni: string, nombre: string, apellido1: string, apellido2: string, curso: string, email: string) {
    this.dni= dni;
    this.nombre= nombre;
    this.apellido1= apellido1;
    this.apellido2= apellido2;
    this.curso = curso;
    this.email = email;
  }
}
