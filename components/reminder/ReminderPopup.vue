<template>
  <div>

  </div>
</template>

<script>
  const USED_KEY = 'REMINDER_USED_IDS';

  import {mapGetters, mapState, mapActions, mapMutations} from 'vuex'
  import notificationService from "@/utils/service/notificationService";

  export default {
    name: "ReminderPopup",
    props: {},
    data() {
      return {
        usedIds: [],
        isRemindersActive: false
      }
    },
    computed: {
      ...mapState('reminder/reminderStore', {allItems: 'allItems', types: 'types'})
    },
    mounted() {
      this.initRemindersStatus()
      this.initUsed()
      this.initPopups()
    },
    created() {
    },
    methods: {
      ...mapActions('reminder/reminderStore',
        {
          fetchAllItems: 'fetchAllItems', fetchAllTypes: 'fetchAllTypes',
          createReminderStore: 'createReminder', createTypeStore: 'createType',
          fetchSingleItem: 'fetchSingleItem'
        }),
      initRemindersStatus() {
        let isSetted = notificationService.isRemindersStatusSetted()
        if (!isSetted) {
          notificationService.setRemindersStatus(false)
          this.isRemindersActive = false
          notificationService.showNativeNotification("Напоминалка выключена", "Напоминалка", null)
          return
        }

        this.isRemindersActive = notificationService.isRemindersActive()
      },
      async initPopups() {
        if (!this.isRemindersActive) return

        await this.fetchAllItems()
        const doPopupFunc = this.doPopup
        const recognitionCheckInterval = setInterval(
          () => doPopupFunc(), 20 * 60 * 1000
        )

        notificationService.showNativeNotification("Напоминалка запущена", "Напоминалка", null)
        console.log('Reminders initialized')
      },
      doPopup() {
        // Готовим только те записи, которые еще не показали
        let items = _.remove(_.cloneDeep(this.allItems), item => {
          return !this.usedIds.includes(item.id)
        })

        // Случайно выбираем запись
        let item = _.sample(items)

        // Берем картинку из записи. Если нет, то из типа записи
        let image = item.img || item.type.img

        // Показываем оповещение
        notificationService.showNativeNotification(item.description, item.title, image || null)

        items = null
        this.updateUsed(item.id)
        if (this.usedIds.length === this.allItems.length) this.clearUsed()
      },

      initUsed() {
        const saved = localStorage.getItem(USED_KEY)
        this.usedIds = saved ? JSON.parse(saved) : []
      },
      updateUsed(id) {
        this.usedIds.push(id)
        localStorage.setItem(USED_KEY, JSON.stringify(this.usedIds))
      },

      clearUsed() {
        this.usedIds = []
        localStorage.setItem(USED_KEY, JSON.stringify(this.usedIds))

        console.log('Reminders queue cleared')
      }
    },

  }
</script>

<style scoped>

</style>
