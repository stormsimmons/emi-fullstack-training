<template>
  <div class="add-todo">
    <div class="add-screen">
      <div class="add-todo-form">
        <div class="control-group">
          <input type="text" class="add-todo-field" placeholder="Todo Name" id="add-todo-name" v-model="todoName" >
        </div>
        <button class="btn btn-primary btn-large btn-block" v-on:click="submit()" >Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  inject: ["appContext","todoService"],
  data() {
    return {
      userName: this.appContext.userName,
      todoName: ""
    };
  },
  methods: {
    submit(){
      this.todoService.add({
     name: this.todoName,
     status: "Todo",
     userName: this.userName})
     .then(todo => {
      this.todoName = "";
      this.$emit("todoAdded", todo)
     }) 
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

*:focus {
  outline: none;
}

.add-todo-screen {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.add-todo-form {
  text-align: center;
}
.control-group {
  margin: 10px;
  display: inline-block;
}

input {
  text-align: center;
  background-color: #ecf0f1;
  border: 2px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 200;
  padding: 10px 0;
  width: 520px;
  transition: border 0.5s;
}

input:focus {
  border: 2px solid #3498db;
  box-shadow: none;
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

.add-todo-link {
  font-size: 12px;
  color: #444;
  display: block;
  margin-top: 12px;
}
</style>


