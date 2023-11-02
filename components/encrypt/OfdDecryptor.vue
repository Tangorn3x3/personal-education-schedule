<template>
  <div>
    <ofd-encrypt-config-form v-if="!isEncryptConfigValid" class="mb-4"/>

    <div class="mb-4">
      <v-text-field v-model="encryptedText" label="Зашифрованный текст" outlined dense filled required hide-details
                    clearable
                    @keyup.enter="decrypt"
                    append-icon="no_encryption"
                    @click:append="decrypt"/>
    </div>

    <div v-if="decryptedText">
      <h3 class="mb-2">Результат</h3>

      <info-chip v-if="!isXml" :text="decryptedText"/>
      <editor v-else :code="decryptedText" language="XML" auto-style-line-numbers line-numbers readonly style="max-height: 400px"/>
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

  export default {
    name: "OfdDecryptor",
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
      encryptedText(newVal) {
        if (!newVal) {
          this.decryptedText = null
          this.isXml = false
        }
      }
    },
    methods: {
      //...mapActions('NameStore', ['fetchData'])
      decrypt() {
        try {
          let decrypted = encryptUtils.decryptAES(this.encryptedText, this.encryptConfig.iv, this.encryptConfig.key);
          this.isXml = formattingUtils.isXml(decrypted);
          this.decryptedText = this.isXml ? formattingUtils.formatXml(decrypted) : decrypted;
        } catch (e) {
           console.error(e)
        }

      }
    },

  }
</script>

<style scoped>

</style>
