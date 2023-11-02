<template>
  <div>
    <jira-tasks-opener/>
  </div>
</template>

<script>
import JiraTasksOpener from "../../components/kanban/JiraTasksOpener";
export default {
  name: "index",
  components: {JiraTasksOpener},
  props: {},
  asyncData(context) {

  },
  data() {
    return {
      tab: 0
    }
  },
  computed: {},
  watch: {},
  mounted() {

  },
  created() {
  },
}
</script>

<style scoped>

</style>
