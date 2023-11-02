import BaseGenerator from "@/utils/utils/json2classGenerators/BaseGenerator";
import _ from "lodash";
import moment from 'moment'

class JavaModelGenerator extends BaseGenerator{
  constructor (props) {
    super(props)
    this.initialize(props)
  }

  initialize(props) {
    this.fileExtension = 'java'
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
      `import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class  <%- className %> <%- extendsName %>{
  <%- attributes %>
}
`)
  }

  getAttributeTemplate () {
    return _.template(
      `private <%- type %> <%- name %>;<%- comment %>
    `)
  }

  generateAttributeText (attrValue, attrName) {
    const attrTpl = this.getAttributeTemplate()
    let nameConfig = this.parseParametrizedName(attrName)
    const tplConf = {
      type: 'String',
      name: nameConfig.name,
      defaultValue: 'null',
      comment: nameConfig.getFieldComment()
    }

    this.fillAttrType(attrValue, tplConf)

    // дополняем текст на основе параметров
    let text = ''
    if (nameConfig.annotations.length > 0) {
      _.forEach(nameConfig.annotations, annotaion => { text += annotaion + "\n" })
    }

    text += attrTpl(tplConf)
    return text
  }

  fillAttrType(attrValue, tplConf) {

    if (_.isNumber(attrValue) && attrValue === 9.99) {
      tplConf.type = 'BigDecimal'
      return
    }

    if (_.isNumber(attrValue) && !_.isInteger(attrValue)) {
      tplConf.type = 'Decimal'
      return
    }

    if (_.isNumber(attrValue)) {
      tplConf.type = 'Long'
      return
    }

    if (_.isBoolean(attrValue)) {
      tplConf.type = 'Boolean'
      tplConf.defaultValue = 'false'
      return;
    }

    if (moment(attrValue).isValid() && isNaN(attrValue)) {
      tplConf.type = 'Date'
      return;
    }

    if (_.isObject(attrValue) && _.toPairs(attrValue).length <= 3 && _.toPairs(attrValue).length > 0) {
      tplConf.type = this.generateObjectTypeText(attrValue)
      return;
    }

    if (attrValue === "" || this.isSimpleTypes) return; // если значение пустое, значит все предыдущие проверки прошли и что-то уже определили и вернули

    // если написано что-то, что не относится к предыдущим типам, значит - это явное указание типа переменной
    let parametrizedValue = this.parseParametrizedValue(attrValue);
    if (!parametrizedValue) return;
    tplConf.type = parametrizedValue.type
  }

  generateObjectTypeText (json) {
    const tpl = _.template('<%- name %>: <%- type %>')
    const texts = []
    _.forIn(json, (value, key) => {
      const params = { type: 'String', name: key }

      if (_.isNumber(value)) { params.type = 'Number' }
      if (_.isBoolean(value)) { params.type = 'Boolean' }
      if (moment(value).isValid()) { params.type = 'Date' }

      texts.push(tpl(params))
    })
    return '{ ' + _.join(texts, ', ') + ' }'
  }
}

export default JavaModelGenerator
