import apiService from "@/utils/api/apiClient";
import notificationService from "@/utils/service/notificationService";
import _ from "lodash";

const PROXY_HOST = localStorage.getItem('proxy_host')

export const ProxyApiType = Object.freeze({
  SUBSCRIBER: { code: 'SUBSCRIBER', uri: '/platform/subs'},
  TASKS: { code: 'TASKS', uri: '/task-manager'}
});

export class ProxyApiTypeDesc {
  constructor (props) {this.initialize(props)}
  initialize (props) {
    /** @type {String} */ this.code = _.get(props, 'code') || null
    /** @type {String} */ this.uri = _.get(props, 'uri') || null
  }
}

/**
 *
 * @param {ProxyApiTypeDesc} apiType
 * @param {String} url
 * @return {Promise<unknown>}
 */
export function get(apiType, url) {
  const targetUrl = `${PROXY_HOST}${apiType.uri}${url}`

  return new Promise((resolve, reject) => {
    apiService.get(targetUrl, {
    })
      .then((response) => {
        let result = _getResponseAsObject(response);
        console.debug(`Proxy response for ${targetUrl}`, result)

        if (result === false) reject()
          else resolve(result)
      })
      .catch((error) => {
        notificationService.showAxiosError(error, `Загрузка с платформы`)
        reject(error)
      })
  })
}

function _processPlainJsonResponse(response) {
  if (response.resultCode === 'SUCCESS') {
    try {
      return JSON.parse(response.result)
    } catch (e) {
      notificationService.showError('Parsing error', `Загрузка с платформы`)
      return false
    }

  } else {
    notificationService.showError(response.details, `Загрузка с платформы`)
    return false
  }
}

function _getResponseAsObject(axiosResponse) {
  let result = null
  if (axiosResponse.headers['content-type'].includes('text/plain')) {
    result = _processPlainJsonResponse(axiosResponse.data)
  } else {
    result = axiosResponse.data
  }

  return result;
}
