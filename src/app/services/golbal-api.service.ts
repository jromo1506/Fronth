import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GolbalApiService {
  private URL:string ="http://localhost:4000/innovaTube"
  constructor() { }


  public getURL(){
    return this.URL;
  }
}
