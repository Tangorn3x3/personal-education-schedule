/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class SnippetItem {
  constructor (props) {
    this.initialize(props)
  }

  initialize (props) {
    /** @type {String} */ this.cts = _.get(props, 'cts') || null
    /** @type {String} */ this.description = _.get(props, 'description') || null
    /** @type {Number} */ this.id = _.get(props, 'id') || null
    /** @type {String} */ this.lang_type = _.get(props, 'lang_type') || null
    /** @type {Number} */ this.projectChapterId = _.get(props, 'projectChapterId') || null
    /** @type {ProjectChapter} */ this.projectChapter = _.get(props, 'projectChapter') || null
    /** @type {Array<SnippetItemSection>} */ this.sections = _.get(props, 'sections') || null
    /** @type {String} */ this.text = _.get(props, 'text') || null
    /** @type {String} */ this.title = _.get(props, 'title') || null

  }
}

export default SnippetItem

