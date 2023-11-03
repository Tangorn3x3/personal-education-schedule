import _ from "lodash";
import notificationService from "@/utils/service/notificationService";
import {fetchAction} from "@/@app-platform/services/platformApiClient";
import appConfig, {PlatformCrudTables} from "@/appConfig";

const USE_CACHE = process.env.NODE_ENV === 'production'

const ACTIONS = {
    list: 'generic_items_all',
    create: 'generic_items_add',
    update: 'generic_items_update',
    delete: 'generic_items_delete',
}

/**
 * @param {PlatformCrudTableDesc} apiType
 * @param filter
 * @return {Promise<Object[]>}
 */
export async function list(apiType, filter = {}) {
    try {
        console.debug(`Загрузка списка ${apiType.name} из таблицы ${apiType.table}...`)
        let cacheKey = `${apiType.code}`

        if (apiType.cacheable) {
            let cached = _getCache(cacheKey)
            if (cached) {
                console.log('Getted from cache', cacheKey)
                return cached
            }
        }

        let list = await fetchAction(ACTIONS.list, {
            table: apiType.table,
            search: filter,
        })

        console.debug(`Загрузка списка ${apiType.name} из таблицы ${apiType.table} завершена`, list)
        _putCache(cacheKey, list, apiType)

        return list;
    } catch (error) {
        console.log()
        notificationService.showErrorAlert(error.toString(), `Загрузка списка. ${apiType.name}`)
        return []
    }
}

/**
 * @param {PlatformCrudTableDesc} apiType
 * @param {string} recordId
 * @returns {Promise<Object|null>}
 */
export async function single(apiType, recordId) {
    try {
        console.debug(`Загрузка записи ${apiType.name} из таблицы ${apiType.table} по ID=${recordId}...`)

        let list = await fetchAction(ACTIONS.list, {
            table: apiType.table,
            search: { id: recordId },
        })

        if (list.length === 0) throw new Error('Запись не найдена')
        let record = list[0]

        console.debug(`Загрузка записи ${apiType.name} из таблицы ${apiType.table} по ID=${recordId} завершена`, record)
        return record;
    } catch (error) {
        console.log()
        notificationService.showErrorAlert(error.toString(), `Загрузка записи. ${apiType.name}`)
        return null
    }
}

/**
 * @param {PlatformCrudTableDesc} apiType
 * @param {Object} payload
 * @returns {Promise<Object|null>}
 */
export async function create(apiType, payload) {

    try {
        console.debug(`Создание записи ${apiType.name} в таблице ${apiType.table}...`)

        let savedRecord = await fetchAction(ACTIONS.create, {
            table: apiType.table,
            body: payload,
        })

        console.debug(`Создание записи ${apiType.name} в таблице ${apiType.table} завершено`, savedRecord)
        return savedRecord;
    } catch (error) {
        console.log()
        notificationService.showErrorAlert(error.toString(), `Создание записи. ${apiType.name}`)
        return null
    }
}

/**
 *
 * @param {PlatformCrudTableDesc} apiType
 * @param {string} recordId
 * @param {Object} payload
 * @returns {Promise<Object|null>}
 */
export async function update(apiType, recordId, payload) {

    try {
        console.debug(`Изменение записи ${apiType.name} в таблице ${apiType.table} по ID=${recordId}...`)

        let savedRecord = await fetchAction(ACTIONS.update, {
            table: apiType.table,
            id: recordId,
            body: payload,
        })

        console.debug(`Изменение записи ${apiType.name} в таблице ${apiType.table} по ID=${recordId} завершено`, savedRecord)
        return savedRecord;
    } catch (error) {
        console.log()
        notificationService.showErrorAlert(error.toString(), `Изменение записи. ${apiType.name}`)
        return null
    }
}

/**
 *
 * @param {PlatformCrudTableDesc} apiType
 * @param {string} recordId
 * @returns {Promise<Object|null>}
 */
export async function deleteSingle(apiType, recordId) {

    try {
        console.debug(`Удаление записи ${apiType.name} в таблице ${apiType.table} по ID=${recordId}...`)

        let savedRecord = await fetchAction(ACTIONS.delete, {
            table: apiType.table,
            id: recordId,
        })

        console.debug(`Удаление записи ${apiType.name} в таблице ${apiType.table} по ID=${recordId} завершено`, savedRecord)
        return savedRecord;
    } catch (error) {
        console.log()
        notificationService.showErrorAlert(error.toString(), `Удаление записи. ${apiType.name}`)
        return null
    }
}

export class PlatformCrudTableDesc {
    constructor (props) {this.initialize(props)}
    initialize (props) {
        /** @type {String} */ this.code = _.get(props, 'code') || null
        /** @type {String} */ this.table = _.get(props, 'table') || null
        /** @type {String} */ this.name = _.get(props, 'name') || null

        /** @type {boolean} */ this.cacheable = _.get(props, 'cacheable') || false
        /** @type {String[]} */ this.clearCaches = _.get(props, 'clearCaches') || []
    }
}


/**
 * @param {Object.<string, PlatformCrudTableDesc>} crudTablesObject
 */
export function clearCaches(crudTablesObject) {
    _.forIn(crudTablesObject, (value, key) => {
        localStorage.removeItem(key);
    })
}

/**
 * @param {PlatformCrudTableDesc} apiType
 * @param {string} id
 */
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
        clearCacheKey(_.get(PlatformCrudTables, value), id)
    })
}

function _getCache(key) {
    let useCache = USE_CACHE || appConfig.platformCrud.cacheEnabled
    if (!useCache) return undefined

    let data = localStorage.getItem(key)
    try {
        return data ? JSON.parse(data) : undefined
    } catch (e) {
        return undefined
    }
}
