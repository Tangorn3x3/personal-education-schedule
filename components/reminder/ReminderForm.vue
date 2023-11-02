<template>
    <v-card>
      <v-card-title>
        <span class="headline">Новая запись в {{this.selectedType.name}}</span>
      </v-card-title>
      <v-card-text v-if="selectedType">
        <v-container>
          <v-row>

            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="title" label="Заголовок" outlined dense filled required
                            hint="Максимум 49 символов"
                            @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="12" md="6">
              <v-textarea v-model="description" label="Описание *"
                          hint="Максимум 200 символов с учетом заголовка"
                          outlined dense filled required />
            </v-col>

            <v-col cols="12" sm="12" md="6">
              <image-crop-selector @change="onImageChange" base64 style="width: 364px; height: 180px;"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onClose">Закрыть</v-btn>

        <v-btn v-if="!isEdit" color="success" depressed @click="onSave">Сохранить</v-btn>
        <v-btn v-else color="success" depressed @click="onSave">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import {keyboardLayoutToEn} from "@/utils/utils/stringUtils";
  import ImageCropSelector from "@/components/common/ImageCropSelector";

  export default {
    name: "ReminderForm",
    components: {ImageCropSelector},
    props: {
      types: { type: Array, required: true },
      selectedType: { type: Object, required: true },
      reminder: {type: Object, required: false}
    },
    data() {
      return {

        title: null,
        description: null,
        type: null,
        image: null
      }
    },
    mounted() {
      this.initReminder()
    },
    watch: {
      reminder(val) {
        this.initReminder()
      }
    },
    computed: {
      isEdit() {
        return this.reminder && this.reminder.id
      },
      typeList() {
        return _.flatMap(this.types, lang => {
          return [lang.name]
        });
      },

    },
    methods: {
      initReminder() {
        if (this.isEdit)
          this.init(this.reminder.title, this.reminder.description, this.reminder.type.name, this.reminder.img)
      },
      langFilter (item, queryText) {
        let queryEn = keyboardLayoutToEn(queryText)
        return item.includes(queryText) || item.includes(queryEn)
      },
      onImageChange(imageBase64) {
        this.image = imageBase64
      },
      onSave() {
        const data = {
          type_id: this.selectedType.id,
          title: this.title,
          description: this.description,
          img: this.image,

          id: this.isEdit ? this.reminder.id : null
        }

        this.$emit('save', data)
        this.onClose()
      },
      onClose() {
        this.init()
        this.$emit('close')
      },

      init(title = null, description = null, type = null, image = null) {
        this.title = title
        this.description = description
        this.type = type
        this.image = image
      }
    },

  }
</script>

<style scoped>

</style>
