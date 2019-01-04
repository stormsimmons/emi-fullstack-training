<template>
  <div>
    <button class="btn" v-if="showAll" v-on:click="showByUser()">Show only my todos</button>
    <button class="btn" v-else v-on:click="showAllTodos()">Show all todos</button>

    <div class="container" v-if="todos">
      <div class="tile" v-for="todo in todos" v-bind:key="todo.id">
        <div class="delete fas fa-trash-alt" v-on:click="deleteTodo(todo)"></div>
        <select v-model="todo.status" @change="onChange(todo)">
          <option>Todo</option>
          <option>InProgress</option>
          <option>Done</option>
        </select>
        <div class="info-container">
          <p>{{todo.name}}</p>
          <p>{{todo.userName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["appContext", "todoService"],
  props: ["todoAdded"],
  data() {
    return {
      todos: null,
      showAll: true,
      added: this.todoAdded
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    showByUser() {
      this.getAllByUser();
      this.showAll = !this.showAll;
    },
    showAllTodos() {
      this.getAll();
      this.showAll = !this.showAll;
    },
    getAll() {
      this.todoService.getAll().then(({ data }) => {
        this.todos = data;
      });
    },
    getAllByUser() {
      this.todoService
        .getAllByUser(this.appContext.userName)
        .then(({ data }) => {
          this.todos = data;
        });
    },
    onChange(todo) {
      this.todoService.update(todo);
    },
    deleteTodo(todo) {
      this.todoService.delete(todo.id).then(x => {
        this.todos.splice(this.todos.indexOf(todo), 1);
      });
    }
  },
  watch: {
    todoAdded(todo, oldVal) {
      this.todos.push(todo);
    }
  }
};
</script>

<style scoped>
.container {
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
}

.tile {
  background: #ecf0f1;
  width: 200px;
  height: 200px;
  padding: 20px;
  margin: 20px;
  box-shadow: 12px 12px 36px 0px black;
  border-radius: 5px;
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
  width: 220px;
  margin: 0 44% 0;
}
.btn:hover {
  background-color: #2980b9;
}

.delete {
  cursor: pointer;
  padding: 10px;
  position: relative;
  top: 174px;
  left: 175px;
}

select {
  width: 93px;
  height: 32px;
  background: #ecf0f1;
  border: none;
  position: relative;
  top: 171px;
  left: 53px;
}
select:hover {
  border-style: solid;
  border-width: 2px;
  border-color: darkgray;
}
.info-container {
  position: relative;
  top: -50px;
}
</style>

