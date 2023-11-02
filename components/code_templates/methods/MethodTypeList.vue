<template>
  <v-expansion-panels class="dense">
    <div v-for="method in methods" :key="method.title" style="width: 100%" class="mt-1">

      <v-expansion-panel dense>
        <v-expansion-panel-header> {{method.title}}</v-expansion-panel-header>
        <v-expansion-panel-content dense>
          <v-list dense>
            <v-list-item v-for="type in method.types" :key="type.code" @click="onItemSelected(type)">
              <v-list-item-content>
                <v-list-item-title>{{type.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </v-expansion-panels>
</template>

<script>
  import {GenMethodTypes} from "@/models/generators/GenMethods";

  export default {
    name: "MethodTypeList",
    props: {},
    data() {
      return {
        methods: [
          {
            title: 'Репозитории', types: [
              {code: GenMethodTypes.REPO_METHOD, title: 'Метод в репозитории'},
              {code: GenMethodTypes.REPO_CLASS, title: 'Класс репозитория'},
            ]
          }
        ]
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    methods: {
      onItemSelected(item) {
        this.$emit('select', item)
      },
    },

  }
</script>

<style scoped>

</style>
