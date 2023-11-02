<template>

  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" icon class="mr-2" @click.stop="" v-on="on"><v-icon>note_add</v-icon></v-btn>
    </template>

    <reminder-form :types="types" :selected-type="selectedType"
                   @save="onSave" @close="dialog = false"/>

  </v-dialog>

</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import {keyboardLayoutToEn} from "@/utils/utils/stringUtils";
  import ImageCropSelector from "@/components/common/ImageCropSelector";
  import ReminderForm from "@/components/reminder/ReminderForm";

  export default {
    name: "ReminderFormDialog",
    components: {ReminderForm, ImageCropSelector},
    props: {
      types: { type: Array, required: true },
      selectedType: { type: Object, required: true },
    },
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      onSave(data) {
        this.$emit('save', data)
      }
    },
  }
</script>

<style scoped>

</style>
