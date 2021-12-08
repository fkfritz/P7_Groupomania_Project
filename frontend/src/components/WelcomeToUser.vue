<template>
  <v-card max-width="800" class="offset-md-3 mx-auto" >
    <v-alert
      class="d-flex"
      color="blue darken-4"
      border="left"
      elevation="2"
      colored-border
    >
      <h1 class="font-weight-light">Bienvenue, {{ first_name }} {{ last_name }}</h1>
      <span v-if="$store.state.isUserLoggedIn" class="mr-4">
        <a @click="profil(UserId)">Afficher votre profil</a>
      </span>
    </v-alert>
  </v-card>
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
    profil(userId) {
      const router = this.$router
      setTimeout(function () {
        router.push(`/profil/${userId}`)
      }, 10)
    },
  },
}
</script>
<style lang="scss" scoped></style>
