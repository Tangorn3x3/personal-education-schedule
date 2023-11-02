<template>

  <v-dialog v-hotkey="keymap" v-model="dialog" max-width="700px">
    <v-card>
      <v-card-title class="mb-0 pb-0">
        <span class="title">Частые замечания</span>
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
              <v-list-item v-for="item in items" :key="item.id" @click="onItemSelected(item)">
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
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
import {searchInStrings} from "@/utils/utils/stringUtils";
import * as propertyService from "@/utils/service/propertyService";

export default {
  name: "NurReviewCauseList",
  props: {},
  data() {
    return {
      dialog: false,
      search: null
    }
  },
  computed: {
    keymap() {
      return {
        'ctrl+e': this.toggle
      }
    },
    causesList() {
      return propertyService.getObjectByCode('review_often_bug_causes')
    },
    items() {
      if (!this.search) return this.causesList

      const data = _.filter(this.causesList, item => {
        return searchInStrings(this.search, [item])
      })

      return data
    }
  },
  methods: {
    toggle() {
      this.dialog = !this.dialog
    },
    onItemSelected(name) {
      this.toggle()
      this.search = null
      this.$emit('select', name)
    }
  },

}
</script>

<style scoped>

</style>
