/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class CourseGroup {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.id = _.get(props, 'id') || null
        /** @type {String} */ this.name = _.get(props, 'name') || null
        /** @type {String} */ this.image = _.get(props, 'image') || null

    }
}

export default CourseGroup
