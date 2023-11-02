<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <method-type-list @select="onTypeSelected"/>
      </v-col>

      <v-col cols="12" md="8">
        <repo-method-generator v-if="isRepoMethodSelected" :templates="templates" :type="selectedType"/>
      </v-col>
    </v-row>


  </div>
</template>

<script>
  import MethodTypeList from "@/components/code_templates/methods/MethodTypeList";
  import {GenMethodTypes} from "@/models/generators/GenMethods";
  import * as dreamApi from "@/utils/api/dreamApi";
  import {DreamApiType} from "@/utils/api/dreamApi";
  import RepoMethodGenerator from "@/components/code_templates/methods/generators/RepoMethodGenerator";

  export default {
    name: "methods",
    components: {RepoMethodGenerator, MethodTypeList},
    props: {},
    async asyncData(context) {
      const templ = await dreamApi.list(DreamApiType.GEN_METHOD_TEMPLATES)
      return  { templates: templ }
    },
    data() {
      return {
        selectedType: {}
      }
    },
    computed: {
      isRepoMethodSelected() {
        return this.selectedType.code === GenMethodTypes.REPO_METHOD
      }
    },
    mounted() {
      console.debug('methods mounted.')
    },
    created() {
    },
    methods: {
      onTypeSelected(type) {
        this.selectedType = type
      }
    },

  }
</script>

<style scoped>

</style>
