import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import resources from './resources'
import axios from './http'

import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.prototype.$ajax = axios;

new Vue({
	el: '#app',
	router,
	render: h => h(App)
}).$mount('#app')

