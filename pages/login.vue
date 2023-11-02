<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-3" text>
          <v-toolbar dark flat color="primary">
            <v-toolbar-title>{{ appName }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text>

            <div style="display: flex; justify-content: center"
                 id="google-login-btn"
                 v-google-identity-login-btn="{ clientId: googleClientId }">
              Продолжить с Google
            </div>


          </v-card-text>

          <v-card-actions>
            <v-spacer />
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import * as propertyService from "@/utils/service/propertyService";
import nuxtConfig from "../nuxt.config";

import GoogleSignInButton from '../components/app_platform/auth/google-identity-signin-directive';

export default {
  directives: {
    GoogleSignInButton
  },
  name: 'Login',
  layout: 'inspire',
  data () {
    return {
      googleClientId:  nuxtConfig.auth.google.clientId,

      appName: nuxtConfig.manifest.name,
      error: ''
    }
  },
  computed: {
    ...mapState('auth', ['user', 'loggedIn', 'busy']),
  },
  methods: {
    onGoogleAuthSuccess (response) {

      let jwtCredentials = response.credential
      const profileData = JSON.parse( atob(jwtCredentials.split('.')[1]) );
      console.table(profileData);

      this.$auth.setUserToken(jwtCredentials)
      this.$auth.setUser(profileData)

      //this.initRequiredData()
      this.$router.push('/')


    },
    doLogin() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.error = null
        this.$auth.loginWith('local', {data: {username: this.login, password: this.password}})
          .then(resp => {
            this.initRequiredData()
            this.$router.push('/')
          })
      }
    },

    initRequiredData() {
      propertyService.reload()
    }
  }
}
</script>

<style scoped>

</style>
