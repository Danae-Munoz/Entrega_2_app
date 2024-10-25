import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";
import { Asistencia } from '../interfaces/asistencia';
import { DataBaseService } from '../services/data-base.service';
import { Optional } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

export class Usuario extends Persona {

  public cuenta: string;
  public correo: string;
  public password: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;
  public asistencia: Asistencia;
  public listaUsuarios: Usuario[];
  public confirmPassword: string;

  constructor(@Optional() private db?: DataBaseService) {
    super();
    this.cuenta = '';
    this.correo = '';
    this.password = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = undefined;
    this.confirmPassword = '';
    this.asistencia = this.asistenciaVacia();
    this.listaUsuarios = [];
  }

  public asistenciaVacia(): Asistencia {
    return {  
      bloqueInicio: 0,
      bloqueTermino: 0,
      dia: '',
      horaFin: '',
      horaInicio: '',
      idAsignatura: '',
      nombreAsignatura: '',
      nombreProfesor: '',
      seccion: '',
      sede: ''
    };
  }

  public static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date | undefined,
    confirmPassword: string
  ) {
    let usuario = new Usuario();
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.confirmPassword = confirmPassword;
    return usuario;
  }

  async buscarUsuarioValido(cuenta: string, password: string): Promise<Usuario | undefined> {
    return await this.db!.buscarUsuarioValido(cuenta, password);
  }

  async buscarUsuarioPorCuenta(cuenta: string): Promise<Usuario | undefined>  {
    return await this.db!.buscarUsuarioPorCuenta(cuenta);
  }

  async guardarUsuario(usuario: Usuario): Promise<void> {
    this.db!.guardarUsuario(usuario);
  }

  async eliminarUsuario(cuenta: string): Promise<void>  {
    this.db!.eliminarUsuarioUsandoCuenta(cuenta);
  }

  public override toString(): string {
    return `
      ${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getEducacion()}
      ${this.getFechaNacimiento()}
      ${this.confirmPassword}`;
  }
  crearListausuariosValidos() {
    if (this.listaUsuarios.length === 0) {
      this.listaUsuarios.push(
        Usuario.getNewUsuario(
          'atorres', 
          'atorres@duocuc.cl', 
          '1234', 
          '¿Cuál es tu animal favorito?', 
          'gato', 
          'Ana', 
          'Torres',
          NivelEducacional.buscarNivelEducacional(6)!,
          new Date(2000, 0, 1),
          '1234'
        )
      );
      this.listaUsuarios.push(
        Usuario.getNewUsuario(
          'jperez',
          'jperez@duocuc.cl',
          '5678',
          '¿Cuál es tu postre favorito?',
          'panqueques',
          'Juan',
          'Pérez',
          NivelEducacional.buscarNivelEducacional(5)!,
          new Date(2000, 1, 1),
          '5678'
        )
      );
      this.listaUsuarios.push(
        Usuario.getNewUsuario(
          'cmujica',
          'cmujica@duocuc.cl',
          '0987',
          '¿Cuál es tu vehículo favorito?',
          'moto',
          'Carla',
          'Mujica',
          NivelEducacional.buscarNivelEducacional(6)!,
          new Date(2000, 2, 1),
          '5678'
        )
      );
    }
  }
  
 navegarEnviandoUsuario(router: Router, pagina: string) {
  if (this.cuenta.trim() !== '' && this.password.trim() !== ''){
    const navigationExtras: NavigationExtras={
      state:{
        cuenta: this.cuenta,
        listaUsuarios: this.listaUsuarios,
        asistencia: this.asistencia
      }
    }
    router.navigate([pagina], navigationExtras);
  }else{
    router.navigate(['/ingreso']);

  }

}

}