import BaseGenerator from "@/utils/utils/json2classGenerators/BaseGenerator";
import _ from "lodash";
import moment from 'moment'

class JsEnumGenerator extends BaseGenerator{
  constructor (props) {
    super(props)
    this.initialize(props)
  }

  initialize(props) {
    this.fileExtension = ''
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
      extendsName: extendsName
    })

    return text

  }

  getMainTemplate () {
    return _.template(
`export const <%- className %> = Object.freeze({
  <%- attributes %>
});
`)
  }

  getAttributeTemplate () {
    return _.template(
      `<%- name %>: '<%- name %>',
  `)
  }

  generateAttributeText (attrValue, attrName) {
    const attrTpl = this.getAttributeTemplate()
    const tplConf = {
      name: attrName,
    }

    const text = attrTpl(tplConf)
    return text
  }
}

export default JsEnumGenerator
