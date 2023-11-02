import colors from 'vuetify/es5/util/colors'
import ru from 'vuetify/es5/locale/ru'

//const SRV_ADDR = 'https://snippeter-backend-4ifsojk64q-lz.a.run.app/api'
const SRV_ADDR = 'https://script.google.com/macros/s/AKfycbyUkT2j2JhjNPfzPE_Y2-54AmVLB3b_hD95u2Kk98G9I2ecaGbkFcvEgL2VNcQl1-ts/exec'
const SRV_MAIN_PATH = '/snippet/'
export const SRV_PATH = '/'

const DEV_ADDR = 'http://snippeter-host:9797/api'
//const DEV_ADDR = 'https://snippeter-backend-4ifsojk64q-lz.a.run.app/api'



export default {
  platformApiUrl: SRV_ADDR,

  mode: 'spa',

  head: {
    titleTemplate: '%s',
    title: 'Course Scheduler',
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
    name: 'Course Scheduler',
    short_name: 'Course Scheduler',
    description: 'Course Scheduler',
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

  loading: { color: '#5cbf00', height: '5px' },
  loadingIndicator: { name: 'circle', color: '#5cbf00', background: '#272727' },
  /*
  ** Global CSS
  */
  css: [
  ],
  router: {
    base: process.env.NODE_ENV === 'production' ? SRV_PATH : '/',
    middleware: []
  },

  plugins: [
    '~/plugins/libs/i18n',
    '~/plugins/libs/prism',
    '~/plugins/vuelidate',
    '~/plugins/validation-mixin',
    '~/plugins/libs/vue-moment',
    '~/plugins/libs/vue-hotkey',
    '~/plugins/libs/logrocket',
    '~/plugins/mixins',

    '~/plugins/wrappers/axios-wrapper',
    '~/plugins/wrappers/notification-wrapper',
    '~/plugins/wrappers/property-wrapper',

    '~/@app-platform/plugins/platform-api-wrapper',
    '~/@app-platform/plugins/platform-stores-wrapper',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
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

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: { locales: { ru }, current: 'ru' },
    theme: {
      dark: true,
      themes: {
        dark: {
          //primary: colors.blue.darken2,
          primary: '#82B752',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#82B752',
          light: '#d8ffb4'
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
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
