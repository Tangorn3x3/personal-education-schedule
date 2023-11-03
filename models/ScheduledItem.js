import _ from 'lodash'

export const ScheduledItemStatus = Object.freeze({
    NEW: 'NEW',
    DONE: 'DONE',
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


        /*View only fields*/
        /** @type {Number} */ this.priority = _.get(props, 'priority') || null
        /** @type {Number} */ this.hours = _.get(props, 'hours') || null
        /** @type {String} */ this.course_image = _.get(props, 'course_image') || null
        /** @type {String} */ this.group = _.get(props, 'group') || null
        /** @type {String} */ this.group_image = _.get(props, 'group_image') || null
    }
}

export default ScheduledItem