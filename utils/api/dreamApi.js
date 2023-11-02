import _ from 'lodash'
import apiService from '@/utils/api/apiClient'
import notificationService from "@/utils/service/notificationService";
import * as qs from "qs";

const ROOT_URL = '/generic'
const USE_CACHE = process.env.NODE_ENV === 'production'

/** @type {Object.<string, DreamApiTypeDesc>} */
export const DreamApiType = Object.freeze({
  VENDORS: { code: 'VENDORS', table: 'vendors', name: 'Вендоры', related: '*', clearCaches: ['VENDORS', 'PROJECTS']},
  PROJECTS: { code: 'PROJECTS',  table: 'projects', name: 'Проекты', related: '*', clearCaches: ['PROJECTS', 'PROJECT_CHAPTERS', 'SNP_ITEMS_SHORT']},
  PROJECT_CHAPTERS: { code: 'PROJECT_CHAPTERS',  table: 'project_chapters', name: 'Главы', related: '*', clearCaches: []},
  SNP_ITEMS: { code: 'SNP_ITEMS',  table: 'snip_items', name: 'Записи', related: '*', clearCaches: []},
  SNP_ITEMS_SHORT: { code: 'SNP_ITEMS_SHORT',  table: 'snip_items', name: 'Записи', related: '', clearCaches: []},
  SNP_SECTIONS: { code: 'SNP_SECTIONS',  table: 'snip_item_sections', name: 'Секции', related: '*', clearCaches: ['SNP_ITEMS', 'SNP_ITEMS_SHORT']},
  LANG_TYPES: { code: 'LANG_TYPES',  table: 'lang_types', name: 'Синтаксис', related: '*', clearCaches: []},

  GEN_METHOD_TEMPLATES: { code: 'GEN_METHOD_TEMPLATES', table: 'gen_method_templates', name: 'Шаблоны методов', related: '*'},

  REMINDERS: { code: 'REMINDERS', table: 'reminders', name: 'Напоминалки', related: '*', cacheable: false},
  REMINDER_TYPES: { code: 'REMINDER_TYPES', table: 'rem_types', name: 'Типы напоминалок', related: '*'},

  PROPERTIES: { code: 'PROPERTIES', table: 'properties', name: 'Конфиги', related: '*', cacheable: false},
  CUSTOM_PERMISSIONS: { code: 'CUSTOM_PERMISSIONS', table: 'custom_permissions', name: 'Кастомные пермишины', related: '*', cacheable: false},
});

export class DreamApiTypeDesc {
  constructor (props) {this.initialize(props)}
  initialize (props) {
    /** @type {String} */ this.table = _.get(props, 'table') || null
    /** @type {String} */ this.name = _.get(props, 'name') || null
    /** @type {String} */ this.related = _.get(props, 'related') || null
  }
}

/**
 * @param {DreamApiTypeDesc} apiType
 * @param filter
 * @param params
 * @return {Promise<Object>}
 */
export function list(apiType, filter = {}, params = {}) {
  const filterStr = createFilterString(filter)
  let key = `${apiType.code}`

  let url = `${ROOT_URL}/_table/${apiType.table}?related=${apiType.related}`
  if (filterStr) url += '&'+ qs.stringify(filter)

  return new Promise((resolve, reject) => {
    let cached = _getCache(key)
    if (cached) {
      console.log('Getted from cache', key)
      resolve(cached)
    } else {
      apiService.get(url)
        .then((response) => {
          _putCache(key, response.data, apiType)
          resolve(response.data)
        })
        .catch((error) => {
          notificationService.showAxiosError(error, `Загрузка списка. ${apiType.name}`)
          reject(error)
        })
    }

  })
}

export function single(apiType, recordId, params = {}) {
  let url = `${ROOT_URL}/_table/${apiType.table}/${recordId}?related=${apiType.related}`
  let key = `${apiType.code}_${recordId}`

  return new Promise((resolve, reject) => {
    let cached = _getCache(key)
    if (cached) {
      console.log('Getted from cache', key)
      resolve(cached)
    } else {
      apiService.get(url)
        .then((response) => {
          _putCache(key, response.data, apiType)
          resolve(response.data)
        })
        .catch((error) => {
          notificationService.showAxiosError(error, `Загрузка записи. ${apiType.name}`)
          reject(error)
        })
    }
  })
}

export function create(apiType, payload) {

  let url = `${ROOT_URL}/_table/${apiType.table}?fields=*&related=*`
  let key = `${apiType.code}`

  return new Promise((resolve, reject) => {
    apiService.post(url, payload)
      .then((response) => {
        notificationService.showSuccessAlert('Создано', apiType.name)
        _putCacheAndClearRelated(apiType, null, key, response.data)
        console.log({response})
        resolve(response.data)
      })
      .catch((error) => {
        notificationService.showAxiosError(error, `Создание. ${apiType.name}`)
        reject(error)
      })
  })
}

export function update(apiType, id, payload) {

  let url = `${ROOT_URL}/_table/${apiType.table}/${id}?fields=*&related=*`
  let key = `${apiType.code}_${id}`

  return new Promise((resolve, reject) => {
    apiService.put(url, payload)
      .then((response) => {
        notificationService.showSuccessAlert('Обновлено', apiType.name)
        _putCacheAndClearRelated(apiType, id, key, response.data)
        resolve(response.data)
      })
      .catch((error) => {
        notificationService.showAxiosError(error, `Изменение. ${apiType.name}`)
        reject(error)
      })
  })
}

export function clearRootCaches() {
  _.forIn(DreamApiType, (value, key) => {
    localStorage.removeItem(key);
  })
}

function createFilterString(filter) {
  let filterStrs = []
  _.forIn(filter, (value, key) => {
    filterStrs.push(`(${key} = ${value})`)
  })
  return _.join(filterStrs, ' and ')
}

export function clearCacheKey(apiType, id) {
  let key = !!id ? `${apiType.code}_${id}` : apiType.code
  console.debug('clearing ' + key, apiType, id)
  localStorage.removeItem(key);
}

function _putCache(key, data, apiType = null) {
  if (_.has(apiType, 'cacheable') && !apiType.cacheable) return; // не кэшируем отмеченные типы

  localStorage.setItem(key, JSON.stringify(data))
}

function _putCacheAndClearRelated(apiType, id, key, data) {
  _putCache(key, data, apiType)

  _.forEach(apiType.clearCaches, (value) => {
    clearCacheKey(_.get(DreamApiType, value), id)
  })
}

function _getCache(key) {
  if (!USE_CACHE) return undefined

  let data = localStorage.getItem(key)
  try {
    return data ? JSON.parse(data) : undefined
  } catch (e) {
    return undefined
  }
}
