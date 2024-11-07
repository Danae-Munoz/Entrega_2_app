import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonCardContent, IonItem, IonLabel, IonRow, IonCol, IonButton, IonAlert, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AlertController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agrega esta línea
  standalone: true,
  imports: [TranslateModule,IonIcon, IonAlert, IonButton, IonCol, IonRow, IonLabel, IonItem, IonCardContent, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class CorreoPage implements OnInit {
  public email: string = '';
  public isAlertOpen: boolean = false;
  public alertButtons: any[] = [];
  userService: any;

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async recuperarContrasena() {
    // Verifica que el email esté definido y no vacío
    if (!this.email || this.email.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Campo obligatorio',
        buttons: ['OK'],
      });

      await alert.present();
      return; // Sale de la función si el campo está vacío
    }

    // Busca el usuario por correo
    const usuarioEncontrado = await this.userService.findByEmail(this.email);  // Usa el servicio inyectado

    if (!usuarioEncontrado) {
      // Redirige a la página de error si no se encuentra el usuario
      this.router.navigate(['/incorrecto']);
    } else {
      // Si el usuario es encontrado, redirige a la página de pregunta secreta
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado,
        },
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }

  

  volverAlInicio() {
    this.router.navigate(['/login']);
  }
}
