/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class ParametrizedValue {
    constructor (type) {
        this.initialize({type})
    }

    initialize (props) {
        /** @type {String} */ this.type = _.get(props, 'type') || null
        /** @type {Boolean} */ this.isEnum = _.get(props, 'isEnum') || false

    }
}

export default ParametrizedValue
// JsDoc:
//{{ type: String, isEnum: Boolean }}
