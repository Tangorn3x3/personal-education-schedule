/* eslint-disable no-console,spaced-comment */
import * as _ from 'lodash'
import Vue from 'vue'
import * as dreamApi from '@/utils/api/dreamApi'
import {DreamApiType} from "@/utils/api/dreamApi";

function _initialState () {
  return {
    vendors: [],
    projects: [],
    projectChapters: [],

    currentVendor: null,
    currentProject: null,
    currentChapters: [],
  }
}

export const state = () => (_initialState())

export const getters = {
    selectedChapters(state) {
      return state.currentProject
        ? _.orderBy(state.currentProject.chapters, ['name'], ['asc'])
        : []
    },
    byId: (state, getters) => (id) => {
        return null
    }
}

export const actions = {
  fetchVendors({ commit }) {
    dreamApi.list(DreamApiType.VENDORS)
      .then(result => {
        console.log(result)
        commit('setUnified', { vendors: _.cloneDeep(result)})
        commit('setUnified', { currentVendor: _.cloneDeep(result[0])})
      })
  },


  fetchProjects({ commit }) {
    dreamApi.list(DreamApiType.PROJECTS)
      .then(result => {
        commit('setUnified', { projects: _.cloneDeep(result)})
        commit('setUnified', { currentProject: _.cloneDeep(result[0])})
      })
  },
  createProject({ commit }, payload) {
    dreamApi.create(DreamApiType.PROJECTS, payload)
      .then(result => {
        commit('addUnified', { projects: result})
      })
  },


  fetchProjectChapters({ commit }) {
    dreamApi.list(DreamApiType.PROJECT_CHAPTERS)
      .then(result => {
        commit('setUnified', { projectChapters: _.cloneDeep(result)})
      })
  },
  createChapter({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.create(DreamApiType.PROJECT_CHAPTERS, payload)
        .then(result => {
          commit('addUnified', { 'currentProject.chapters': result})
          resolve(result)
        })
    })
  },
}

export const mutations = {
  /**
   * Устанавливает значение из переданного объекта.
   * Ключи в объекте должны совпадать с переменными в state
   */
  setUnified (state, payload) {
    _.forIn(payload, (value, key) => {
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
}
