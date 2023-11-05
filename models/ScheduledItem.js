import _ from 'lodash'

export const ScheduledItemStatus = Object.freeze({
    NEW: 'NEW',
    DONE: 'DONE',
    SKIP: 'SKIP',
});


class ScheduledItem {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.id = _.get(props, 'id') || null
        /** @type {String} */ this.course = _.get(props, 'course') || null
        /** @type {String} */ this.week = _.get(props, 'week') || null
        /** @type {String} */ this.date = _.get(props, 'date') || null
        /** @type {String} */ this.status = _.get(props, 'status') || null
        /** @type {String} */ this.updatedAt = _.get(props, 'updatedAt') || null
        /** @type {Number} */ this.lesson_duration = _.get(props, 'lesson_duration') || 1


        /*View only fields*/
        /** @type {Number} */ this.priority = _.get(props, 'priority') || null
        /** @type {Number} */ this.hours = _.get(props, 'hours') || null
        /** @type {String} */ this.course_image = _.get(props, 'course_image') || null
        /** @type {String} */ this.group = _.get(props, 'group') || null
        /** @type {String} */ this.group_image = _.get(props, 'group_image') || null
        /** @type {String} */ this.health_description = _.get(props, 'health_description') || null
    }
}

/**
 * @param {ScheduledItem} source
 * @param {ScheduledItem} target
 */
export function populateBaseFields (source, target) {
    target.course = source.course
    target.week = source.week
    target.date = source.date
    target.status = source.status
    target.updatedAt = source.updatedAt
}


export class ScheduledItemBase {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.id = _.get(props, 'id') || null
        /** @type {String} */ this.course = _.get(props, 'course') || null
        /** @type {String} */ this.week = _.get(props, 'week') || null
        /** @type {String} */ this.date = _.get(props, 'date') || null
        /** @type {String} */ this.status = _.get(props, 'status') || null
        /** @type {String} */ this.updatedAt = _.get(props, 'updatedAt') || null


        let duration = _.get(props, 'lesson_duration') || 1
        if (_.isNumber(duration)) this.lesson_duration = duration.toString().replace('.', ',')
        else this.lesson_duration = duration
    }
}

export class SchedulePlanningRequest {
    constructor (startDate, daysNumber) {
        /** @type {String} */ this.start_date = startDate
        /** @type {Number} */ this.days_number = daysNumber
    }
}

export default ScheduledItem