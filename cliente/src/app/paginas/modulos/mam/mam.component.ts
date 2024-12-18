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

  qrcode: string = '';
  status: string = '';
  seccaoAtiva: string = 'seccao1';

  constructor(private mamService: MamService){}

  ngOnInit(){
    this.mamService.getQRCode().subscribe(qrcode => {
      this.qrcode = this.mamService.generateQRCode(qrcode)
    })

    this.mamService.getConnectionStatus().subscribe(status => {
      this.status = status
    })
  }

  mudarSeccao(seccao: string){
    this.seccaoAtiva = seccao
  }

}
