<template>

  <v-dialog v-model="dialog" persistent max-width="1400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="default" icon class="mr-2" @click.stop="" v-on="on">
        <v-icon>compare_arrows</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">Конвертеры</span>
        <v-spacer/>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <converter-list/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="dialog = false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>

</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import ConverterList from "./ConverterList";
  export default {
    name: "ConverterDialog",
    components: {ConverterList},
    props: {},
    data() {
      return {
        tab: null,
        dialog: false
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {
      console.debug('ConverterDialog mounted.')
    },
    created() {
    },
    methods: {
      //...mapActions('NameStore', ['fetchData'])
    },

  }
</script>

<style scoped>

</style>
