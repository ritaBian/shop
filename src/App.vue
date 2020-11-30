<template>
  <div id="app">
    <keep-alive :include="cached">
    	<router-view v-if="$route.meta.keepAlive"></router-view>
	</keep-alive>

	<router-view v-if="!$route.meta.keepAlive"></router-view>
    <v-loading v-show="fetchLoading"></v-loading>
    <iframe v-if="Spread" :src="Spread" style="width:0;height:0"></iframe>
  </div>
</template>

<script>
import Loading from '@/common/_loading'
import 'vant/lib/index.css';
import Util from '@/util/common'

export default {
  components:{
    'v-loading':Loading
  },
  computed:{

    fetchLoading(){
      return this.$store.state.detail.fetchLoading
    },
    userName(){
      return this.$store.state.login.username
    }
  },
  data(){
     return{
        // cached:[ 'track'],
        cached:this.$store.state.catchArr,
        Spread:false,
        // userName:this.$store.state.detail.user
     }
  },

  watch:{
     userName:{
       handler:function(e){
          let obj= {'api_user':this.$store.state.login.username};
          this.$dopost('/sysapi/user/userinfo/', obj,
          function (response) {
          if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
          {
            this.$store.state.detail.user=response.data.data;
          }
          else{Toast((response.data && response.data.mess)?response.data.mess:'出错了！');}
          }.bind(this),true);
       },
       immediate: true,
     },

    $route:{ //监听路由变化
      handler:function (to,from) {
        var that = this;
        this.$store.state.index.currentPage.desc = '';
        this.cached = this.$store.state.catchArr;
        // 设置微信分享
        setTimeout(function() {
           that.wxConfig()
        }, 400);

        console.log('删掉了吗',this.cached)
      }
    }
  },
  created() {
    let u=Util.GetQuery('u');
    if(u)
    {
      this.Spread=this.$conf.domain+'/pro/Spread/?u='+u;
    }
  },
  methods:{
    wxConfig(){
      var that = this;
       that.$wx.wxConfig()

      // var that = this;
      // var url = window.location.href
      // var index = url.indexOf('?')
      // url = index==-1?url+'?u='+this.$store.state.login.username:url+'&u='+this.$store.state.login.username

      // this.$dopost('/sysapi/travel/jsshare/', {url:url},function (res) {
      // 	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
      //      console.log('分享参数',res)
      //      this.$store.state.index.appId = res.data.data.appId
      //      this.$store.state.index.timestamp = res.data.data.timestamp
      //      this.$store.state.index.nonceStr = res.data.data.nonceStr
      //      this.$store.state.index.signature = res.data.data.signature

      //      that.$wx.wxConfig()

      // 	}else{
      //     Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
      //   }
      // }.bind(this));
    },
  }
}
</script>

<style lang="less">
html,body,#app{
  width: 100%;
  height: auto;
  -webkit-tap-highlight-color:rgba(0,0,0,0)
}

body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
    margin: 0;
    padding: 0;
    -moz-user-select:none;-webkit-user-select:none;
    -webkit-tap-highlight-color:transparent;
}

button,
fieldset,
img,
input {
    border: none;
    padding: 0;
    margin: 0;
    outline-style: none;
}

ul,li {
  background-color: #ffffff;
}
ol,
ul {
    list-style: none;
}

input {
    padding-top: 0;
    padding-bottom: 0;
    font-family: "SimSun", "宋体";
}

input,
select {
    vertical-align: middle;
}

input,
select,
textarea {
    font-size: 12px;
    margin: 0;
}
textarea {
    resize: none;
}

/*防止拖动*/
img {
    border: 0;
    vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
    border-collapse: collapse;
}
//去斜体
i {
  font-style:normal
}
body {
    font-family: 'Microsoft YaHei';
    color: #666;
    background: #fff;
}

a {
    color: #666;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-decoration: none;
    font-weight: normal;
    font-size: 100%;
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
}

.ac {
    text-align: center;
}
.border{
  border: 1px solid black;
}
.app_line{
  /*! autoprefixer: off */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  /*! autoprefixer: on */
 }
 .app_line2{
   display: -webkit-box;
   -webkit-line-clamp: 2;
   word-break: break-all;
   /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
   /*! autoprefixer: on */
 }
 .mint-toast{
   z-index: 1000000001 !important;
 }

</style>
