import * as _ from 'lodash'
import {commonMutations} from "@/@app-platform/utils/storeUtils";

function _initialState () {
  return {
    resources: [],
    customPermissions: [],
  }
}

export const getters = {
  allPermissions (state, getters) {
    return _.union(state.resources, state.customPermissions)
  },

  can: (state, getters, rootState) => (permission) => {
    if (_.isString(permission)) {
      return getters.allPermissions.includes(permission)
    }
    if (_.isArray(permission)) {
      return _.intersection(getters.allPermissions, permission).length > 0
    }

    return false
  }
}

export const actions = {
  fetchAllPermissions({commit, rootState}) {
    commit('setUnified', { customPermissions: _.cloneDeep(_.get(rootState, 'auth.user.roles'))})
  }
}

export const mutations = { ...commonMutations, ...{}}

export default {
  state: _initialState (), getters, actions, mutations, namespaced: true
}
