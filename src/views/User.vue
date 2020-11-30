<template lang="html">

  <div class="car">
      <header class="header" >
          <div class="header-icon" v-if="!$store.state.detail.user.pic">
              <span class="icon2-user"></span>
          </div>
          <div  v-if="$store.state.detail.user.pic">
              <v-image  round  style="margin-left: 4vw;"
                width="70"
                height="70"
                lazy-load
                :src="decodeURI($store.state.detail.user.pic)"
              />

          </div>
          <span>{{$store.state.detail.user.name || $store.state.detail.user.login_name}}</span>
      </header>
      <div class="main">
          <router-link class="my-indent" :to="{path:'/order'}">
              <span class="my-indent-left">我的订单</span>
              <div class="my-indent-right">
                  <span>全部订单</span>
                  <i class="icon-go"></i>
              </div>
          </router-link>

          <section class="my-pay">
              <router-link :to="{ path:'/order'}">
                  <span class="icon2-money"></span>
                  <p>待付款({{not_pay_count}})</p>
              </router-link>
              <router-link :to="{ path:'/order'}">
                  <span class="icon2-thecar"></span>
                  <p>待收货({{not_recived_count}})</p>
              </router-link>

          </section>

          <section class="my-vip" v-if="role_id==73">
            <router-link class="my-vip-top ho" to="userCode" >
              <div class="my-vip-top-div">
                <span class="icon2-money">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span>
                </span>
              </div>
              <p>
                <span>智能验票</span>
              </p>
            </router-link>
          </section>

          <section class="my-vip">
            <router-link class="my-vip-top ho" to="release_journey_list" >
              <div class="my-vip-top-div">
                <!-- <span class="icon2-money">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span>
                </span> -->
                <van-icon name="orders-o" size="1.4rem" color="#666" />
              </div>
              <p>
                <span>线路列表</span>
              </p>
            </router-link>
          </section>

          <section class="my-vip">
            <router-link class="my-vip-top ho" :to="{ name: ''}" >
              <div class="my-vip-top-div">
                <van-icon name="balance-o" size="1.4rem" color="#666" />
               <!-- <span class="icon2-money">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span>
                </span> -->
              </div>
              <p>
                <span>用户余额:{{$store.state.detail.user.rmb}}元</span>
              </p>
            </router-link>
          </section>
          <section class="my-vip">
            <router-link class="my-vip-bottom ho" :to="{ name: ''}">
              <div>
                <van-icon name="points" size="1.4rem" color="#666" />
                <!-- <span class="icon2-money"></span> -->
              </div>
              <p>
                <span>用户积分:{{$store.state.detail.user.point}}个</span>
              </p>
            </router-link>
          </section>




          <section class="my-vip" >
            <router-link class="my-vip-bottom ho" :to="{path:'/Fenxiao'}" v-if="($store.state.detail.user.grade && $store.state.detail.user.grade==1)">
              <div>
                <!-- <span class="icon2-money"></span> -->
                <van-icon name="location-o" size="1.4rem" color="#666" />
              </div>
              <p>
                <span>获取分销地址</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section>


          <section class="my-settle">
              <router-link :to="{ name: ''}" class="my-settle-bottom">
                <div>
                  <van-icon name="setting-o" size="1.4rem" color="#666" />
                  <!-- <span class="icon2-settle"></span> -->
                </div>
                <p @click="logout">
                  <span>退出登录</span><i class="icon-go"></i>
                </p>
              </router-link>
          </section>

      </div>
      <v-baseline></v-baseline>
      <!-- <v-footer></v-footer> -->
      <!-- 底部栏 -->
      <v-footer2 ></v-footer2>
    </div>
</template>

<script>
  // import * as mockData from '@/http/mock.js' //模拟数据

  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import conf from '@/conf';
  import { Dialog,Toast,Panel,Image } from 'vant';
  import 'vant/lib/index.css';
  import Footer2 from '../common/travel/_footer2.vue'

  export default {
  data(){
      return {
        not_pay_count:0,
        not_recived_count:0,
        conf:conf,
        role_id:'',
      }
  },
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer,
      'v-panel': Panel,
      'v-image': Image,
      'v-footer2':Footer2
    },
beforeCreate(){
  let obj= {'api_user':this.$store.state.login.username};
  this.$dopost('/sysapi/user/userinfo/', obj,
  function (response) {
  if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
  {
    this.$store.state.detail.user=response.data.data;
    this.role_id = response.data.data.role_id
  }
  else{Toast((response.data && response.data.mess)?response.data.mess:'出错了！');}
  }.bind(this),true);
  let obj2= {'api_user':this.$store.state.login.username};
  this.$dopost('/sysapi/order/order_count/', obj2,
  function (response) {
  if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
  {
    this.not_pay_count=response.data.data.not_pay_count;
    this.not_recived_count=response.data.data.not_recived_count;
  }
  else{Toast((response.data && response.data.mess)?response.data.mess:'出错了！');}
  }.bind(this),true);
},
computed:{
      pic(){
        let r=$store.state.detail.user.pic;
        if(r.indexOf('://')==-1)
        {
          conf.domain+'/'+decodeURI($store.state.detail.user.pic);
        }
        return r;
      },
},
    methods:{

    logout(){
      Dialog.confirm({
        title: '',
        message: '确定退出么？'
      }).then(() => {
        this.$store.commit('CHANGE_USER',0,'','');
        this.$router.replace({path: '/login'});
      }).catch(() => {
        // on cancel
      });

      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  @import '../assets/user/icon/carstyle.css';


  .car {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
    .header {
      width: 100%;
      height: 16vw;
      background: url(../../static/carbg.png) center 0 #a40d0d;
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .header-icon {
        //border: .4vw solid #ffffff;
        background-color: @cl;
        margin-left: 4vw;
        -webkit-box-sizing: border-box;
              box-sizing: border-box;
        width: 14vw;
        height: 14vw;
        line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        span {
          .fz(font-size, 54);
          &::before {
            color: #ffffff;
          }
        }
      }
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: .2vw;
      }
    }
    .main {
      width: 100%;
      .my-indent {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        .bd();
        &:active {
          background-color: rgb(224, 227, 230)
        }

        .my-indent-right {
          span {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, .4);
            position: relative;
          }
          i {
            position: relative;
            top: .8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        .bd();

        >a {
          display: block;
          width: 50%;
          color: #999;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,.my-service,.my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();
        >a {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
                    flex: 2;
                    padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
                    flex: 10;
            position: relative;

            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: .4vw;
            }
          }
        }

      }
    }
  }
  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }

  .icon2-service {
    .fz(font-size, 34);
  }

</style>
