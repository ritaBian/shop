<template lang="html">

<mt-header :title="this.$conf.name">

  <router-link :to="{path:'/user'}" slot="right">
    <van-icon name="contact" />
  </router-link>
</mt-header>
</template>

<script>
import { Icon} from 'vant';

export default {
  components:{
    [Icon.name]:Icon
  }
  }
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/index/style.css';
.mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333!important;
    .fz(font-size, 40)!important;
}
</style>
