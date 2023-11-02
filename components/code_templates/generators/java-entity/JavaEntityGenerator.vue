<template>
  <div>
    <java-entity-class-form :config="localConfig" @change="onClassFormChanged" class="mb-4"/>

    <java-entity-field-list-form :fields="localConfig.fields" />
  </div>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import CommonGenerator from "@/components/code_templates/generators/CommonGenerator";
  import JavaEntityClassForm from "@/components/code_templates/generators/java-entity/components/JavaEntityClassForm";
  import JavaEntityField from "@/models/generators/java-entity/JavaEntityField";
  import JavaEntityFieldListForm
    from "@/components/code_templates/generators/java-entity/components/JavaEntityFieldListForm";
  import JavaEntity from "@/models/generators/java-entity/JavaEntity";

  export default {
    name: "JavaEntityGenerator",
    components: {JavaEntityFieldListForm, JavaEntityClassForm},
    extends: CommonGenerator,
    props: {},
    data() {
      return {
        localConfig: new JavaEntity({})
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {

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
