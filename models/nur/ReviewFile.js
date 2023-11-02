/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class ReviewFile {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.filename = _.get(props, 'filename') || null
    /** @type {String} */ this.fileLink = _.get(props, 'fileLink') || null
    /** @type {Array<ReviewReport>} */ this.reports = _.get(props, 'reports') || []

  }
}

export default ReviewFile

