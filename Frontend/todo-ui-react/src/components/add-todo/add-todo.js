import React, { Component } from 'react';
import './add-todo.css';
import { Todo } from '../../models/todo';
import {AppSettings} from '../../appsettings';
import { TodoService } from '../../services/todo-service';


class AddTodo extends Component {

  todoService = new TodoService();

  constructor(){
    super();
    this.state = {todoName: ""}
  }

  onNameChange = (e) => {
    this.setState({todoName : e.target.value})
  }

  addTodo = () => {
    let todo = new Todo(null, this.state.todoName, "InProgress", null, AppSettings.username, null, null);
    this.todoService.add(todo).then(x => {
      this.props.todoAdded(x.data)
    })
    this.setState({todoName: ""})
  }

  render() {
    return (
      <div className="add-todo">
        <div className="add-screen">
          <div className="add-todo-form">
            <div className="control-group">
              <input type="text" className="add-todo-field" placeholder="Todo Name" id="add-todo-name" value={this.state.todoName} onChange={this.onNameChange}/>
              <label className="add-todo-field-icon fui-user"></label>
            </div>
            <button className="add-btn btn-primary btn-large btn-block" onClick={() => this.addTodo()} >Add</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTodo;
