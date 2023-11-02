<template>
  <div>

    <v-row>
      <col4>
        <nur-task-user-selector v-model="user"/>
      </col4>
      <col4>
        <v-text-field v-model="commitInfo.link" label="Ссылка на коммит" outlined dense filled required
                      :hint="commitInfo.id"
                      @input="onCommitLinkChanged"/>
      </col4>
      <col4>
        <v-text-field v-model="commitInfo.message" label="Сообщение коммита" outlined dense filled required
                      hide-details/>
      </col4>
    </v-row>


    <v-row>


      <col-full v-for="(file, i) in reviewFiles" :key="i" class="mb-4">
        <v-row class="pl-2 mb-2"><h2 style="font-weight: 300">{{ file.filename || 'Новый файл' }}</h2></v-row>
        <v-row>
          <col4>
            <v-text-field v-model="file.filename" label="Имя файла" outlined dense filled required/>
          </col4>
          <col4>
            <v-text-field v-model="file.fileLink" label="Ссылка файла" outlined dense filled required/>
          </col4>

          <col-full v-for="(report, ri) in file.reports" :key="ri">
            <v-row class="pl-4">
              <col4>
                <v-text-field v-model="report.lineLink" label="Ссылка на строку" outlined dense filled required
                              hide-details
                              @input="onReportLinkChanged(i, ri)"/>
                <span v-if="report.lineNumber">Строка {{ report.lineNumber }}</span>
              </col4>
              <col7>
                <v-textarea v-model="report.description" label="Замечание" style="font-size: 13px" rows="3" auto-grow
                            @focusin="onMessageFieldFocused(i, ri)"
                            outlined dense filled required/>
              </col7>
              <col1>
                <v-btn color="error" @click="deleteReport(i, ri)">-</v-btn>
              </col1>

            </v-row>
            <v-row class="mb-4">
              <v-divider/>
            </v-row>
          </col-full>

          <col4>
            <v-btn color="success" @click="addReport(i)">
              + замечание
            </v-btn>
          </col4>
        </v-row>
      </col-full>

      <col-full class="mb-4">

      </col-full>

    </v-row>


    <v-row class="mb-4">

      <col-full>
        <v-btn color="success" @click="addFile" class="mr-4">+ файл</v-btn>
        <v-btn color="warning" @click="generate">
          <v-icon>compare_arrows</v-icon> &nbsp; Сформировать
        </v-btn>
      </col-full>
    </v-row>

    <v-row>
      <col-full>
        <editor :code="generatedText" language="md" auto-style-line-numbers line-numbers readonly/>
      </col-full>
    </v-row>

    <nur-review-cause-list @select="onCauseSelected"/>
  </div>
</template>

<script>
//import { mapGetters, mapActions } from 'vuex'
import Col6 from "@/components/common/columns/Col6";
import Editor from "@/components/editor/Editor";
import * as propertyService from "@/utils/service/propertyService";
import _ from "lodash";
import Vue from "vue";
import {hasFilter, keyboardLayoutToEn, keyboardLayoutToRu} from "@/utils/utils/stringUtils";
import ColFull from "@/components/common/columns/ColFull";
import Col4 from "@/components/common/columns/Col4";
import ReviewFile from "@/models/nur/ReviewFile";
import ReviewReport from "@/models/nur/ReviewReport";
import Col8 from "@/components/common/columns/Col8";
import Col7 from "@/components/common/columns/Col7";
import Col1 from "@/components/common/columns/Col1";
import NurReviewCauseList from "@/components/nur/NurReviewCauseList";
import NurTaskUserSelector from "./NurTaskUserSelector";
import {findProjectByPath, getCommitInfo} from "../../utils/api/gitlabApiClient";

export default {
  name: "NurReviewBugreport",
  components: {NurTaskUserSelector, NurReviewCauseList, Col1, Col7, Col8, Col4, ColFull, Editor, Col6},
  props: {},
  data() {
    return {
      commitInfo: {
        link: null,
        id: null,
        message: null,
        project: null,
        projectId: null,
        author: null
      },
      user: null,
      reviewFiles: [],
      generatedText: null,

      focusedFileIndex: null, // индекс файла, в котором выделена textarea
      focusedReportIndex: null, // индекс строки в файле, в котором выделена textarea
      allowInsertCause: false
    }
  },
  computed: {
    userList() {
      let users = propertyService.getObjectByCode('review_users')
      return _.orderBy(users, ['name'], ['asc']);
    },
    taskTemplate() {
      return propertyService.getTextByCode('review_bugreport_template')
    }
  },
  mounted() {
    if (propertyService.getProperties().length === 0)
      propertyService.reload()
  },
  created() {
  },
  methods: {
    langFilter(item, queryText) {
      console.log(item, queryText)
      let queryEn = keyboardLayoutToEn(queryText)
      let queryRu = keyboardLayoutToRu(queryText)
      return hasFilter(item.name, queryText) || hasFilter(item.name, queryEn) || hasFilter(item.name, queryRu) ||
        hasFilter(item.gitlabUsername, queryText) || hasFilter(item.gitlabUsername, queryEn) || hasFilter(item.gitlabUsername, queryRu)
    },

    onCommitLinkChanged(val) {
      if (!this.commitInfo.link) {
        this.commitInfo.id = null;
        return
      }
      let parts = this.commitInfo.link.split('\/')
      this.commitInfo.id = parts[parts.length - 1]
      this.commitInfo.project = parts[parts.length - 4]

      this.fetchCommitInfo()
    },

    async fetchCommitInfo() {
      if (this.commitInfo.project) {
        try {
          let project = await findProjectByPath(this.commitInfo.project)
          if (!project) return;

          this.commitInfo.projectId = project.id
          let commit = await getCommitInfo(project.id, this.commitInfo.id)
          if (!commit) return

          this.commitInfo.author = commit.author
          this.commitInfo.message = commit.message

          if (this.commitInfo.author)
            this.user = _.find(this.userList, { 'gitlabUsername': this.commitInfo.author })
        } catch (e) {
          alert(e)
          console.log(e)
        }
      }
    },

    addFile() {
      this.reviewFiles.push(new ReviewFile({}))
    },
    addReport(fileIndx) {
      Vue.set(this.reviewFiles[fileIndx].reports, this.reviewFiles[fileIndx].reports.length, new ReviewReport({}))
    },
    deleteReport(fileIndx, reportIndx) {
      Vue.delete(this.reviewFiles[fileIndx].reports, reportIndx)
    },
    onReportLinkChanged(fileIndx, reportIndx) {
      if (!this.reviewFiles[fileIndx].reports[reportIndx].lineLink) {
        Vue.set(this.reviewFiles[fileIndx].reports[reportIndx], 'lineNumber', null)
        return
      }

      let parts = this.reviewFiles[fileIndx].reports[reportIndx].lineLink.split('_')
      Vue.set(this.reviewFiles[fileIndx].reports[reportIndx], 'lineNumber', _.toNumber(parts[parts.length - 1]))
    },

    generate() {
      let compiled = _.template(this.taskTemplate)
      this.generatedText = _.unescape(compiled({
        user: this.user,
        commit: this.commitInfo,
        files: this.reviewFiles
      }))
      console.log(this.generatedText)
    },

    onCauseSelected(causeText) {
      if (!this.allowInsertCause) return;

      Vue.set(this.reviewFiles[this.focusedFileIndex].reports[this.focusedReportIndex], 'description', causeText)
    },
    onMessageFieldFocused(fileIndex, reportIndex) {
      console.log(fileIndex, reportIndex)
      this.focusedFileIndex = fileIndex
      this.focusedReportIndex = reportIndex
      this.allowInsertCause = true
    }
  },

}
</script>

<style scoped>

</style>
