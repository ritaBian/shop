<template lang="html">

  <div class="car">
<van-nav-bar
  title="分销"
  left-text=""
  left-arrow
  @click-left="$router.go(-1)"
/>
      <div class="main">
        <br/><br/>
        <div style="text-align:center">
          <img :src="$store.state.login.fenxiao.scan_pic" v-if="$store.state.login.fenxiao.scan_pic" />
        </div>
        <br/>
        <div v-if="$store.state.login.fenxiao.url" style="text-align:center" v-clipboard:copy="$store.state.login.fenxiao.url" v-clipboard:success="onCopy">
          分销地址:<br/>{{$store.state.login.fenxiao.url}}
        </div>
      </div>
      
      <!-- <v-footer></v-footer> -->
      <v-footer2></v-footer2>
    </div>
</template>

<script>
  // import * as mockData from '@/http/mock.js' //模拟数据
  import Header from '@/components/index/header.vue'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { Dialog,Toast,Panel,NavBar } from 'vant';
  import 'vant/lib/index.css';
  
  import Footer2 from '../common/travel/_footer2.vue'

  export default {
  data(){
      return {
      }
  },
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer,
      'v-footer2': Footer2,
      'v-panel': Panel,
      [NavBar.name]:NavBar
    },
beforeCreate(){
  let obj= {'api_user':this.$store.state.login.username};
  this.$dopost('/sysapi/user/fenxiao/', obj,
  function (response) {
  if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
  {
    this.$store.state.login.fenxiao=response.data.data;
  }
  else{Toast((response.data && response.data.mess)?response.data.mess:'出错了！');}
  }.bind(this),true);
  
},
    methods:{
    onCopy(){
      Toast("已复制到剪贴板");
        
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  @import '../assets/user/icon/carstyle.css';
  .mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333!important;
    .fz(font-size, 40)!important;
}
  .car {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
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
