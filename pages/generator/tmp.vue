<template>
  <div>
    <java-entity-generator/>
  </div>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import JavaEntityGenerator from "@/components/code_templates/generators/java-entity/JavaEntityGenerator";

  export default {
    name: "tmp",
    components: {JavaEntityGenerator},
    props: {},
    data() {
      return {}
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {
      console.debug('tmp mounted.')
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
