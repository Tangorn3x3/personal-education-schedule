/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class ParametrizedName {
    constructor (name) {
        this.initialize({name})
    }

    initialize (props) {
        /** @type {String} */ this.name = _.get(props, 'name') || null
        /** @type {String} */ this.jsonName = _.get(props, 'jsonName') || null
        /** @type {String} */ this.jsonAlias = _.get(props, 'jsonAlias') || null
        /** @type {Array<String>} */ this.annotations = _.get(props, 'annotationTpl') || []
        /** @type {String} */ this.fieldComment = _.get(props, 'fieldComment') || null
        /** @type {String} */ this.fieldCommentTpl = _.get(props, 'fieldCommentTpl') || " //  <%- fieldComment %>"
    }

    getFieldComment() {
        if (!this.fieldComment) return ''

        let tpl = _.template(this.fieldCommentTpl)
        return tpl({fieldComment: this.fieldComment})
    }
}

export default ParametrizedName
// JsDoc:
//{{ type: String, isEnum: Boolean }}
