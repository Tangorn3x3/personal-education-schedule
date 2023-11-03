<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list>
        <v-list-item v-if="can(item.permission)"
                     v-for="(item, i) in items" :key="i" :to="item.to" router exact>

          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar fixed clipped-left app>
      <v-btn icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-btn>
      <v-toolbar-title v-text="title"/>

      <v-spacer/>

      <v-btn v-if="can('viewer')"
          color="default" icon class="mr-2" @click.stop="clearRootCache"><v-icon>cached</v-icon></v-btn>

      <v-btn @click="$auth.logout()" icon><v-icon>exit_to_app</v-icon></v-btn>
    </v-app-bar>


    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

<!--    <global-loader/>-->
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  import GlobalLoader from "@/components/common/GlobalLoader";
  import appConfig, {PlatformCrudTables} from "@/appConfig";
  import {clearCaches} from "@/@app-platform/services/platformCrudService";
  export default {
    components: {GlobalLoader},
    data() {
      return {
        drawer: false,

        items: [
          {icon: 'sticky_note_2', title: 'Snippets', to: '/snippets', permission: 'snip_items'},
          {icon: 'add_task', title: 'Kanban', to: '/kanban', permission: 'bug_report'},
          {icon: 'bug_report', title: 'Review', to: '/review', permission: 'bug_report'},
          {icon: 'build_circle', title: 'Generator', to: '/generator/tmp', permission: 'gen_method_templates'},
          {icon: 'polymer', title: 'Methods Generator', to: '/generator/methods', permission: 'gen_method_templates'},
          {icon: 'add_alert', title: 'Reminders', to: '/reminders', permission: 'reminders'},
          {icon: 'code', title: 'Json2Class', to: '/json2class', permission: 'json2class'},

        ],
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: appConfig.appName
      }
    },
    computed: {
      globalLoading() {
        return this.$nuxt.$loading.show
      },
    },
    mounted() {
      this.initializePermissions()
    },
    watch: {
      globalLoading(val) {
        console.warn(val)
      }
    },
    methods: {
      ...mapActions('permissions', { fetchAllPermissions: 'fetchAllPermissions' }),
      clearRootCache() {
        clearCaches(PlatformCrudTables)
      },
      initializePermissions() {
        this.fetchAllPermissions()
      }
    }
  }
</script>

<style>
  .v-application code {
    color: #a9b7c6 !important;
  }
  .theme--dark.v-application code {
    background-color: inherit !important;
  }
</style>
