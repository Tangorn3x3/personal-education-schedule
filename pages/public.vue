<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-row>
        <v-col cols="12">

          <v-tabs v-model="tab">
            <v-tab>Конвертеры</v-tab>
            <v-tab>json2Class</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <converter-list public/>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <json2-class public/>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>

        </v-col>
      </v-row>

    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { maxLength, required } from 'vuelidate/lib/validators'
import * as _ from 'lodash'
import * as propertyService from "@/utils/service/propertyService";
import ConverterList from "../components/converter/ConverterList";
import Json2Class from "./json2class";

export default {
  name: 'Login',
  components: {Json2Class, ConverterList},
  layout: 'empty',
  auth: false,
  data () {
    return {
      appName: 'Snippeter',
      tab: 0
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
