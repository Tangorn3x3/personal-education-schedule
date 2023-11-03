<script>
import appConfig from "@/appConfig";
import ScheduledItem from "@/models/ScheduledItem";
import _ from "lodash";
import {stringHashToArrayIndex} from "@/utils/utils/stringUtils";

export default {
  name: "ScheduledItemCard",
  props: {
    item: {type: Object | ScheduledItem, required: true},

    statistics: {type: Array, default: () => []},

    dense: { type: Boolean, default: false },
    allowActions: { type: Boolean, default: false },
    title: { type: String, default: 'Поехали! 🚀' },
    elevation: { type: Number, default: 24 },
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

    progressPercent() {
      if (!this.statistics || this.statistics.length === 0) return 0
      let currentCourseStat = _.find(this.statistics, {course: this.item.course})

      return currentCourseStat ? currentCourseStat.progress : 0
    },
    progressLabel() {
      if (this.progressPercent === -1) return '∞'
      return `${this.progressPercent}%`
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
        <v-card-title class="font-weight-light pb-0">{{title}}</v-card-title>

        <VCardText class="pb-2">
          <v-list-item v-if="!dense" three-line class="pa-0">

            <v-list-item-content>
              <div class="text-overline">Приоритет</div>
              <v-rating disabled hover length="5" size="20" :value="course.priority / 2" ></v-rating>
            </v-list-item-content>

            <v-progress-circular v-if="progressPercent" :value="progressPercent" :rotate="360" :size="75" :width="15"  :color="chipColor">
              <span style="font-size: 24px;">{{ progressLabel }}</span>
            </v-progress-circular>
          </v-list-item>
        </VCardText>

        <v-card-actions v-if="allowActions">
          <VBtn block size="normal" color="primary">Готово</VBtn>
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
</style>