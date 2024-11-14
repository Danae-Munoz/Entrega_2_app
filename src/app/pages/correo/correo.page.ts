import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { IonicModule } from '@ionic/angular';  
import { NavigationExtras, Router } from '@angular/router';  
import { AlertController } from '@ionic/angular';  
import { AuthService } from 'src/app/services/auth.service';  
import { DataBaseService } from 'src/app/services/data-base.service';  
import { Usuario } from 'src/app/model/usuario';  
import { User } from 'src/app/model/user';  


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  correo = '';  

  constructor(private router: Router, private bd: DataBaseService, private authService: AuthService,  private alertController: AlertController) {}  

  ngOnInit(): void {  
    // No es necesario lanzar un error aquí.  
  }  
  async recuperarContrasena() {  
    if (!this.correo || !this.correo.includes('@')) { // Validar que el correo tenga un formato simple  
      const alert = await this.alertController.create({  
        header: 'Error',  
        message: 'Por favor ingrese un correo válido.',  
        buttons: ['OK']  
      });  
      await alert.present();  
      return; // Detiene la ejecución si hay error  
    }  
    
    const usu = await this.bd.leerCorreo(this.correo);  
    if (usu == undefined) {  
      this.router.navigate(['/incorrecto']);  
    } else {  
      const navigationExtras: NavigationExtras = {  
        state: {  
          usuario: usu  
        }  
      };  
      this.router.navigate(['/pregunta'], navigationExtras);  
    }  
  } 

  volverAlInicio() {  
    this.router.navigate(['/login']);  
  }  

}