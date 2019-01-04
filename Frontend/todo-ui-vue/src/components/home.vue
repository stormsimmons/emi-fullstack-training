<template>
  <div class="container">
    <div class="app-title">
      <h1>Add Todo</h1>
      <button class="btn logout" v-on:click="logout()">Logout</button>
      <p>{{userName}}</p>
    </div>
    <AddTodo v-on:todoAdded="todoAdded"/>
    <ListTodo :todoAdded="addedTodo" />
  </div>
</template>

<script>
import AddTodo from "./add-todo";
import ListTodo from "./list-todo";
import AppContext from "../app-context"
import { TodoService } from "../services/todo-service";
import router from "../router/index";

export default {
  name: "Home",
  provide: {
    appContext: AppContext,
    todoService: new TodoService(),
    
  },
  components: {
    AddTodo,
    ListTodo
  },
  data() {
    return {
      userName: AppContext.userName,
      addedTodo: "test"
    };
  },
  methods: {
      todoAdded(e){
          console.log(e.data)
         this.addedTodo = e.data
      },
      logout(){
          localStorage.removeItem("accessToken");
          router.push("login");
      }
  }
};
</script>

<style scoped>
.container {
  font-family: Arial;
  margin: 20px auto;
}

.app-title {
  text-align: center;
  color: white;
}

.btn {
  border: 2px solid transparent;
  background: #3498db;
  color: #ffffff;
  font-size: 16px;
  line-height: 25px;
  padding: 5px 0;
  text-decoration: none;
  text-shadow: none;
  border-radius: 3px;
  box-shadow: none;
  transition: 0.25s;
  display: inline-block;
  width: 80px;
  margin: 0px;
}

.btn:hover {
  background-color: #2980b9;
}

.logout {
  left: 85%;
  top: 10px;
  position: absolute;
}
</style>

