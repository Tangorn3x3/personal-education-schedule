<script>
import appConfig from "@/appConfig";
import ScheduledItem from "@/models/ScheduledItem";
import _ from "lodash";
import moment from "moment";
import {stringHashToArrayIndex} from "@/utils/utils/stringUtils";
import ScheduleItemRePlanner from "@/components/scheduled-items/ScheduleItemRePlanner.vue";

export default {
  name: "ScheduledItemCard",
  components: {ScheduleItemRePlanner},
  props: {
    item: {type: Object | ScheduledItem, required: true},

    statistics: {type: Array, default: () => []},

    dense: { type: Boolean, default: false },
    allowActions: { type: Boolean, default: false },
    skippable: { type: Boolean, default: false },

    title: { type: String, default: 'Поехали! 🚀' },
    description: { type: String, default: '' },
    elevation: { type: Number, default: 24 },

    completingInProgress: { type: Boolean, default: false },
    skippingInProgress: { type: Boolean, default: false },
  },
  data: () => ({
    chipColors: ['red', 'blue', 'green', 'yellow', 'purple']
  }),
  computed: {
    course() {
      return {
        name: this.item.course,
        group: this.item.group,
        image: this.item.course_image,
        priority: this.item.priority
      }
    },
    group() {
      return {
        name: this.item.group,
        image: this.item.group_image,
      }
    },

    cardImage() {
      let possibleImages = []

      possibleImages.push(_.get(this.course, 'image'))
      possibleImages.push(_.get(this.group, 'image'))
      possibleImages.push(appConfig.courses.fallbackImage)

      return possibleImages.find(i => !!i)
    },

    chipColor() {
      return this.chipColors[stringHashToArrayIndex(this.group.name, this.chipColors.length)]
    },

    durationText() {
      let duration = this.item.lesson_duration
      if (_.isString(duration)) duration = _.toNumber(duration)

      const integerPart = Math.floor(duration)
      const decimalPart = duration % 1

      let humanStrings = []
      if (integerPart === 1) humanStrings.push('1')
      if (integerPart) humanStrings.push(moment.duration(integerPart, 'hours').humanize())
      if (decimalPart) humanStrings.push(moment.duration(decimalPart, 'hours').humanize())

      return humanStrings.join(' ')
    },

    progressPercent() {
      if (!this.statistics || this.statistics.length === 0) return 0
      let currentCourseStat = _.find(this.statistics, {course: this.item.course})

      return currentCourseStat ? currentCourseStat.progress : 0
    },
    progressLabel() {
      if (this.progressPercent === -1) return '∞'
      let percent = this.progressPercent * 100
      return `${Math.round(percent)}%`
    },
  },
  methods: {
    moveToComplete() {
      this.$emit('complete', this.item)
    }
  }
}
</script>

<template>
  <v-card  :elevation="elevation">
    <v-img :src="cardImage" :height="dense ? 120 : 180">
      <div v-if="!dense" :class="{ 'dense': dense }" class="text-overlay">
        <h1 class="text-white">{{ item.course }}</h1>
      </div>

      <div v-if="group" class="chip-overlay">
        <v-chip :color="chipColor" dark small>{{group.name}}</v-chip>
      </div>
    </v-img>


    <VCardText class="pa-0" style="margin-top: -18px;">
      <v-card :elevation="elevation/4*4">
        <v-card-title class="font-weight-light pb-0">
          <span>{{title}}</span>

          <schedule-item-re-planner v-if="skippable" :view-item="item"/>

<!--          <VBtn v-if="skippable" :loading="skippingInProgress" @click="moveToSkip" icon color="pink" size="normal" style="position: absolute; right: 0;">
              <v-icon>mdi-skip-next</v-icon>
          </VBtn>-->
        </v-card-title>

        <VCardText :class="{ 'pb-2' : !dense }">
          <v-list-item v-if="!dense" three-line class="pa-0">

            <v-list-item-content :class="{ 'pb-0' : !dense }">
              <h4 class="font-weight-light mb-2">ПРОДОЛЖИТЕЛЬНОСТЬ</h4>
              <h3 class="pl-2 mb-4">{{durationText}}</h3>

              <h4 v-if="description" class="font-weight-light mb-2">ДЕТАЛИ</h4>
              <h3 v-if="description" class="pl-2 mb-4">{{description}}</h3>

              <h4 class="font-weight-light">ПРИОРИТЕТ</h4>
              <v-rating disabled hover length="5" size="15" :value="course.priority / 2" class="scheduled-rating"></v-rating>
            </v-list-item-content>

            <v-progress-circular v-if="progressPercent" :value="progressPercent" :rotate="360" :size="75" :width="15"  :color="chipColor">
              <span style="font-size: 18px;">{{ progressLabel }}</span>
            </v-progress-circular>
          </v-list-item>
        </VCardText>

        <v-card-actions v-if="allowActions">
          <VBtn :loading="completingInProgress" @click="moveToComplete" block size="normal" color="primary">Готово</VBtn>
        </v-card-actions>
      </v-card>
    </VCardText>

  </v-card>
</template>

<style scoped>
.text-overlay {
  max-height: 180px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Цвет фона с прозрачностью */
  text-align: center;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
}
.text-overlay.dense { max-height: 120px}

.text-overlay .text-white {
  text-shadow: 0px 0px 10px rgb(0 0 0 / 75%);
}

.chip-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}

.scheduled-rating.v-rating .mdi-star {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>