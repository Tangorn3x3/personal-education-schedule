<template>

  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text block v-on="on"><v-icon>add</v-icon>&nbsp; Добавить раздел</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Новый раздел</span>
      </v-card-title>
      <v-card-text v-if="project">
        <v-container>
          <v-row>

            <v-col cols="12" sm="12" md="6">
              <v-text-field v-model="name" label="Название *" outlined dense filled required
                            @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="12" md="6">
              <v-text-field v-model="code" label="Код *" outlined dense filled required
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
    name: "ChapterForm",
    props: {
      project: {type: Object}
    },
    data() {
      return {
        dialog: false,

        name: null,
        code: null
      }
    },
    methods: {
      onSave() {
        const data = {
          projectId: this.project.id,
          name: this.name,
          code: this.code
        }

        this.$emit('save', data)
        this.onClose()
      },
      onClose() {
        this.init()
        this.dialog = false
      },
      init() {
        this.name = null
        this.code = null
      }
    },

  }
</script>

<style scoped>

</style>
