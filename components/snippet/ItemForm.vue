<template>

  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" icon class="mr-2" @click.stop="" v-on="on"><v-icon>note_add</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Новая запись</span>
      </v-card-title>
      <v-card-text v-if="chapter">
        <v-container>
          <v-row>

            <v-col cols="12" sm="12" md="6">
              <v-text-field v-model="title" label="Заголовок *" outlined dense filled required
                            @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="12" md="6">
              <v-text-field v-model="lang_type" label="Язык подсветки *" outlined dense filled required
                            @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="description" label="Описание *" outlined dense filled required
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
  export default {
    name: "ItemForm",
    props: {
      chapter: {type: Object}
    },
    data() {
      return {
        dialog: false,

        title: null,
        description: null,
        lang_type: null
      }
    },
    methods: {
      onSave() {
        const data = {
          projectChapter: this.chapter,
          title: this.title,
          description: this.description,
          langType: this.lang_type,
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
      }
    },

  }
</script>

<style scoped>

</style>
