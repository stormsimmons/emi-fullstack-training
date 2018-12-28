import React, { Component } from 'react';
import './home.css';
import AddTodo from '../add-todo/add-todo';
import ListTodo from '../list-todo/list-todo';
import {AppSettings} from '../../appsettings'

class Home extends Component {

  constructor(){
    super();
    this.state = {todoAdded : null} 
  }

  logout = () => {
    localStorage.removeItem("accessToken")
    window.location.href = "/login"
  }

  todoAdded = (todo) => {
    this.setState({todoAdded: todo})
  }

  render() {
    return (
      <div className="home-container">
        <div className="app-title-home">
          <h1>Add Todo</h1>
          <button className="btn-logout" onClick={this.logout}>Logout</button>
          <p>{AppSettings.username}</p>
        </div>
        <AddTodo todoAdded={this.todoAdded} />
        <ListTodo todoAdded={this.state.todoAdded} />
      </div>
    );
  }
}

export default Home;
