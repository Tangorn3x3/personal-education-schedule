/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class RecentSnippetItem {
  constructor (id, name, chapterName) {
    this.initialize({id, name, chapterName})
  }

  initialize (props) {
    /** @type {Number} */ this.id = _.get(props, 'id') || null
    /** @type {String} */ this.name = _.get(props, 'name') || null
    /** @type {String} */ this.chapterName = _.get(props, 'chapterName') || null

  }
}

export default RecentSnippetItem

