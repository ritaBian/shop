<template>
  <div class="">

    <!-- 门票游玩详情 -->
    <shopPlay v-if="pid==1494" :id="options.id"></shopPlay>

    <!-- 餐饮美食详情 -->
    <shopEat v-if="pid==1506" :id="options.id"></shopEat>

    <!-- 民族客栈详情 -->
    <shopHotel v-if="pid==1510" :id="options.id"></shopHotel>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    // beforeRouteLeave(to, from, next) {
    //     if (to.name == "商家详情"&&from.name === '详情') {
    //       this.$store.commit("noKeepAlive", "store");
    //     }
    //     next();
    // },
    data() {
      return {
        options:'',
        pid:'',
      }
    },
    created(options) {
      // 1494门票玩乐，1506餐饮美食，1510民族客栈
      this.options = this.$route.query
      this.fromData()
    },
    methods: {
      //详情接口
      fromData(item){
          var data = {
           id:this.options.id,
          }
          var that = this;
          this.$dopost('/sysapi/travel/detail/',data,function (res) {
            this.pageData = res.data.data
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.pid = res.data.data.BIG_SORT.ID
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this));
      }

    },

  }


</script>

<style scoped="scoped">
  /* @import url("../../css/shop_new_detail.css"); */

</style>
