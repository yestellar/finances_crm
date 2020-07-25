import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'

import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import tooltipDirective from '@/directives/tooltip.directive'

import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
    apiKey: 'AIzaSyBCtu3hGp_i3Qg6ftGhVx5LcuqAGVY6Rwg',
    authDomain: "vue-finance-crm-3fc1e.firebaseapp.com",
    databaseURL: "https://vue-finance-crm-3fc1e.firebaseio.com",
    projectId: "vue-finance-crm-3fc1e",
    storageBucket: "vue-finance-crm-3fc1e.appspot.com",
    messagingSenderId: "196539981235",
    appId: "1:196539981235:web:4783c02518f07b50a03fc6"
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
