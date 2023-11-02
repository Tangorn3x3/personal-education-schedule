<template>
  <v-dialog v-model="dialog" persistent max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="default"  class="mr-2" @click.stop="" v-on="on">
        Открыватор задач
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">Открыватор страниц с задачами</span>
        <v-spacer/>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="8" sm="12" md="8">

            <v-textarea v-model="text" label="Текст для парсинга"
                        outlined dense filled required style="font-size: 12px" auto-grow
                        @keyup.enter="convert"/>

            <v-btn color="success" block @click="convert" :disabled="!text" class="mb-4">
              <v-icon>compare_arrows</v-icon>
            </v-btn>

          </v-col>

          <v-col cols="4" sm="12" md="4">
            <div v-for="task in tasks">
              <li><a :href="task.link" target="_blank">{{ task.code }}</a></li>

            </div>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="dialog = false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import Editor from "../editor/Editor";
export default {
  name: "JiraTasksOpener",
  components: {Editor},
  data() {
    return {
      dialog: false,
      text: null,
      generatedText: null,
      tasks: []
    }
  },
  computed: {
    jiraUrl() {
      return localStorage.getItem('opener_jira_host_url')
    }
  },
  methods: {
    convert() {
      let codes = _.words(this.text, /[A-Z]+-\d+/igm);
      let tasksParsed = []
      _.forEach(codes, code => { tasksParsed.push(this.prepareSingleTaskInfo(code)) })
      this.tasks = tasksParsed

      //this.openAllTasks(tasksParsed)
    },
    openAllTasks(tasksParsed) {
      _.forEach(tasksParsed, task => {
        //window.open(task.link, '_blank');
        window.open(task.link, task.code);
      })
    },
    prepareGeneratedText() {

    },
    prepareSingleTaskInfo(code) {
      return {
        code: code.toUpperCase(),
        link: `${this.jiraUrl}/browse/${code.toUpperCase()}`
      }

    }
  }
}
</script>

<style scoped>

</style>
