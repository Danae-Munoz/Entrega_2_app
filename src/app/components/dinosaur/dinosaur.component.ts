import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dinosaur',
  templateUrl: './dinosaur.component.html',
  styleUrls: ['./dinosaur.component.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class DinosaurComponent {

  dino: any;

  constructor(private authService: AuthService) { 
    this.authService.qrCodeData.subscribe((qrData) => {
      this.dino = qrData? JSON.parse(qrData): null;
    })
  }

}
