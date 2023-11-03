import * as _ from "lodash";

import {commonMutations} from "@/@app-platform/utils/storeUtils";
import * as crudService from "@/@app-platform/services/platformCrudService";

import {PlatformCrudTables} from "@/appConfig";

export const state = () => ({
    /** @type {Course[]}*/
    items: [],
    /** @type {CourseGroup[]}*/
    groups: []
})

export const getters = {}

export const actions = {
    async fetchItems({commit, rootState}) {
        let items = await crudService.list(PlatformCrudTables.courses)
        items = _.orderBy(items, ['priority'], ['asc'])
        commit('setUnified', { items: items })
    },
    async fetchGroups({commit, rootState}) {
        let items = await crudService.list(PlatformCrudTables.coursesGroups)
        items = _.orderBy(items, ['name'], ['asc'])
        commit('setUnified', { groups: items })
    }
}

export const mutations = {...commonMutations, ...{}}
