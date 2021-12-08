<template>
  <v-app-bar color="blue darken-4" dense fixed class="mb-4">
    <!-- <v-toolbar color="blue darken-4" dense fixed> -->
    <v-col>
      <v-toolbar-title
        class="d-flex align-center"
        @click="navigateTo({ name: 'Login' })"
      >
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
      plain
      @click="logout"
    >
      Se déconnecter
    </v-btn>

    <!-- <v-btn class="mr-4" @click="navigateTo({ name: 'Signup' })"> Signup </v-btn> -->
  </v-app-bar>
</template>

<script>
let user = JSON.parse(localStorage.getItem('user'))
export default {
  data() {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      UserId: user.id,
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')

      this.$router.push({
        name: 'Login',
      })
    },
    
  },
}
</script>

<style lang="scss" scoped>
.logo {
  // width: 10rem;
  cursor: pointer;
  width: 10rem;
}
.v-toolbar__title {
  width: 100%;
  height: 100%;
}
.v-application .mr-4 {
  color: white;
}
.v-btn {
  text-transform: initial;
}

</style>
