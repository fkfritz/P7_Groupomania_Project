<template>
  <v-card max-width="700" class="offset-md-3 mx-auto">
        <v-toolbar
          class="d-flex justify-center "
          elevation="0"
          dense
          color="green"
        >
        <v-toolbar-title >Ajouter un message</v-toolbar-title>
        </v-toolbar>
    <form class="pa-6" action="">
        <v-container>
      <v-col cols="12" sm="12">
        <v-textarea
          label="Exprimez-vous"
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
      </v-container>
    </form>    
  </v-card>
</template>

<script>
import PostServices from "@/services/PostServices";
let user = JSON.parse(localStorage.getItem("user"));
export default {
  data() {
    return {
        file:'',
        fileName: "",
        UserId: user.id,
        message: null,
    }
  },
  methods:{
      uploadImage() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
      console.log(this.file);
    },
    async publishPost() {
      const fd = new FormData();
      fd.append("message", this.message);
      fd.append("UserId", this.UserId);
      if (this.file !== null) {
        fd.append("image", this.file);
      }
      await PostServices.createPost(fd);
      location.reload(true);
    },
  }
}

</script>
<style lang="scss" scoped>
.v-toolbar__title {
  color: white;
  font-weight: bold;

  font-size: 1.1rem;
  font-display: roboto;
}</style>
