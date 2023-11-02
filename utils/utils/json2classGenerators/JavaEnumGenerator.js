import BaseGenerator from "@/utils/utils/json2classGenerators/BaseGenerator";
import _ from "lodash";
import moment from 'moment'

class JavaEnumGenerator extends BaseGenerator{
  constructor (props) {
    super(props)
    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)
    this.fileExtension = 'java'
    this.values = []
    this.meta = { getByFirst: 0, getByAll: 0, safeValueOf: 0, safeGetByFirst: 0 }
    this.jsonTemplate =
`{
  "values": ["TEST", "TEST_2"],
  "meta": { "getByFirst": 1, "getByAll": 0, "safeValueOf": 0, "safeGetByFirst": 0 },
  "code": 0,
  "description" : "Desc"
}`
  }

  generate() {
    let text = ''
    let tpl = this.getMainTemplate()

    let extendsName = ''
    if (this.isExtends) extendsName = `extends ${this.extendsName} `

    const jsonObjectClean = _.cloneDeep(this.jsonObject)
    this.values = _.get(jsonObjectClean, 'values')
    _.unset(jsonObjectClean, 'values')

    this.meta = _.get(jsonObjectClean, 'meta') || this.meta
    _.unset(jsonObjectClean, 'meta')

    text = tpl({
      className: this.className,
      values: this.generateValues(jsonObjectClean),
      map: this.generateMeta(jsonObjectClean),
      attributes: this.generateAttributeList(jsonObjectClean),
      constructor: this.generateConstructor(jsonObjectClean),
      getByMethods: this.generateByMethods(jsonObjectClean),
      safeValueOf: this.generateSafeValueOf(jsonObjectClean),
      extendsName: extendsName
    })

    return text

  }

  generateAttributeList (json) {
    let text = ''
    _.forIn(json, (value, key) => {
      text += this.generateAttributeText(value, key)
    })
    return text
  }

  generateAttributeText (attrValue, attrName) {
    const attrTpl = this.getAttributeTemplate()
    const tplConf = {
      name: attrName,
      type: _.isNumber(attrValue) ? 'int' : 'String',
    }

    const text = attrTpl(tplConf)
    return text
  }

  generateValues (json) {
    let json2 = _.cloneDeep(json)
    json2 = _.mapValues(json2, (value) => { return _.isNumber(value) ? value : '"' + value + '"' })

    const attrTpl = this.getValueTemplate()
    let text = ''

    _.forEach(this.values, value => {
      let args = _.join(_.valuesIn(json2), ', ')
      text += attrTpl({ name: value.toUpperCase(), args: args.length > 0 ? `(${args})` : '' })
    })

    return _.unescape(text) + ';'
  }

  generateMeta(json) {
    if (!this.meta.getByFirst && !this.meta.getByAll) return ''
    if (_.keys(json).length <= 0) return ''

    const mainTpl = this.getMetaMainTemplate()
    const mapTpl = this.getMetaMapTemplate()
    const initTpl = this.getMetaInitTemplate()

    let metaMain = {
      maps: '',
      inits: ''
    }
    if (this.meta.getByFirst) {
      let keyName = _.keys(json)[0]
      let keyValue = json[keyName]
      let keyType = _.isNumber(keyValue) ? 'Integer' : 'String'
      let mapName = _.camelCase(this.className) + _.upperFirst(keyName) + 'Map'

      metaMain.maps = mapTpl({ keyType, mapName, className: this.className })

      let getterName = 'get' + _.upperFirst(keyName)
      metaMain.inits = initTpl({ mapName, getterName, className: this.className })
    }

    if (this.meta.getByAll) {
      _.forIn(json, (keyValue, keyName) => {
        let keyType = _.isNumber(keyValue) ? 'Integer' : 'String'
        let mapName = _.camelCase(this.className) + _.upperFirst(keyName) + 'Map'

        metaMain.maps += mapTpl({ keyType, mapName, className: this.className })

        let getterName = 'get' + _.upperFirst(keyName)
        metaMain.inits += initTpl({ mapName, getterName, className: this.className })
      })

    }

    return _.unescape(mainTpl(metaMain))

  }

  generateConstructor(json) {
    if (_.keys(json).length <= 0) return ''
    const constructorTpl = this.getConstructorTemplate()
    let args = {
      className: this.className,
      params: [],
      attrs: []
    }
    _.forIn(json, (keyValue, keyName) => {
      let keyType = _.isNumber(keyValue) ? 'int' : 'String'
      args.params.push(_.template('<%- keyType %> <%- keyName %>')({keyName, keyType}))
      args.attrs.push(_.template('this.<%- keyName %> = <%- keyName %>;')({keyName}))
    })

    args.params = _.join(args.params, ', ')
    args.attrs = _.join(args.attrs, '\n       ')

    return constructorTpl(args)
  }

  generateByMethods(json) {
    if (!this.meta.getByFirst && !this.meta.getByAll) return ''
    if (_.keys(json).length <= 0) return ''

    const methodTpl = this.getGetByMethodTemplate()
    const methodTplSafe = this.getGetByMethodSafeTemplate()
    let text = ''

    if (this.meta.getByFirst) {
      let keyName = _.keys(json)[0]
      let keyValue = json[keyName]
      let keyType = _.isNumber(keyValue) ? 'int' : 'String'
      let mapName = _.camelCase(this.className) + _.upperFirst(keyName) + 'Map'

      text += this.meta.safeGetByFirst
          ? methodTplSafe({ keyType, keyName, mapName, className: this.className })
          : methodTpl({ keyType, keyName, mapName, className: this.className })
    }

    if (this.meta.getByAll && _.keys(json).length > 1) {
      _.forIn(json, (keyValue, keyName) => {
        let keyType = _.isNumber(keyValue) ? 'int' : 'String'
        let mapName = _.camelCase(this.className) + _.upperFirst(keyName) + 'Map'

        text += methodTpl({ keyType, keyName, mapName, className: this.className })
      })
    }

    return text;
  }

  generateSafeValueOf(json) {
    if (!this.meta.safeValueOf) return ''
    if (_.keys(json).length <= 0) return ''

    const methodTpl = this.getSafeValueOfMethodTemplate()
    let text = ''

    text += methodTpl({ className: this.className })

    return text;
  }

  getMainTemplate () {
    return _.template(
`import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum <%- className %> {
    <%- values %>
    
    <%- attributes %>

    <%- map %>

    <%- getByMethods %>
    <%- safeValueOf %>
}
`)
  }

  getAttributeTemplate () {
    return _.template(
      `@Getter
    private final <%- type %> <%- name %>;
    `)
  }

  getValueTemplate () {
    return _.template(
      `<%- name %> <%- args %>,
    `)
  }

  getMetaMainTemplate() {
    return _.template(
      `<%- maps %>
    static {
      <%- inits %>
     }`)
  }
  getMetaMapTemplate() {
    return _.template(
      `private static final Map<<%- keyType %>, <%- className %>> <%- mapName %> = new HashMap<>();
    `)
  }
  getMetaInitTemplate() {
    return _.template(
      `for (<%- className %> item : values()) {
        <%- mapName %>.put(item.<%- getterName %>(), item);
      }
    `)
  }

  getConstructorTemplate() {
    return _.template(
      `<%- className %>(<%- params %>) {
      <%- attrs %>
    }`)
  }

  getGetByMethodTemplate() {
    return _.template(
      `public static <%- className %> getBy<%- _.upperFirst(keyName) %>(<%- keyType %> <%- keyName %>) {
        return Objects.requireNonNull(<%- mapName %>.get(<%- keyName %>), "Unknown <%- className %> for given <%- keyName %>: " + <%- keyName %> + ".");
    }
    `)
  }

  getGetByMethodSafeTemplate() {
    return _.template(
        `public static <%- className %> getBy<%- _.upperFirst(keyName) %>Safe(<%- keyType %> <%- keyName %>) {
        return <%- mapName %>.getOrDefault(<%- keyName %>, null);
    }
    `)
  }

  getSafeValueOfMethodTemplate() {
    return _.template(
        `public static <%- className %> safeValueOf(String enumName) {
        if (enumName == null || enumName.isEmpty()) return null;

        return Arrays.stream(<%- className %>.values()).filter(enumValue -> enumValue.name().equalsIgnoreCase(enumName))
                .findFirst().orElse(null);
    }
    `)
  }


}

export default JavaEnumGenerator
