<script>
import ScheduledItem, {ScheduledItemStatus} from "@/models/ScheduledItem";
import {mapActions, mapGetters} from "vuex";
import moment from "moment";

const DEFAULT_LAST_POSITION = 1000;

export default {
  name: "ScheduleItemRePlanner",
  props: {
    viewItem: {type: Object | ScheduledItem, required: true},
  },
  data: () => ({
    bottomSheet: false,

    skippingInProgress: false,
    eveningInProgress: false,
    tomorrowInProgress: false,


  }),
  computed: {
    ...mapGetters('schedule', { lastInDate: 'lastInDate' }),
    anyLoading() { return this.skippingInProgress || this.eveningInProgress || this.tomorrowInProgress },
  },
  methods: {
    ...mapActions('schedule', {
      moveViewItemToStatus: 'moveViewItemToStatus',
      updateViewItemState: 'updateViewItemState',
    }),
    openBottomSheet() { this.bottomSheet = true },
    closeBottomSheet() { this.bottomSheet = false },

    async onMoveToSkip() {
      if (!(await this.confirmAction('Пропустить занятие?', 'Пропустить'))) return

      this.skippingInProgress = true

      await this.moveViewItemToStatus({ item: this.viewItem, status: ScheduledItemStatus.SKIP })

      this.skippingInProgress = false
      this.showSnackbar('Занятие пропущено')
      this.closeBottomSheet()
    },

    async onMoveToEvening() {
      if (!(await this.confirmAction('Перенести занятие?', 'Перенести'))) return
      this.eveningInProgress = true

      let lastToday = this.lastInDate(this.viewItem.date)
      if (!lastToday) return

      let targetPosition = lastToday.position || DEFAULT_LAST_POSITION
      let newState = { position: targetPosition + 10 }

      await this.updateViewItemState({ item: this.viewItem, newState: newState })

      this.eveningInProgress = false
      this.showSnackbar('Занятие перенесено')
      this.closeBottomSheet()
    },

    async onMoveToTomorrow() {
      if (!(await this.confirmAction('Перенести занятие?', 'Перенести'))) return
      this.tomorrowInProgress = true

      let targetDate = moment(this.viewItem.date).add(1, 'day').format('YYYY-MM-DD')
      let newState = { date: targetDate }

      await this.updateViewItemState({ item: this.viewItem, newState: newState })

      this.tomorrowInProgress = false
      this.showSnackbar('Занятие перенесено')
      this.closeBottomSheet()
    },


    async confirmAction(title, trueTitle) {
      return await this.$dialog.confirm({
        text: title,
        actions: {
          'true': trueTitle,
          'false': 'Отмена',
        }
      })
    },
  },
}
</script>

<template>
  <v-bottom-sheet v-model="bottomSheet" app class="elevation-24">
    <template v-slot:activator="{ on }">
      <VBtn v-on="on" icon color="pink" size="normal" style="position: absolute; right: 0;">
        <v-icon>mdi-skip-next</v-icon>
      </VBtn>
    </template>

    <v-sheet>
      <v-list>
        <v-subheader>Перенос занятия</v-subheader>

        <v-list-item @click="onMoveToEvening" :disabled="anyLoading">
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <v-icon v-if="!eveningInProgress">mdi-weather-sunset</v-icon>
              <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
            </v-avatar>

          </v-list-item-avatar>
          <v-list-item-title>На Вечер</v-list-item-title>
        </v-list-item>

        <v-list-item @click="onMoveToTomorrow" :disabled="anyLoading">
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <v-icon v-if="!tomorrowInProgress">mdi-arrow-expand-right</v-icon>
              <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
            </v-avatar>

          </v-list-item-avatar>
          <v-list-item-title>На Завтра</v-list-item-title>
        </v-list-item>

        <v-list-item @click="onMoveToSkip" :disabled="anyLoading">
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <v-icon v-if="!skippingInProgress">mdi-debug-step-over</v-icon>
              <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>Пропустить совсем</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>

<style scoped>

</style>