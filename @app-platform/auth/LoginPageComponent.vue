<script>
import GoogleSignInButton from "@/@app-platform/auth/google-identity-signin-directive";
import nuxtConfig from "@/nuxt.config";
import {mapActions, mapState} from "vuex";

export default {
  directives: {
    GoogleSignInButton
  },
  name: 'LoginPageComponent',
  data() {
    return {
      googleClientId: nuxtConfig.auth.google.clientId,

      appName: nuxtConfig.manifest.name,
      error: ''
    }
  },
  computed: {
    ...mapState('auth', ['user', 'loggedIn', 'busy']),
  },
  mounted() {
    console.log('$auth', this.$auth)
    console.log('store', this.$store.state.auth)
  },
  methods: {
    ...mapActions('support', {reloadInfo: 'reloadPlatformInfo'}),

    onGoogleAuthSuccess(response) {
      let jwtCredentials = response.credential
      const profileData = JSON.parse(atob(jwtCredentials.split('.')[1]));
      console.table(profileData);

      this.$auth.setUserToken(jwtCredentials)
      this.initRequiredData()

      this.$auth.setUser(profileData)
    },

    initRequiredData() {
      this.reloadInfo()
    }

  }
}
</script>

<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-3" text>
          <v-toolbar dark flat color="primary">
            <v-toolbar-title>{{ appName }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text>

            <v-progress-circular v-if="busy" indeterminate color="primary"/>
            <div v-else style="display: flex; justify-content: center"
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

<style scoped>

</style>