<template>
  <v-container>
    <v-row>

      <v-col v-if="currentItem" cols="12" md="4" class="mb-4">
        <h2 class="font-weight-light mb-2">Прямо сейчас</h2>
        <scheduled-item-card :item="currentItem" :statistics="statistics" :description="currentItem.health_description"
                             :completing-in-progress="competingInProgress" :skipping-in-progress="skippingInProgress"
                             @complete="onMoveToComplete"
                             allow-actions skippable/>
      </v-col>

      <v-col cols="12" md="4" class="mb-4">
        <h2 class="font-weight-light mb-2">Сегодня</h2>

        <template v-if="isTodayPresents">
          <scheduled-item-card  v-for="item in todayToWork" :key="item.id" :item="item" :title="item.course" :elevation="8"
                                :description="item.health_description"
                                @complete="onMoveToComplete" :completing-in-progress="competingInProgress"
                                allow-actions skippable dense class="mb-6"/>
        </template>

        <text-placeholder v-if="!isTodayPresents && !loadingItems" title="Сегодня нет занятий" subtitle="Пора отдыхать" small/>

        <template v-if="loadingItems">
          <card-loading-skeleton v-for="i in 3" :key="i"  class="elevation-24 mb-6"/>
        </template>
      </v-col>


      <v-col v-if="tomorrowItems && tomorrowItems.length > 0" cols="12" md="4" class="mb-4">
        <h2 class="font-weight-light mb-2">Завтра</h2>
        <scheduled-item-card v-for="item in tomorrowItems" :key="item.id" :item="item" :title="item.course" :elevation="8"
                             :description="item.health_description"
                             @complete="onMoveToComplete" :completing-in-progress="competingInProgress"
                             allow-actions skippable dense  class="mb-6"/>
        <card-loading-skeleton v-if="loadingItems" class="elevation-24"/>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import triangleDark from '@/assets/images/triangle-dark.png'
import trophy from '@/assets/images/trophy.png'
import {mapActions, mapGetters, mapState} from "vuex";
import {ScheduledItemStatus} from "@/models/ScheduledItem";
import CardLoadingSkeleton from "@/components/common/loaders/CardLoadingSkeleton.vue";
import ScheduledItemCard from "@/components/scheduled-items/ScheduledItemCard.vue";
import _ from "lodash";
import TextPlaceholder from "@/components/common/placeholders/TextPlaceholder.vue";
import SnackbarAlert from "@/components/common/alerts/SnackbarAlert.vue";

export default {
  components: {SnackbarAlert, TextPlaceholder, ScheduledItemCard, CardLoadingSkeleton},
  data() {
    return {
      triangleBg: triangleDark,
      trophy: trophy,

      loadingItems: false,
      competingInProgress: false,
      skippingInProgress: false,

      snackbar: false,
      snackbarText: '',
    }
  },
  computed: {
    ...mapState('courses', { courses: 'items', coursesGroups: 'groups'}),
    ...mapState('schedule', { statistics: 'statistics' }),
    ...mapGetters('schedule', {
      allItems: 'allItems', todayItems: 'today', tomorrowItems: 'tomorrow', yesterdayItems: 'yesterday',
      currentItem: 'currentItem'
    }),

    isTodayPresents() {
      return this.todayToWork && this.todayToWork.length > 0
    },

    todayToWork() {
      let currentId = this.currentItem ? this.currentItem.id : null
      return _.filter(this.todayItems, item => item.status === ScheduledItemStatus.NEW && (!currentId || item.id !== currentId))
    },
  },
  mounted() {
    this.initializeData()
  },
  methods: {
    ...mapActions('schedule', {
      fetchCurrentWeekItems: 'fetchCurrentWeekItems',
      fetchNextWeekItems: 'fetchNextWeekItems',
      fetchViewItems: 'fetchViewItems',
      fetchStatistics: 'fetchStatistics',
      moveViewItemToStatus: 'moveViewItemToStatus',
    }),
    ...mapActions('courses', {fetchCourses: 'fetchItems', fetchCourseGroups: 'fetchGroups'}),

    async initializeData() {
      this.loadingItems = true

      this.fetchCourses()
      this.fetchCourseGroups()

      await this.initializeItems()
      this.loadingItems = false
    },

    async initializeItems() {
      await this.fetchViewItems()
      this.fetchStatistics()
    },

    async onMoveToComplete(viewItem) {
      this.competingInProgress = true

      await this.moveViewItemToStatus({ item: viewItem, status: ScheduledItemStatus.DONE })

      this.competingInProgress = false
      this.showSnackbar('Занятие завершено')
    },
  }
}
</script>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
