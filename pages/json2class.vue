<template>
  <v-layout>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-row>
            <col9 class="pr-0">
              <v-text-field v-model="className" :error-messages="getErrorMessages('className')" label="Название класса"
                            @keyup.enter="generate()"
                            outlined dense filled/>
            </col9>

            <col3>
              <v-btn :disabled="$v.$invalid" @click="generate()" color="primary" block><v-icon>play_arrow</v-icon></v-btn>
            </col3>
          </v-row>

          <v-switch v-if="false" v-model="needValidation" label="Полная валидация?" inset dense />
          <v-text-field v-if="false" v-model="serverModelName" :error-messages="getErrorMessages('serverModelName')" label="serverModelName"/>

          <v-row>
            <col4> <v-switch v-model="isExtends" label="Extends" inset dense class="mt-1"/> </col4>
            <col8> <v-text-field v-if="isExtends" v-model="extendsName" :error-messages="getErrorMessages('extendsName')" label="Суперкласс"  outlined dense filled clearable/> </col8>
          </v-row>

          <v-row>
            <col-full>
              <v-select v-model="generatorCode" :items="generators" label="Генератор" @change="initGeneratorTemplate"
                        outlined dense filled/>
            </col-full>

          </v-row>

          <v-row>
            <col-full>
              <h4>
                JSON
                <v-switch v-model="isSimpleTypes" label="Простые типы" inset dense class="mt-1"/>
              </h4>
            </col-full>

            <col-full>
              <editor v-model="json" language="json" auto-style-line-numbers line-numbers/>
            </col-full>

            <col-full>
              <div class="overline">
                Для получения json из POJO можно юзать https://github.com/organics2016/pojo2json
              </div>
              <div v-if="!public" class="overline">
                Для генерации остального <a href="http://adminlte-generator.kg/generator_builder" target="_blank">в генератор</a>
              </div>
            </col-full>


          </v-row>

        </v-col>
        <v-col cols="8">
          <v-card v-if="generatedText">
            <v-card-title>{{ editorHeader }}</v-card-title>
            <v-card-text>
              <div>
                <editor :code="generatedText" :language="generatedSyntaxLang" auto-style-line-numbers line-numbers readonly/>
              </div>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import _ from 'lodash'
import required from 'vuelidate/lib/validators/required'
import Editor from "@/components/editor/Editor";
import ColFull from "@/components/common/columns/ColFull";
import Col4 from "@/components/common/columns/Col4";
import Col8 from "@/components/common/columns/Col8";
import Col9 from "@/components/common/columns/Col9";
import Col3 from "@/components/common/columns/Col3";
import JsModelGenerator from "@/utils/utils/json2classGenerators/JsModelGenerator";
import JavaModelGenerator from "@/utils/utils/json2classGenerators/JavaModelGenerator";
import JavaToModelGenerator from "@/utils/utils/json2classGenerators/JavaToModelGenerator";
import JsEnumGenerator from "@/utils/utils/json2classGenerators/JsEnumGenerator";
import JavaSimpleEntityGenerator from "@/utils/utils/json2classGenerators/JavaSimpleEntityGenerator";
import JavaFromModelGenerator from "@/utils/utils/json2classGenerators/JavaFromModelGenerator";
import JavaEnumGenerator from "@/utils/utils/json2classGenerators/JavaEnumGenerator";
import JsEnumI18nGenerator from "@/utils/utils/json2classGenerators/JsEnumI18nGenerator";
import JavaModelConverterGenerator from "@/utils/utils/json2classGenerators/JavaModelConverterGenerator";
import JavaPopulateFromModelGenerator from "../utils/utils/json2classGenerators/JavaPopulateFromModelGenerator";
export default {
  name: 'Json2Class',
  components: {Col3, Col9, Col8, Col4, ColFull, Editor},
  props: {
    public: { type: Boolean, default: false },
  },
  data () {
    return {
      className: 'Test',
      needValidation: false,
      serverModelName: '',

      isExtends: false,
      extendsName: 'Model',

      isSimpleTypes: true,

      generatorCode: 'JS_MODEL',
      generators: [
        {text: 'JS Model', value: 'JS_MODEL'},
        {text: 'JS Enum', value: 'JS_ENUM'},
        {text: 'JS Enum i18n', value: 'JS_ENUM_I18N'},
        {text: 'Java Model', value: 'JAVA_MODEL'},
        {text: 'Java toModel', value: 'JAVA_TO_MODEL'},
        {text: 'Java Enum', value: 'JAVA_ENUM'},
        {text: 'Java Simple Entity', value: 'JAVA_ENTITY_SIMPLE'},
        {text: 'Java fromModel', value: 'JAVA_FROM_MODEL'},
        {text: 'Java populate from Model', value: 'JAVA_POPULATE_FROM_MODEL'},
        {text: 'Java ModelConverter', value: 'JAVA_MODEL_CONVERTER'},
      ],

      json: '',
      generatedText: '',
      generatedSyntaxLang: 'js',

      editorHeader: ''
    }
  },
  validations () {
    const validationConfig = {
      className: { required },
      json: { required }
    }
    if (this.needValidation) { validationConfig.serverModelName = { required } }
    if (this.isExtends) { validationConfig.extendsName = { required } }

    return validationConfig
  },
  methods: {
    generate () {
      let text = ''
      let jsonObject = {}
      if (this.json) {
        try {
          jsonObject = JSON.parse(this.json)
          if (_.isArray(jsonObject) && jsonObject.length > 0) jsonObject = jsonObject[0]
        } catch (e) {
          console.log(e)
        }

        let generator = this.createGenerator(jsonObject)
        text += generator.generate()

        this.generatedSyntaxLang = generator.fileExtension || 'js'

        if (this.needValidation) {
          text += this.generateFullValidation(jsonObject)
        }

        this.editorHeader = generator.getFileName()
      }
      this.generatedText = _.unescape(text)

    },

    /**
     * @return {BaseGenerator}
     */
    createGenerator(jsonObject) {
      let generator = null

      switch (this.generatorCode) {
        case 'JS_ENUM':
          generator = new JsEnumGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JS_ENUM_I18N':
          generator = new JsEnumI18nGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JAVA_MODEL':
          generator = new JavaModelGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JAVA_TO_MODEL':
          generator = new JavaToModelGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JAVA_ENTITY_SIMPLE':
          generator = new JavaSimpleEntityGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JAVA_FROM_MODEL':
          generator = new JavaFromModelGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JAVA_POPULATE_FROM_MODEL':
          generator = new JavaPopulateFromModelGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JAVA_ENUM':
          generator = new JavaEnumGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        case 'JAVA_MODEL_CONVERTER':
          generator = new JavaModelConverterGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
          break;
        default:
          generator = new JsModelGenerator({className: this.className, jsonObject: jsonObject, extendsName: this.extendsName, isExtends: this.isExtends, isSimpleTypes: this.isSimpleTypes})
      }

      return generator
    },
    initGeneratorTemplate() {
      const generator = this.createGenerator({})
      if (generator.jsonTemplate) {
        this.json = generator.jsonTemplate
      }
    },


    /** ВАЛИДАЦИИ **/
    generateFullValidation (json) {
      const fullTpl = this.getFullValidationTemplate()
      const fieldValTpl = this.getFieldValidationTemplate()

      let fields = ''
      _.forIn(json, (value, key) => {
        fields += fieldValTpl({ name: key })
      })
      // eslint-disable-next-line no-template-curly-in-string
      fields = fields.replace(/SERVER_NAME_PLACEHOLDER/g, '${SERVER_NAME}')

      return fullTpl({
        serverModelName: this.serverModelName,
        validations: fields
      })
    },

    getFullValidationTemplate () {
      return _.template(
        `export const SERVER_NAME = '<%- serverModelName %>'
      const isServerValidation = false

      export const storeModelValidation = function () {
        return {
          <%- validations %>
        }
      }
      `)
    },

    getFieldValidationTemplate () {
      return _.template(
        `<%- name %>: { rules: ['required', isServerValidation ? \`optionalServerSide(SERVER_NAME_PLACEHOLDER.<%- name %>)\` : null] },
        `)
    },

    selectText (id) {
      let sel, range
      const el = document.getElementById(id) // get element id
      if (window.getSelection && document.createRange) { // Browser compatibility
        sel = window.getSelection()
        if (sel.toString() === '') { // no text selection
          window.setTimeout(function () {
            range = document.createRange() // range object
            range.selectNodeContents(el) // sets Range
            sel.removeAllRanges() // remove all ranges from selection
            sel.addRange(range)// add Range to a Selection.
          }, 1)
        }
      } else if (document.selection) { // older ie
        sel = document.selection.createRange()
        if (sel.text === '') { // no text selection
          range = document.body.createTextRange()// Creates TextRange object
          range.moveToElementText(el)// sets Range
          range.select() // make selection.
        }
      }
    }
  }

}
</script>
