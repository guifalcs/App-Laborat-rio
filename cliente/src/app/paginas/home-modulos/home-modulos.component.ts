import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentesPag/header/header.component';
import { FooterComponent } from '../../componentesPag/footer/footer.component';

@Component({
  selector: 'app-home-modulos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-modulos.component.html',
  styleUrl: './home-modulos.component.scss'
})
export class HomeModulosComponent {

}
