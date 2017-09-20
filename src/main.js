// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Navigation from '@/components/Navigation'
import Modal from '@/components/Modal'
import TopBar from '@/components/TopBar'
import Card from '@/components/Card'
import { store } from '@/store/store'
import VueFire from 'vuefire'
import firebase from 'firebase'
Vue.use(VueFire)

Vue.config.productionTip = false

Vue.component('Navigation', Navigation)
Vue.component('Modal', Modal)
Vue.component('Top', TopBar)
Vue.component('Card', Card)


export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
