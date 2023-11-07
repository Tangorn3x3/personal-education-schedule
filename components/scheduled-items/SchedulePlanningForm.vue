<script>
import {required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";
import {SchedulePlanningRequest} from "@/models/ScheduledItem";
import moment from "moment";
import VDatePickerComponent from "@/components/common/inputs/VDatePickerComponent.vue";
import notificationService from "@/utils/service/notificationService";
import SnackbarAlert from "@/components/common/alerts/SnackbarAlert.vue";

export default {
  name: "SchedulePlanningForm",
  components: {SnackbarAlert, VDatePickerComponent},
  mixins: [],
  props: {
    header: { type: Boolean, default: false },
  },
  data: () => ({
    dayNumbers: [7, 6, 5, 4, 3, 2, 1],
    planLoading: false,

    planningRequest: new SchedulePlanningRequest( moment().add(1, 'day').format('YYYY-MM-DD'), 5),
  }),

  validations () {
    return {
      planningRequest: {
        start_date: { required },
        days_number: { required },
      }
    }
  },

  methods: {
    ...mapActions('schedule', { initSchedulePlanning: 'planSchedule' }),
    async planSchedule() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      const res = await this.$dialog.confirm({ text: 'Создать расписание?', actions: { 'true': 'Создать', 'false': 'Отмена' } })
      if (!res) return

      this.planLoading = true

      await this.initSchedulePlanning(this.planningRequest)

      this.planLoading = false

      this.showSnackbar('Расписание успешно создано')
      notificationService.showNativeNotification('Расписание успешно создано')
    }
  }
}
</script>

<template>
  <v-form>
      <h3 class="font-weight-light mb-6">Создать расписание</h3>
      <v-date-picker-component v-model="planningRequest.start_date"
          :error-messages="getErrorMessages('startDate')"
          label="Дата начала" outlined dense/>

      <v-select :items="dayNumbers" v-model="planningRequest.days_number"
                label="Дней в расписании" outlined dense/>

      <v-btn :disabled="$v.$invalid" :loading="planLoading" @click="planSchedule" color="primary" block>Начать</v-btn>

  </v-form>
</template>

<style scoped>

</style>