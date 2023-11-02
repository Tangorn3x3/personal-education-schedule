/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class NurSubscriber {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.ban = _.get(props, 'ban') || null
    /** @type {String} */ this.id = _.get(props, 'id') || null
    /** @type {String} */ this.msisdn = _.get(props, 'msisdn') || null
    /** @type {String} */ this.spid = _.get(props, 'spid') || null
    /** @type {String} */ this.state = _.get(props, 'state') || null
    /** @type {String} */ this.billinglanguage = _.get(props, 'billinglanguage') || null
    /** @type {String} */ this.imsi = _.get(props, 'imsi') || null
    /** @type {String} */ this.subscriptionclass = _.get(props, 'subscriptionclass') || null
    /** @type {String} */ this.subscriptiontype = _.get(props, 'subscriptiontype') || null
    /** @type {String} */ this.subscribertype = _.get(props, 'subscribertype') || null
    /** @type {String} */ this.datecreated = _.get(props, 'datecreated') || null
    /** @type {String} */ this.lastmodified = _.get(props, 'lastmodified') || null
    /** @type {String} */ this.packageid = _.get(props, 'packageid') || null
    /** @type {String} */ this.startdate = _.get(props, 'startdate') || null
    /** @type {String} */ this.enddate = _.get(props, 'enddate') || null
    /** @type {String} */ this.depositdate = _.get(props, 'depositdate') || null
    /** @type {String} */ this.priceplan = _.get(props, 'priceplan') || null
    /** @type {String} */ this.lastmodifiedhidden = _.get(props, 'lastmodifiedhidden') || null

  }
}

export default NurSubscriber

