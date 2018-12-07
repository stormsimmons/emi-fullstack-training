import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public onSubmit() {
    if (this.username && this.password) {
      this.authservice.signin(this.username, this.password)
        .pipe(
          map(x => x.json())
        ).subscribe(x => {
          if (x.accessToken) {
            localStorage.setItem("accessToken", x.accessToken)
            this.router.navigate(["/home"])
          }
        })
    }
  }

}
