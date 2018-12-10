import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isRegistration:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
