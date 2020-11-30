import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/vuex/store.js'
//import api from '@/http/api.js'
import fly from '@/http/api-fly.js'
import less from 'less'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import conf from '@/conf.js';
import vant from 'vant'
import Util from '@/util/common'
import Im from '@/util/im'
import VueNativeSock from 'vue-native-websocket'
import qs from 'qs'
import VueClipboard from 'vue-clipboard2'
import md5 from 'js-md5';
import Base64 from 'js-base64';

import waterfall from 'vue-waterfall2'
import loading from "@/components/load";
import Swiper, { Navigation, Pagination } from 'swiper';
import wx from 'weixin-js-sdk'
Swiper.use([Navigation, Pagination]);
// import LyTab from 'ly-tab'
// Vue.use(LyTab)
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'jy4PkVrGeDMA5W0CFrcocAZZf4Zv0jVQ'
})

import wxSdk from  '@/util/wxsdk.js'
Vue.prototype.$wx = wxSdk;
import { Tabbar, TabbarItem,Icon,Search,Image,Swipe,SwipeItem,NavBar,Rate,Uploader,Calendar,Field,Tag,Popup,Dialog,DropdownMenu,DropdownItem,List,Toast,DatetimePicker,Area,Loading,Button,Stepper,ImagePreview,IndexBar,IndexAnchor,Cell,CellGroup  } from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Icon).use(Search).use(Image).use(Swipe).use(SwipeItem).use(NavBar).use(Rate).use(Uploader).use(Calendar).use(Stepper).use(IndexBar).use(IndexAnchor)
.use(Field).use(Tag).use(Popup).use(Dialog).use(DropdownMenu).use(DropdownItem).use(List).use(Toast).use(DatetimePicker).use(Area).use(Loading).use(Button).use(ImagePreview).use(Cell).use(CellGroup);
Vue.component('loading',loading);
Vue.use(waterfall)

// import vshare from 'vshare'
// Vue.use(vshare)
Vue.prototype.$fly = fly;

// 游玩详情
import shopPlay from './components/travel/shop_detail_play'; Vue.component('shopPlay',shopPlay);
// 美食详情
import shopEat from './components/travel/shop_detail_eat.vue'; Vue.component('shopEat',shopEat);
// 住宿详情
import shopHotel from './components/travel/shop_detail_hotel.vue'; Vue.component('shopHotel',shopHotel);
// 评论列表
import evaluateList from './components/travel/evaluate.vue'; Vue.component('evaluateList',evaluateList);
// 选择地址
import appAddress from './components/travel/address.vue'; Vue.component('appAddress',appAddress);
// 瀑布流
import appWaterfall from './components/travel/waterfall.vue'; Vue.component('appWaterfall',appWaterfall);
// tabbar
import appTabbar from './components/travel/tabbar.vue'; Vue.component('appTabbar',appTabbar);
// 分享
import appShare from './components/travel/share.vue'; Vue.component('appShare',appShare);
// 礼物
import appGift from './components/travel/gift.vue'; Vue.component('appGift',appGift);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.use(Mint,fly);
Vue.use(vant)

Vue.use(VueClipboard);
Vue.use(VueNativeSock, conf.ChuanHai_Url,{store:store,connectManually: true});//format:'json',
Vue.config.productionTip = false;
//Vue.prototype.$api = api;
Vue.prototype.$conf = conf;
Vue.prototype.$viewMess = Toast;
//Vue.use(BaiduMap, {ak:conf.BaiduMapAk});
//Vue.prototype.$im = Im;
Vue.prototype.$dopost = function(url,data,fn,_sign=false,IsCookie=false)//sign
{
  if(_sign===true)
  {
    data=Util.paraAddKey(data,store.state.login.username,store.state.login.password);
    //console.log(data);
  }
	if(data && typeof data=='object')
	{
		data=qs.stringify(data?data:{});
	}
	data = data || '' ;
	fly.post(url, data,{withCredentials:IsCookie}).then(fn)
	.catch(function (error) {Toast('接口异常:'+error);});
}

Vue.prototype.$isEmptyObject = function(obj) {
  for (var key in obj) {
      return false;
  }
  return true;
}

Vue.prototype.$Cheng = function(num1, num2) {
  var baseNum = 0;
  try {
      baseNum += num1.toString().split(".")[1].length;
  } catch (e) {
  }
  try {
      baseNum += num2.toString().split(".")[1].length;
  } catch (e) {
  }
  return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};
Vue.prototype.$Jia = function(num1, num2) {
  var baseNum, baseNum1, baseNum2;
  try {
      baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
      baseNum1 = 0;
  }
  try {
      baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
      baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
};
Vue.prototype.$Chu = function(num1, num2) {
  var baseNum1 = 0, baseNum2 = 0;
  var baseNum3, baseNum4;
  try {
      baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
      baseNum1 = 0;
  }
  try {
      baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
      baseNum2 = 0;
  }
  baseNum3 = Number(num1.toString().replace(".", ""));
      baseNum4 = Number(num2.toString().replace(".", ""));
      return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
};

Vue.prototype.$isEmpty = function(_store,_para,_default)
{
  if(!_store[_para] || typeof(_store[_para]) == "undefined")
  {
    _store[_para]=_default;
  }
  return _store[_para];
}

if (process.env.NODE_ENV === 'development') {
  console.log("dev mode");
} else {
  global.console={info:()=>{},log:()=>{},warn:()=>{},error:()=>{},debug:()=>{},assert:()=>{}};
}
// 用钩子函数beforeEach()对路由进行判断

router.beforeEach((to, from, next) => {

    if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
      if (store.state.login.token) {  // 通过vuex state获取当前的token是否存在
        next();
      }
      else {    //如果没有权限,重定向到登录页,进行登录
        next({
          path: '/login',
          // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
    else { //不需要权限 直接跳转
    // 全局导航守卫
    console.log(111111,to,from)
      if (to.name != '城市索引'&&to.name != '到此一游'&&from.name === '享迹') {
        store.commit('iskeepAlive', 'track');
        next();
      }else if(to.name != '城市索引'&&from.name === '发现'){
        store.commit('iskeepAlive', 'travel_index');
        next();
      }else if(to.name != '城市索引'&&from.name === '线路'){
        store.commit('iskeepAlive', 'circuit');
        next();
      }else if(to.name == '详情'&&from.name === '商家详情'){
        store.commit('iskeepAlive', 'store');
        next();
      }
      else{
        next();
      }




    }
})

router.afterEach((to,from,next) => {
  document.title = to.name || '';
})


const vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate: function () {
    let loginedUser=Util.getLocal('loginedUser');
    if(loginedUser && loginedUser[0] && loginedUser[1])
    {
      this.$store.commit('CHANGE_USER',[1,loginedUser[0],loginedUser[1]]);
      this.$store.commit('RESET_CARLIST');
    }
    else
    {
      if(Util.GetCookie("weixinid"))
      {
        if(window.location.href.indexOf('/login')==-1)
        {
          this.$dopost('/sysapi/user/login/?type=weixin', {'username':Util.GetCookie("weixinid"),'password':'weixin'},
          function (response) {
            if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
            {
              this.$store.commit('CHANGE_USER',[1,response.data.user_id,md5(response.data.password)]);
            }
            else
            {
              if(window.location.href.indexOf('/login')==-1 && Util.isWeiXin())
              {
                window.location.href=this.$conf.domain+'/pro/index?type=weixin&url='+Base64.Base64.encode(window.location.href);
              }
            }
            //else{Toast((response.data && response.data.mess)?response.data.mess:'账号密码不正确,请重新输入');}
          }.bind(this),false,true);
        }

      }
      else
      {//this.$route.path!='/login'
        if(window.location.href.indexOf('/login')==-1 && Util.isWeiXin())
        {
          window.location.href=this.$conf.domain+'/pro/index/?type=weixin&url='+Base64.Base64.encode(window.location.href);
          //alert(Util.GetCookie("weixinid"));
          //alert(this.$cookies.get("weixinid")  );
        }
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        this.$store.state.login.CurrPage=val.path;
      },
      deep: true
    }
  },
  mounted:function(){
    //im
    if(this.$conf.ImState)
    {
      Im.Init(this);
      Im.SendPing();
      if(this.$store.state.login.token)
      {
        //this.$connect();
      }
    }
    //this.$router.push({
    //  path: '/'
    //})

  },
  beforeDestroy:function(){
    if(this.$conf.ImState)
    {
      this.$disconnect();
    }
  },
  created() {
    //微信jssdk
    this.wxConfig();
    this.getLocation()
    this.tagList()
  },
  methods:{
    wxConfig(){
      var that = this;
      var url = window.location.href
      var index = url.indexOf('?')
      url = index==-1?url+'?u='+this.$store.state.login.username:url+'&u='+this.$store.state.login.username

      this.$dopost('/sysapi/travel/jsshare/', {url:url},function (res) {
      	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
           console.log('分享参数',res)

           this.$store.state.index.appId = res.data.data.appId
           this.$store.state.index.timestamp = res.data.data.timestamp
           this.$store.state.index.nonceStr = res.data.data.nonceStr
           this.$store.state.index.signature = res.data.data.signature

      	}else{
          Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
        }
      }.bind(this));
    },

    getLocation:function(){
      var data = {
       page:1,
      }
      this.$dopost('/sysapi/travel/ip/', data,function (res) {
        if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            var city = {
              id:res.data.data.id,
              name:res.data.data.name
            };
            this.$store.state.index.city.name = city.name
            this.$store.state.index.city.id = city.id
            this.$store.state.index.areaList = res.data.data.children
        }else{
          Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
        }
      }.bind(this));
    },
    tagList(){
      var that = this;
       var data = {
          parent_id:''
       }
       this.$dopost('/sysapi/travel/tag/', data,function (res) {
         if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
           this.$store.state.index.allTag = res.data.data
         }else{
           Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
         }
       }.bind(this));
    },
  }
})
