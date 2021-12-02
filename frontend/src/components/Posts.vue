<template>
  <div class="container">
    <div class="mb-8">
      <v-card class="mx-auto" color="indigo" dark max-width="600">
        <form class="pa-6" action="">
          <v-col cols="12" sm="12">
            <v-textarea
              label="Mon message"
              filled
              auto-grow
              outlined
              rows="2"
              row-height="15"
              v-model="message"
            ></v-textarea>
          </v-col>

          <div class="d-flex justify-center">
            <!-- <label for="image" class="pr-2">Image</label> -->
            <!-- <v-file-input
              ref="file"
              type="file"
              @change="uploadImage"
              label="File input"
              accept="image/png, image/jpeg,
                image/bmp, image/gif"
              outlined
              name="image"
              dense
            ></v-file-input> -->
            <v-btn color="success" @click="$refs.file.click()"
              >Ajouter une image</v-btn
            >
            <input
              v-show="false"
              ref="file"
              type="file"
              label="sel"
              accept="image/png, image/jpeg,
                image/bmp, image/gif"
              name="image"
              @change="uploadImage"
            />
            <!-- <input
              @change="uploadImage"
              type="file"
              accept="image/png, image/jpeg,
                image/bmp, image/gif"
              ref="file"
              name="image"
              
            /> -->
          </div>
        </form>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn
              class="btn align-self-center ma-2"
              color="purple lighten-2"
              @click.prevent.stop="publish()"
            >
              Publier
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div>
      <div class="mt-3" v-for="(message, index) in messages" :key="index">
        <v-card class="mx-auto" color="teal darken-2" dark max-width="600">
          <div class="d-flex">
            <div @click="profil" class=" profil d-flex align-center">
              <v-avatar class="mt-2 ml-2">
                <img :src="message.imageUrl" alt="" />
                
              </v-avatar>
              <span class="ml-2"
                >{{ message.User.last_name }} {{ message.User.first_name }}
              </span>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-card-title class="d-flex justify-center">
                <span class="text font-weight-light">
                  Posté le: {{ dateParser(message.createdAt) }}
                </span>
              </v-card-title>
            </div>
          </div>
          <div>
            <div class="rounded-lg">
              <v-img
                :src="message.imageUrl"
                alt="image postée par l'utilisateur"
                :max-height="200"
                :max-width="500"
                class="image mx-auto pb-5 rounded-lg"
              >
              </v-img>
            </div>
            <div class="d-flex pa-2">
              <v-col cols="10">
                <v-card-text class="text">
                  {{ message.message }}
                </v-card-text>
              </v-col>
              <v-col
              cols="2"
                class="pa-0 d-flex text-center justify-end"
                v-if="message.UserId == UserId"
              >
                <!-- <v-icon @click="messageToEdit(index)">mdi-pencil</v-icon>
              <v-icon @click="deleteMessage(message.id)">mdi-delete</v-icon> -->

                <v-speed-dial
                  v-model="fab"
                  :top="top"
                  :bottom="bottom"
                  :right="right"
                  :left="left"
                  :direction="direction"
                  :open-on-hover="hover"
                  :transition="transition"
                >
                  <template v-slot:activator>
                    <v-btn v-model="fab" color="blue darken-2" dark fab>
                      <v-icon v-if="fab"> mdi-close </v-icon>
                      <v-icon v-else> mdi-plus </v-icon>
                    </v-btn>
                  </template>
                  <v-btn
                    @click="messageToEdit(index)"
                    fab
                    dark
                    small
                    color="green"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    @click="deleteMessage(message.id)"
                    fab
                    dark
                    small
                    color="red"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-speed-dial>
              </v-col>

              </div>
           
            <v-card-actions>
              <v-list-item class="grow">
                <v-row align="center" justify="end">
                  <v-btn icon class="mr-3">
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-thumb-down</v-icon>
                  </v-btn>
                  <!-- <v-icon class="mr-1"> mdi-heart </v-icon> -->
                  <!-- <span class="subheading mr-2">256</span> -->
                </v-row>
              </v-list-item>
            </v-card-actions>
          </div>
        </v-card>
      </div>
      <v-dialog v-model="dialog" width="500">
        <!-- <template v-slot:activator="{ on, attrs }">
          
        </template> -->

        <v-card>
          <v-col cols="12" sm="12">
            <v-textarea
              label="Message"
              filled
              auto-grow
              outlined
              rows="2"
              row-height="15"
              v-model="messageEdit.message"
            ></v-textarea>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="editMessage(messageEdit.id), (dialog = false)"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- <div class="mt-3" v-for="(message, index) in messages" :key="index"></div> -->
  </div>
</template>

<script>
import PostServices from "@/services/PostServices";

let user = JSON.parse(localStorage.getItem("user"));

// let id = user.id;

export default {
  name: "Post",

  data() {
    return {
      messages: [],
      dialog: false,
      message: null,
      file: "",
      UserId: user.id,
      messageEdit: new Object(),
    };
  },
  async mounted() {
    this.messages = (await PostServices.getAllPosts()).data.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  },

  methods: {
    uploadImage() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    async publish() {
      const fd = new FormData();
      fd.append("message", this.message);
      fd.append("UserId", this.UserId);
      if (this.file !== null) {
        fd.append("image", this.file);
      }

      await PostServices.createPost(fd);
      location.reload(true);
    },

    messageToEdit(index) {
      this.dialog = true;
      this.messageEdit = this.messages[index];
    },
    async editMessage(messageId) {
      try {
        let data = {
          message: this.messageEdit.message,
        };
        const res = await PostServices.modifyPost(`${messageId}`, data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMessage(messageId) {
      await PostServices.deletePost(`${messageId}`);
      location.reload(true);
    },
    // fonction pour transformer la date sur les messages
    dateParser(num) {
      let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      let timestamp = Date.parse(num);
      let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

      return date.toString();
    },
    profil(userId) {
      const router = this.$router;
      setTimeout(function () {
        router.push(`/profil/${userId}`);
      }, 10);
    },
    // deleteMessage(messageId) {},
  },
};
</script>
<style lang="scss" scoped>
.profil{
  cursor: pointer;
}


</style>
