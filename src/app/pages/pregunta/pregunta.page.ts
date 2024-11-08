import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonCol, IonCardContent, IonText, IonItem, IonLabel, IonButton, IonAlert, IonRow } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonRow, IonAlert, IonButton, IonLabel, IonItem, IonText, IonCardContent, IonCol, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  public usuario: User | undefined;
  public nombre: string = '';
  public pregunta: string = '';
  public respuesta: string = '';
  public correo: string = '';
  
  
  isAlertOpen: boolean = false;
  alertButtons: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { 
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.usuario = this.router.getCurrentNavigation()?.extras.state?.['usuario'];
        } else {
          this.router.navigate(['/login']);
        }
      });
    }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario?.secretQuestion === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      

      this.router.navigate(['correcto'], navigationExtras);
    } else {
      this.router.navigate(['incorrecto']);
    }
  }
  volverAlInicio() {
    this.router.navigate(['/ingreso']);
  }

}
