<template>
  <div>
    <v-row>
      <project-list/>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <project-chapters-with-items/>
      </v-col>
      <v-col cols="12" md="8">
        <snippet-item/>
      </v-col>
    </v-row>

    <recent-snippet-list/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ProjectList from "@/components/vendors/ProjectList";
  import ProjectChaptersWithItems from "@/components/vendors/ProjectChaptersWithItems";
  import Editor from "@/components/editor/Editor";
  import SnippetItem from "@/components/snippet/SnippetItem";
  import RecentSnippetList from "@/components/snippet/RecentSnippetList";

  export default {
    name: "index",
    components: {RecentSnippetList, SnippetItem, Editor, ProjectChaptersWithItems, ProjectList},
    props: {},
    asyncData(context) {
      context.store.dispatch('snippet/itemStore/fetchLangTypes')
    },
    data() {
      return {
        code: "fetchSingleItem({ commit }, itemId) {\n" +
          "    dreamApi.single(DreamApiType.SNP_ITEMS, itemId)\n" +
          "      .then(result => {\n" +
          "        console.log(result)\n" +
          "        commit('setUnified', { currentItem: _.cloneDeep(result)})\n" +
          "      })\n" +
          "  },"
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {
      console.debug('index mounted.')
    },
    created() {
      this.initRecentItems()
    },
    methods: {
      //...mapActions('NameStore', ['fetchData'])
      ...mapActions('snippet/itemStore', { initRecentItems: 'initRecentItems' })
    },

  }
</script>

<style scoped>

</style>
