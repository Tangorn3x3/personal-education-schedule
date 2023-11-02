<script>
  import {GenMethodTypes} from "@/models/generators/GenMethods";
  import _ from "lodash";

  export default {
    name: "CommonMethodGenerator",
    props: {
      templates: {type: Array},
      type: {type: Object}
    },
    data() {
      return {
        tplData: {},
        currentGeneratorType: GenMethodTypes.REPO_METHOD,
        generatorType: '',
        generatedText: ''
      }
    },
    computed: {
      currentTemplates() {
        if (!this.templates) return []
        return _.filter(this.templates, {type: this.currentGeneratorType})
      },
      typeTitle() {return _.get(this.type, 'title')},
      typeCode() {return _.get(this.type, 'code')},
    },
    methods: {
      generate() {
        const template = this.getTemplate(this.generatorType)
        if (!template) return

        const text = template(this.tplData)

        this.generatedText = _.unescape(text)
      },

      getTemplate(type) {
        const tplObj = _.find(this.currentTemplates, {code: type})
        return tplObj ? _.template(tplObj.tpl) : false
      },
    },

  }
</script>

<style scoped>

</style>
