import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MamService {


  constructor(private mamService: HttpClient) {}

  conectar(){
  }

}
