import {getStartOfWeekFormatted, getStartOfNextWeekFormatted} from "@/utils/utils/dateUtils";
import * as crudService from "@/@app-platform/services/platformCrudService";
import {PlatformCrudTables} from "@/appConfig";
import notificationService from "@/utils/service/notificationService";
import ScheduledItem from "@/models/ScheduledItem";
import _ from "lodash";
import moment from "moment";
import {fetchAction} from "@/@app-platform/services/platformApiClient";

export async function fetchViewItemsForCoupleWeeks() {
    let weeks = [getStartOfWeekFormatted(), getStartOfNextWeekFormatted(), _.toNumber(getStartOfWeekFormatted()), _.toNumber(getStartOfNextWeekFormatted())]
    let items = await crudService.list(PlatformCrudTables.schedulesView, { week: weeks })

    // зачищаем служебные данные от Sheets
    items.forEach(item => {
        _.forIn(item, (value, key) => {
            if (!!value && value === '#N/A') item[key] = null
        })
    })

    return items
}

export async function fetchCurrentWeekItems() {
    let week = getStartOfWeekFormatted()
    return await crudService.list(PlatformCrudTables.schedules, {week})
}

export async function fetchNextWeekItems() {
    let week = getStartOfNextWeekFormatted()
    return await crudService.list(PlatformCrudTables.schedules, {week})
}

export async function fetchScheduleStatistics() {
    return await crudService.list(PlatformCrudTables.schedulesStatistics, { course: 'not_null' })
}

/**
 * @param {ScheduledItemBase} currentItem
 * @param {String} newStatus
 * @returns {Promise<Object>}
 */
export async function updateStatus(currentItem, newStatus) {
    let id = currentItem.id
    if (!id) {
        notificationService.showErrorAlert('Не удалось определить идентификатор записи', `Обновление статуса`)
        return null
    }

    currentItem.status = newStatus
    currentItem.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')

    let savedItem = await crudService.update(PlatformCrudTables.schedules, id, currentItem)
    if (!savedItem || savedItem.status !== newStatus) {
        notificationService.showErrorAlert('Сохраненный статус не соответствует требуемому', `Обновление статуса`)
        return null
    }

    return savedItem
}

/**
 *
 * @param {SchedulePlanningRequest} planningRequest
 * @returns {Promise<ScheduledItem[]>}
 */
export async function planSchedule(planningRequest) {
    return await fetchAction('scheduled_items_plan', {
        body: planningRequest
    })
}