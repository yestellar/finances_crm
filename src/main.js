import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

const firebaseConfig = {
    apiKey: "AIzaSyBCtu3hGp_i3Qg6ftGhVx5LcuqAGVY6Rwg",
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
