import BaseGenerator from "@/utils/utils/json2classGenerators/BaseGenerator";
import _ from "lodash";
import moment from 'moment'

class JavaSimpleEntityGenerator extends BaseGenerator {
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
      tableName: _.replace(_.upperCase(_.snakeCase(this.className)), ' ', '_'),
      attributes: this.generateAttributeList(this.jsonObject),
      extendsName: extendsName
    })

    return text

  }

  getMainTemplate () {
    return _.template(
      `import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "<%- tableName %>")
public class  <%- className %> <%- extendsName %>{
  <%- attributes %>
}
`)
  }

  getAttributeTemplate () {
    return _.template(
      `
    @Column(name="<%- columnName %>" <%- columnDefinition %>)
    private <%- type %> <%- name %>;
`)
  }

  getIdTemplate () {
    return _.template(
      `
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "<%- tableName %>_SEQ")
    @SequenceGenerator(name = "<%- tableName %>_SEQ", sequenceName = "<%- tableName %>_SEQ", allocationSize = 1)
    private Long id;
`)
  }

  getForeignKeyTemplate () {
    return _.template(
      `
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="<%- columnName %>")
    private <%- type %> <%- name %>;
`)
  }

  getNationalTemplate () {
    return _.template(
      `
    @Nationalized
    @Column(name="<%- columnName %>", columnDefinition="nvarchar2(255)")
    private <%- type %> <%- name %>;
`)
  }

  getEnumAttributeTemplate () {
    return _.template(
        `
    @Column(name="<%- columnName %>" <%- columnDefinition %>)
    @Enumerated(EnumType.STRING)
    private <%- type %> <%- name %>;
`)
  }

  generateAttributeText (attrValue, attrName) {
    const attrTpl = this.getAttributeTemplate()
    const idTpl = this.getIdTemplate()
    const fkTpl = this.getForeignKeyTemplate()
    const natTpl = this.getNationalTemplate()
    const enumTpl = this.getEnumAttributeTemplate()

    //attrName = _.replace(attrName, '_', '_!')
    const tplConf = {
      type: 'String',
      name: _.camelCase(attrName),
      tableName: _.replace(_.upperCase(_.snakeCase(this.className)), ' ', '_'),
      attrName: attrName,
      columnName: _.replace(_.upperCase(attrName), ' ', '_'),
      defaultValue: 'null',
      columnDefinition: '',
      isEnum: false
    }

    const isId = _.lowerCase(attrName) === 'id'
    const isFk = _.endsWith(attrName.toLowerCase(), '_id')

    this.fillAttrType(attrValue, tplConf)

    let text = ''
    if (isId)
      text = idTpl(tplConf)
    else if (isFk)
      text = fkTpl(tplConf)
    else if (this.isSimpleNationalized(attrName))
      text = natTpl(tplConf)
    else if (tplConf.isEnum)
      text =_.unescape(enumTpl(tplConf))
    else
      text = _.unescape(attrTpl(tplConf))

    return text
  }

  isSimpleNationalized (attrName) {
    const attr = _.camelCase(attrName).toLowerCase()
    return attr === 'name' ||  attr === 'firstname' ||  attr === 'surname' ||  attr === 'lastname'
          ||  attr === 'middlename' ||  attr === 'midlename' ||  attr === 'fio'
  }

  fillAttrType(attrValue, tplConf) {
    console.log(attrValue, tplConf)

    const isFk = _.endsWith(tplConf.attrName.toLowerCase(), '_id')

    if (isFk) {
      tplConf.type = _.upperFirst(_.camelCase(_.replace(tplConf.attrName.toLowerCase(), '_id')));
      return;
    }

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
      tplConf.columnDefinition = `, columnDefinition="number(1) default ${attrValue ? '1' : '0'}"`
      return;
    }

    if (moment(attrValue).isValid()) {
      if (!!moment(attrValue).millisecond()) {
        tplConf.type = 'LocalDateTime'
      } else {
        tplConf.type = 'LocalDate'
      }
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
    tplConf.isEnum = parametrizedValue.isEnum
  }

  generateObjectTypeText (json) {
    const tpl = _.template(
      `<%- name %>: <%- type %>`)
    const texts = []
    _.forIn(json, (value, key) => {
      const params = { type: 'String', name: key }

      if (_.isNumber(value)) { params.type = 'Number' }
      if (_.isBoolean(value)) { params.type = 'Boolean'; }
      if (moment(value).isValid()) { params.type = 'Date' }

      texts.push(tpl(params))
    })
    return '{ ' + _.join(texts, ', ') + ' }'
  }
}

export default JavaSimpleEntityGenerator
