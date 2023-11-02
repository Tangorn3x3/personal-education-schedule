<template>
  <div>
    <v-text-field v-model="key" label="Key" outlined dense filled required hide-details clearable
                  @keyup.enter="save"/>
    <v-text-field v-model="iv" label="IV" outlined dense filled required hide-details clearable
                  @keyup.enter="save"/>
  </div>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import * as encryptUtils from "@/utils/utils/encryptUtils";
  import {setOfdEncryptionConfig} from "@/utils/utils/encryptUtils";

  export default {
    name: "OfdEncryptConfigForm",
    props: {},
    data() {
      return {
        key: null,
        iv: null
      }
    },
    computed: {
      encryptConfig () {
        return encryptUtils.getOfdEncryptionConfig()
      },
      isEncryptConfigValid() {
        return !!this.encryptConfig.iv && !!this.encryptConfig.key
      }
    },
    mounted() {
      this.iv = this.encryptConfig.iv
      this.key = this.encryptConfig.key
    },
    created() {
    },
    methods: {
      //...mapActions('NameStore', ['fetchData'])
      save() {
        setOfdEncryptionConfig(this.iv, this.key)
      }
    },

  }
</script>

<style scoped>

</style>
