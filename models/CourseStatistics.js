/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class CourseStatistics {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.group = _.get(props, 'group') || null
        /** @type {String} */ this.course = _.get(props, 'course') || null
        /** @type {Number} */ this.spent = _.get(props, 'spent') || null
        /** @type {Number} */ this.plan = _.get(props, 'plan') || null
        /** @type {Number} */ this.progress = _.get(props, 'progress') || null

    }
}

export default CourseStatistics
