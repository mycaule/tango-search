/* eslint-disable no-new */

import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'
import VueObserveVisibility from 'vue-observe-visibility'

import App from './App.vue'

Vue.use(InstantSearch)
Vue.use(VueObserveVisibility)

new Vue({
  el: '#app',
  render: h => h(App)
})
