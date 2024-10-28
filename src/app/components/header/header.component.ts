import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
  ]
})
export class HeaderComponent {
  
  @Output() clickQrScanButton: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickQrTestButton: EventEmitter<void> = new EventEmitter<void>();

  constructor(private navCtrl: NavController, private authService: AuthService) { 
    addIcons({ logOutOutline, qrCodeOutline });
  }

  startScan() {
    this.clickQrScanButton.emit();
  }

  showTest() {
    this.clickQrTestButton.emit();
  }

  logout() {
    this.authService.logout();
  }

}
