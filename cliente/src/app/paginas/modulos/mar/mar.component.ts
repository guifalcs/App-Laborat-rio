import { Component } from '@angular/core';
import { HeaderComponent } from '../../../componentesPag/header/header.component';
import { FooterComponent } from '../../../componentesPag/footer/footer.component';

@Component({
  selector: 'app-mar',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './mar.component.html',
  styleUrl: './mar.component.scss'
})
export class MarComponent {

}
