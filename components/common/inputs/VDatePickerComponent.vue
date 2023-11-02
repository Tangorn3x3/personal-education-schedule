<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="displayedDate"
        :label="label"
        :disabled="disabled"
        :prepend-icon="icon"
        :dense="dense"
        :outlined="outlined"
        :solo="solo"
        :error-messages="errorMessages"
        :clearable="clearable"
        :hide-details="isHideDetails"
        :color="color"
        :filled="filled"
        v-on="on"
        @input="onInputValue"
        readonly
      />
    </template>
    <v-date-picker
      ref="picker"
      :color="color"
      :value="defaultValue"
      :disabled="disabled"
      :locale="locale"
      :min="min"
      :max="max"
      @input="onInputValue"
      first-day-of-week="1"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'VDatePickerComponent',
  componentName: 'VDatePickerComponent',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    label: { type: String },
    value: { type: String },
    color: {type: String, default: 'magenta'},
    icon: { type: String, default: 'event' },
    errorMessages: { type: Array },
    disabled: { type: Boolean, default: false },
    birthday: { type: Boolean, default: false },
    solo: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    filled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    displayDateFormat: { type: String, default: 'DD.MM.YYYY' },
    valueDateFormat: { type: String, default: 'YYYY-MM-DD' },
    defaultBirthdayValue: { type: String, default: '1989-05-05' },
    hideDetails: { type: Boolean, default: false },

    min: {type: String, default: null},
    max: {type: String, default: null},
  },
  data () {
    return {
      menu: false
    }
  },
  computed: {
    displayedDate: {
      get () { return this.value ? this.$moment(this.value, this.valueDateFormat).format(this.displayDateFormat) : this.value },
      set (val) { this.menu = false
        this.$emit('input', val ? this.$moment(val).format(this.valueDateFormat) : val) }
    },
    displayedDate2 () {
      return this.value ? this.$moment(this.value, this.valueDateFormat).format(this.displayDateFormat) : this.value
    },
    defaultValue () {
      if (this.birthday && !this.value) { return this.$moment(this.defaultBirthdayValue).format('YYYY-MM-DD') }

      return this.value ? this.$moment(this.value, this.valueDateFormat).format('YYYY-MM-DD') : this.value
    },
    locale () {
      return 'ky-KG' // this.$i18n.locale.toLowerCase()
    },
    isHideDetails () {
      if (!this.errorMessages || this.errorMessages.length === 0) return this.hideDetails
        else return false
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => {
        if (this.birthday) { this.$refs.picker.activePicker = 'YEAR' }
      })
    }
  },
  methods: {
    onInputValue (val) {
      this.menu = false
      this.$emit('input', val ? this.$moment(val).format(this.valueDateFormat) : val)
    }
  }
}
</script>

<style scoped>

</style>
