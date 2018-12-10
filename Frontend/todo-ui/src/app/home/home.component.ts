import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';
import { AppContext } from '../app.context';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public addedItem:Todo

  constructor(private router: Router, private appContext: AppContext) { }

  ngOnInit() {
  }

  public addedEvent(todo:Todo): void{
    this.addedItem = todo;
  }

  public logout():void{
    localStorage.removeItem("accessToken")
    this.router.navigate(["/login"])
  }

}
