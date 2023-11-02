<template>
  <v-expansion-panels class="dense">
    <reminder-type-form @save="createType"/>

    <v-text-field v-model="filter" label="Фильтр" dense outlined filled clearable/>

    <div  v-for="chapter in types" :key="chapter.id" style="width: 100%" class="mt-1">
      <v-expansion-panel v-if="filter ? (getItemsByType(chapter).length > 0) : true" dense>
        <v-expansion-panel-header>
          {{chapter.name}}
          <template v-slot:actions>
            <reminder-form-dialog :types="types" :selected-type="chapter" @save="createReminder"/>
            <v-icon>$expand</v-icon>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content dense>

          <v-list  dense>
            <v-list-item v-for="item in getItemsByType(chapter)" :key="item.id" @click="onItemSelected(item, chapter)">
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
  import ReminderTypeForm from "@/components/reminder/ReminderTypeForm";
  import ReminderForm from "@/components/reminder/ReminderForm";
  import ReminderFormDialog from "@/components/reminder/ReminderFormDialog";
  export default {
    name: "ReminderItems",
    components: {ReminderFormDialog, ReminderForm, ReminderTypeForm, ChapterForm, ItemForm},
    props: {
    },
    data() {
      return {
        filter: ''
      }
    },
    computed: {
      ...mapState('reminder/reminderStore', { allItems: 'allItems', types: 'types' })
    },
    mounted() {
      if (this.allItems.length <= 0) this.fetchAllItems()
      this.fetchAllTypes()
    },
    methods: {
      ...mapActions('reminder/reminderStore',
        { fetchAllItems: 'fetchAllItems', fetchAllTypes: 'fetchAllTypes',
          createReminderStore: 'createReminder', createTypeStore: 'createType',
          fetchSingleItem: 'fetchSingleItem'
        } ),
      ...mapMutations('reminder/reminderStore', { setUnified: 'setUnified' }),
      getItemsByType (type) {

        const data = _.filter(this.allItems, item => {
          let satisfyFilter = true
          const satisfyChapter = (item.type_id === type.id)
          if (this.filter) {
            satisfyFilter = searchInStrings(this.filter, [item.title])
          }

          return (satisfyChapter && satisfyFilter)
        })

        return _.orderBy(data, ['id'], ['asc'])
      },
      onItemSelected (item, type) {
        this.fetchSingleItem(item.id)
        this.$emit('select', { item, type })
      },
      createReminder (item) {
        item.id = _.maxBy(this.allItems, 'id').id + 1
        this.createReminderStore(item)
      },
      createType (chapter) {
        this.createTypeStore(chapter)
      }
    },

  }
</script>

<style scoped>

</style>
