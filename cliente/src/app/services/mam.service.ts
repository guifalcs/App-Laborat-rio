import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode'
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class MamService {

  private socket: Socket;
  private qrCode = new BehaviorSubject<string>('');
  private connectionStatus = new BehaviorSubject<string>('disconnected');

  constructor() {
    this.socket = io(enviroment.apiUrl);
    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    this.socket.on('qr', (qrCode: string) => {
      this.qrCode.next(qrCode);
      this.connectionStatus.next('waiting');
    });

    this.socket.on('ready', () => {
      this.connectionStatus.next('connected');
      this.qrCode.next('');
    });

    this.socket.on('disconnected', () => {
      this.connectionStatus.next('disconnected');
      this.qrCode.next('');
    });

    this.socket.on('status', (res) => {
      this.connectionStatus.next(res.status);
      this.qrCode.next('');
    });
  }

  getQRCode(): Observable<string> {
    return this.qrCode.asObservable();
  }

  getConnectionStatus(): Observable<string> {
    return this.connectionStatus.asObservable();
  }

  public generateQRCode(data: string): string {
    let qrCodeDataUrl: string = '';
    QRCode.toDataURL(data, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        console.error('Erro ao gerar o QR Code', err);

        return;
      }
      qrCodeDataUrl = url;
    });
    return qrCodeDataUrl;
  }

}
