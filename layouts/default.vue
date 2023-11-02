<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
            v-if="can(item.permission)"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dense
    >
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>

      <v-spacer/>
      <v-btn v-if="can('clear_all_cache')"
          color="default" icon class="mr-2" @click.stop="clearRootCache"><v-icon>cached</v-icon></v-btn>
      <converter-dialog v-if="can('converters_main')"/>
      <nur-subscriber-info v-if="can('slr_info')"/>
      <ofd-decryptor-dialog v-if="can('ofd_encryptor')"/>
      <v-btn @click="$auth.logout()" icon><v-icon>exit_to_app</v-icon></v-btn>

    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <reminder-popup/>
    <global-loader/>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  import GlobalLoader from "@/components/common/GlobalLoader";
  import NurSubscriberInfo from "@/components/nur/NurSubscriberInfo";
  import ConverterDialog from "@/components/converter/ConverterDialog";
  import * as dreamApi from "@/utils/api/dreamApi";
  import OfdDecryptorDialog from "@/components/encrypt/OfdDecryptorDialog";
  import ReminderPopup from "@/components/reminder/ReminderPopup";
  import NurReviewGenerator from "@/components/nur/NurReviewGenerator";
  export default {
    components: {NurReviewGenerator, ReminderPopup, OfdDecryptorDialog, ConverterDialog, NurSubscriberInfo, GlobalLoader},
    data() {
      return {
        clipped: true,
        drawer: true,
        fixed: true,
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
        title: 'Snippeter'
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
      ...mapActions('permissionsStore', { fetchAllPermissions: 'fetchAllPermissions' }),
      clearRootCache() {
        dreamApi.clearRootCaches()
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
