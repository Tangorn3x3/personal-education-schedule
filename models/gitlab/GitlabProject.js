/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class GitlabProject {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = _.get(props, 'id') || null
        /** @type {String} */ this.description = _.get(props, 'description') || null
        /** @type {String} */ this.name = _.get(props, 'name') || null
        /** @type {String} */ this.name_with_namespace = _.get(props, 'name_with_namespace') || null
        /** @type {String} */ this.path = _.get(props, 'path') || null
        /** @type {String} */ this.path_with_namespace = _.get(props, 'path_with_namespace') || null
        /** @type {String} */ this.created_at = _.get(props, 'created_at') || null
        /** @type {String} */ this.web_url = _.get(props, 'web_url') || null
        /** @type {String} */ this.last_activity_at = _.get(props, 'last_activity_at') || null

    }
}

export default GitlabProject
// JsDoc:
//{{ id: Number, description: String, name: String, name_with_namespace: String, path: String, path_with_namespace: String, created_at: String, web_url: String, last_activity_at: String }}
