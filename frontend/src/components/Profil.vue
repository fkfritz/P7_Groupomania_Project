<template>
  <v-container>
    <v-card
      max-width="800"
      elevation="2"
      class="mx-auto rounded-xl"
      color="blue lighten-4"
    >
      <div>
        <v-toolbar
          class="d-flex justify-center rounded-xl"
          elevation="0"
          dense
          color="blue darken-4"
        >
          <v-toolbar-title>Bienvenue </v-toolbar-title>
        </v-toolbar>
      </div>
      <div class="d-flex mt-4">
        <v-col class="d-flex pa-5">
          <span>Photo de profil</span>
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
          <v-btn class="btn mt-4 rounded-xl" color="blue darken-4">
            Changer mon image
          </v-btn>
        </v-col>
        <v-col>
          <span>Membre depuis le: </span>
        </v-col>
      </div>
      <div>
        <v-col>
          <!-- <p v-if="loginError">{{ loginError }}</p>
      <p v-if="loginSuccessful">Login Successful</p> -->
          <br />
          <v-row align="center" justify="space-around">
            <v-btn
              class="btn align-self-center ma-2 rounded-xl"
              color="blue darken-4"
              @click="deleteAccount"
            >
              Supprimer mon compte
            </v-btn>
          </v-row>
        </v-col>
      </div>
    </v-card>
  </v-container>
</template>

<script>
// import UserServices from "@/services/UserServices";
// const user = JSON.parse(localStorage.getItem("user"));
// let id = user.id;
export default {
  data() {
    return {};
  },
  methods: {
    // async deleteAccount() {
    //   await UserServices.deleteAccount(`${id}`);
    //   const router = this.$router;
    //   setTimeout(function () {
    //     router.push("/login");
    //   }, 10);
    // },
  },
};
</script>
<style lang="scss" scoped>
.v-toolbar__title {
  color: white;
  font-weight: bold;

  font-size: 2rem;
  font-display: roboto;
}

.btn {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}

img {
  width: 95%;
  height: auto;
}

.v-application a {
  color: #01579b;
  text-decoration: underline;
  font-weight: bold;
}
</style>
