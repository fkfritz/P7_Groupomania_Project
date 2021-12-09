<template>
  <div class="container">
    <WelcomeToUser />
    <div class="error" v-html="error" />
    <NewPost />

    <!-- -------------------- -->
    <!-- Bloc message posté -->
    <!-- ---------------------- -->
    <div>
      <div class="mt-3" v-for="(post, index) in posts" :key="index">
        <v-card
          class="mx-auto"
          color="light-blue darken-4"
          dark
          max-width="800"
        >
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
                :max-height="300"
                :max-width="700"
                class="image mx-auto pb-5 rounded-lg"
              ></v-img>
            </div>

            <div class="d-flex pa-2">
              <!-- --------------- -->
              <!-- Bloc message -->
              <!-- ---------------- -->

              <v-col cols="10">
                <v-card-text class="post-message text">
                  {{ post.message }}
                </v-card-text>
              </v-col>
              <!-- --------------------------------------------------- -->
              <!-- Groupe de bouton pour modifier et supprimer un post -->
              <!-- --------------------------------------------------- -->
              <v-col
                cols="2"
                class="pa-0 d-flex text-center justify-end align-end"
                v-if="post.UserId == UserId || userAdmin === true"
              >
                <v-speed-dial v-model="fab">
                  <template v-slot:activator>
                    <v-btn v-model="fab" color="purple lighten-1" dark fab>
                      <v-icon v-if="fab">mdi-close</v-icon>
                      <v-icon v-else>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <v-btn
                    @click="messageToEdit(post)"
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
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click=";(show = !show), commentShow(post, post.id)"
                    >
                      <v-icon large color="purple accent-3">
                        mdi-message-text
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Afficher les commentaires</span>
                </v-tooltip>
                <span>{{ post.Comments.length }}</span>
              </v-col>
            </div>
            <!-- ------------------- -->
            <!-- Bloc commentaire -->
            <!-- ------------------- -->

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <div
                  v-for="comment in post.Comments"
                  :key="comment.id"
                  class="d-flex align-center pr-4 pl-4"
                >
                  <v-card-text>
                    <span class="profil" @click="profil(comment.UserId)">
                      {{ comment.first_name }} {{ comment.last_name }}
                    </span>
                    :
                    {{ comment.text }}
                  </v-card-text>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-if="UserId == comment.UserId"
                        @click="deleteComment(comment.id)"
                        fab
                        dark
                        v-bind="attrs"
                        v-on="on"
                        small
                        color="red"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Supprimer mon commentaire</span>
                  </v-tooltip>
                </div>
              </div>
            </v-expand-transition>
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
import NewPost from '@/components/NewPost.vue'
import WelcomeToUser from '@/components/WelcomeToUser.vue'

let user = JSON.parse(localStorage.getItem('user'))

export default {
  name: 'Post',

  data() {
    return {
      messages: [],
      dialog: false,
      comment: false,      
      show: false,
      message: null,
      file: '',
      fileName: '',
      UserId: user.id,
      userAdmin: user.isAdmin,
      first_name: user.first_name,
      last_name: user.last_name,
      messageEdit: new Object(),
      text: null,
      currentPostId: null,
      currentPost: [],
      error: null,
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
  components: {
    NewPost,
    WelcomeToUser,
  },
  methods: {
    commentPost(postId) {
      this.comment = true
      this.currentPostId = postId
    },
    commentShow(post, postId) {
      this.currentPostId = postId
      this.currentPost = post
      console.log('la', this.currentPost)
      console.log('ici', this.currentPost)
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
      try {
        const fd = new FormData()
        fd.append('message', this.message)
        fd.append('UserId', this.UserId)
        if (this.file !== null) {
          fd.append('image', this.file)
        }
        await PostServices.createPost(fd)
        location.reload(true)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    // //////////////////////////////////////////////////////////////////////////////
    // Fonction pour lancer la boite de dialogue qui va permettre de modifier le post
    // ///////////////////////////////////////////////////////////////////////////////
    messageToEdit(post) {
      this.dialog = true
      this.messageEdit = post
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
        this.error = error.response.data.error
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
          first_name: this.first_name,
          last_name: this.last_name,
        }
        console.log(data)
        const response = await PostServices.createComment(data)
        console.log(response)
        this.comment = false
        this.currentPostId = null
        location.reload(true)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    // //////////////////////////////////
    //Fonction pour supprimer un post
    // //////////////////////////////////
    async deleteComment(commentId) {
      await PostServices.deleteComment(`${commentId}`)
      location.reload(true)
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
  text-decoration: underline;
}
.v-btn {
  text-transform: initial;
}
.post-message {
  font-weight: 300;
  font-size: 1.3rem;
}
</style>
