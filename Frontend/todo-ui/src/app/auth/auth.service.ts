import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signin(username:string,password:string):Observable<any>{
    return this.http.post(`${environment.apiUrl}/account/login`, {
      username: username,
      password: password
    })
  }
}
