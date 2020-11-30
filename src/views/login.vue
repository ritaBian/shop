<template lang="html">
  <div class="login">
<van-nav-bar
  title="登录"
  left-text="" right-text="注册"
  left-arrow
  @click-left="$router.go(-1)" @click-right="$router.replace({path:'/reg'})"
/>
    <section>
<van-cell-group>
  <van-field
    v-model="account"
    label="手机号码:"
    placeholder="请输入手机号" required
  />
  
  <van-field
    v-model="password"
    type="password"
    label="登录密码"
    placeholder="请输入登录密码"
    required
  />
</van-cell-group>
      <p class="tip">Tip : 请使用手机号和密码登录</p>
    </section>
   

    <van-button size="large" type="danger" style="width:90vw;margin-left:5vw;" @click="login">登 录</van-button>


    <v-baseline></v-baseline>
    <!-- <v-footer></v-footer> -->
    <v-footer2></v-footer2>
  </div>
</template>

<script>
import Vant from 'vant';
import 'vant/lib/index.css';
import Vue from 'vue';
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import Footer2 from '../common/travel/_footer2.vue'
import { Toast } from 'mint-ui'
import md5 from 'js-md5';
Vue.use(Vant);

export default {
  components:{
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-footer2': Footer2
  },
  data(){
    return {
      account:'',
      password:'',
      toggle:!this.$store.state.login.token
    }
  },
  mounted()
  {
    if(this.$store.state.login.token==1)
    {
      // this.$router.replace({path: '/user'});
      this.$router.replace({path: '/shop/mine'});
    }
  },
  methods:{
    // 登录按钮
    login(){
      if(this.account && this.account!=="" && this.password && this.password!=="") {

	  	this.$dopost('/sysapi/user/login/', {'username':this.account,'password':this.password},
		function (response) {
			if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
			{
				this.toggle = false;
        this.$store.commit('CHANGE_USER',[1,response.data.user_id,md5(this.password)]);
        // this.$router.replace({path: '/user'});
        this.$router.replace({path: '/shop/mine'});
			}
			else{Toast((response.data && response.data.mess)?response.data.mess:'账号密码不正确,请重新输入');}
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
    logout(){
      Toast('退出登录成功');
      this.$store.commit('CHANGE_USER',0,'','');
      this.toggle = true;
      this.account = '';
      this.password = '';

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
</style>
