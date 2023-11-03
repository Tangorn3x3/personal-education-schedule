import colors from 'vuetify/es5/util/colors'
import ru from 'vuetify/es5/locale/ru'
import packageJson from './package.json'

const SRV_ADDR = 'https://script.google.com/macros/s/AKfycbyUkT2j2JhjNPfzPE_Y2-54AmVLB3b_hD95u2Kk98G9I2ecaGbkFcvEgL2VNcQl1-ts/exec'
const SRV_MAIN_PATH = '/snippet/'
export const SRV_PATH = '/'

export const APP_NAME = packageJson.name

export default {
  platformApiUrl: SRV_ADDR,

  mode: 'spa',

  head: {
    titleTemplate: '%s',
    title: APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${SRV_PATH}favicon.ico` },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  manifest: {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_NAME,
    lang: "ru",
    theme_color: "#1d1d1d"
  },
  workbox: {
    cacheAssets: false, // for /*
    offline: false // for /_nuxt/*
  },

  pwa: {
    workbox: {
      cacheAssets: false, // for /*
      offline: false // for /_nuxt/*
    }
  },

  css: [
  ],
  router: {
    base: process.env.NODE_ENV === 'production' ? SRV_PATH : '/',
    middleware: ['auth']
  },

  plugins: [
    '~/plugins/libs/i18n',
    '~/plugins/vuelidate',
    '~/plugins/validation-mixin',
    '~/plugins/libs/vue-moment',
    '~/plugins/libs/vue-hotkey',
    '~/@app-platform/plugins/mixins',

    '~/plugins/wrappers/axios-wrapper',
    '~/plugins/wrappers/notification-wrapper',

    '~/@app-platform/plugins/platform-api-wrapper',
    '~/@app-platform/plugins/platform-stores-wrapper',
  ],

  devModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'vuetify-dialog/nuxt'
  ],

  axios: {
    proxy: false,
    baseUrl: SRV_ADDR
  },

  auth: {
    google: {
      clientId: '216836867315-81680karuuapm62pvmfgoe3qqifdjkmc.apps.googleusercontent.com'
    },
    localStorage: false,
    strategies: {
      local: {
        user: {
          autoFetch: false
        },
        endpoints: {
          login: { url: SRV_ADDR+'/authenticate', method: 'post', propertyName: 'id_token' },
          user: { url: SRV_ADDR +'/auth_user_info', method: 'get', propertyName: false }
        },
        tokenRequired: true,
        tokenType: ''
      }
    },

    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }
  },

  loading: { color: '#9155FD', height: '5px' },
  loadingIndicator: { name: 'circle', color: '#9155FD', background: '#28243D' },

  vuetify: {
      customVariables: ['~/assets/variables.scss'],
      lang: {locales: {ru}, current: 'ru'},
      theme: {
          dark: true,
          themes: {
              dark: {
                  'primary': '#9155FD',
                  'secondary': '#8A8D93',
                  'on-secondary': '#fff',
                  'success': '#56CA00',
                  'info': '#16B1FF',
                  'warning': '#FFB400',
                  'error': '#FF4C51',
                  'background': '#28243D'
              }
          }
      }
  },
  server: {
    port: 3030,
  },
  generate: {
    dir: './docs'
  },

  build: {
    extend(config, ctx) {
    }
  }
}
