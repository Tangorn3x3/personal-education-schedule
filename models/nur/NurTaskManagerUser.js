/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class NurTaskManagerUser {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = _.get(props, 'id') || null
        /** @type {String} */ this.name = _.get(props, 'name') || null
        /** @type {String} */ this.login = _.get(props, 'login') || null
        /** @type {String} */ this.userStatus = _.get(props, 'userStatus') || null
        /** @type {String} */ this.jiraUsername = _.get(props, 'login') || null // local only
        /** @type {String} */ this.gitlabUsername = _.get(props, 'login') || null // local only

    }
}

export default NurTaskManagerUser
