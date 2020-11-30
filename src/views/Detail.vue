<template lang="html">
  <div class="detail">
    <v-swiper> </v-swiper>
    <v-chose></v-chose>
    <v-content></v-content>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
    <!-- <v-footer2></v-footer2> -->
    
  </div>
</template>

<script>
import Swiper from '@/components/detail/swiper.vue'
import Chose from '@/components/detail/chose.vue'
import Content from '@/components/detail/content.vue'
import Footer from '@/components/detail/footer.vue'
import Baseline from '@/common/_baseline.vue'
import Util from '@/util/common'

import Footer2 from '../common/travel/_footer2.vue'
export default {
  components:{
    'v-swiper':Swiper,
    'v-chose':Chose,
    'v-content':Content,
    'v-footer':Footer,
    'v-footer2':Footer2,
    'v-baseline':Baseline
  },
  beforeCreate()
  {
    this.$dopost('/sysapi/pro/detail/', {id:this.$route.query.id},
		function (res) {
			if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
			{//console.log(res.data.data);
        this.$store.state.detail.selectType={};
        this.$store.commit('SET_DATAS',res.data.data);

          if(this.$store.state.index.currentPage.page!=window.location.href)
          {
            this.$store.state.index.currentPage.name = res.data.data.PRO.NAME
            this.$store.state.index.currentPage.desc = res.data.data.PRO.NAME2
            this.$store.state.index.currentPage.page = window.location.href
            this.$store.state.index.currentPage.image = Util.getNull(res.data.data.PICS)?this.$conf.domain + '/' +res.data.data.PICS[0]:''
          }
        //this.$forceUpdate();
        //this.$set(this.$store.state.detail.proData.PRO, 'PICS', res.data.data.PRO.PICS);
			}
			else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
    }.bind(this));
    //this.$store.dispatch('setDatas',{id:this.$route.query.id});
    
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
