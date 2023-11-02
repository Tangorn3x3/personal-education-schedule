<template>
  <v-dialog v-model="dialog" persistent >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="default" icon class="mr-2" @click.stop="" v-on="on">
        <v-icon>preview</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">Тексты для ревью</span>
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
                <v-icon>preview</v-icon> &nbsp; Текст для Ревью
              </v-tab>
              <v-tab>
                <v-icon>bug_report</v-icon> &nbsp; Текст с Замечаниями
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" style="width: 100%">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <nur-review-task/>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <nur-review-bugreport/>
                  </v-card-text>
                </v-card>
              </v-tab-item>


            </v-tabs-items>

          </v-row>
        </v-container>
      </v-card-text>
    </v-card>


  </v-dialog>
</template>

<script>
//import { mapGetters, mapActions } from 'vuex'
import NurReviewTask from "@/components/nur/NurReviewTask";
import NurReviewBugreport from "@/components/nur/NurReviewBugreport";
export default {
  name: "NurReviewGenerator",
  components: {NurReviewBugreport, NurReviewTask},
  props: {},
  data() {
    return {
      tab: 0,
      dialog: false
    }
  },
  computed: {
    //...mapGetters('NameStore', ['item'])
  },
  mounted() {
    console.debug('NurReviewGenerator mounted.')
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
