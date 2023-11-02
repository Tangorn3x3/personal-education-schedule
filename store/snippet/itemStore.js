/* eslint-disable no-console,spaced-comment */
import * as _ from 'lodash'
import Vue from 'vue'
import * as dreamApi from '@/utils/api/dreamApi'
import {DreamApiType} from "@/utils/api/dreamApi";
import RecentSnippetItem from "@/models/snippet/RecentSnippetItem";
import notificationService from "@/utils/service/notificationService";

const RECENT_ITEMS_KEY = 'recentSnippets'

function _initialState () {
  return {
    allItems: [],
    currentItem: null,

    /** @type {Array<RecentSnippetItem>} */
    recentItems: [],
    itemListFilter: '',
    langTypes: []
  }
}

export const state = () => (_initialState())

export const getters = {

}

export const actions = {
  fetchAllItems({ commit }) {
    dreamApi.list(DreamApiType.SNP_ITEMS_SHORT)
      .then(result => {
        console.log(result)
        commit('setUnified', { allItems: _.cloneDeep(result)})
      })
  },
  fetchSingleItem({ commit }, itemId) {
    dreamApi.single(DreamApiType.SNP_ITEMS, itemId)
      .then( /** @type {SnippetItem} */ result => {
        console.log(result)
        commit('setUnified', { currentItem: _.cloneDeep(result)})
        commit('addToRecent', new RecentSnippetItem(result.id, result.title, result.projectChapter.name))
      })
  },

  createSection({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.create(DreamApiType.SNP_SECTIONS, payload)
        .then(result => {
          commit('addUnified', { 'currentItem.sections': result})
          resolve(result)
        })
    })
  },
  updateSection({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.update(DreamApiType.SNP_SECTIONS, payload.id, payload)
        .then(result => {
          commit('updateInArrayById', { 'currentItem.sections': result})
          resolve(result)
        })
    })
  },

  createItem({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.create(DreamApiType.SNP_ITEMS, payload)
        .then(result => {
          commit('setUnified', { currentItem: result})
          commit('addUnified', { allItems: result})
          resolve(result)
        })
    })
  },
  updateItem({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.update(DreamApiType.SNP_ITEMS, payload.id, payload)
        .then(result => {
          commit('setUnified', { currentItem: result})
          resolve(result)
        })
    })
  },

  clearItemCache({ commit }, payload) {
    dreamApi.clearCacheKey(DreamApiType.SNP_ITEMS, payload.id)
  },

  fetchLangTypes({ commit }) {
    return new Promise((resolve, reject) => {
      dreamApi.list(DreamApiType.LANG_TYPES)
        .then(result => {
          console.log('Languages fetched')
          commit('setUnified', { langTypes: _.cloneDeep(result)})
        })
    })
  },

  initRecentItems({ commit }) {
    let itemsStr = localStorage.getItem(RECENT_ITEMS_KEY)
    if (!itemsStr) return;

    try {
      let items = JSON.parse(itemsStr)
      commit('setUnified', { recentItems: items})
    } catch (e) {
      notificationService.showError('Неверный формат сохраненных данных', `Загрузка последних сниппетов`)
    }
  }
}

export const mutations = {
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

  updateInArrayById(state, payload) {
    _.forIn(payload, (value, key) => {
      const stateObj = _.get(state, key)
      const indx = _.findIndex(stateObj, {id: value.id})
      Vue.set(stateObj, indx, value)
    })

  },

  /**
   * @param {RecentSnippetItem} recentSnippetItem
   */
  addToRecent(state, recentSnippetItem) {
    /** @type {Array<RecentSnippetItem>} */
    let recentItems = _.cloneDeep(state.recentItems)
    let currIdx = _.findIndex(recentItems)

    if (currIdx >= 0) {
      _.remove(recentItems, { id: recentSnippetItem.id })
    }

    recentItems.unshift(recentSnippetItem)
    Vue.set(state, 'recentItems', recentItems)
    localStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(recentItems))
  }
}
