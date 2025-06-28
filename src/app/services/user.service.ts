import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { GolbalApiService } from './golbal-api.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

      constructor(private api:GolbalApiService, private http:HttpClient) { }


  
  addUser(user:any):Observable<any>{
    console.log(user,"Add Usuario");
    return this.http.post(this.api.getURL() + "/addUser",user);
  }

  getUser(user:any){
    console.log(user,"Get Usuario");
    return this.http.post(this.api.getURL() + "/getUser",user);
  }

  authUser(user:any){
    console.log(user,"auth Usuario")
    return this.http.post(this.api.getURL() + "/authUser",user);
  }

  // Resetear contraseña

  forgotPassword(email:any){
    console.log(email,"El email es");
    return this.http.post(this.api.getURL() + "/forgotPasswordEmail",email);
  }

  verifyToken(token:string):Observable<any>{
    console.log(token,"Se usa el token");
    return this.http.get("/resetPassword/" + token);
  }

}
