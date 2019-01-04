<template>
  <div class="registration">
    <div class="registration-screen">
      <div class="app-title">
        <h1>Registration</h1>
      </div>

      <div class="registration-form">
        <div class="control-group">
          <input
            type="text"
            class="registration-field"
            v-model="form.firstName"
            placeholder="First Name"
          >
        </div>

        <div class="control-group">
          <input type="text" class="registration-field" v-model="form.lastName" placeholder="Last Name">
        </div>

        <div class="control-group">
          <input
            type="text"
            class="registration-field"
            placeholder="Username"
            id="registration-name"
            v-model="form.userName"
          >
        </div>

        <div class="control-group">
          <input
            type="password"
            class="registration-field"
            placeholder="Password"
            id="registration-pass"
            v-model="form.password"
          >
        </div>

        <button class="btn btn-primary btn-large btn-block" v-on:click="submit()">Register</button>
        
        <button class="btn back-to-login" v-on:click="$emit('back')">Back to login</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router';

export default {
  inject: ["authService"],
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      let username = this.form.userName
      let password = this.form.password
      this.authService.register(this.form).then(user => {
        this.authService.signin(username, password).then(x => {
            if(x.data.accessToken){
                localStorage.setItem("accessToken", x.data.accessToken)
                router.push('home')
            }
        })
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
.registration {
  font-family: Arial;

  margin: 20px auto;
  width: 300px;
}
.registration-screen {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  height: 438px;
}

.app-title {
  text-align: center;
  color: #777;
}

.registration-form {
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

.registration-link {
  font-size: 12px;
  color: #444;
  display: block;
  margin-top: 12px;
}

.error-text {
  color: red;
}
.back-to-login {
  top: 7px;
  position: relative;
}
</style>
