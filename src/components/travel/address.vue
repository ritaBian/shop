<template>
  <div class="">
    <!-- <img class="house_swiper_delete " v-if="houseBoolean" src="../../../static/shop_detail/delete.png"> -->
    <!-- 评价列表 -->

    <van-popup class="address_view" v-model="show" @close="onClose">
      <!-- <iframe id="baidumapiframe" :src="mapUrl"  allowtransparency="true" style="width: 100%; height: 300px; border: 0px none;margin: 0.4rem 0;"></iframe> -->
      <!-- <iframe scrolling="auto" allowtransparency="true" id="layui-layer-iframe4" name="layui-layer-iframe4" onload="this.className='';"  frameborder="0" src="http://xgxs.huiup.com/mobile/map.html?ID=25833" ></iframe> -->
      <iframe id="baidumapiframe" src="http://xgxs.huiup.com/mobile/map.html" width="100%" height="100%" allowtransparency="true" frameborder="0" scrolling="auto" ></iframe>
    </van-popup>


  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    name: "app_address",
    //属性
    props: {
      // id: {
      // 	type: null,//属性类型
      // 	value: ""
      // },
    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        mapUrl:'',
        show:true,


      }
    },
    created() {
      this.evaluateList = []
      this.page_index = 1
      // http://xgxs.huiup.com
      // ?lng=${res.data.data.EXTRA.LNG}&amp;lat=${res.data.data.EXTRA.LAT}
      this.mapUrl = `${this.domainUrl}/mobile/map.html?lng=${100}&amp;lat=${120}`

      // 防止this的指向改变
      let that = this
      // 在window对象上暴露出一个变量，赋值一个函数
      window.returnLatLng = ()=>{
        // 当iframe中的报表提交按钮点击之后，回调此方法
        that.aa()
      }
      // window.returnLatLng('message', function(e) {
      //   console.log('获取子级B页面返回值:');
      //   console.log(e);
      //   that.aa();
      // })


    },
    mounted(){
      var that = this;
      // window.returnLatLng=this.returnLatLng.bind(this);
       // window['returnLatLng'] = (url,ll,wad) => {
       //   console.log(77,that)
       //   that.returnLatLng(url)
       // }
    },
    methods: {
      aa(lng,lat,name){

      },
      returnLatLng(url){
      },

      click(e){
      },

      onClose(e){
        console.log(1111)
        this.$emit('onAddressClose',e)
      }


    },

  }


</script>

<style scoped="scoped" src="../../css/address.css">

</style>
