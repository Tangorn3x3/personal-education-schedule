<template>

  <v-dialog v-model="dialog" persistent max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="default" icon class="mr-2" @click.stop="" v-on="on">
        <v-icon>no_encryption</v-icon>
      </v-btn>
    </template>

    <v-card>


      <v-card-title>
        <span class="headline">ОФД. Шифрование</span>
        <v-spacer/>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-tabs v-model="tab">
              <v-tab>
                <v-icon>no_encryption</v-icon> &nbsp; Decrypt
              </v-tab>

              <v-tab>
                <v-icon>enhanced_encryption</v-icon> &nbsp; Encrypt
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" style="width: 100%">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <ofd-decryptor/>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <ofd-encryptor/>
                  </v-card-text>
                </v-card>
              </v-tab-item>

            </v-tabs-items>
          </v-row>
        </v-container>
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
  import OfdDecryptor from "@/components/encrypt/OfdDecryptor";
  import OfdEncryptor from "./OfdEncryptor";

  export default {
    name: "OfdDecryptorDialog",
    components: {OfdEncryptor, OfdDecryptor},
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
