<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel class="dense">
      <v-expansion-panel-header class="light--text">{{header}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "SinglePanel",
    props: {
      header: {type: String, default: ""}
    },
    data() {
      return {
        panel: [0],
      }
    },
  }
</script>

<style scoped>

</style>
