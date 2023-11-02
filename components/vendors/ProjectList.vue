<template>
  <div>
    <v-btn v-for="project in projects" :key="project.id"
           :color="(currentProject && currentProject.id === project.id) ? 'success' : ''"
           @click="setCurrent(project)" text>{{project.name}}</v-btn>
    <project-form :vendors="vendors" :current-vendor="currentVendor" @save="onProjectCreate"/>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import ProjectForm from "@/components/vendors/ProjectForm";

  export default {
    name: "ProjectList",
    components: {ProjectForm},
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapState('vendor/vendorStore', {projects: 'projects', vendors: 'vendors', currentVendor: 'currentVendor', currentProject: 'currentProject'})
    },
    mounted() {
      this.fetchProjects()
      this.fetchVendors()
      this.fetchProjectChapters()
    },
    created() {
    },
    methods: {
      ...mapActions('vendor/vendorStore', {
        fetchProjects: 'fetchProjects', fetchVendors: 'fetchVendors', fetchProjectChapters: 'fetchProjectChapters',
        createProject: 'createProject'
      }),
      ...mapMutations('vendor/vendorStore', ['setUnified']),
      setCurrent(project) {
        this.setUnified({currentProject: project})
      },
      onProjectCreate (project) {
        this.createProject(project)
      }
    },

  }
</script>

<style scoped>

</style>
