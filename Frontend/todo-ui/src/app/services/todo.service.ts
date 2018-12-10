import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppContext } from "../app.context";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Todo } from "../models/todo";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TodoService {

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.appContext.accessToken}`
    })
  };

  constructor(private http: HttpClient, public appContext: AppContext) {}

  public add(todo:Todo): Observable<Todo>{
    return this.http.post(`${environment.apiUrl}/todo`,todo,this.httpOptions)
      .pipe(map(this.mapTodo))
  }

  public update(todo:Todo): Observable<Todo>{
    return this.http.put(`${environment.apiUrl}/todo`,todo,this.httpOptions)
      .pipe(map(this.mapTodo))
  }

  public delete(todoId:string): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/todo/${todoId}`,this.httpOptions)
  }


  public getAllByUser(): Observable<Todo[]>{
    return this.http
      .get(`${environment.apiUrl}/todo/user/${this.appContext.userName}`, this.httpOptions)
      .pipe(
        map((list: Todo[]) =>{
          if(!list) {
            return [];
          }
          return list.map(this.mapTodo)
        })
      );

  }

  public getAll(): Observable<Todo[]> {
    return this.http
      .get(`${environment.apiUrl}/todo`, this.httpOptions)
      .pipe(
        map((list:Todo[]) =>
          list.map(this.mapTodo))
      );
  }

  private mapTodo(todo:Todo){
    return  new Todo(
      todo.id,
      todo.name,
      todo.status,
      todo.createdAt,
      todo.userName,
      todo.lastUpdatedAt,
      todo.completedAt
    )
  }
}
