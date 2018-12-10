import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public model : User 

  public error: boolean = false

  constructor(private userService:UserService) { 
    this.model = new User(null,null,null,null,null);
  }

  ngOnInit() {
    
  }

  public onSubmit():void{
    this.userService.insertUser(this.model)
    .subscribe(res => console.log(res),
      error => this.error = true )
    
  }

}
