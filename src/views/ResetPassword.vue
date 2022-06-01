 <template>
  <div class="form-wrap">
    <form class="reset">
      <p class="login-register">
        Remember your password?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Recover Your FireBlog Password</h2>
      <div class="inputs">
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div class="input">
          <input
            type="password"
            placeholder="confirm Password"
            v-model="confirmPassword"
          />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="resetPassword">Reset Password</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>
    <script>
export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
      error: false,
    };
  },
  methods: {
    async resetPassword(e) {
      e.preventDefault();
      this.axios
        .post(`https://multi-user-blog-backend.herokuapp.com/auth/reset-password`, {
          code: this.$route.query.code,
          password: this.password,
          passwordConfirmation: this.confirmPassword,
        })
        .then(() => {
          this.done = true;
          this.$router.push("Login");
        })
        .catch((e) => {
            console.log(e);
          this.error = true;
        });
    },
  },
};
</script>
    <style lang="scss" scoped>
.reset {
  h2 {
    max-width: 350px;
  }
}
</style>