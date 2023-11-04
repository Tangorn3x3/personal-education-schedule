import {getStartOfWeekFormatted, getStartOfNextWeekFormatted} from "@/utils/utils/dateUtils";
import * as crudService from "@/@app-platform/services/platformCrudService";
import {PlatformCrudTables} from "@/appConfig";
import notificationService from "@/utils/service/notificationService";
import ScheduledItem from "@/models/ScheduledItem";
import _ from "lodash";

export async function fetchViewItemsForCoupleWeeks() {
    let weeks = [getStartOfWeekFormatted(), getStartOfNextWeekFormatted(), _.toNumber(getStartOfWeekFormatted()), _.toNumber(getStartOfNextWeekFormatted())]
    return await crudService.list(PlatformCrudTables.schedulesView, { week: weeks })
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
 * @param {ScheduledItem} currentItem
 * @param {string} newStatus
 * @returns {Promise<Object>}
 */
export async function updateStatus(currentItem, newStatus) {
    let id = currentItem.id
    if (!id) {
        notificationService.showErrorAlert('Не удалось определить идентификатор записи', `Обновление статуса`)
        return null
    }

    currentItem.status = newStatus

    let savedItem = await crudService.update(PlatformCrudTables.schedules, id, currentItem)
    if (!savedItem || savedItem.status !== newStatus) {
        notificationService.showErrorAlert('Сохраненный статус не соответствует требуемому', `Обновление статуса`)
        return null
    }

    return savedItem
}