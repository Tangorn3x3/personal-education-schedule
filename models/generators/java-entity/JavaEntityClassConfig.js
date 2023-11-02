/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class JavaEntityClassConfig {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.className = _.get(props, 'className') || null
    /** @type {String} */ this.tableName = _.get(props, 'tableName') || null
    /** @type {String} */ this.seqName = _.get(props, 'seqName') || null
    /** @type {String} */ this.desc = _.get(props, 'desc') || null
    /** @type {Boolean} */ this.generateModel = _.get(props, 'generateModel') || true
    /** @type {Boolean} */ this.generateToModelMethod = _.get(props, 'generateToModelMethod') || true
    /** @type {Boolean} */ this.isMappedSuperclass = _.get(props, 'isMappedSuperclass') || false

  }
}

export default JavaEntityClassConfig
