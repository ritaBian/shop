<template lang="html">
  <div class="wrap">
<van-nav-bar v-if="false"
  title="菜谱"
  left-text=""
  @click-left="$router.go(-1)"
/>
    <section class="view">
      <v-aside :datas="allData[0].list" v-if="allData[0] && allData[0].list"></v-aside>
      <router-view :datas="allData[0].list"  v-if="allData[0] && allData[0].list"></router-view>
    </section>
    <v-baseline></v-baseline>
    <!-- <v-footer></v-footer> -->
    <v-footer2></v-footer2>

  </div>
</template>

<script>

import Header from '@/common/_header.vue'
import Aside from '@/components/category/aside.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import Util from '@/util/common'
import Footer2 from '../common/travel/_footer2.vue'
import { NavBar,Dialog } from 'vant';
import 'vant/lib/index.css';

export default {
  name:'category',
  components:{
    [NavBar.name]:NavBar,
    'v-aside': Aside,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-footer2': Footer2
  },
  data(){
    return {
      allData:''
    }
  },
  created(){
	  this.$dopost('/sysapi/pro/sort/', null,
		function (res) {
			if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
			{
        		this.allData = res.data.data;
			}
			else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
    }.bind(this));
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-flow: column nowrap;
            flex-flow: column nowrap;

    .view {
      width: 100%;
      height:100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }
</style>
