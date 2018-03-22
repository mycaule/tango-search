/* eslint-disable no-new */

import Vue from 'vue'
import {Index, SearchBox, Results, Pagination, Highlight, Menu, RangeInput} from 'vue-instantsearch'
import App from './App.vue'

Vue.component('ais-index', Index)
Vue.component('ais-search-box', SearchBox)
Vue.component('ais-results', Results)
Vue.component('ais-pagination', Pagination)
Vue.component('ais-highlight', Highlight)
Vue.component('ais-menu', Menu)
Vue.component('ais-range-input', RangeInput)

new Vue({
  el: '#app',
  render: h => h(App)
})
