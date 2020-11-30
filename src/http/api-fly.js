import fly from 'flyio';
import store from '@/vuex/store.js';
import router from '../router';
import conf from '@/conf.js';
//var fly= new Fly;
//var api = new Fly;
fly.config.baseURL = conf.domain;
fly.config.timeout = 5000;
fly.config.parseJson = true;


// 请求拦截
fly.interceptors.request.use(function (request) {
    // 在发送请求之前做些什么
    if(request.body && typeof request.body == 'string' && request.body.indexOf("viewloading=0") != -1)
    {}else{store.commit('SET_LOADING',true);}
    
    // 如果有token,添加到请求报文 后台会根据该报文返回status
    if(store.state.login.token) {
      //request.headers.Authorization = `token ${store.state.login.token}`;
    }
    return request;

  }, function (error) {
    // 对请求错误做些什么
    alert('网络错误,请稍后再试');

    store.commit('SET_LOADING',false);

    return Promise.reject(error);
  });

// 添加响应拦截器
fly.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 加到时器主要是为了 展示Loading效果 项目中应去除
    setTimeout(()=>{
      store.commit('SET_LOADING',false);
    },300)

    return response;

  }, function (error) {
    // 对响应错误做点什么
    store.commit('SET_LOADING',false);

    if(error.response) {

      if(error.response.status== 401) {
          // 如果返回401 即没有权限，跳到登录页重新登录
        store.commit('CHANGE_USER',0,'','');

        alert('请重新登录');

        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })

      }
    }

    return Promise.reject(error);
  });
export default fly
