import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppContext } from '../app.context';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.appContext.accessToken}`
    })
  };

  constructor(private http: HttpClient, private appContext: AppContext) {}

  public insertUser(user:User){
    return this.http.post(`${environment.apiUrl}/user`, user, this.httpOptions)
    .pipe(map(this.mapUser))
  }

  
  private mapUser(user:User){
    return  new User(
      user.id,
      user.firstName,
      user.lastName,
      user.userName,
      user.password
    );
  }
}
