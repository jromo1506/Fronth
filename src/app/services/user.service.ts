import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { GolbalApiService } from './golbal-api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private api: GolbalApiService, private http: HttpClient) {}

  addUser(user: User): Observable<any> {
    return this.http.post(this.api.getURL() + '/addUser', user);
  }

  getUser(user: Partial<User>): Observable<any> {
    return this.http.post(this.api.getURL() + '/getUser', user);
  }

  authUser(user:any){
    console.log(user,"auth Usuario");
    return this.http.post(this.api.getURL() + "/authUser",user);
  }

  forgotPassword(email: { email: string }): Observable<any> {
    return this.http.post(this.api.getURL() + '/forgotPasswordEmail', email);
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get('/resetPassword/' + token);
  }

}
