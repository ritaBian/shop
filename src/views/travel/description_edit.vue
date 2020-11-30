<template>
  <div class="body">
      <van-nav-bar title="线路描述" left-arrow  @click-left="onBack" />

      <div class="page_body">
        <div class="page_div ">
          <textarea class="page_textarea" v-model="textValue" maxlength="500" placeholder="填写线路描述"></textarea>
          <div class="page_div_number">还可以发布<span style="color: #01A862;">{{500-textValue.length}}</span>个字</div>
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
        // .innerText
        this.textValue = this.$store.state.index.road_data.road_description;
      }else{
        this.textValue = this.$store.state.index.road_edit.road_description
      }
      console.log(this.textValue,this.options.type)
      //获取当前页面信息
      if(this.$store.state.index.currentPage.page!=window.location.href){
        this.$store.state.index.currentPage.name = '橡果互动填写线路描述页'
        this.$store.state.index.currentPage.page = window.location.href
        this.$store.state.index.currentPage.image = '';
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
        // var content = Util.contentBr(this.textValue);
        if(this.options.type==1){
          this.$store.state.index.road_data.road_description = this.textValue
        }else{
          this.$store.state.index.road_edit.road_description = this.textValue
          this.$store.state.index.road_edit_type = 2
        }
        this.$router.go(-1)
      },
    },

  }


</script>

<style scoped="scoped" src="../../css/description_edit.css">
  /* @import url("../../css/description_edit.css"); */
</style>
