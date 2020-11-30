<template>
  <div class="body">
      <van-nav-bar title="线路标题" left-arrow  @click-left="onBack" />

      <div class="page_body">
        <div class="page_div ">
          <textarea class="page_textarea" v-model="textValue" placeholder="填写线路标题"></textarea>
        </div>
        <div class="submitButton" @click="onSubmit">保存</div>
      </div>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {
        textValue:'',
        options:'',
      }
    },
    created() {
      this.options = this.$route.query
      if(this.options.type==1){
        this.textValue = this.$store.state.index.road_data.road_title
      }else{
        this.textValue = this.$store.state.index.road_edit.road_title
      }
      //获取当前页面信息
      if(this.$store.state.index.currentPage.page!=window.location.href){
        this.$store.state.index.currentPage.name = '橡果互动线路填写标题页'
        this.$store.state.index.currentPage.page = window.location.href
        this.$store.state.index.currentPage.image = ''
      }
    },
    mounted(){
    },
    methods: {
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
      },
      onSubmit(){
        if(this.options.type==1){
          this.$store.state.index.road_data.road_title = this.textValue
        }else{
          this.$store.state.index.road_edit.road_title = this.textValue
          this.$store.state.index.road_edit_type = 2
        }
        this.$router.go(-1)
      },
    },

  }


</script>

<style scoped="scoped" src="../../css/title_edit.css">
  /* @import url("../../css/title_edit.css"); */
</style>
