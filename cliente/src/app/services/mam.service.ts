import { enviroment } from './../../environments/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import * as QRCode from 'qrcode'

@Injectable({
  providedIn: 'root'
})

export class MamService {

  constructor(private httpClient: HttpClient) {}

   conectar(): Observable<any>{
    return this.httpClient.get(enviroment.apiUrl + '/mam/connect').pipe(
      map((data: any) => { return this.generateQRCode(data)}),
      catchError(this.handleError)
    )
  }

  private generateQRCode(data: string): string {
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

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error('Erro ao conectar com o serviço.'))

  }



}
