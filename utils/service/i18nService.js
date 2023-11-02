import _ from 'lodash'
import * as objectUtils from '@/utils/utils/objectUtils'
let instance

export function initialize (i18nInstance) {
  instance = i18nInstance
}

const i18nService = {}

i18nService.getInstance = function () { return instance }
i18nService.getLocale = function () { return instance.locale }
i18nService.$t = function (code) {
  return _.get(instance, `messages.${instance.locale}.${code}`)
}
i18nService.messages = function () {
  return _.get(instance, `messages.${instance.locale}`)
}

i18nService.localizeObjectKeys = function (object) {
  const result = objectUtils.mapKeysDeep(object, (value, key) => {
    const labels = objectUtils.findKeyDeep(i18nService.messages(), key)
    if (labels.length > 0) {
      const label = _.get(labels[0], key)
      return label || key
    }

    return key
  })

  return result
}

export default i18nService
