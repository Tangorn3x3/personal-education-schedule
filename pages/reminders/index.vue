<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-switch v-model="isRemindersActive" label="Активен" color="success" inset dense/>
        <reminder-items/>
      </v-col>

      <v-col cols="12" md="8">
        <reminder-form v-if="currentItem"
                       :selected-type="currentItem.type"
                       :types="types"
                       :reminder="currentItem" @save="onUpdateReminder"/>
      </v-col>
    </v-row>

    <recent-snippet-list/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import ProjectList from "@/components/vendors/ProjectList";
  import ProjectChaptersWithItems from "@/components/vendors/ProjectChaptersWithItems";
  import Editor from "@/components/editor/Editor";
  import SnippetItem from "@/components/snippet/SnippetItem";
  import RecentSnippetList from "@/components/snippet/RecentSnippetList";
  import ReminderItems from "@/components/reminder/ReminderItems";
  import ReminderForm from "@/components/reminder/ReminderForm";
  import notificationService from "@/utils/service/notificationService";

  export default {
    name: "index",
    components: {
      ReminderForm,
      ReminderItems, RecentSnippetList, SnippetItem, Editor, ProjectChaptersWithItems, ProjectList},
    props: {},
    asyncData(context) {

    },
    data() {
      return {
        isRemindersActive: false
      }
    },
    computed: {
      ...mapState('reminder/reminderStore', { currentItem: 'currentItem', types: 'types' })
    },
    watch: {
      isRemindersActive(val) {
        notificationService.setRemindersStatus(val)
      }
    },
    mounted() {
      this.isRemindersActive = notificationService.isRemindersActive()
    },
    created() {
    },
    methods: {
      ...mapActions('reminder/reminderStore', { updateReminder: 'updateReminder' } ),
      onUpdateReminder (item) {
        this.updateReminder(item)
      },
    },

  }
</script>

<style scoped>

</style>
