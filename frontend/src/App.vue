<template>
  <v-app>
    <v-main class="test">
      <PageHeader />
      <br>
      
      <v-container class="mt-16">
        <!-- <Login /> -->
        <!-- <Signup /> -->
        
        <router-view/>
      </v-container>
      <!-- <router-view/> -->
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import PageHeader from '@/components/Header.vue'
// import Login from '@/components/Login.vue'
// import Signup from '@/components/Signup.vue'




export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    PageHeader, 
    
    // Login,
    // Signup

  },
  methods: {
    ...mapActions([
      'fetchAccessToken'
    ]),
  },
  created() {
    this.fetchAccessToken();
  }
};
</script>
<style lang="scss" scoped>
.test {
  background-color: #f2f2f2;
}
</style>
