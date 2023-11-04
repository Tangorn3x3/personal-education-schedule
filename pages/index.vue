<template>
  <v-container>
    <v-row>

      <v-col cols="12" md="4" class="mb-4">
        <h2 class="font-weight-light mb-2">Прямо сейчас</h2>
        <scheduled-item-card v-if="currentItem"
                             :item="currentItem" :statistics="statistics" :completing-in-progress="competingInProgress"
                             @complete="onMoveToComplete"
                             allow-actions/>
        <card-loading-skeleton v-if="loadingItems" class="elevation-24"/>
      </v-col>

      <v-col cols="12" md="4" class="mb-4">
        <h2 class="font-weight-light mb-2">Сегодня</h2>
        <scheduled-item-card v-for="item in todayToWork" :key="item.id" :item="item" :title="item.course" :elevation="8" dense class="mb-6"/>
        <card-loading-skeleton v-if="loadingItems" class="elevation-24"/>
      </v-col>

      <v-col cols="12" md="4" class="mb-4">
        <h2 class="font-weight-light mb-2">Завтра</h2>
        <scheduled-item-card v-for="item in tomorrowItems" :key="item.id" :item="item" :title="item.course" :elevation="12" dense  class="mb-6"/>
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

export default {
  components: {ScheduledItemCard, CardLoadingSkeleton},
  data() {
    return {
      triangleBg: triangleDark,
      trophy: trophy,

      loadingItems: false,
      competingInProgress: false,
    }
  },
  computed: {
    ...mapState('courses', { courses: 'items', coursesGroups: 'groups'}),
    ...mapState('schedule', { statistics: 'statistics' }),
    ...mapGetters('schedule', {
      allItems: 'allItems', todayItems: 'today', tomorrowItems: 'tomorrow', yesterdayItems: 'yesterday',
      currentItem: 'currentItem'
    }),

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
      moveToComplete: 'moveViewItemToComplete',
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

      await this.moveToComplete(viewItem)

      this.competingInProgress = false
    }
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
