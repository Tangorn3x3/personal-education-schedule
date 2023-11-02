import * as _ from 'lodash'
import {commonMutations} from "../utils/storeUtils";
import * as platformInfoService from "@/@app-platform/services/platformInfoService";

function _initialState () {
  return {
    platformInfo: {}
  }
}

export const getters = {}
export const actions = {

  async reloadPlatformInfo({commit}) {
    let info = await platformInfoService.fetchPlatformInfo()
    console.log('Platform info fetched', info)
    commit('setUnified', { platformInfo: _.cloneDeep(info)})

    return info
  }
}

export const mutations = { ...commonMutations, ...{}}


export default {
  state: _initialState (), getters, actions, mutations, namespaced: true
}