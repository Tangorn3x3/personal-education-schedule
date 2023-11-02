/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class ProjectChapter {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.code = _.get(props, 'code') || null
    /** @type {Number} */ this.id = _.get(props, 'id') || null
    /** @type {String} */ this.name = _.get(props, 'name') || null
    /** @type {Number} */ this.project_id = _.get(props, 'project_id') || null
    /** @type {String} */ this.type = _.get(props, 'type') || null

  }
}

export default ProjectChapter

