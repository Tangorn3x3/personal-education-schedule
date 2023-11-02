<template>
  <div>
    <ofd-encrypt-config-form v-if="!isEncryptConfigValid" class="mb-4"/>

    <div class="mb-4">
      <v-text-field v-model="decryptedText" label="Расшифрованный текст" outlined dense filled required hide-details
                    clearable
                    @keyup.enter="encrypt"
                    append-icon="enhanced_encryption"
                    @click:append="encrypt"/>
    </div>

    <div v-if="encryptedText">
      <h3 class="mb-2">Результат</h3>

      <info-chip v-if="!isXml" :text="encryptedText"/>
      <editor v-else :code="encryptedText" language="XML" auto-style-line-numbers line-numbers readonly style="max-height: 400px"/>
    </div>
  </div>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import * as encryptUtils from "@/utils/utils/encryptUtils";
  import * as formattingUtils from "@/utils/utils/formattingUtils";
  import OfdEncryptConfigForm from "@/components/encrypt/OfdEncryptConfigForm";
  import InfoChip from "@/components/common/InfoChip";
  import Editor from "../editor/Editor";
  import {encryptAES} from "../../utils/utils/encryptUtils";

  export default {
    name: "OfdEncryptor",
    components: {Editor, InfoChip, OfdEncryptConfigForm},
    props: {},
    data() {
      return {
        encryptedText: null,
        decryptedText: null,
        isXml: false
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
      encryptConfig() {
        return encryptUtils.getOfdEncryptionConfig()
      },
      isEncryptConfigValid() {
        return !!this.encryptConfig.iv && !!this.encryptConfig.key
      }
    },
    watch: {
      decryptedText(newVal) {
        if (!newVal) {
          this.encryptedText = null
          this.isXml = false
        }
      }
    },
    methods: {
      //...mapActions('NameStore', ['fetchData'])
      encrypt() {
        try {
          let encrypted = encryptUtils.encryptAES(this.decryptedText, this.encryptConfig.iv, this.encryptConfig.key);
          this.isXml = formattingUtils.isXml(encrypted);
          this.encryptedText = this.isXml ? formattingUtils.formatXml(encrypted) : encrypted;
        } catch (e) {
           console.error(e)
        }

      }
    },

  }
</script>

<style scoped>

</style>
