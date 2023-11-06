<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SnackbarAlert",
  props: {
    button: { type: Boolean, default: false },
  },
  computed: {
    ...mapState('utils', {snackbar: 'snackbar', snackbarText: 'snackbarText'}),
  },
  methods: {
    ...mapActions('utils', { hideSnackbar: 'hideSnackbar' }),
    onSnackbarChanged(value) {
      if (value === false)
        this.hideSnackbar()
    }
  }
}
</script>

<template>
  <v-snackbar :value="snackbar" :timeout="3000" @input="onSnackbarChanged"
              @click="hideSnackbar"
              dark elevation="24" color="primary"> {{ snackbarText }}
    <template v-if="button" v-slot:action="{ attrs }">
      <v-btn color="background" text v-bind="attrs" @click="hideSnackbar">OK</v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>