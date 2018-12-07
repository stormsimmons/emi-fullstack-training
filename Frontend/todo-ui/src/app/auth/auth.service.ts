import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:Http) { }

  public signin(username:string,password:string):Observable<Response>{
    return this.http.post(`${environment.apiUrl}/account/login`, {
      username: username,
      password: password
    })
  }
}
