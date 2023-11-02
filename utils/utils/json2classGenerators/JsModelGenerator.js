import BaseGenerator from "@/utils/utils/json2classGenerators/BaseGenerator";
import _ from "lodash";

class JsModelGenerator extends BaseGenerator{
  constructor (props) {
    super(props)
    this.initialize(props)
  }

  initialize(props) {
    this.fileExtension = 'js'
    super.initialize(props)
  }

  generate() {
    let text = ''
    let tpl = this.getMainTemplate()

    let extendsName = ''
    if (this.isExtends) extendsName = `extends ${this.extendsName} `

    text = tpl({
      className: this.className,
      attributes: this.generateAttributeList(this.jsonObject),
      jsDoc: this.generateJsDoc (this.jsonObject),
      extendsName: extendsName
    })

    return text

  }

  getMainTemplate () {
    return _.template(
      `/* eslint-disable no-mixed-operators */
import _ from 'lodash'

class <%- className %> <%- extendsName %>{
  constructor (props) {<% if (extendsName) { %>
    super(props)<% } %>
    this.initialize(props)
  }

  initialize (props) {<% if (extendsName) { %>
    super.initialize(props)<% } %>
    <%- attributes %>
  }
}

export default <%- className %>
// JsDoc: 
//{{ <%- jsDoc %> }}
`)
  }

  getAttributeTemplate () {
    return _.template(
      `/** @type {<%- type %>} */ this.<%- name %> = _.get(props, '<%- name %>') || <%- defaultValue %>
    `)
  }

  generateJsDoc (jsonObject) {
    const texts = this.getSimpleObjectTypesText(jsonObject)
    return _.join(texts, ', ')
  }

  generateAttributeText (attrValue, attrName) {
    const attrTpl = this.getAttributeTemplate()
    const tplConf = {
      type: 'String',
      name: attrName,
      defaultValue: 'null'
    }

    if (_.isNumber(attrValue)) { tplConf.type = 'Number' }
    if (_.isBoolean(attrValue)) {
      tplConf.type = 'Boolean'
      tplConf.defaultValue = 'false'
    }
    if (_.isObject(attrValue) && _.toPairs(attrValue).length <= 3 && _.toPairs(attrValue).length > 0) {
      tplConf.type = this.generateObjectTypeText(attrValue)
    }

    const text = attrTpl(tplConf)
    return text
  }

  generateObjectTypeText (json) {
    const texts = this.getSimpleObjectTypesText(json)
    return '{ ' + _.join(texts, ', ') + ' }'
  }

  getSimpleObjectTypesText(json) {
    const tpl = _.template('<%- name %>: <%- type %>')
    const texts = []
    _.forIn(json, (value, key) => {
      const params = { type: 'String', name: key }

      if (_.isNumber(value)) { params.type = 'Number' }
      if (_.isBoolean(value)) { params.type = 'Boolean' }

      texts.push(tpl(params))
    })

    return texts
  }
}

export default JsModelGenerator
