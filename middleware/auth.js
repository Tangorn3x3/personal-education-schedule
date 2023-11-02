import _ from 'lodash'
export default function ({ isServer, store, route, redirect }) {
  if (route.name === 'login') return;
  //const  isAuthenticated = _.get(store.getters, 'auth/auth/isAuthenticated')
  //if (!isAuthenticated) { redirect('/login') }
}
