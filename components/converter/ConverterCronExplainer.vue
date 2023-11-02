<template>
  <v-row align-content="center">
    <col3/>
    <col6>
      <v-text-field v-model="val" label="Cron expression" outlined dense filled required hide-details clearable
                    @keyup.enter="convert" @change="convert" @input="convert"/>
      <h3 class="mt-4 white--text" style="font-weight: 400">{{ generatedText }}</h3>
    </col6>

  </v-row>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import Col4 from "@/components/common/columns/Col4";
  import Col8 from "@/components/common/columns/Col8";
  import ColFull from "@/components/common/columns/ColFull";
  import cronstrue from 'cronstrue/i18n';
  import Col3 from "@/components/common/columns/Col3";
  import Col6 from "@/components/common/columns/Col6";

  export default {
    name: "ConverterCronExplainer",
    components: {Col6, Col3, ColFull, Col8, Col4},
    props: {},
    data() {
      return {
        val: null,
        generatedText: null,

        cronConfig: {
          locale: "ru",
          use24HourTimeFormat: true,
          verbose: true
        }
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {
    },
    created() {
    },
    methods: {
      convert() {
        let res = null
        try {
          let value = this.val.replace(/\+/g, " ")
          this.generatedText = cronstrue.toString(value, this.cronConfig);
        } catch (e) {
          this.generatedText = 'Не удалось преобразовать'
        }

      }
    },

  }
</script>

<style scoped>

</style>
