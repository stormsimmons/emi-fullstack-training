import React, { Component } from 'react';
import './list-todo.css';
import { TodoService } from '../../services/todo-service';
import { Todo } from '../../models/todo';
import { AppSettings } from '../../appsettings';

class ListTodo extends Component {

  todoService = new TodoService();
    
  constructor() {
    super();

    this.state = {
        todos: null,
        toggleButtonName: "Show only my todos",
        listToggled: false
    };

    this.getAll();
  }

  getAll = ()  => {
    this.todoService.getAll().then(x => {
        this.setState({ todos: x.data.map(todo => new Todo( todo.id,
            todo.name,
            todo.status,
            todo.createdAt,
            todo.userName,
            todo.lastUpdatedAt,
            todo.completedAt)) })
      })
  }

  getAllByUser = ()  => {
    this.todoService.getAllByUser(AppSettings.username).then(x => {
        this.setState({ todos: x.data.map(todo => new Todo( todo.id,
            todo.name,
            todo.status,
            todo.createdAt,
            todo.userName,
            todo.lastUpdatedAt,
            todo.completedAt)) })
      })
  }

    deleteClick = (todo) => {
        this.todoService.delete(todo.id).then(x => {
            this.state.todos.splice(this.state.todos.indexOf(todo),1)
            this.setState({ todos:  this.state.todos })
        })
    }

    selectChange = (todo, e) => {
        let newTodo = this.state.todos[this.state.todos.indexOf(todo)]
        newTodo.status = e.target.value;
        this.setState({ todos:  this.state.todos })
        this.todoService.update(newTodo)
    }

    toggleList = () => {
        this.state.listToggled = !this.state.listToggled
        this.setState({listToggled: this.state.listToggled});

        let buttonValue

        if(!this.state.listToggled){
            this.getAll()
            buttonValue = "Show only my todos"
        }else{ 
            this.getAllByUser();
            buttonValue = "Show all todos"
        }
      
        this.setState({toggleButtonName: buttonValue});
    }

    componentWillReceiveProps({todoAdded}){
        this.state.todos.push(todoAdded)
        this.setState({ todos:  this.state.todos })
    }

    render() {
        let todos = this.state.todos
        if (!todos) {
            return null;
        }
        let view = []

        for (const todo of todos) {
            view.push(
                    <div className="tile" key={todo.id}>
                        <div className="delete fas fa-trash-alt" onClick={() => this.deleteClick(todo)}></div>
                        <select value={todo.status} onChange={(e) => this.selectChange(todo,e)}>
                            <option>Todo</option>
                            <option>InProgress</option>
                            <option>Done</option>
                        </select >
                        <div className="info-container">
                            <p>{todo.name}</p>
                            <p>{todo.userName}</p>
                        </div>
                    </div >
            );
        }

        return (
            <div className="wrapper">
                <button className="btn-toggle" onClick={this.toggleList}>{this.state.toggleButtonName}</button>
                <div className="list-container">
                    {view}
                </div >
            </div >
        );
    }
}

export default ListTodo;
