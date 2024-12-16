import { Component } from '@angular/core';
import { HeaderComponent } from '../../../componentesPag/header/header.component';
import { FooterComponent } from '../../../componentesPag/footer/footer.component';

@Component({
  selector: 'app-mam',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './mam.component.html',
  styleUrl: './mam.component.scss'
})
export class MamComponent {

}
