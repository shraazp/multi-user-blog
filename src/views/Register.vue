<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
        <input v-bind:type="[showPassword ? 'text' : 'password']"  v-model="password" />
            <span class="eyeicon" @click="showPassword = !showPassword">
            <i class="fa " :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
      </span>
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      showPassword: false,
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        try {
         const res=  await this.axios.post(`http://localhost:1337/api/auth/local/register`, {
                            firstName: this.firstName,
                            lastName:this.lastName,
                            password: this.password,
                            email: this.email,
                            username: this.username
                        })
          const { jwt } = res.data;
          window.localStorage.setItem("jwt", jwt);
          this.$store.dispatch("getCurrentUser");
          this.$router.push({ name: "Home" });
          return;
        } catch (error) {
          this.error = true;
          console.log(error);
          this.errorMsg = "An Error occurred, please try again";
          return;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>