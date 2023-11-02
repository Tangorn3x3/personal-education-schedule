import nuxtConfig from '@/nuxt.config'
import _ from 'lodash'
import * as platformAuthService from "@/@app-platform/auth/platformAuthService";

const STRATEGY = 'local'

export default ({ app, store }) => {
  app.$axios.setBaseURL(nuxtConfig.axios.baseUrl)

  /**
   * Реагирование на ошибки в ответах сервера.
   */
  app.$axios.onError((error) => {
    if (checkStatus(401, error) || checkStatusAndErrorCode(400, 'invalid_grant', error) ) {
      //app.$auth.logout()
    }
  })

  app.$axios.onRequest(() => {
    store.commit('utils/setLoading', true)
  })

  /**
   * Реагирование на ответы
   */
  app.$axios.interceptors.response.use(
    response => {
      store.commit('utils/setLoading', false)
      return response;
    },
    async function (error) {

      /** !!! PLATFORM SPECIFIC CODE !!! */
      if (platformAuthService.isInterceptionUserInfoUrl(error.config.url)) {
        return Promise.resolve(platformAuthService.replaceAxiosUserInfoRequest(error))
      }

      store.commit('utils/setLoading', false)
      return Promise.reject(error);
    }
  );

  /**
   * Модификация запросов перед отправкой
   */
  app.$axios.interceptors.request.use((config) => {
    const strategyConfig = _.get(nuxtConfig.auth.strategies, STRATEGY)
    _.set(config.headers, 'X-DreamFactory-API-Key', nuxtConfig.auth.auth_api_key)
    _.set(config.headers, 'X-DreamFactory-Session-Token', app.$auth.getToken(STRATEGY))

    return config
  })
}

function checkStatus(statusCode, error) {
  return error.response && error.response.status === statusCode
}

function checkStatusAndErrorCode(statusCode, errorCode, error) {
  return error.response && error.response.status === statusCode
    && error.response.data && error.response.data.error === errorCode
}

function getTokenUrl() {
  return _.get(nuxtConfig.auth.strategies, `${STRATEGY}.endpoints.login.url`)
}
