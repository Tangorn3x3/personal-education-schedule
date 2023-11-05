import {commonMutations} from "@/@app-platform/utils/storeUtils";
import * as _ from "lodash";
import * as scheduledItemsService from "@/utils/service/scheduledItemsService";
import moment from "moment";
import {ScheduledItemBase, ScheduledItemStatus} from "@/models/ScheduledItem";
import * as ScheduledItem from "@/models/ScheduledItem";
import {filterArrayByDateField} from "@/utils/utils/dateUtils";
import notificationService from "@/utils/service/notificationService";
import {fetchScheduleStatistics} from "@/utils/service/scheduledItemsService";

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
    async moveViewItemToStatus({commit, rootState}, {item, status}) {
        let initialDate = item.date

        let savingDate = moment(initialDate).format('YYYY-MM-DD')

        let itemToUpdate = _.cloneDeep(item)
        itemToUpdate.date = savingDate

        /** @type {ScheduledItem} */
        let savedItem = await scheduledItemsService.updateStatus(new ScheduledItemBase(itemToUpdate), status)
        if (!savedItem) return

        ScheduledItem.populateBaseFields(savedItem, itemToUpdate)

        commit('updateInArrayById', { viewItems: itemToUpdate })
    },


    async planSchedule({commit, rootState, dispatch}, planningRequest) {
        try {
            let items = await scheduledItemsService.planSchedule(planningRequest)

            if (!items || !_.isArray(items) || items.length === 1)
                throw new Error('Элементы в созданном расписании отсутствуют')

            await dispatch('fetchViewItems')
            dispatch('fetchStatistics')
            return items
        } catch (error) {
            console.log()
            notificationService.showErrorAlert(error.toString(), `Создание расписания`)
            return []
        }
    }
}

export const mutations = {...commonMutations, ...{}}