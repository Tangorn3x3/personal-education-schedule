<template>
  <single-panel header="Поля">
    <v-row>
      <java-entity-field-form v-for="(field, i) in fields" :key="field" :config="field"/>
    </v-row>
  </single-panel>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import JavaEntityFieldForm from "@/components/code_templates/generators/java-entity/components/JavaEntityFieldForm";
  import SinglePanel from "@/components/common/panels/SinglePanel";

  export default {
    name: "JavaEntityFieldListForm",
    components: {SinglePanel, JavaEntityFieldForm},
    props: {
      fields: { type: Array }
    },
    data() {
      return {

      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {
      console.debug('JavaEntityFieldListForm mounted.')
    },
    created() {
    },
    methods: {
      //...mapActions('NameStore', ['fetchData'])
    },

  }
</script>

<style scoped>

</style>
