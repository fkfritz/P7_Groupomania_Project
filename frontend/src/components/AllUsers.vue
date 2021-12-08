<template>
  <div>
    <v-row
      justify="center"
    >
      <v-dialog
        v-model="boxuser"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="boxuser = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Tous les utilisateurs</v-toolbar-title>
            </v-toolbar>
         
                <v-list three-line>
      <template  >
        
         
       

        <v-list-item v-for="user in users" :key="user.id">
          
        
          <v-list-item-avatar>
            <v-img :src="user.avatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title > {{user.last_name}} {{user.first_name}} </v-list-item-title>
            <v-list-item-subtitle ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

          <div style="flex: 8 8 auto;"></div>
        </v-card>
      </v-dialog>     
    </v-row>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js"

export default {
    props: {
        value: Boolean
    },
    data(){
        return{
            users:"",
        }
    },
    computed: {
        boxuser: {
            get(){
                return this.value
            },
            set(value){
                this.$emit("input", value)
                }
            
        }
    },
    async mounted(){
        this.users = (await UserServices.getAllUsers()).data
        console.log( "ici",this.users);
    }
}
</script>

<style lang="scss" scoped>

</style>
