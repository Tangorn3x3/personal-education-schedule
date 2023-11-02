/* eslint-disable no-console,spaced-comment */
import * as _ from 'lodash'
import Vue from 'vue'
import * as dreamApi from '@/utils/api/dreamApi'
import {DreamApiType} from "@/utils/api/dreamApi";
import RecentSnippetItem from "@/models/snippet/RecentSnippetItem";
import notificationService from "@/utils/service/notificationService";
import {commonMutations} from "@/utils/storeUtils";

function _initialState () {
  return {
    allItems: [],
    currentItem: null,
    types: []
  }
}

export const state = () => (_initialState())

export const getters = {

}

export const actions = {
  fetchAllItems({ commit }) {
    return new Promise((resolve, reject) => {
      dreamApi.list(DreamApiType.REMINDERS)
        .then(result => {
          commit('setUnified', { allItems: _.cloneDeep(result)})
          resolve(result)
        })
    })

  },
  fetchSingleItem({ commit, state }, itemId) {
    const indx = _.findIndex(state.allItems, {id: itemId})
    if (indx >= 0)
      commit('setUnified', { currentItem: _.cloneDeep(state.allItems[indx]) })
  },
  fetchAllTypes({ commit }) {
    dreamApi.list(DreamApiType.REMINDER_TYPES)
      .then(result => {
        commit('setUnified', { types: _.cloneDeep(result)})
      })
  },

  createType({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.create(DreamApiType.REMINDER_TYPES, payload)
        .then(result => {
          commit('addUnified', { 'types': result})
          resolve(result)
        })
    })
  },

  createReminder({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.create(DreamApiType.REMINDERS, payload)
        .then(result => {
          commit('addUnified', { 'allItems': result})
          resolve(result)
        })
    })
  },

  updateReminder({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dreamApi.update(DreamApiType.REMINDERS, payload.id, payload)
        .then(result => {
          commit('updateInArrayById', { 'allItems': result})
          resolve(result)
        })
    })
  },
}

export const mutations = { ...commonMutations, ...{}}
