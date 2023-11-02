<template>
  <div v-if="currentItem" style="position: sticky; top: 60px;">
    <div class="headline subtitle-1">
      <span v-if="currentItem.projectChapter" class="subtitle-2 grey--text">{{ currentItem.projectChapter.name }} ⯈ </span>
      {{ currentItem.title }}
      <v-btn color="success" icon class="mr-2" style="float: right" @click.stop="updateItem"><v-icon>save</v-icon></v-btn>
      <v-btn color="default" icon class="mr-2" style="float: right" @click.stop="clearCache"><v-icon>cached</v-icon></v-btn>
    </div>
    <div class="subtitle-2 grey--text mt-2 mb-2">{{ currentItem.description }}</div>

    <div class="mb-4">
      <editor v-model="text" :language="currentItem.lang_type" auto-style-line-numbers line-numbers/>
    </div>

    <div>
      <v-expansion-panels class="mb-4 dense" >

        <v-expansion-panel v-for="section in sections" :key="section.id">
          <v-expansion-panel-header class="light--text">
            <span>{{section.title}}</span>
            <span v-if="section.description" class="grey--text " style="font-size: 11px;">{{ section.description }}</span>

            <template v-slot:actions>
              <v-btn color="success" icon class="mr-2" @click.stop="updateSection(section)"><v-icon>save</v-icon></v-btn>
              <v-icon>$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <editor v-model="section.text" :language="section.lang_type" font-size="12px" auto-style-line-numbers line-numbers/>
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

      <section-form :item="currentItem" :lang-types="langTypes" @save="addSection"/>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import Editor from "@/components/editor/Editor";
  import SectionForm from "@/components/snippet/SectionForm";
  export default {
    name: "SnippetItem",
    components: {SectionForm, Editor},
    props: {},
    data() {
      return {
        text: null,
        sections: []
      }
    },
    computed: {
      ...mapState('snippet/itemStore', { currentItem: 'currentItem', langTypes: 'langTypes' })
    },
    watch: {
      currentItem: {
        handler (val) {
          this.initLocalData(val)
        },
        deep: true
      }
    },
    mounted() {
      this.initLocalData(this.currentItem)
    },
    methods: {
      ...mapActions('snippet/itemStore', {createSection: 'createSection', updateSectionStore: 'updateSection', updateItemStore: 'updateItem', clearItemCache: 'clearItemCache'}),
      updateSection(section) {
        this.updateSectionStore(section)
      },
      addSection(section) {
        this.createSection(section)
      },

      updateItem() {
        const payload = _.cloneDeep(this.currentItem)
        payload.text = this.text
        this.updateItemStore(payload)
      },

      clearCache() {
        const payload = _.cloneDeep(this.currentItem)
        this.clearItemCache(payload)
      },

      initLocalData (item = {}) {
        if (!item) return;
        this.text = item.text || ''

        const sections = _.cloneDeep(item.sections) || []
        this.sections = _.orderBy(sections, ['order_position'], 'asc')
      }
    },

  }
</script>

<style scoped>

</style>
