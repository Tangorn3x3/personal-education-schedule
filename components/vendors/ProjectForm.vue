<template>

  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" icon v-bind="attrs" v-on="on"><v-icon>library_add</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Новый проект</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="8">
              <v-select :items="vendors" v-model="vendor" item-text="name" label="Вендор *" required return-object
                        outlined dense filled
                        @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-switch v-model="status" label="Активен" color="success" inset dense/>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="name" label="Название *" outlined dense filled required
                            @keyup.enter="onSave"/>
            </v-col>

            <v-col cols="12" sm="6" md="6">
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
    name: "ProjectForm",
    props: {
      vendors: {type: Array},
      currentVendor: {type: Object}
    },
    data() {
      return {
        dialog: false,
        vendor: _.cloneDeep(this.currentVendor),
        name: null,
        code: null,
        status: true
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    watch: {
      currentVendor(val) {
        this.vendor = _.cloneDeep(val)
      }
    },
    methods: {
      onSave() {
        const data = {
          vendor: this.currentVendor,
          name: this.name,
          code: this.code,
          status: this.status
        }

        this.$emit('save', data)
        this.onClose()
      },
      onClose() {
        this.init()
        this.dialog = false
      },
      init() {
        this.vendor = _.cloneDeep(this.currentVendor)
        this.name = null
        this.code = null
        this.status = true
      }
    },

  }
</script>

<style scoped>

</style>
