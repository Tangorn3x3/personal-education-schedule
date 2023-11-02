<template>
  <div>


      <v-tabs v-model="tab">
        <v-tab v-if="can('bug_report_commits')">
          <v-icon>preview</v-icon> &nbsp; Текст для Ревью
        </v-tab>
        <v-tab v-if="can('bug_report_bugs')">
          <v-icon>bug_report</v-icon> &nbsp; Текст с Замечаниями
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" style="width: 100%">
        <v-tab-item v-if="can('bug_report_commits')">
          <v-card flat>
            <v-card-text>
              <nur-review-task/>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item v-if="can('bug_report_bugs')">
          <v-card flat>
            <v-card-text>
              <nur-review-bugreport/>
            </v-card-text>
          </v-card>
        </v-tab-item>


      </v-tabs-items>



  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ProjectList from "@/components/vendors/ProjectList";
import ProjectChaptersWithItems from "@/components/vendors/ProjectChaptersWithItems";
import Editor from "@/components/editor/Editor";
import SnippetItem from "@/components/snippet/SnippetItem";
import RecentSnippetList from "@/components/snippet/RecentSnippetList";
import ReminderItems from "@/components/reminder/ReminderItems";
import ReminderForm from "@/components/reminder/ReminderForm";
import NurReviewTask from "@/components/nur/NurReviewTask";
import NurReviewBugreport from "@/components/nur/NurReviewBugreport";

export default {
  name: "index",
  components: {
    NurReviewBugreport,
    NurReviewTask
  },
  props: {},
  asyncData(context) {

  },
  data() {
    return {
      tab: 1
    }
  },
  computed: {},
  watch: {},
  mounted() {

  },
  created() {
  },
  methods: {
    ...mapActions('reminder/reminderStore', {updateReminder: 'updateReminder'}),
    onUpdateReminder(item) {
      this.updateReminder(item)
    },
  },

}
</script>

<style scoped>

</style>
