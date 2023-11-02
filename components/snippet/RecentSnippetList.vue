<template>

  <v-dialog v-hotkey="keymap" v-model="dialog" max-width="350px">
    <v-card>
      <v-card-title class="mb-0 pb-0">
        <span class="title">Последние сниппеты</span>
        <v-spacer/>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>

          <v-row>
            <v-text-field v-model="search" label="Фильтр" class="mt-0 pt-0" autofocus hide-details clearable/>

            <v-list dense style="width: 100%">
              <v-list-item v-for="item in items" :key="item.id" @click="onItemSelected(item.id)">
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle class="grey--text">{{ item.chapterName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import {searchInStrings} from "@/utils/utils/stringUtils";

  export default {
    name: "RecentSnippetList",
    props: {},
    data() {
      return {
        dialog: false,
        search: null
      }
    },
    computed: {
      ...mapState('snippet/itemStore', {recentItems: 'recentItems'}),
      keymap() {
        return {
          'ctrl+e': this.toggle
        }
      },
      items() {
        if (!this.search) return this.recentItems

        const data = _.filter(this.recentItems, item => {
          return searchInStrings(this.search, [item.name])
        })

        return data
      }
    },
    methods: {
      ...mapActions('snippet/itemStore', {fetchSingleItem: 'fetchSingleItem'}),
      toggle() {
        this.dialog = !this.dialog
      },
      onItemSelected(id) {
        this.fetchSingleItem(id)
        this.toggle()
        this.search = null
      }
    },

  }
</script>

<style scoped>

</style>
