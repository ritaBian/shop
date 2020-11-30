<template>
  <div class="body">
      <div class="page_body">
        <div class="page_title_border">
          <van-icon class="page_title_icon" name="arrow-left" color="#2C2C2C" size="1.09rem" @click="onBack" />
          <van-search class="page_title_input " v-model="searchValue" placeholder="请输入搜索关键词"  @blur="onBlur" />
          <div v-if="false" class="page_title_Button" @click="showPopup=true">提交新目的地</div>
        </div>

        <!-- 搜索 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onShowsDown"
          class="address_view_view "
          :offset="offset"
          :immediate-check="false"
          >
            <!-- <div class="address_once">
              <img class="address_icon" style="width: 0.75rem;height: 0.93rem;" :src="require('../../../static/icon/circuit_search/address.png')">
              <div style="margin-left: 0.71rem;">{{city.name}}</div>
            </div> -->
            <div class="address_border">
              <div class="address_once_hotel" v-for="(item,index) of addressList" :key="index" @click="onAddress(item)">
                <!-- <img class="address_icon" v-if="false" style="width: 1rem;height: 0.87rem;" src="../../../static/icon/circuit_search/hotel.png">
                <img class="address_icon" v-if="false" style="width: 0.93rem;height: 0.93rem;" src="../../../static/icon/circuit_search/restaurant.png">
                <img class="address_icon" v-if="false" style="width: 1rem;height: 0.87rem;" src="../../../static/icon/circuit_search/home.png">
                <img class="address_icon" v-if="true" style="width: 0.96rem;height: 1rem;" src="../../../static/icon/circuit_search/scenic-spot.png"> -->
                <div class="address_view">
                  <div>{{item.NAME}}</div>
                  <div class="address_view_text">{{item.ADDRESS}}</div>
                </div>
              </div>
            </div>
        </van-list>


      </div>


      <van-popup class="addressPopup" :round="true" :closeable="true" v-model="showPopup">
        <van-field class="addressInput"  v-model="addressValue"  placeholder="请输入新目的地" />
        <div class="addressInputButton" @click="onSubmit">提交</div>
      </van-popup>


  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  import conf from '../../conf.js';
  import Im from '@/util/im'

  export default {
    data() {
      return {
        city:this.$store.state.index.city,
        searchValue: '',
        options:'',

        addressList:[],
        loading: false,
        finished: false,
        offset:100,
        page_index:1,

        addressValue:'',
        showPopup:false,
      }
    },
    created() {
      this.options = this.$route.query
      this.initData()
    },
    mounted(){

    },
    updated() {
      this.city = this.$store.state.index.city
    },
    methods:{
      //滑到底部
      onShowsDown(){
         var that = this;
         setTimeout(function() {
           that.initData()
         }, 1000);
      },
      //选择地址
      onAddress(item){
        if(this.options.type==1){
          this.$store.state.index.road_data.road_all[this.options.index].SCENIC_ID = item.ID
          this.$store.state.index.road_data.road_all[this.options.index].addressName = item.NAME
        }else if(this.options.type==8){
          this.$store.state.index.track_address_id = item.ID
          this.$store.state.index.track_address_name = item.NAME
        }else{
          this.$store.state.index.road_edit.road_all[this.options.index].SCENIC_ID = item.ID
          this.$store.state.index.road_edit.road_all[this.options.index].addressName = item.NAME
        }
        this.$router.go(-1)

      },
      initData(){
        console.log(11111111111111111)
        var data = {
           page:this.page_index,
           city_id:this.city.id ,//城市id
           keyword:this.searchValue  ,//关键字
        }
        var that = this;
        that.$dopost('/sysapi/scenic/list/', data,function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            if(res.data.data.length == 0){
              that.finished = true
            }
            that.loading = false;
            that.page_index = that.page_index + 1
            that.addressList = that.addressList.concat(res.data.data);
            if(that.addressList.length == 0){
              //this.$toast('没您想要的，请点击提交新目的地')
            }

            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = '橡果互动地址搜索页'
              this.$store.state.index.currentPage.page = window.location.href
              this.$store.state.index.currentPage.image = '';
            }

        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      onSubmit(){
        if(this.addressValue==''){
          this.$toast('请输入新目的地')
          return
        }

        Im.SendMess(`提交新目的地：${this.addressValue}`,conf.ChuanHai_ServieID,'friend');
        this.showPopup = false
        this.$toast('提交成功')
      },
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
      },
      onBlur(){
        this.page_index = 1
        this.addressList = []
        this.initData()
      },


    },

  }


</script>

<style scoped="scoped" src="../../css/circuit_search.css">
  /* @import url("../../css/circuit_search.css"); */
  ::-webkit-scrollbar {
    width: 0;
  }
</style>
