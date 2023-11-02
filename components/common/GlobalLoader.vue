<template>
  <v-overlay :value="loading" z-index="100">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  export default {
    name: "GlobalLoader",
    data() {
      return {

      }
    },
    computed: {
      ...mapState('utils', {loading: 'loading'})
    }
  }
</script>
