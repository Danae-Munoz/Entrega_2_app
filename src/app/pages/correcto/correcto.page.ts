import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonCardSubtitle, IonImg, IonCardContent, IonRow, IonButton } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonButton, IonRow, IonCardContent, IonImg, IonCardSubtitle, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {
  //public usuario: Usuario | undefined;
  public usuario: User = new User();
  public mdl_contrasena: string='';
  public mdl_nombre: string = '';
  public mdl_correo: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    this.activatedRoute.queryParams.subscribe((params) => {
      const navigation: Navigation | null = this.router.getCurrentNavigation();
      if (navigation) {
        const state: any | undefined = navigation.extras.state;
        if (state) {
          if (state['usuario']) {
            this.usuario = state['usuario'];
          }
        }
      }
    });
  }

  ngOnInit() {
  }
  Ingreso() {
    this.router.navigate(['ingreso']);
  }

}
