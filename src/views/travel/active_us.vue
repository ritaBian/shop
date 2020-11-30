<template>
  <div class="body">
    <van-nav-bar title="橡果互动" left-arrow  @click-left="onBack" />
    <div class="page_body">
      <div class="page_once">
          <div class="page_once_title">{{usContent.name}}</div>
          <div class="page_once_mess" v-html="usContent.mess"></div>
      </div>
      <div class="page_once">
          <div class="page_once_title">{{lianxiContent.name}}</div>
          <div class="page_once_mess" v-html="lianxiContent.mess"></div>
      </div>
      <div class="page_once">
          <div class="page_once_title">{{joinContent.name}}</div>
          <div class="page_once_mess" v-html="joinContent.mess"></div>
      </div>


    </div>


  </div>
</template>

<script>
  import Util from '@/util/common';
  import BScroll from 'better-scroll'
  import Footer2 from '@/common/travel/_footer.vue'
  import {Toast} from 'vant';
  export default {
    name:'active',
    components:{
      'v-footer2':Footer2
    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        usContent:'',
        lianxiContent:'',
        joinContent:'',


      }
    },
    updated() {
    },
    created() {
      //左侧关于我们
      this.onUsData()
    },
    mounted(){
    },
    methods: {
      //关于我们
      onUsData(){
        this.$dopost('sysapi/news/content/',{id:137},function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.usContent = res.data.data
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
        this.$dopost('sysapi/news/content/',{id:138},function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.lianxiContent = res.data.data
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
        this.$dopost('sysapi/news/content/',{id:139},function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.joinContent = res.data.data
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
      }
    },

  }


</script>

<style scoped="scoped" src="../../css/active_us.css">
  /* @import url("../../css/active.css"); */
</style>
