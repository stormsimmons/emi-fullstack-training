import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public model : User 

  public error: boolean = false

  constructor(private userService:UserService, private router: Router, private authservice: AuthService) { 
    this.model = new User(null,null,null,null,null);
  }

  ngOnInit() {
    
  }

  public onSubmit():void{
    this.userService.insertUser(this.model)
    .subscribe(res => this.login(),
      error => this.error = true)
  }

  public login():void{
    if (this.model.userName && this.model.password) {
      this.authservice.signin(this.model.userName , this.model.password)
        .subscribe(x => {
          if (x.accessToken) {
            localStorage.setItem("accessToken", x.accessToken)
            this.router.navigate(["/home"])
          }
        })
    }
  }

}
