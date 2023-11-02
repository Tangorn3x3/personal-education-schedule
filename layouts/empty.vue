<template>
  <v-app class="layout-empty" dark>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>

  export default {
    data () {return {}},
    computed: {

    },
    created() {
      this.$vuetify.theme.dark = true
    }
  }
</script>

<style>
.v-application code {
  color: #a9b7c6 !important;
}
.theme--dark.v-application code {
  background-color: inherit !important;
}
</style>
