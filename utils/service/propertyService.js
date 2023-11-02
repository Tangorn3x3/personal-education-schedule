import * as _ from 'lodash'

let storeInstance

export function initialize (store) {
  storeInstance = store
}

export function reload() {
  storeInstance.dispatch('propertyStore/fetchProperties')
}

export function getProperties() {
  return storeInstance.state.propertyStore.properties
}

export function getTextByCode(code) {
  let property = storeInstance.getters['propertyStore/byCode'](code)
  return property ? property.value : null
}

export function getNumberByCode(code) {
  let value = getTextByCode(code)
  return _.isNumber(value) ? _.toNumber(value) : null
}

export function getBooleanByCode(code) {
  let value = getTextByCode(code)
  if (value === 'true' || value === 'false') {
    return value === 'true'
  }

  if (value === '1' || value === '0') {
    return value === '1'
  }

  return false
}

export function getObjectByCode(code) {
  let value = getTextByCode(code)
  try {
    return JSON.parse(value)
  } catch (e) {
    console.error("Unable parse object from JSON " + value)
  }
  return null
}
