
import Vue, { CreateElement, VNode } from 'vue';
import App from './App.vue';
import router from '@/router/index';
import store from '@/store/index';
import '@/common/ts/config/antDesign';

import '@/common/scss/index.scss';



// 全局组件
import '@/components/index';

Vue.config.productionTip = false;

// import '@/common/scss/reset.scss';

// 配置全局错误捕获
Vue.config.errorHandler = (err: Error, vm: Vue, info: string): void => {
  console.group('%cGlobal error handler', "color: #FF0033;");
  console.log(`%c${err}`, 'color: #ff0033;');
  console.log(vm);
  console.log(`%c${info}`, 'color: #3399FF;font-weight:600');
  console.groupEnd();
};

new Vue({
  router,
  store,
  render: (h: CreateElement): VNode => h(App)
}).$mount('#app');


