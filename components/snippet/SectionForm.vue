<template>

  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text block v-on="on">
        <v-icon>add</v-icon>&nbsp; Добавить секцию
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Новая секция</span>
      </v-card-title>
      <v-card-text v-if="item">
        <v-container>
          <v-row>

            <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
              <v-text-field v-model="title" label="Заголовок *" outlined dense filled required
                            @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
              <v-text-field v-model="description" label="Описание *" outlined dense filled required
                            @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="12" md="6" class="pt-0 pb-0">
              <v-autocomplete v-model="lang_type" :items="langs" outlined dense filled label="Язык подсветки *"
                              :filter="langFilter"/>
            </v-col>

            <v-col cols="12" sm="12" md="6" class="pt-0 pb-0">
              <v-text-field v-model="order_position" label="Позиция *" outlined dense filled required
                            @keyup.enter="onSave"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onClose">Закрыть</v-btn>
        <v-btn color="success" depressed @click="onSave">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import {keyboardLayoutToEn} from "@/utils/utils/stringUtils";

  export default {
    name: "SectionForm",
    props: {
      item: {type: Object},
      langTypes: {type: Array}
    },
    data() {
      return {
        dialog: false,
        title: null,
        description: null,
        lang_type: null,
        order_position: this.calcNextPosition()
      }
    },
    computed: {
      langs() {
        return _.flatMap(this.langTypes, lang => {
          return [lang.code]
        });
      },

    },
    watch: {
      dialog(val) {
        if (val) {
          this.init()
        }
      }
    },
    methods: {
      onSave() {
        const data = {
          itemId: this.item.id,
          title: this.title,
          description: this.description,
          langType: this.lang_type,
          orderPosition: this.order_position,
          text: ' '
        }

        this.$emit('save', data)
        this.onClose()
      },
      onClose() {
        this.init()
        this.dialog = false
      },
      init() {
        this.title = null
        this.description = null
        this.lang_type = null
        this.order_position = this.calcNextPosition()
      },
      calcNextPosition () {
        let pos = 10

        if (this.item && this.item.sections) {
          const lastCahpter = _.maxBy(this.item.sections, function(o) { return _.toNumber(o.orderPosition); });
          if (lastCahpter) { pos = lastCahpter.orderPosition + 10 }
        }

        return pos
      },
      langFilter (item, queryText) {
        let queryEn = keyboardLayoutToEn(queryText)
        return item.includes(queryText) || item.includes(queryEn)
      },
    },

  }
</script>

<style scoped>

</style>
