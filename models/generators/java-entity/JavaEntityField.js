/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class JavaEntityField {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.name = _.get(props, 'name') || null
    /** @type {String} */ this.dbName = _.get(props, 'dbName') || null
    /** @type {String} */ this.description = _.get(props, 'description') || null
    /** @type {String} */ this.type = _.get(props, 'type') || 'String'
    /** @type {String} */ this.dbType = _.get(props, 'dbType') || null
    /** @type {String} */ this.dbLength = _.get(props, 'dbLength') || null
    /** @type {String} */ this.dbColumnDefinition = _.get(props, 'dbColumnDefinition') || null

    /** @type {Boolean} */ this.isEnum = _.get(props, 'isEnum') || false
    /** @type {Boolean} */ this.enumType = _.get(props, 'enumType') || false

    /** @type {Boolean} */ this.transient = _.get(props, 'transient') || false
    /** @type {Boolean} */ this.isNullable = _.get(props, 'isNullable') || false
    /** @type {Boolean} */ this.isUnique = _.get(props, 'isUnique') || false
    /** @type {Boolean} */ this.isIndex = _.get(props, 'isIndex') || false
    /** @type {Boolean} */ this.isJsonIgnore = _.get(props, 'isJsonIgnore') || false
    /** @type {Boolean} */ this.showInModel = _.get(props, 'showInModel') || true

    /** @type {Boolean} */ this.isRelation = _.get(props, 'isRelation') || false
    /** @type {String} */ this.relationType = _.get(props, 'relationType') || null
    /** @type {String} */ this.cascadeType = _.get(props, 'cascadeType') || null
    /** @type {String} */ this.relMappedBy = _.get(props, 'relMappedBy') || null
    /** @type {String} */ this.relFetchType = _.get(props, 'relFetchType') || null
    /** @type {String} */ this.relJoinColumn = _.get(props, 'relJoinColumn') || null
    /** @type {String} */ this.relJunctionTable = _.get(props, 'relJunctionTable') || null
    /** @type {String} */ this.relJunctionField = _.get(props, 'relJunctionField') || null
    /** @type {String} */ this.relJunctionFieldRelation = _.get(props, 'relJunctionFieldRelation') || null

  }
}

export default JavaEntityField

