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
          <v-toolbar-title
            >Bienvenue {{ user.first_name }} {{ user.last_name }}
          </v-toolbar-title>
          <v-icon class="mx-2" color="grey lighten-1" @click="editTheName()"
            >mdi-pencil</v-icon
          >
          <v-dialog v-model="editname" width="500">
            <v-card>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="usernameEdit.first_name"
                  label="Changer mon prénom"
                  required
                  :rules="inputRules"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="usernameEdit.last_name"
                  label="Changer mon nom"
                  required
                  :rules="inputRules"
                ></v-text-field>
              </v-col>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="updateTheName(usernameEdit), (editname = false)"
                >
                  Valider
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </div>
      <div class="d-flex">
        <div class="d-flex mt-4">
          <v-col class="d-flex flex-column pa-5">
            <span class="mb-2">Votre photo de profil</span>
            <div class="d-flex">
              <v-avatar class="profile" color="grey" size="164" tile>
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
              <v-icon class="mx-2" color="blue" @click="elementToEdit"
                >mdi-pencil</v-icon
              >
            </div>
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-col cols="12" sm="12">
                  <input
                    type="file"
                    ref="file"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    name="image"
                    @change="uploadImage"
                  />
                </v-col>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="updateUser(), (dialog = false)"
                  >
                    Valider
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </div>
        <v-col>
          <span>Vous être membre depuis: {{ dateParser(user.createdAt) }}</span>
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
              color="red darken-1"
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
import UserServices from "@/services/UserServices";

export default {
  data() {
    return {
      dialog: false,
      editname: false,
      inputRules: [
        v => v.length >= 3 || "minimum 3 caractères" //les règles sur l'input
      ],
      id: "",
      user: "",
      last_name: "",
      first_name: "",
      password: "",
      file: "",
      usernameEdit: new Object(),
    };
  },
  computed: {},

  async mounted() {
    try {
      this.id = this.$route.params.id;
      const response = await UserServices.getOneUser(this.id);
      this.user = response.data;
      console.log(this.user);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async deleteAccount() {
      this.id = this.$route.params.id;
      await UserServices.deleteAccount(this.id);
      const router = this.$router;
      setTimeout(function () {
        router.push("/");
      }, 10);
    },
    async updateUser() {
      try {
        let data = new FormData();        
        if (this.file !== null) {
          data.append("image", this.file);
        }
        this.id = this.$route.params.id;
        await UserServices.updateUser(this.id, data);        
        location.reload(true);
      } catch (error) {
        console.log(error);
      }
    },
    elementToEdit() {
      this.dialog = true;
    },
    editTheName() {
      this.editname = true;
      this.usernameEdit = this.user;
      
    },
    async updateTheName() {
      try {
        let data = {
          first_name: this.usernameEdit.first_name,
          last_name: this.usernameEdit.last_name,
        };        
        this.id = this.$route.params.id;
        await UserServices.updateUser(this.id, data);
       
        location.reload(true);
      } catch (error) {
        console.log(error);
      }
    },
    uploadImage() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    dateParser(num) {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      let timestamp = Date.parse(num);
      let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

      return date.toString();
    },
    // async getPosts() {
    //   try {
    //     const response = await PostServices.getAllPosts();
    //     console.log(response);
    //     this.$store.dispatch("setMessage", response.data.message);
    //   } catch (error) {
    //     console.log(error);
    //   }
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
