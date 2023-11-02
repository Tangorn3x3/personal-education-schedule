import _ from 'lodash'
import XmlFormatter from 'xml-formatter'
import JsonFormatter from 'json-beautify'
import {ATOL_FIELDS} from "./atolFields";

export function formatXml(xmlText) {
    return XmlFormatter(xmlText, {
        collapseContent: true
    })
}

export function isXml(str) {
    return (/^\s*<[\s\S]*>/).test(str);
}

export function formatJson(jsonText) {
    let objectForFormat = null
    if (_.isString(jsonText)) {
        jsonText = jsonText.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":');
        objectForFormat = JSON.parse(jsonText);
    }
    else if (_.isObject(jsonText) || _.isArray(jsonText))
        objectForFormat = _.cloneDeep(jsonText)
    else throw new Error("Не удалось понять JSON")

    return JsonFormatter(objectForFormat, null, 2, 80)
}

export function urlEncodedToJson(urlEncodedText) {
    let decodedData = decodeURIComponent(urlEncodedText);
    let objectForFormat = JSON.parse('{"' + urlEncodedText.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

    return JsonFormatter(objectForFormat, null, 2, 80)
}

export function atolJsonToWellNamedJson(atolText) {
    let testToTransform = atolText
    _.forEach(ATOL_FIELDS, field => {
        testToTransform = testToTransform.replaceAll(`"${field.code}":`, `"${field.code}--${field.name}":`)
    })
    return formatJson(testToTransform)
}
