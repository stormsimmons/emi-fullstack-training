import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Status } from '../enum/Status';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnChanges {


  public todos: Todo[];
  public Status = Status
  public showAll: boolean = true;
  @Input()
  public addedItem:Todo;

  constructor(private todoService: TodoService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showAll) {
      this.listAll()
    } else {
      this.listByUser();
    }
  }

  public listByUser() {
    this.todoService.getAllByUser()
      .subscribe(x => this.todos = x)
    this.showAll = false
  }

  public listAll() {
    this.todoService.getAll()
      .subscribe(x => this.todos = x)
      this.showAll = true
  }

  public getEnumName() {
    return Object.keys(this.Status)
  }

  public deleteTodo(todo:Todo):void{
    this.todoService.delete(todo.id).subscribe(x => {
      this.todos.splice(this.todos.indexOf(todo),1)
    })
  }

  public onChange(todo:Todo) {
    this.todoService.update(todo).subscribe();
  }

}
