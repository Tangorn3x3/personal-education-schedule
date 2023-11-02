<template>
  <v-expansion-panels class="dense">
    <chapter-form :project="currentProject" @save="createChapter"/>

    <v-text-field v-model="filter" label="Фильтр" dense outlined filled clearable/>
    <div  v-for="chapter in selectedChapters" :key="chapter.id"
          style="width: 100%" class="mt-1"
    >
      <v-expansion-panel v-if="filter ? (getItemsByChapter(chapter).length > 0) : true" dense>
        <v-expansion-panel-header>
          {{chapter.name}}
          <template v-slot:actions>
            <item-form :chapter="chapter" @save="createItem"/>
            <v-icon>$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content dense>

          <v-list  dense>
            <v-list-item v-for="item in getItemsByChapter(chapter)" :key="item.id"  @click="onItemSelected(item)">
              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
                <v-list-item-subtitle class="grey--text">{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>

  </v-expansion-panels>
</template>

<script>
  import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
  import ItemForm from "@/components/snippet/ItemForm";
  import ChapterForm from "@/components/vendors/ChapterForm";
  import {searchInStrings} from "@/utils/utils/stringUtils";
  export default {
    name: "ProjectChaptersWithItems",
    components: {ChapterForm, ItemForm},
    props: {
    },
    data() {
      return {
        filter: ''
      }
    },
    computed: {
      ...mapGetters('vendor/vendorStore', { selectedChapters: 'selectedChapters' }),
      ...mapState('snippet/itemStore', { allItems: 'allItems' }),
      ...mapState('vendor/vendorStore', { currentProject: 'currentProject' })
    },
    watch: {
      selectedChapters (val) {

      }
    },
    mounted() {
      this.fetchAllItems()
    },
    methods: {
      ...mapActions('snippet/itemStore', {fetchAllItems: 'fetchAllItems', fetchSingleItem: 'fetchSingleItem', createItemStore: 'createItem'} ),
      ...mapActions('vendor/vendorStore', {createChapterStore: 'createChapter'} ),
      ...mapMutations('snippet/itemStore', { setUnified: 'setUnified' }),
      getItemsByChapter (chapter) {

        const data = _.filter(this.allItems, item => {
          let satisfyFilter = true
          const satisfyChapter = (item.projectChapterId === chapter.id)
          if (this.filter) {
            satisfyFilter = searchInStrings(this.filter, [item.title])
          }

          return (satisfyChapter && satisfyFilter)
        })

        return _.orderBy(data, ['id'], ['asc'])
      },
      onItemSelected (item) {
        this.fetchSingleItem(item.id)
      },
      createItem (item) {
        this.createItemStore(item)
      },
      createChapter (chapter) {
        this.createChapterStore(chapter)
      }
    },

  }
</script>

<style scoped>

</style>
