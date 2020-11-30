<template lang="html">
    <div class="content" v-html="content">
    </div>
</template>

<script>
export default {
  computed:{
    content(){
      return this.$store.state.detail.proData.PRO.MESS;
    }
  }
}
</script>

<style lang="less">
  .content {
    width: 98%;
    margin-top: 10px;
    margin-left:1vw;margin-right: 1vw;
    border-top: 20px solid #F8FCFF;
    font-size: 17px;
    letter-spacing: 3px;
    line-height: 26px;
  }
  .content img{
    width: 100%;
    height: 100%;
  }

</style>
