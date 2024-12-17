import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../componentesPag/header/header.component';
import { FooterComponent } from '../../../componentesPag/footer/footer.component';
import { MamService } from '../../../services/mam.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mam',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './mam.component.html',
  styleUrl: './mam.component.scss'
})
export class MamComponent implements OnInit {

  qrcode: string = ''

  constructor(private mamService: MamService){}

  ngOnInit(){this.obterCodigo()}

  obterCodigo(){
    this.mamService.conectar().subscribe({
      next: (codigo) => {
        this.qrcode = codigo
      },
      error: (error) => {"Observador do mam service emitiu um erro: " + console.log(error)}
    })
  }

}
