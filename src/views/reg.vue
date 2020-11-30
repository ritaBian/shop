<template lang="html">
  <div class="login">
<van-nav-bar
  title="注册"
  left-text="" right-text="登录"
  left-arrow
  @click-left="$router.go(-1)" @click-right="$router.replace({path:'/login'})"
/>
    <section>

<van-cell-group>
  <van-field
    v-model="account"
    label="手机号码:"
    placeholder="请输入手机号" required
  />
  <van-field
    class="button_field"
    center
    v-model="sms"
    label="短信验证码"
    placeholder="请输入短信验证码"
    icon="clear"
    @click-icon="sms = ''" required
  >
    <ge-code slot="button" :config=config class="van-button van-button--primary van-button--small"></ge-code>
  </van-field>
  <van-field
    v-model="password"
    type="password"
    label="登录密码"
    placeholder="请输入登录密码"
    required
  />

</van-cell-group>
    </section>

    <van-button type="danger" size="large" style="width:90vw;margin-top:10px;margin-left:5vw;" @click="doReg">注 册</van-button>




    <v-baseline></v-baseline>
    <!-- <v-footer></v-footer> -->
    <v-footer2></v-footer2>
  </div>
</template>

<script>

import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { Toast } from 'vant'
import geCode from 'vue-gecode'
import Vant from 'vant';
import 'vant/lib/index.css';
import Vue from 'vue';
import md5 from 'js-md5';

import Footer2 from '../common/travel/_footer2.vue'
Vue.use(Vant);

export default {
  components:{
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-footer2': Footer2,
    geCode

  },
  data(){
    return {
      account:'',
      password:'',sms:'',
      smsBtnTxt:'发送验证码',
      toggle:!this.$store.state.login.token,
      config: {
        //开始时候的文本
        startText: '获取验证码',
        //获取验证码结束后文本
        endText: '再次获取',
        //验证码倒计时总时间(秒)
        totalTime: 30,
        //验证码每次隔多久变一次(秒)
        tickTime: 1,
        //倒计时执行期添加的class 默认 isRun
        activeClass: 'isRun',
        //自定义倒计时期间文本的显示内容
        computeText(num) {
            //num 倒计时时间
            return '重新获取 ' + num + 's';
        },
        //是否可以发送
        canTodo: () => {
            //返回值判定是否可以发送
            let result = /^1[345678]\d{9}$/.test(this.account);
            console.log('判断是否可以发送验证码',result);
            if(!result){
                alert('手机号格式不正确');
            }
            return result;
        },
        //canTode验证成功后执行 发送短信验证码
        todo: () => {
              let obj= {'api_time_sys':new Date().getTime(),'mobilenum':this.account};
              this.$dopost('/sysapi/user/mobile_code/', obj,
              function (res) {
              if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
              {
                  if(res.data.data.state && res.data.data.state=='ok')
                  {
                      Toast('发送成功！');
                  }
                  else
                  {Toast('发送失败！');}
              }
              else{Toast((res.data && res.data.mess)?res.data.mess:'出错了！');}
              }.bind(this),true);
        },
        //发送完成后的回调
        endCallback(type, config) {
            //type 回调产生原因  0: 时间结束   其他值由this.$refs.geCode.stop(1)调入自定义
            //config config配置
            console.log('发送完成后的回调', type, config);

        },
        //每次点击都会被调用
        click(isRun) {
            //isRun 是否在运行中
            console.log(`当前验证码状态是:${isRun ? '发送中' : '可发送'}状态`);

        },
        //是否可用   默认ture
        canUse: true,
        //不可用时的类名  默认no-can
        noCanClass: 'no-can',
        }

    }
  },
  mounted()
  {
    if(this.$store.state.login.token==1)
    {
      this.$router.replace({path: '/user'});
    }
  },
  methods:{
    doReg(){
      if(this.account && this.account!=="" && this.password && this.password!=="") {

	  	this.$dopost('/sysapi/user/reg/', {'login_name':this.account,'login_pass':this.password,'mobile_code':this.sms},
		function (response) {
			if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
			{
				this.toggle = false;
        this.$store.commit('CHANGE_USER',[1,response.data.user_id,md5(this.password)]);
        this.$router.replace({path: '/user'});
			}
			else{Toast((response.data && response.data.mess)?response.data.mess:'出错了!');}
}.bind(this));

      }else {
        Toast('账号密码不能为空');
      }
/**
      setTimeout(()=>{
        this.$router.replace({
          path: '/user'
        })
      },100);
**/
    },

    //退出登录按钮
    sendMess(){
      Toast('sendMess');


    }
  }
}

</script>

<style lang="less" scoped>
.login {
  >section {
    margin-top: 10px;
    .tip {
      padding: 6vw 3vw;
      color:rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
.button_field /deep/ .van-button--small{
  height: auto;
  padding: 6px 8px;
}

</style>
