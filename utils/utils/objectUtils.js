import _ from 'lodash'

/**
* Нахождение разницы между двумя объекта
*
* @param  {Object} object Object compared
* @param  {Object} base   Object to compare with
* @return {Object}        Return a new object who represent the diff
*/
export function difference (object, base) {
  function changes (object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value
      }
    })
  }
  return changes(object, base)
}

/**
 * Поиск по вложенному ключу объекта
 * @param {Object} obj
 * @param {String} key
 * @returns {*[]|Array}
 */
export function findKeyDeep (obj, key) {
  if (_.has(obj, key)) { return [obj] }

  // elegant:
  return _.flatten(_.map(obj, function (v) {
    return typeof v === 'object' ? findKeyDeep(v, key) : []
  }), true)
}

/**
 * Создает объект с такими же значениями, как у первоначального объекта,
 * но с ключами, сгенерированными путем обработки каждого внутреннего ключа callback-функцией.
 * Итерируемый вызывается с тремя аргументами: (значение, ключ, объект)
 *
 * @param {Object} obj - первоначальный объект
 * @param cb - callback-функция (принимает параметры (value, key, object))
 * @param isRecursive
 * @returns {{}|*}
 */
export function mapKeysDeep (obj, cb, isRecursive) {
  if (!obj && !isRecursive) {
    return {}
  }

  if (!isRecursive) {
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      return {}
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(item => mapKeysDeep(item, cb, true))
  }

  if (!_.isPlainObject(obj)) {
    return obj
  }

  const result = _.mapKeys(obj, cb)

  return _.mapValues(result, value =>
    mapKeysDeep(value, cb, true)
  )
}

/**
 * Сливает 2 объекта в один по правилу:
 *    Если во втором объекте приходит пустое значение ключа,
 *    то используется значение аналогичного ключа из первого объекта
 *
 * @param toObj
 * @param fromObj
 * @returns {*}
 */
export function mergeWithoutNulls(toObj, fromObj) {
  let res = _.cloneDeep(toObj)
  _.mergeWith(res, fromObj, (toVal, fromVal) => {
    return _.isNil(fromVal) ? toVal : fromVal
  })

  return res
}
