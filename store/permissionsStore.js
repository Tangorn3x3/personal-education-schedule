import * as _ from 'lodash'
import {commonMutations} from "@/utils/storeUtils";

function _initialState () {
  return {
    resources: [],
    customPermissions: [],
  }
}

export const state = () => (_initialState())

export const getters = {
  allPermissions (state, getters) {
    return _.union(state.resources, state.customPermissions)
  },

  can: (state, getters, rootState) => (permission) => {
    if (_.isString(permission)) {
      //console.debug(`Checking permission ${permission}...`, getters.permissions.includes(permission))
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
    commit('setUnified', { customPermissions: _.cloneDeep(_.get(rootState, 'auth.user.authorities'))})
  }
}


export const mutations = { ...commonMutations, ...{}}
