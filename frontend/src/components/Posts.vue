<template>
  <div class="container">
    <div class="mb-8">
      <!-- ----------------------- -->
      <!-- Bloc pour publer un msg -->
      <!-- ------------------------ -->
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
            <v-btn color="success" @click="$refs.file.click()">
              Ajouter une image
            </v-btn>
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
            <div>{{ fileName }}</div>
          </div>
        </form>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn
              class="btn align-self-center ma-2"
              color="purple lighten-2"
              @click.prevent.stop="publishPost()"
            >
              Publier
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <!-- -------------------- -->
    <!-- Bloc message posté -->
    <!-- ---------------------- -->
    <div>
      <div class="mt-3" v-for="(post, index) in posts" :key="index">
        <v-card class="mx-auto" color="teal darken-2" dark max-width="600">
          <div class="d-flex">
            <div
              @click="profil(post.UserId)"
              class="profil d-flex align-center"
            >
              <v-avatar class="mt-2 ml-2">
                <img :src="post.User.avatar" alt="" />
              </v-avatar>
              <!-- ------------------------ -->
              <!-- Bloc nom d'utilisateur -->
              <!-- ------------------------- -->
              <span class="ml-2">
                {{ post.User.last_name }} {{ post.User.first_name }}
              </span>
            </div>
            <v-spacer></v-spacer>
            <!-- ----------------------- -->
            <!-- Bloc date du post -->
            <!-- ----------------------- -->
            <div>
              <v-card-title class="d-flex justify-center">
                <span class="text font-weight-light">
                  Posté le: {{ dateParser(post.createdAt) }}
                </span>
              </v-card-title>
            </div>
          </div>
          <div>
            <!-- -------------------- -->
            <!-- Bloc image -->
            <!-- -------------------- -->
            <div class="rounded-lg">
              <v-img
                :src="post.imageUrl"
                alt="image postée par l'utilisateur"
                :max-height="200"
                :max-width="500"
                class="image mx-auto pb-5 rounded-lg"
              ></v-img>
            </div>
            <div class="d-flex pa-2">
              <!-- --------------- -->
              <!-- Bloc message -->
              <!-- ---------------- -->
              <v-col cols="10">
                <v-card-text class="text">
                  {{ post.message }}
                </v-card-text>
              </v-col>
              <!-- --------------------------------------------------- -->
              <!-- Groupe de bouton pour modifier et supprimer un post -->
              <!-- --------------------------------------------------- -->
              <v-col
                cols="2"
                class="pa-0 d-flex text-center justify-end align-end"
                v-if="post.UserId == UserId"
              >
                <v-speed-dial v-model="fab">
                  <template v-slot:activator>
                    <v-btn v-model="fab" color="blue darken-2" dark fab>
                      <v-icon v-if="fab">mdi-close</v-icon>
                      <v-icon v-else>mdi-plus</v-icon>
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
                    @click="deleteMessage(post.id)"
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
            <!-- ----------------------------------- -->
            <!-- Bouton pour ajouter un commentaire -->
            <!-- ----------------------------------- -->
            <div>
              <v-col>
                <v-btn @click="commentPost(post.id)">
                  Ajouter un commentaire
                </v-btn>
              </v-col>
            </div>
            <!-- --------------------------------------- -->
            <!-- Bouton pour afficher le bloc commentaire -->
            <!-- ---------------------------------------- -->
            <div>
              <v-col>
                <v-btn icon @click="commentShow(post, post.id)">
                  <v-icon large color="blue darken-2">mdi-message-text</v-icon>
                </v-btn>
                <span>{{ post.Comments.length }}</span>
              </v-col>
            </div>

            <!-- -------------------- -->
            <!-- Bloc like -->
            <!-- -------------------- -->
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

      <!-- ------------------------------------- -->
      <!-- Boite de dialog pour modifier un msg -->
      <!-- -------------------------------------- -->
      <v-dialog v-model="dialog" width="500">
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
              Publier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ------------------- -->
      <!-- Bloc commentaire -->
      <!-- ------------------- -->

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <div v-for="(comment, index) in post.Comments" :key="index">
            <span> {{}} </span>

            <!-- <v-card-text>{{ comment.text }}</v-card-text> -->
          </div>
        </div>
      </v-expand-transition>

      <!-- ------------------------------------------- -->
      <!-- Boite de dialog pour ajouter un commentaire -->
      <!-- -------------------------------------------- -->
      <div>
        <v-dialog v-model="comment" width="500">
          <v-card>
            <v-col cols="12" sm="12">
              <v-textarea
                label="Message"
                filled
                auto-grow
                outlined
                rows="2"
                row-height="15"
                v-model="text"
              ></v-textarea>
            </v-col>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="publishComment(currentPostId)"
              >
                Publier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PostServices from '@/services/PostServices'

let user = JSON.parse(localStorage.getItem('user'))

export default {
  name: 'Post',

  data() {
    return {
      messages: [],
      dialog: false,
      comment: false,
      fab: false,
      show: false,
      message: null,
      file: '',
      fileName: '',
      UserId: user.id,
      messageEdit: new Object(),
      text: null,
      currentPostId: null,
      currentPost: null,
     
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts
    },
  },

  mounted() {
    this.$store.dispatch('getPosts')
  },
  // async mounted() {
  //   this.messages = (await PostServices.getAllPosts()).data.sort((a, b) => {
  //     const dateA = new Date(a.createdAt).getTime();
  //     const dateB = new Date(b.createdAt).getTime();
  //     return dateB - dateA;
  //   });
  // },

  methods: {
    commentPost(postId) {
      this.comment = true
      this.currentPostId = postId
    },
    commentShow(post, postId) {
      this.show = true
      this.currentPostId = postId
      this.currentPost = post
      
      console.log('ici', this.currentPost);
      
    },
    // /////////////////////////////////////
    //Fonction pour charger une image
    // ////////////////////////////////////
    uploadImage() {
      this.file = this.$refs.file.files[0]
      this.fileName = this.file.name
      console.log(this.file)
    },
    // ////////////////////////////////
    //Fonction pour publier un post
    // ///////////////////////////////
    async publishPost() {
      const fd = new FormData()
      fd.append('message', this.message)
      fd.append('UserId', this.UserId)
      if (this.file !== null) {
        fd.append('image', this.file)
      }
      await PostServices.createPost(fd)
      location.reload(true)
    },
    // //////////////////////////////////////////////////////////////////////////////
    // Fonction pour lancer la boite de dialogue qui va permettre de modifier le post
    // ///////////////////////////////////////////////////////////////////////////////
    messageToEdit(index) {
      this.dialog = true
      this.messageEdit = this.messages[index]
    },
    // ////////////////////////////////////
    //Fonction pour modifier le post
    // ///////////////////////////////////
    async editMessage(messageId) {
      try {
        let data = {
          message: this.messageEdit.message,
        }
        const res = await PostServices.modifyPost(`${messageId}`, data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // //////////////////////////////////
    //Fonction pour supprimer un post
    // //////////////////////////////////
    async deleteMessage(messageId) {
      await PostServices.deletePost(`${messageId}`)
      location.reload(true)
    },
    // ////////////////////////////////////
    //Fonction pour publier un commentaire
    // /////////////////////////////////////
    async publishComment(id) {
      try {
        let data = {
          text: this.text,
          UserId: this.UserId,
          PostId: id,
        }
        console.log(data)
        // const messageId = this.messageEdit.id;
        const response = await PostServices.createComment(data)
        // console.log(messageId);
        console.log(response)
        this.comment = false
        this.currentPostId = null
      } catch (error) {
        console.log(error)
      }
    },
    // /////////////////////////////////////////////////
    // fonction pour transformer la date sur les messages
    // ////////////////////////////////////////////////////
    dateParser(num) {
      let options = {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
      let timestamp = Date.parse(num)
      let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

      return date.toString()
    },
    // //////////////////////////////////////////////////////////////////
    // Fonction qui permet de rediriger ver le profil d'un utilisateur
    // //////////////////////////////////////////////////////////////////
    profil(userId) {
      const router = this.$router
      setTimeout(function () {
        router.push(`/profil/${userId}`)
      }, 10)
    },
  },
}
</script>
<style lang="scss" scoped>
.profil {
  cursor: pointer;
}
</style>
