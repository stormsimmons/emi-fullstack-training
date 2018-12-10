import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { AppContext } from '../app.context';
import { TodoService } from '../services/todo.service';
import { Status } from '../enum/Status';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  public todoName: string;
  @Output()
  public addedEvent:EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(public appContext: AppContext, private todoService: TodoService) { }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    let todo = new Todo(null, this.todoName, Status.Todo, null, this.appContext.username, null, null);

    this.todoService.add(todo)
      .subscribe(todo => {
        this.addedEvent.emit(todo);
        this.todoName = null
      })
  }

}
