import {commonMutations} from "@/@app-platform/utils/storeUtils";
import * as _ from "lodash";
import * as scheduledItemsService from "@/utils/service/scheduledItemsService";
import moment from "moment";
import {ScheduledItemStatus} from "@/models/ScheduledItem";
import {filterArrayByDateField} from "@/utils/utils/dateUtils";

export const state = () => ({
    /** @type {ScheduledItem[]}*/
    currentWeek: [],
    /** @type {ScheduledItem[]}*/
    nextWeek: [],

    viewItems: [],

    /** @type {CourseStatistics[]} */
    statistics: [],
})

export const getters = {
    allItems (state, getters) {
        return _.union(state.currentWeek, state.nextWeek, state.viewItems)
    },

    today (state, getters) {
        let items = filterArrayByDateField(getters.allItems, 'date', new Date())
        return _.orderBy(items, ['date'], ['asc'])
    },
    tomorrow (state, getters) {
        let filterDate = moment().add(1, 'day').toDate()
        let items = filterArrayByDateField(getters.allItems, 'date', filterDate)
        return _.orderBy(items, ['date'], ['asc'])
    },
    yesterday (state, getters) {
        let filterDate = moment().subtract(1, 'day').toDate()
        let items = filterArrayByDateField(getters.allItems, 'date', filterDate)
        return _.orderBy(items, ['date'], ['asc'])
    },

    currentItem (state, getters) {
      return _.find(getters.today, { status: ScheduledItemStatus.NEW })
    },
}

export const actions = {
    async fetchStatistics({commit, rootState}) {
        let items = await scheduledItemsService.fetchScheduleStatistics()
        commit('setUnified', { statistics: items })
    },
    async fetchViewItems({commit, rootState}) {
        let items = await scheduledItemsService.fetchViewItemsForCoupleWeeks()
        commit('setUnified', { viewItems: items })
    },
    async fetchCurrentWeekItems({commit, rootState}) {
        let items = await scheduledItemsService.fetchCurrentWeekItems()
        commit('setUnified', { currentWeek: items })
    },
    async fetchNextWeekItems({commit, rootState}) {
        let items = await scheduledItemsService.fetchNextWeekItems()
        commit('setUnified', { nextWeek: items })
    },

    /**
     * @param {ScheduledItem} item
     * @returns {Promise<void>}
     */
    async markAsDone({commit, rootState}, item) {
        let savedItem = await scheduledItemsService.updateStatus(item, ScheduledItemStatus.DONE)
        if (!savedItem) return

        commit('updateInArrayById', { currentWeek: savedItem })
    }
}

export const mutations = {...commonMutations, ...{}}