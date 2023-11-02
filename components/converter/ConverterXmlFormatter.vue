<template>
  <v-row>

    <v-col cols="12" sm="12" md="4">
      <v-btn-toggle v-model="mode" mandatory class="mb-4">
        <v-btn v-for="format in modes" :key="format">{{ format }}</v-btn>
      </v-btn-toggle>

      <v-btn color="success" block @click="convert" :disabled="!val" class="mb-4">
        <v-icon>compare_arrows</v-icon>
      </v-btn>

      <v-textarea v-model="val" :label="`${formatterType} Text`"
                  outlined dense filled required
                  @keyup.enter="convert"/>
    </v-col>

    <v-col cols="12" sm="12" md="8">
      <editor :code="generatedText" :language="editorLang" auto-style-line-numbers line-numbers readonly/>
    </v-col>

  </v-row>
</template>

<script>
  import Col4 from "@/components/common/columns/Col4";
  import Col8 from "@/components/common/columns/Col8";
  import ColFull from "@/components/common/columns/ColFull";
  import InfoChip from "@/components/common/InfoChip";
  import Editor from "@/components/editor/Editor";
  import notificationService from "@/utils/service/notificationService";
  import * as formattingUtils from "@/utils/utils/formattingUtils";
  import {atolJsonToWellNamedJson, urlEncodedToJson} from "../../utils/utils/formattingUtils";

  const converterModes = Object.freeze({
    XML: { code: 'XML', lang: 'xml' },
    JSON: { code: 'JSON', lang: 'json' },
    URL_2_JSON: { code: 'URL_2_JSON', lang: 'json' },
    ATOL_2_JSON: { code: 'ATOL_2_JSON', lang: 'json' },
  });


  export default {
    name: "ConverterXmlFormatter",
    components: {Editor, InfoChip, ColFull, Col8, Col4},
    props: {},
    data() {
      return {
        val: null,
        generatedText: null,
        mode: 0,

        /** @type {Array<{val: Number, result: String}>} */
        history: []
      }
    },
    computed: {
      modes() {
        let modes = []
        _.forIn(converterModes, (val) => { modes.push(val.code) })
        return modes
      },
      formatterType() {
        return _.get(converterModes, `${this.modes[this.mode]}.code`)
      },
      editorLang() {
        return _.get(converterModes, `${this.formatterType}.lang`)
      }
    },
    mounted() {
      console.debug('ConverterEpochTime mounted.')
    },
    created() {
    },
    methods: {

      convert() {
        if (!this.val) return;
        let res = null
        try {
          switch (this.formatterType) {
            case converterModes.XML.code:
              res = formattingUtils.formatXml(this.val);
              break;
            case converterModes.JSON.code:
              res = formattingUtils.formatJson(this.val);
              break;
            case converterModes.URL_2_JSON.code:
              res = formattingUtils.urlEncodedToJson(this.val);
              break;
            case converterModes.ATOL_2_JSON.code:
              res = formattingUtils.atolJsonToWellNamedJson(this.val);
              break;
          }
        } catch (e) {
          console.error(e)
          notificationService.showError("Невозможно преобразовать")
        }

        this.generatedText = res || 'Не удалось преобразовать'
      },
    },

  }
</script>

<style scoped>

</style>
