<template>
  <div class="body">
      <van-nav-bar title="门票信息" left-arrow  @click-left="onBack" />
      <div class="page_body">
        <div class="page_title">崂山门票（巨峰-太清-仰口）+观光车+仰口上下行索道+电子导览图票</div>

        <div class="white_border">
          <div class="white_once">
            <div class="white_once_title">1日票</div>
            <div style="color: #939393;">购票后请至景区官网或公众号进行入园登记</div>
            <div class="white_once_view">
              <div class="white_view_for " v-for="(item,index) of 2" :key="index" :style="{border:index==1?'none':''}">
                <div class="white_view_left">
                  <div class="white_view_left_title">成人票</div>
                  <div class="white_view_left_green">积分可兑换￥3.00元；满100减10元</div>
                  <div class="white_view_left_yellow">随时退<span class="white_view_left_black">无需取票</span></div>
                  <div class="white_view_left_bottom">新品<span style="margin: 0 0.4rem;">|</span>已售72<span style="margin: 0 0.4rem;">|</span>购买须知</div>
                </div>
                <div class="white_view_right">
                  <div class="white_view_right_title">原价 360元</div>
                  <div class="white_view_right_money">¥<span class="white_view_right_money2">158</span><span class="white_view_right_qi">起</span></div>
                  <div class="white_view_right_button" @click="onClickSubmit(item)">预定</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {


      }
    },
    mounted(){

    },
    methods: {
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
      },
      // 下单
      onClickSubmit(item){
      },
    },

  }


</script>

<style scoped="scoped" src='../../css/card_detail.css'>
  /* @import url("../../css/card_detail.css"); */
</style>
