//store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 头部分类
import detail from './modules/detail'
import detail2 from './modules/detail2'
import category from './modules/category'
import login from './modules/login'
import im from './modules/im'
import index from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
	  detail2,
    category,
    login,
    im,
    index
  },
  state:{
    catchArr: [ 'index','category','list','store','active' ] ,//保存缓存的列表(是固定要缓存的组件）

  },
  mutations: {
    // 对指定组件进行动态更改缓存（缓存）--组件调用该方法时，判断该组件是否存在于该缓存数组，无则添加
    iskeepAlive(state, component) {
      !state.catchArr.includes(component) && state.catchArr.push(component);
    },
    // 对指定组件进行动态更改缓存（不缓存）--组件调用该方法时，从缓存数组中删除对应的组件元素
    noKeepAlive(state, component) {
      console.log(8888,state, component)
      let index = state.catchArr.indexOf(component);
      index > -1 && state.catchArr.splice(index, 1);
    },
  }




})
