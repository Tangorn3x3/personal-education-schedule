<template>
  <v-app class="inspire" :style="bgStyle">
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>

import {SRV_PATH} from "@/nuxt.config";

export default {
  data () {
    return {

    }
  },
  computed: {
    bgStyle() {
      return `background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${SRV_PATH}images/mybg-1.jpg) !important;`
    }
  }
}
</script>

<style>
  .v-application.inspire.theme--dark input:-webkit-autofill,
  .v-application.inspire.theme--dark input:-webkit-autofill:hover,
  .v-application.inspire.theme--dark input:-webkit-autofill:focus,
  .v-application.inspire.theme--dark input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #1E1E1E inset !important;
  }

  .v-application.inspire.theme--dark input:-webkit-autofill {
    -webkit-text-fill-color: #B8B8B8 !important;
  }
</style>
