import * as _ from 'lodash'
import * as dreamApi from '@/utils/api/dreamApi'
import {DreamApiType} from "@/utils/api/dreamApi";
import {commonMutations} from "@/utils/storeUtils";

function _initialState () {
  return {
    properties: []
  }
}

export const state = () => (_initialState())

export const getters = {
  byCode: (state, getters) => (code) => {
    return _.find(state.properties, { code: code })
  }
}

export const actions = {
  fetchProperties({commit}) {
    dreamApi.list(DreamApiType.PROPERTIES)
      .then(result => {
        console.log(result)
        commit('setUnified', {properties: _.cloneDeep(result)})
      })
  }
}


export const mutations = { ...commonMutations, ...{}}
