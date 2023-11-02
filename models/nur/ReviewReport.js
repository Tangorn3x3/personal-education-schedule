/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class ReviewReport {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.lineLink = _.get(props, 'lineLink') || null
    /** @type {Number} */ this.lineNumber = _.get(props, 'lineNumber') || null
    /** @type {String} */ this.description = _.get(props, 'description') || null

  }
}

export default ReviewReport

