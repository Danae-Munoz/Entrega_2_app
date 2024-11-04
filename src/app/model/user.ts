import { EducationalLevel } from './educational-level';
import { Person } from "./person";
import { DatabaseService } from '../services/database.service';
import { inject } from '@angular/core';
import { convertDateToString } from '../tools/date-functions';

export class User extends Person {

  

  userName = '';
  email = '';
  password = '';
  secretQuestion = '';
  secretAnswer = '';
  //db = inject(DataBaseService);
  image = '';

  constructor() {
    super();
  }

  static getNewUsuario(
    userName: string,
    email: string,
    password: string,
    secretQuestion: string,
    secretAnswer: string,
    firstName: string,
    lastName: string,
    educationalLevel: EducationalLevel,
    dateOfBirth: Date,
    address: string,
    image: string
  ) {
    let usuario = new User();
    usuario.userName = userName;
    usuario.email = email;
    usuario.password = password;
    usuario.secretQuestion = secretQuestion;
    usuario.secretAnswer = secretAnswer;
    usuario.firstName = firstName;
    usuario.lastName = lastName;
    usuario.educationalLevel = educationalLevel;
    usuario.dateOfBirth = dateOfBirth;
    usuario.address = address;
    usuario.image = image;
    return usuario;
  }

  // async findUser(userName: string, password: string): Promise<User | undefined> {
  //   return await this.db.findUser(userName, password);
  // }

  // async findByUserName(userName: string): Promise<User | undefined>  {
  //   return await this.db.findUserByUserName(userName);
  // }

  // async findByEmail(email: string): Promise<User | undefined>  {
  //   return await this.db.findUserByEmail(email);
  // }

  // async save(): Promise<void> {
  //   this.db.saveUser(this);
  // }

  // async delete(userName: string): Promise<void>  {
  //   this.db.deleteByUserName(userName);
  // }

  override toString(): string {
    return `\n
        User name: ${this.userName}\n
        Email: ${this.email}\n
        Password: ${this.password}\n
        secretQuestion: ${this.secretQuestion}\n
        secretAnswer: ${this.secretAnswer}\n
        First name: ${this.firstName}\n
        Last name: ${this.lastName}\n
        Education level: ${this.educationalLevel.getEducation()}\n
        Date of birth: ${convertDateToString(this.dateOfBirth)}\n
        Address: ${this.address}\n
        Image: ${this.image !== ''}\n
      `;
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

  public buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
    return this.listaUsuarios.find(usu => usu.cuenta === cuenta && usu.password === password);
  }

  public buscarUsuarioPorCuenta(cuenta: string): Usuario | undefined {
    return this.listaUsuarios.find(usu => usu.cuenta === cuenta);
  }

  public validarCuenta(): string {
    if (this.cuenta.trim() === '') {
      return 'Para ingresar al sistema debe seleccionar una cuenta.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para igresar al sistema debe escribir la contraseña.';
    }
    for (let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    let error = this.validarCuenta();
    if (error) return error;
    error = this.validarPassword();
    if (error) return error;
    const usu = this.buscarUsuarioValido(this.cuenta, this.password);
    if (!usu) return 'Las credenciales del usuario son incorrectas.';
    return '';
  }

  public override toString(): string {
    return `      ${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getEducacion()}
      ${this.getFechaNacimiento()}`;
  }

  recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
     if (this.listaUsuarios.length == 0) this.crearListausuariosValidos();
     activatedRoute.queryParams.subscribe(()=> {
        const nav = router.getCurrentNavigation();
        if (nav) {
          if (nav.extras.state){
            this.listaUsuarios= nav.extras.state['listaUsuarios'];
            const encontrado = this.buscarUsuarioPorCuenta(
              nav.extras.state['cuenta']);
              this.cuenta= encontrado!.cuenta
              this.password= encontrado!.password
              this.confirmPassword= encontrado!.confirmPassword
              this.correo= encontrado!.correo
              this.preguntaSecreta= encontrado!.preguntaSecreta
              this.respuestaSecreta= encontrado!.respuestaSecreta
              this.nombre= encontrado!.nombre
              this.apellido= encontrado!.apellido
              this.nivelEducacional= encontrado!.nivelEducacional
              this.fechaNacimiento= encontrado!.fechaNacimiento

              this.asistencia= encontrado!.asistencia= nav.extras.state['asistencia'];
              return;
          }

        }
        router.navigate(['/ingreso'])
     });

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

  actualizarUsuario() {
    const usu = this.buscarUsuarioPorCuenta(this.cuenta);
    if (usu){
      usu.correo =this.correo;
      usu.password =this.password;
      usu.preguntaSecreta =this.preguntaSecreta;
      usu.respuestaSecreta =this.respuestaSecreta;
      usu.nombre =this.nombre;
      usu.apellido=this.apellido;
      usu.nivelEducacional =this.nivelEducacional;
      usu.fechaNacimiento =this.fechaNacimiento;
      usu.asistencia =this.asistencia;
      usu.confirmPassword=this.confirmPassword;
    }

  }

  public static buscarUsuarioPorCorreo(correo: string): User | undefined {
    const usuario = new User();  // Crear una nueva instancia de Usuario
    usuario.crearListausuariosValidos();  // Asegurarte de que la lista de usuarios esté poblada
    return usuario.listaUsuarios.find(usu => usu.correo === correo);  // Buscar en la lista de usuarios
  }
}

}