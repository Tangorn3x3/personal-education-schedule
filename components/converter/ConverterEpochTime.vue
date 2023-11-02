<template>
  <v-row>
    <col8>
      <v-text-field v-model="val" label="Unix Timestamp (ms)" outlined dense filled required hide-details clearable
                    @keyup.enter="convert"/>
    </col8>
    <col4>
      <v-btn color="success" @click="convert"><v-icon>compare_arrows</v-icon></v-btn>
    </col4>
    <col-full>
      <v-simple-table class="mt-4" dense>
        <template v-slot:default>
          <tbody>
          <tr v-for="(info, ind) in history" :key="ind">
            <td><info-chip :text="info.val"/> </td>
            <td> => </td>
            <td><info-chip :text="info.result"/></td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </col-full>
  </v-row>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import Col4 from "@/components/common/columns/Col4";
  import Col8 from "@/components/common/columns/Col8";
  import ColFull from "@/components/common/columns/ColFull";
  import InfoChip from "@/components/common/InfoChip";
  import * as converterUtils from "@/utils/utils/converterUtils";

  export default {
    name: "ConverterEpochTime",
    components: {InfoChip, ColFull, Col8, Col4},
    props: {},
    data() {
      return {
        val: null,
        result: null,
        resultFormat: 'dddd, DD MMMM YYYY HH:mm:ss',
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
        this.result = converterUtils.epochTimeConvert(this.val, this.resultFormat)
        if (!_.find(this.history, this.val)) {
          this.addToHistory(this.val, this.result)
        }

      },
      addToHistory(val, result) {
        this.history.push({val, result})
      }
    },

  }
</script>

<style scoped>

</style>
