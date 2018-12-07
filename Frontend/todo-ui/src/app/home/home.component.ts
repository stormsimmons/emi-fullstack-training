import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public addedItem:Todo

  constructor() { }

  ngOnInit() {
  }

  public addedEvent(todo:Todo): void{
    this.addedItem = todo;
  }

}
