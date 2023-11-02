<template>
  <v-row>

    <v-col cols="12" sm="12" md="4">
      <v-btn color="success" block @click="convert" class="mb-4">
        <v-icon>compare_arrows</v-icon>
      </v-btn>
      <v-textarea v-model="val" label="JWT"
                  outlined dense filled required
                  @keyup.enter="convert"/>
    </v-col>

    <v-col cols="12" sm="12" md="8">
      <editor :code="generatedText" language="json" auto-style-line-numbers line-numbers readonly/>
    </v-col>

  </v-row>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import Col4 from "@/components/common/columns/Col4";
  import Col8 from "@/components/common/columns/Col8";
  import ColFull from "@/components/common/columns/ColFull";
  import InfoChip from "@/components/common/InfoChip";
  import Editor from "@/components/editor/Editor";
  import notificationService from "@/utils/service/notificationService";
  import * as converterUtils from "@/utils/utils/converterUtils";

  export default {
    name: "ConverterJwtParser",
    components: {Editor, InfoChip, ColFull, Col8, Col4},
    props: {},
    data() {
      return {
        val: null,
        generatedText: null,

        /** @type {Array<{val: Number, result: String}>} */
        history: []
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {
      console.debug('ConverterEpochTime mounted.')
    },
    created() {
    },
    methods: {
      //...mapActions('NameStore', ['fetchData'])
      convert() {
        let res = null
        try {
          res = converterUtils.parseJwt(this.val)
          this.processResult(res)
        } catch (e) {
          notificationService.showError("Невозможно преобразовать Токен")
        }

        this.generatedText = res ? JSON.stringify(res, null, 4) : 'Не удалось преобразовать'
      },
      addToHistory(val, result) {
        this.history.push({val, result})
      },

      processResult(res) {
        if (!res) return

        // Преобразуем дату истечения токена
        if (_.has(res, 'exp')) res.exp = `${res.exp} (tip: ${converterUtils.epochTimeConvert(res.exp)})`

        // Преобразуем дату выдачи токена
        if (_.has(res, 'iat')) res.iat = `${res.iat} (tip: ${converterUtils.epochTimeConvert(res.iat)})`
      }
    },

  }
</script>

<style scoped>

</style>
