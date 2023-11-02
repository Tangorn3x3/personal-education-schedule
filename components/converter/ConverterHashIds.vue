<template>
  <v-row>

    <v-col cols="12" sm="12" md="4">
      <v-text-field v-model="salt" label="Salt"/>
      <v-text-field v-model="minLength" type="number" label="Минимальная длина хэша"/>

      <v-textarea v-model="val" label="Значения (разделенные | )"
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
  import Editor from "@/components/editor/Editor";
  import notificationService from "@/utils/service/notificationService";
  import Hashids from "hashids";


  export default {
    name: "ConverterHashIds",
    components: {Editor, ColFull, Col8, Col4},
    props: {},
    data() {
      return {
        salt: 'w7eEffQ8SZhARZWLYZ12txUSngTiYZcI',
        minLength: 8,
        val: null,
        generatedText: null
      }
    },
    computed: {
      editorLang() {
        return 'json'
      }
    },
    mounted() {
      console.debug('ConverterHashIds mounted.')
    },
    created() {
    },
    methods: {

      convert() {
        if (!this.val) return;
        let res = null
        try {
          let valuesToEncode = this.val.split('|')
          let numberToEncode = _.map(valuesToEncode, val => { return _.toNumber(val) })
          const hashids = new Hashids(this.salt, this.minLength)

          res = hashids.encode(numberToEncode)
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
