<template lang="html">
  <footer class="footer">

    <div class="footer-result">
      <p>共{{count}}件,总金额</p>
      <p><span>{{allpay}} </span>元</p>
    </div>
    <div class="footer-middle">
      <p>积分可抵扣</p>
      <p><span>{{allpay_huidian}}</span></p>
    </div>
    <a class="footer-pay" @click="goPay">
      去结算
    </a>
  </footer>

</template>

<script>
import { Toast } from 'mint-ui'
import Util from '../../util/common'
export default {
  computed:{
    // 勾选的商品数量
    count(){
      // 如果已选择列表为空 就返回0
      if(this.$store.getters.selectedList==undefined) {
        return 0
      }else {

        return this.$store.getters.selectedList.length
      }
    },

    //勾选的商品的价格总和
    allpay(){
      let all = 0;
      // 如果有勾选商品,计算总价格
      if(this.$store.getters.selectedList) {

        for (let i = 0; i < this.$store.getters.selectedList.length; i++) {
          let tmp=this.$store.getters.selectedList[i];
          all += Util.Jia(Util.Cheng(tmp.type.PRICE,tmp.count),tmp.promotion_price);
        }

      }
      // 没有勾选 即为0
      return all.toFixed(2);

    },
    allpay_huidian(){
      let all = 0;
      // 如果有勾选商品,计算总价格
      if(this.$store.getters.selectedList) {

        for (let i = 0; i < this.$store.getters.selectedList.length; i++) {
          let tmp=this.$store.getters.selectedList[i];
          all += tmp.type.HUI_DIAN*tmp.count;
        }

      }
      // 没有勾选 即为0
      return all.toFixed(2);

    }
  },

  methods:{
    //点击跳转到支付页
    goPay(){
        if(this.$store.state.login.token!=1)
        {
          Toast('请先登录会员！');
          return;
          //this.$router.push({path:'/login'})
        }
        // 如果有选择商品才能跳转
        if(this.$store.getters.selectedList.length) {
          // 保存+缓存选择的商品 ,在支付页能用到
          this.$store.dispatch('setSelectedList')
          this.$router.push({path:'/car/pay'})


      } else {

        alert('你还没选择商品')

      }

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';

  .footer {
    width: 100%;
    height: 16vw;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 56px;
    left: 0;
    background-color: #ffffff;
    .footer-result,a {
      -webkit-flex: 5;
      -ms-flex: 5;
      flex: 5;
      text-align: center;
    }

    .footer-result {
      p {
        .fz(font-size,24);
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0 0 1vw;
        span {
          color:@cl;
          .fz(font-size,42);
        }
      }
    }

    .footer-goon {
      background-color: #F4F4F4;
      line-height: 16vw;
    }

    .footer-middle {
      font-size: 12px;
      color: #999;
       -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      p {
        .fz(font-size,24);
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0 0 1vw;
        span {
          color:@cl;
          .fz(font-size,42);
        }
      }
    }

    .footer-pay {
      background-color: @cl;
      line-height: 16vw;
      color:#fff;
      width:20vw;
      border-radius: 5px;
      margin-right: 5px;
       -webkit-flex: 4;
      -ms-flex: 4;
      flex: 4;
    }

  }
</style>
