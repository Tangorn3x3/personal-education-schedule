/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class Course {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.id = _.get(props, 'id') || null
        /** @type {String} */ this.group = _.get(props, 'group') || null
        /** @type {String} */ this.name = _.get(props, 'name') || null
        /** @type {Number} */ this.hours = _.get(props, 'hours') || null
        /** @type {Number} */ this.priority = _.get(props, 'priority') || null
        /** @type {String} */ this.icon = _.get(props, 'icon') || null
        /** @type {String} */ this.image = _.get(props, 'image') || null

    }
}

export default Course
