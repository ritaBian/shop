<template lang="html">

    <div class="car">
<van-nav-bar
  title="购物车"
  left-text=""
  right-text="清空"
  @click-left="$router.go(-1)"
  @click-right="clearCar"
/>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-prolist v-if="count"></v-prolist>
      <v-nothing v-else></v-nothing>
      <v-footer></v-footer>
      <!-- <v-footer2></v-footer2> -->
      <v-footer3></v-footer3>
    </div>
</template>

<script>
import Header from '@/common/_header.vue'
import Nothing from '@/components/car/nothing.vue'
import prolist from '@/components/car/prolist.vue'
import Footer from '@/components/car/footer.vue'
import Footer2 from '@/common/_footer.vue'
import Footer3 from '../common/travel/_footer2.vue'
import { NavBar,Dialog } from 'vant';
import Util from '@/util/common';
import 'vant/lib/index.css';

export default {
  components:{
    [NavBar.name]:NavBar,
    'v-nothing':Nothing,
    'v-prolist':prolist,
    'v-footer':Footer,
    'v-footer2':Footer2,
    'v-footer3':Footer3
  },
  methods: {
    clearCar() {
      Dialog.confirm({
        title: '',
        message: '确定退出么？'
      }).then(() => {
        Util.setLocal('','carList');
        this.$store.state.detail.carList=[];
        this.$store.state.detail.count=0;
        this.$store.state.detail.selectedList='';
        this.$store.state.detail.unSelectedList='';
        this.$store.commit('RESET_CARLIST');
        this.$forceUpdate();
      }).catch(() => {
        // on cancel
      });
    }
  },
  computed:{
    count(){


      return this.$store.state.detail.count

    }
  },
  mounted(){
    // 防止刷新页面数据为空
    if (this.$store.state.detail.count=="") {

      this.$store.commit('RESET_COUNT');

    }
  }

}
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  padding-bottom: 32vw;
}
</style>
