import BaseGenerator from "@/utils/utils/json2classGenerators/BaseGenerator";
import _ from "lodash";
import moment from 'moment'

class JavaToModelGenerator extends BaseGenerator{
  constructor (props) {
    super(props)
    this.initialize(props)
  }

  initialize(props) {
    this.fileExtension = 'js'
    this.useGetter = props.userGetter || false
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
      `public <%- className %> toModel() {
    return <%- className %>.builder()
            <%- attributes %>
            .build();
}
`)
  }

  getAttributeTemplate () {
    return !this.useGetter ? _.template(
      `.<%- name %>(<%- setterName %>)
            `)
        : _.template(
            `.<%- name %>(entity.get<%- setterName %>())
            `)
  }

  generateAttributeText (attrValue, attrName) {
    const attrTpl = this.getAttributeTemplate()
    const tplConf = {
      name: attrName,
      setterName: this.useGetter ? _.upperFirst(attrName) : attrName,
    }

    const text = attrTpl(tplConf)
    return text
  }
}

export default JavaToModelGenerator
