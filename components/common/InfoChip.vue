<template>
  <span>
    <v-chip :color="color" :small="small" @click="onChipClicked" :class="{ 'white--text' : !blackText }" style="margin-right: 5px; margin-bottom: 5px;">
      <strong v-if="title" class="pr-1">{{ title }}:</strong>
      <text-item :text="text" :date="date" :datetime="dateTime"/>
    </v-chip>
    <v-snackbar v-model="snackbar" :timeout="2000" right  style="opacity: 0.7">
      Текст скопирован: {{ text }}
    </v-snackbar>
  </span>

</template>

<script>

import * as stringUtils from '@/utils/utils/stringUtils'
import TextItem from "@/components/common/TextItem";
export default {
  name: 'InfoChip',
  components: {TextItem  },
  props: {
    title: { type: String },
    text: { type: String | Number },
    color: { type: String, default: 'default' },
    blackText: { type: Boolean, default: true },
    date: { type: Boolean, default: false },
    dateTime: { type: Boolean, default: false },
    small: { type: Boolean, default: false }
  },
  data () {
    return {
      snackbar: false
    }
  },
  methods: {
    onChipClicked () {
      stringUtils.copyToClipboard(this.text)
      .then(res => {
        this.snackbar = true
        this.$emit('clicked', this.text)
      })
    }
  }
}
</script>
