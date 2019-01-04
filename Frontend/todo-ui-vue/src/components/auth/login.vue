<template>
  <div class="login">
    <div class="login-screen">
      <div class="app-title">
        <h1>Login</h1>
      </div>

      <div class="login-form">
        <div class="control-group">
          <input
            type="text"
            class="login-field"
            v-model="userName"
            placeholder="Username"
            id="login-name"
          >
        </div>

        <div class="control-group">
          <input
            type="password"
            class="login-field"
            v-model="password"
            placeholder="Password"
            id="login-pass"
          >
        </div>

        <button
          class="btn btn-primary btn-large btn-block"
          v-on:click="signin(userName,password)"
        >login</button>
        <button
          class="btn btn-primary btn-large btn-block register"
          v-on:click="$emit('register')"
        >Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router/index";
export default {
  name: "Login",
  inject: ["authService"],
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    signin(userName, password) {
      this.authService.signin(userName, password).then(({ data }) => {
        localStorage.setItem("accessToken", data.accessToken);
        router.push("home");
      });
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
.login {
  font-family: Arial;

  margin: 20px auto;
  width: 300px;
}
.login-screen {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  height: 339px;
}

.app-title {
  text-align: center;
  color: #777;
}

.login-form {
  text-align: center;
}
.control-group {
  margin-bottom: 10px;
}

input {
  text-align: center;
  background-color: #ecf0f1;
  border: 2px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 200;
  padding: 10px 0;
  width: 250px;
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
  padding: 10px 0;
  text-decoration: none;
  text-shadow: none;
  border-radius: 3px;
  box-shadow: none;
  transition: 0.25s;
  display: block;
  width: 250px;
  margin: 0 auto;
}

.btn:hover {
  background-color: #2980b9;
}

.login-link {
  font-size: 12px;
  color: #444;
  display: block;
  margin-top: 12px;
}
.register {
  top: 7px;
  position: relative;
}
</style>
