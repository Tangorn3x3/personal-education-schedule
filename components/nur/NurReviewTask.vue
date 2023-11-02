<template>
  <v-row>

    <col6>
      <nur-task-user-selector v-model="user"/>
      <small><a :href="userLink" target="_blank"  class="pb-4">{{ userLink }}</a></small>

      <v-date-picker-component :value="date"
                               @change="onDateChanged"
                               outlined dense filled
                               label="Дата *"/>

      <v-textarea v-model="commitsText" label="Список коммитов"
                  outlined dense filled required/>

      <v-btn color="success" @click="generate">
        <v-icon>compare_arrows</v-icon> &nbsp; Сформировать
      </v-btn>
    </col6>
    <col6>
      <editor :code="generatedText" language="md" auto-style-line-numbers line-numbers readonly/>
    </col6>
  </v-row>
</template>

<script>
import Col6 from "@/components/common/columns/Col6";
import * as propertyService from "@/utils/service/propertyService";
import VDatePickerComponent from "@/components/common/inputs/VDatePickerComponent";
import Editor from "@/components/editor/Editor";
import _ from "lodash";
import NurTaskUserSelector from "./NurTaskUserSelector";


export default {
  name: "NurReviewTask",
  components: {NurTaskUserSelector, Editor, VDatePickerComponent, Col6},
  props: {},
  data() {
    return {

      user: null,
      usersList: [],
      date: this.initDate(),
      commitsText: null,

      generatedText: null
    }
  },
  computed: {
    taskTemplate() {
      return propertyService.getTextByCode('review_task_template')
    },
    userLinkTemplate() {
      return propertyService.getTextByCode('review_userlink_template')
    },
    userLink() {
      if (!this.user) return;

      let compiled = _.template(this.userLinkTemplate)
      return _.unescape(compiled({ user: this.user }))
    }
  },
  mounted() {
    if (propertyService.getProperties().length === 0)
      propertyService.reload()
  },
  created() {
  },
  methods: {

    initDate() {
      let currentDate = this.$moment()
      let delta = 1

      switch (currentDate.day()) {
        case 7:
          delta = 2;
          break;
        case 1:
          delta = 3;
          break;
        default:
          delta = 1;
      }

      return this.$moment().subtract(delta, 'days').format('YYYY-MM-DD')
    },
    onDateChanged(val) {
      console.log(val)
      this.date = val
    },


    generate() {
      let compiled = _.template(this.taskTemplate)
      this.generatedText = _.unescape(compiled({
        user: this.user,
        date: this.date,
        commits: this.commitsText.split("\n")
      }))
    }
  },

}
</script>

<style scoped>

</style>
