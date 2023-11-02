/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class SnippetItemSection {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.cts = _.get(props, 'cts') || null
    /** @type {String} */ this.description = _.get(props, 'description') || null
    /** @type {Number} */ this.id = _.get(props, 'id') || null
    /** @type {Number} */ this.item_id = _.get(props, 'item_id') || null
    /** @type {String} */ this.lang_type = _.get(props, 'lang_type') || null
    /** @type {Number} */ this.order_position = _.get(props, 'order_position') || null
    /** @type {Boolean} */ this.status = _.get(props, 'status') || false
    /** @type {String} */ this.text = _.get(props, 'text') || null
    /** @type {String} */ this.title = _.get(props, 'title') || null

  }
}

export default SnippetItemSection

