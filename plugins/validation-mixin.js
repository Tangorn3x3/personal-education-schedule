import Vue from 'vue'
import * as _ from 'lodash'
import { validationMixin } from 'vuelidate'

Vue.mixin({
  mixins: [validationMixin],
  data () {
    return {
      validatedObjectName: null
    }
  },
  methods: {
    getErrorMessages (fullFieldName, eachIndex = -1) {
      const each = eachIndex > -1

      // eslint-disable-next-line prefer-const
      let [formName, fieldName] = (fullFieldName.includes('.'))
        ? fullFieldName.split('.') // For getErrorText('form.field')
        : ['form', fullFieldName] // For getErrorText('field') default formName as 'form'
      // const formNameErrors = `${formName}Errors`
      let $field = null
      if (formName === 'form' && this.validatedObjectName) {
        formName = this.validatedObjectName
      }

      let fieldPath = ''

      if (formName === 'form' && !this.validatedObjectName) {
        fieldPath = each ? `$each.${eachIndex}.` : ''
        fieldPath += fieldName
      } else {
        // Получается что-то типа rates.$each.10.rate или rates.rate
        fieldPath = formName + '.'
        fieldPath += each ? `$each.${eachIndex}.` : ''
        fieldPath += fieldName
      }

      $field = _.get(this.$v, fieldPath)

      if (!$field || !$field.$invalid) {
        return []
      }
      const messages = {
        required: this.$t('validation_messages.required'),
        requiredIf: this.$t('validation_messages.requiredIf'),
        requiredUnless: this.$t('validation_messages.requiredUnless'),
        minLength: this.$t('validation_messages.minLength'),
        maxLength: this.$t('validation_messages.maxLength'),
        between: this.$t('validation_messages.between'),
        alpha: this.$t('validation_messages.alpha'),
        alphaNum: this.$t('validation_messages.alphaNum'),
        numeric: this.$t('validation_messages.numeric'),
        url: this.$t('validation_messages.url'),
        sameAs: this.$t('validation_messages.sameAs'),
        email: this.$t('validation_messages.email'),
        float: this.$t('validation_messages.float')
      }
      const usedValidators = $field.$flattenParams()
      for (const { name } of usedValidators) {
        // Find invalid field condition
        const validatorName = Object.keys(messages)
          .find(validatorName => name.includes(validatorName) && !$field[name])
        // Set message if find validator
        if (validatorName) {
          return [ messages[validatorName] ]
        }
      }
    }
  }
})
