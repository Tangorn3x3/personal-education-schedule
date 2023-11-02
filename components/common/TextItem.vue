<template>
  <span v-if="text">
    {{ renderedText }}
  </span>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'TextItem',
  componentName: 'TextItem',
  props: {
    text: { type: String | Number, default: null },
    label: { type: String, default: null },
    date: { type: Boolean, default: false },
    valueDateFormat: { type: String, default: 'DD-MM-YYYY' },
    datetime: { type: Boolean, default: false },
    unixTimestamp: { type: Boolean, default: false },
    timestamp: { type: Boolean, default: false },
    bool: { type: Boolean, default: false }
  },
  data () {
    return {
      longTextLength: 100,
      formatDefaults: {
        date: 'DD-MM-YYYY',
        datetime: 'YYYY-MM-DDTHH:mm:ss',
        timestamp: 'YYYY-MM-DDTHH:mm:ss.SSS'
      }
    }
  },
  computed: {
    renderedText () {
      let result = _.toString(this.text)
      if (this.date) { result = this.$moment(this.text, this.valueDateFormat).format('DD.MM.YYYY') }

      if (this.datetime) {
        const format = this.valueDateFormat === this.formatDefaults.date ? this.formatDefaults.datetime : this.valueDateFormat
        result = this.$moment(this.text, format).format('DD.MM.YYYY HH:mm:ss')
      }

      if (this.timestamp) {
        const format = this.valueDateFormat === this.formatDefaults.date ? this.formatDefaults.timestamp : this.valueDateFormat
        result = this.$moment(this.text, format).format('DD.MM.YYYY HH:mm:ss.SSS')
      }

      if (this.unixTimestamp) { result = this.$moment(this.text * 1000).format('DD.MM.YYYY HH:mm:ss.SSS') }

      if (this.bool) { result = this.text === 'true' ? this.$t('true') : this.$t('false') }

      return result
    },
    textLength () {
      return this.renderedText.length
    },
    isLongText () {
      return this.renderedText.length > this.longTextLength
    },
    textClass () {
      return this.isLongText ? 'long-text' : 'short-text'
    }

  }
}
</script>
