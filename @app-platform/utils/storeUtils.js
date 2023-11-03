import * as _ from "lodash";
import Vue from "vue";

export const commonMutations = {
  /**
   * Устанавливает значение из переданного объекта.
   * Ключи в объекте должны совпадать с переменными в state
   */
  setUnified (state, payload) {
    _.forIn(payload, (value, key) => {
      const stateObj = _.get(state, key)
      Vue.set(state, key, value)
    })
  },

  addUnified (state, payload) {
    _.forIn(payload, (value, key) => {
      const stateObj = _.get(state, key)
      console.log({ stateObj })
      if (_.isArray(stateObj)) {
        if (_.isArray(value)) {
          _.forEach(value, (val) => {
            Vue.set(stateObj, stateObj.length, val)
          })
        } else  {
          Vue.set(stateObj, stateObj.length, value)
        }
      }
    })
  },

  /**
   * Обновляет объект в массиве по id
   *
   * Например, если у нас есть элемент в сторе items: [{id: 1, name: 'test'}, {id: 2, name: 'test2'}],
   * то вызов этого метода с параметром {items: {id: 2, name: 'test2-new'}} обновит элемент с id 2
   *
   * @param state
   * @param payload
   */
  updateInArrayById(state, payload) {
    _.forIn(payload, (value, key) => {
      const stateObj = _.get(state, key)
      const indx = _.findIndex(stateObj, {id: value.id})
      Vue.set(stateObj, indx, value)
    })

  }
}
