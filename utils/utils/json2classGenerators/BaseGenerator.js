import _ from "lodash";
import ParametrizedValue from "../../../models/generators/java-entity/ParametrizedValue";
import ParametrizedName from "../../../models/generators/java-entity/ParametrizedName";
import parametrizedName from "../../../models/generators/java-entity/ParametrizedName";

export const ParametrizedValueFlags = Object.freeze({
  ENUM: 'e',
});

export const ParametrizedNameFlags = Object.freeze({
  JSON_PROP: 'jp',
  JSON_ALIAS: 'a',
  NAME: 'n',
  COMMENT: 'c'
});


class BaseGenerator {
  constructor (props) {
    this.fileExtension = 'js'
    this.initialize(props)
  }

  initialize(props) {

    /** @type {String} */ this.className = _.get(props, 'className') || null
    /** @type {Object} */ this.jsonObject = _.get(props, 'jsonObject') || null
    /** @type {String} */ this.extendsName = _.get(props, 'extendsName') || null
    /** @type {Boolean} */ this.isExtends = _.get(props, 'isExtends') || false
    /** @type {Boolean} */ this.isSimpleTypes = !!_.get(props, 'isSimpleTypes')

    /** @type {String} */ this.jsonTemplate = _.get(props, 'jsonTemplate') || null
  }

  generateAttributeList (json) {
    let text = ''
    _.forIn(json, (value, key) => {
      text += this.generateAttributeText(value, key)
    })
    return text
  }

  generateAttributeText (attrValue, attrName) {
    return attrName + ';\n'
  }

  getFileName() {
    return `${this.className}.${this.fileExtension}`
  }

  /**
   * Парсинг значения поля на предмет явного указания типа для переменной.
   * Например, "NdsType|e" - тогда отдаст тип NdsType с установленным флагом isEnum
   *
   * @param attrValue
   * @return {null|ParametrizedValue}
   */
  parseParametrizedValue(attrValue) {
    let parameters = _.split(attrValue, '|')
    if (parameters.length === 0) return null;

    let parametrizedValue = new ParametrizedValue(parameters[0]);
    if (parameters.length === 1) return parametrizedValue;

    let flag = parameters[1];

    switch (_.lowerCase(flag)) {
      case ParametrizedValueFlags.ENUM:
        parametrizedValue.isEnum = true; break;
    }

    return parametrizedValue;
  }


  parseParametrizedName(attrName) {
    let parameters = _.split(attrName, '|')
    if (parameters.length === 0) return null;

    let parametrizedName = new ParametrizedName(parameters[0]);
    if (parameters.length === 1) return parametrizedName;


    for (let i = 1; i < parameters.length; i++) {
      let flag = parameters[i];
      let flagAttributes = _.split(flag, ':')

      switch (_.lowerCase(flagAttributes[0])) {
        case ParametrizedNameFlags.NAME: {
          parametrizedName.jsonName = parametrizedName.name
          parametrizedName.name = flagAttributes[1]
          break
        }
        case ParametrizedNameFlags.JSON_ALIAS: {
          parametrizedName.jsonAlias = parametrizedName.name
          parametrizedName.name = flagAttributes[1]
          break
        }
        case ParametrizedNameFlags.JSON_PROP: {
          parametrizedName.jsonName = flagAttributes[1]
          break
        }
        case ParametrizedNameFlags.COMMENT: {
          parametrizedName.fieldComment = flagAttributes[1]
          break
        }

      }
    }

    if (parametrizedName.jsonName)
      parametrizedName.annotations.push(`@JsonProperty("${parametrizedName.jsonName}")`)

    if (parametrizedName.jsonAlias)
      parametrizedName.annotations.push(`@JsonAlias("${parametrizedName.jsonAlias}")`)

    return parametrizedName;
  }
}

export default BaseGenerator
