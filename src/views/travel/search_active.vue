<template>
  <div class="body">
      <div class="page_body">
        <div class="page_title_border">
          <van-icon class="page_title_icon" name="arrow-left" color="#2C2C2C" size="1.09rem" />
          <van-search class="page_title_input " v-model="value" placeholder="请输入搜索关键词" />
        </div>

        <!-- 搜索 -->
        <div class="address_border">
          <div class="address_once">
            <img class="address_icon" style="width: 0.75rem;height: 0.93rem;" src="../../../static/icon/circuit_search/address.png">
            <div style="margin-left: 0.71rem;">青岛 山东</div>
          </div>
          <div class="address_once_hotel">
            <img class="address_icon" v-if="false" style="width: 1rem;height: 0.87rem;" src="../../../static/icon/circuit_search/hotel.png">
            <img class="address_icon" v-if="false" style="width: 0.93rem;height: 0.93rem;" src="../../../static/icon/circuit_search/restaurant.png">
            <img class="address_icon" v-if="false" style="width: 1rem;height: 0.87rem;" src="../../../static/icon/circuit_search/home.png">
            <img class="address_icon" v-if="true" style="width: 0.96rem;height: 1rem;" src="../../../static/icon/circuit_search/scenic-spot.png">
            <div class="address_view">
              <div>欣桥盛酒店</div>
              <div class="address_view_text">山东省青岛市崂山区崂山景区旅游专用路西50米</div>
            </div>
          </div>

        </div>

      </div>




    <!-- 选择日期 -->
    <van-calendar v-model="dateShow" @confirm="onConfirm" color="#01A862" />
    <!-- 蒙层 -->
    <!-- <div class="mask" v-if="maskBoolean" @click="onMask"></div>

    <loading :show="loading" /> -->

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {
        value: '',

      }
    },
    mounted(){
        // this.onOffsetDiv();
        this.data = this.originData;
    },
    methods: {
      formatDate(date) {
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      },
      // 选择日期
      onConfirm(date) {
        this.dateShow = false;
        this.dateValue = this.formatDate(date);
      },

      onClickLeft() {
        // Toast('返回');
      },
      //上传
      onUploadImg(e){
      },
      //勾选协议
      onAgreementClick(){
        this.agreementBoolean = !this.agreementBoolean
      },

      // //点击蒙层
      // onMask(){
      //   this.listBoolean = false
      //   this.maskBoolean = false
      // },
      //点击选项
    },

  }


</script>

<style scoped="scoped" src="../../css/circuit_search.css">
  /* @import url("../../css/circuit_search.css"); */
  ::-webkit-scrollbar {
    width: 0;
  }
</style>
