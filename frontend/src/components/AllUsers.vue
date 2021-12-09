<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="boxuser"
        fullscreen
        
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar flat dark color="primary">
            <v-btn icon dark @click="boxuser = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Tous les utilisateurs</v-toolbar-title>
          </v-toolbar>

          <v-list three-line>
            <template class="pa-4">
              <v-card
                max-width="800"
                class="offset-md-3 mx-auto"
                v-for="(user, index) in users"
                :key="index"
                
              >
                <v-alert
                  class="d-flex"
                  color="blue darken-4"
                  border="left"
                  elevation="2"
                  colored-border
                  v-show="show"
                >
                  <v-avatar class="ma-4">
                    <img :src="user.avatar" alt="" />
                  </v-avatar>
                  <h1 class="font-weight-light">
                    {{ user.last_name }} {{ user.first_name }}
                  </h1>
                  <v-btn
                    class="btn align-self-center ma-2 rounded-xl"
                    color="red darken-1"
                    @click="deleteAccount(user.id) "
                  >
                    Supprimer le compte
                  </v-btn>
                </v-alert>
              </v-card>
            </template>
          </v-list>

          <div style="flex: 8 8 auto"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
let user = JSON.parse(localStorage.getItem("user"));
export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      users: "",
      UserId: user.id,
      show:true,
    };
  },
  computed: {
    boxuser: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  async mounted() {
    this.users = (await UserServices.getAllUsers()).data;
    console.log("ici", this.users);
  },
  methods: {
    async deleteAccount(id) {
      
      await UserServices.deleteAccount(id);
       setTimeout(()=> this.show = false, 10);
    },
    
  },
};
</script>

<style lang="scss" scoped></style>
