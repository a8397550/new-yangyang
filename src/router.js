import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import Hello from './components/HelloParent.vue';
import HelloA from './components/HelloWorld.vue';

Vue.use(Router)  //Vue全局使用Router

export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    },
    {                    //每一个链接都是一个对象
      path: '/foo',         //链接路径
      name: 'Foo',     //路由名称，
      component: HelloA   //对应的组件模板
    }
  ]
})
