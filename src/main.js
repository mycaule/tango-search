/* eslint-disable no-new */

import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'
import App from './App.vue'

Vue.use(InstantSearch)

new Vue({
  el: '#app',
  render: h => h(App)
})
