/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class GitlabCommit {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.id = _.get(props, 'id') || null
        /** @type {String} */ this.short_id = _.get(props, 'short_id') || null
        /** @type {String} */ this.title = _.get(props, 'title') || null
        /** @type {String} */ this.author_name = _.get(props, 'author_name') || null
        /** @type {String} */ this.author_email = _.get(props, 'author_email') || null
        /** @type {String} */ this.committer_name = _.get(props, 'committer_name') || null
        /** @type {String} */ this.committer_email = _.get(props, 'committer_email') || null
        /** @type {String} */ this.created_at = _.get(props, 'created_at') || null
        /** @type {String} */ this.message = _.get(props, 'message') || null
        /** @type {String} */ this.committed_date = _.get(props, 'committed_date') || null
        /** @type {String} */ this.authored_date = _.get(props, 'authored_date') || null
        /** @type {String} */ this.web_url = _.get(props, 'web_url') || null
        /** @type {String} */ this.author = _.get(props, 'author') || null

    }
}

export default GitlabCommit
// JsDoc:
//{{ id: String, short_id: String, title: String, author_name: String, author_email: String, committer_name: String, committer_email: String, created_at: String, message: String, committed_date: String, authored_date: String, web_url: String, author: String }}
