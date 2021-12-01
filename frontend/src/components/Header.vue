<template>
  <v-toolbar color="blue darken-4" dense>
    <v-col class="col-2">
      <v-toolbar-title class="d-flex align-center" @click="navigateTo({ name: 'Login' })">
        <img
          class="logo"
          src="../assets/icon-left-font-monochrome-white.svg"
          alt="logo"
        />
      </v-toolbar-title>
    </v-col>
    <v-spacer></v-spacer>

    <!-- <v-btn class="mr-2" @click="navigateTo({ name: 'Login' })"> Login </v-btn> -->

    <v-btn
      v-if="!$store.state.isUserLoggedIn"
      class="ma-1"
      color="white"
      plain
      @click="navigateTo({ name: 'Login' })"
    >
      Login
    </v-btn>
    <v-btn
      v-if="!$store.state.isUserLoggedIn"
      class="ma-1"
      color="white"
      plain
      @click="navigateTo({ name: 'Signup' })"
    >
      Signup
    </v-btn>

    <v-btn
      v-if="$store.state.isUserLoggedIn"
      class="ma-1"
      color="white"
      @click="logout"
    >
      Log Out
    </v-btn>

    <!-- <v-btn class="mr-4" @click="navigateTo({ name: 'Signup' })"> Signup </v-btn> -->
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  // width: 10rem;
  cursor: pointer;
  width: 100%;
}
.v-toolbar__title {
  width: 100%;
  height: 100%;
}
</style>
