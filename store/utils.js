export const state = () => ({
  loading: false,

  snackbar: false,
  snackbarText: '',
})

export const actions = {
  showSnackbar({commit}, text) {
    commit('setSnackbar', { snackbar: true, snackbarText: text })
  },
  hideSnackbar({commit}) {
    commit('setSnackbar', { snackbar: false, snackbarText: '' })
  }
}

export const mutations = {
  setLoading (state, loading) {
    state.loading = loading
  },
  setSnackbar (state, { snackbar, snackbarText }) {
    state.snackbar = snackbar
    state.snackbarText = snackbarText
  }
}
