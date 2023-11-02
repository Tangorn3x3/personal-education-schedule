<template>
  <v-autocomplete v-model="user" :items="usersList" item-text="name" return-object outlined dense filled
                  :label="label" :hide-details="hideDetails"
                  :filter="langFilter"/>
</template>

<script>
import {hasFilter, keyboardLayoutToEn, keyboardLayoutToRu} from "@/utils/utils/stringUtils";
import {ProxyApiType} from "@/utils/api/platformClient";
import * as platformClient from "@/utils/api/platformClient";
import NurTaskManagerUser from "@/models/nur/NurTaskManagerUser";
import _ from "lodash";

export default {
  name: 'NurTaskUserSelector',
  componentName: 'NurTaskUserSelector',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: { type: String, default: 'Пользователь *' },
    value: { type: Object },
    hideDetails: { type: Boolean, default: false }
  },
  data () {
    return {
      usersList: []
    }
  },
  computed: {
    user: {
      get () { return this.value  },
      set (val) {
        this.$emit('change', val)
      }
    }
  },
  mounted() {
    this.fetchUserList()
  },
  methods: {
    langFilter(item, queryText) {
      let queryEn = keyboardLayoutToEn(queryText)
      let queryRu = keyboardLayoutToRu(queryText)
      return hasFilter(item.name, queryText) || hasFilter(item.name, queryEn) || hasFilter(item.name, queryRu) ||
          hasFilter(item.gitlabUsername, queryText) || hasFilter(item.gitlabUsername, queryEn) || hasFilter(item.gitlabUsername, queryRu)
    },
    async fetchUserList() {
      /** @type {Array<NurTaskManagerUser>} */
      let users = await platformClient.get(ProxyApiType.TASKS, '/api/users/withDefault/?teamId=3')
      users = _.map(users, user => {
        return new NurTaskManagerUser(user)
      })
      this.usersList = _.orderBy(users, ['name'], ['asc']);
    },
  }
}
</script>

<style scoped>

</style>
