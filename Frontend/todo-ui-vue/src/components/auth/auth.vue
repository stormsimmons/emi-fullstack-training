<template>
  <div>
    <div  v-if="!registration" class="login" >
        <Login v-on:register="registration = !registration" />
    </div>

    <div  v-else class="registration" >
        <Registration v-on:back="registration = !registration"/>
    </div>
  </div>
</template>

<script>
import Login from './login'
import Registration from './registration'
import { AuthService } from "../../services/auth-service";

export default {
    components:{
        Login,
        Registration
    },
    provide:{
      authService: new AuthService()
    }
    ,
    data(){
        return {
            registration: false
        }
    }
};
</script>

<style scoped>
.btn {
  border: 2px solid transparent;
  background: #3498DB;
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
  background-color: #2980B9;
}

.register-btn {
  position: relative;
  left: 0px;
  top: -95px;
}
.back-to-login{
  position: relative;
  top: -95px;
  left: 0px;
}
</style>

