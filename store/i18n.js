export const state = () => ({
  isMultilingual: true,
  locales: ['ru'],
  locale: 'ru'
})

export const getters = {
  locale (state) {
    return state.locale
  }
}

export const actions = {
  setLocale ({ commit, state }, code) {
    commit('SET_LANG', code)
  }
}

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
