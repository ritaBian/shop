<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header v-if="false"></v-header>
    <v-swiper :swiperData="swiper"></v-swiper>
    <v-service></v-service>
    <template v-for="v in sortpro">
      <v-prosort :prosort="v"></v-prosort>
    </template>
    <v-baseline></v-baseline>
    <!-- <v-footer></v-footer> -->
    <v-footer2></v-footer2>
  </div>
</template>


<script>
import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import prosort from '@/components/index/prosort.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'

import Footer2 from '../common/travel/_footer2.vue'
export default {
  name:'index',
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-prosort': prosort,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-footer2': Footer2
  },
  data() {
    return {
      datas: {},
      swiper:[],
      sortpro:[],
      loading:true
    }
  },
  beforeCreate() {

	

	  	this.$dopost('/sysapi/pic/lun_bo/', {a:'a',b:'b'},
		function (res) {
			if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
			{
        		this.swiper = res.data.data;
			}
			else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
    }.bind(this),true);

	  	this.$dopost('/sysapi/pro/index_pro/', null,
		function (res) {
			if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
			{
        		this.sortpro = res.data.data;
			}
			else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
    }.bind(this));
	
  }


  
}
</script>



<style lang="less" scoped>
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
}
</style>