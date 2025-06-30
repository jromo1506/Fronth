import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class GolbalApiService {
  private URL:string = environment.apiUrl;
  constructor() { }


  public getURL(){
    return this.URL;
  }
}
