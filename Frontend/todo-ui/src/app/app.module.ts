import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { TodoService } from './services/todo.service';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    AddTodoComponent,
    ListTodoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes
    ),
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
