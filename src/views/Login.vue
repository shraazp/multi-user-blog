<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </p>
      <h2>Login to vueBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" id="email" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input
            id="password"
            v-bind:type="[showPassword ? 'text' : 'password']"
            v-model="password"
            placeholder="password"
          />
          <span class="eyeicon" @click="showPassword = !showPassword">
            <i
              class="fa"
              :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
              aria-hidden="true"
            ></i>
          </span>

          <password class="icon" />
        </div>

        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="signIn">Sign In</button>
      <div class="angle"></div>
    </form>

    <div class="background"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {
    email: () => import("../assets/Icons/envelope-regular.svg"),
    password: () => import("../assets/Icons/lock-alt-solid.svg"),
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      showPassword: false,
    };
  },
  methods: {
    signIn(e) {
      e.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: this.email,
          password: this.password,
        }),
      };
     fetch(`http://localhost:1337/api/auth/local`, requestOptions)
        .then((response) => {return response.json()})  
         .then((data) => {
          if(data.error){ throw new Error(data.error.message)}
          const jwt = data.jwt;
          window.localStorage.setItem("jwt", jwt);
          this.$store.dispatch("getCurrentUser");
          this.$router.push({ name: "Home" });
          this.error = false;
          this.errorMsg = "";
        })
        .catch((error) => {
          console.log(error)
          this.error = true;
          this.password = "";
          this.errorMsg = error.message;
        })
       
       
      
    },
    
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
  .login-register {
    margin-bottom: 32px;
    .router-link {
      color: #000;
      text-decoration: underline;
    }
  }
  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }
    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }
    .inputs {
      width: 100%;
      max-width: 350px;
      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;
          &:focus {
            outline: none;
          }
        }
        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
        .eyeicon {
          width: 12px;
          position: absolute;
          right: 6px;
          margin-right: 4px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;
      &:hover {
        border-color: #303030;
      }
    }
    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.png");
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>