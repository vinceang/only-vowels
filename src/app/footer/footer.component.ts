import { Component } from '@angular/core';
import { LogoTaglineComponent } from '../logo-tagline/logo-tagline.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoTaglineComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
