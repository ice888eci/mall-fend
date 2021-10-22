import Vue from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'
import api from './api'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/img/lazyload/lazyload.png'),
})

import utils from './utils'
import './plugins'

FastClick.attach(document.body)

Vue.prototype.$api = api
Vue.prototype.$utils = utils

Vue.config.productionTip = false
// Vue.config.devtools = true

// vue-template-compiler把APP的template编译rander函数 (template->ast)->render->vdom->ui
// h可以直接编译组件
new Vue({ router, store, render: (h) => h(App) }).$mount('#app')
