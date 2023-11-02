/* eslint-disable no-console */
import * as _ from 'lodash'


export function getMessage (errorResponse) {
  const errorMeta = getMetaFromResponse(errorResponse)
  return createMessageDescription(errorMeta)
}

export function getMessageWithDetails (errorResponse) {
  const errorMeta = getMetaFromResponse(errorResponse)
  return { message: createMessageDescription(errorMeta), details: errorMeta.endErrDetails }
}

function getMetaFromResponse (errorAxiosResponse) {
  const status = _.get(errorAxiosResponse, 'response.status')
  const message = _.get(errorAxiosResponse, 'message')

  const endErrDetails = _.get(errorAxiosResponse, 'response.data.error.message')
  const endError = _.get(errorAxiosResponse, 'response.data.error.message') || _.get(errorAxiosResponse, 'response.data.details') || _.get(errorAxiosResponse, 'response.data.error_description') || _.get(errorAxiosResponse, 'response.data.error')
  const validationErrors = _.get(errorAxiosResponse, 'response.data.errors')

  return { status, message, endError, validationErrors, endErrDetails }
}

function getStatusMessage (status) {
  /* let statusMessage = ''

  if (_.has(i18n.messages, `${i18n.locale}.http_errors.${status}`)) {
    statusMessage = _.get(i18n.messages, `${i18n.locale}.http_errors.${status}`)
  } */

  return `Статус ${status}`
}

function createMessageDescription (responseMeta) {
  // Читаемое описание http-статуса (н-р, 500 -> Internal server error)
  // eslint-disable-next-line no-unused-vars
  const statusMessage = getStatusMessage(responseMeta.status)

  let messageString = ''
  let validationString = ''

  if (_.keys(responseMeta.validationErrors).length > 0) {
    _.forIn(responseMeta.validationErrors, (value) => {
      console.log('Validation error', value)
      if (_.has(value, 'message')) {
        validationString += `[${value.property}]: ${value.message}`
        validationString += '\n\n\n'
      } else { validationString += `${value[0]}<br>` }
    })
  }

  if (validationString) {
    // Есть ошибки валидации
    messageString = validationString
  } else {
    // Проверяем, ответил ли сервер указание конкретной ошибки в коде (н-р, Undefined variable)
    messageString += responseMeta.endError ? responseMeta.endError : responseMeta.message
  }

  // if (statusMessage) { messageString = `<b>${statusMessage}</b> <br> ${messageString}` }

  return messageString
}
