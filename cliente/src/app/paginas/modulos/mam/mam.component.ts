import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../componentesPag/header/header.component';
import { FooterComponent } from '../../../componentesPag/footer/footer.component';
import { MamService } from '../../../services/mam.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mam',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './mam.component.html',
  styleUrl: './mam.component.scss'
})
export class MamComponent implements OnInit {

  qrcode: string = '';
  status: string = '';
  seccaoAtiva: string = 'seccao1';
  nome: string = '';
  numero: string = '';
  mensagem: string = '';
  statusMensagem: string = '';

  constructor(private mamService: MamService){}

  ngOnInit(){
    this.mamService.getQRCode().subscribe(qrcode => {
      this.qrcode = this.mamService.generateQRCode(qrcode)
    })

    this.mamService.getConnectionStatus().subscribe(status => {
      this.status = status
    })

    this.mamService.getMessageStatus().subscribe(status => {
      this.statusMensagem = status
    })
  }

  mudarSeccao(seccao: string){
    this.seccaoAtiva = seccao
  }

  enviarMensagem(numero: string, mensagem: string){

    if(!numero || !mensagem){
      alert("Número e mensagem devem ser preenchidos")
      return
    }

    this.mamService.sendMessage(numero, mensagem)

    this.numero = '';
    this.mensagem = '';
  }

}
