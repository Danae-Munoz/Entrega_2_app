import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent {

  selectedComponent = 'welcome';
  navCtrl: any;

  constructor(private auth: AuthService, private router: Router) { 
    addIcons({ homeOutline, qrCodeOutline, pawOutline, pencilOutline });
  }

  segmentChanged(selectedComponent: string) {
    this.selectedComponent = selectedComponent;
    this.auth.selectedComponent.next(this.selectedComponent);
  }
  navigateToMiruta() {
    this.router.navigate(['/miruta']); // Método para navegar a "miruta"
  }

}
