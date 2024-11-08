import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCol, IonCardHeader, IonImg, IonRow, IonButton, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCard, IonButton, IonRow, IonImg, IonCardHeader, IonCol, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IncorrectoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  Ingreso() {
    this.router.navigate(['ingreso']);
  }

}
