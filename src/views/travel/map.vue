<template>
  <div class="page">
    <!-- <iframe v-if="type==1" class="map" :src="src"></iframe> -->

    <div class="pageIcon iconLeft" @click="onBack" v-if="type==2">
      <van-icon name="arrow-left" color="#FFFFFF" size="1.09rem" />
    </div>
    <iframe v-if="type==2" class="map" id="baidumapiframe" :src="src" allowtransparency="true"></iframe>
  </div>

</template>


<script>
  import {Toast} from 'vant';
export default {

  data () {
    return {
      domainUrl:this.$conf.domain,
      center: {lng: 0, lat: 0},
      zoom: 12,
      src:'',
      type:'',
    }
  },
  created() {
    console.log('参数',this.$route.query)
    // var options = this.$route.query
    this.initData(this.$route.query)
  },
  methods: {
    initData(item){
      if(item.type==2){
        this.type = 2
        this.src = `${this.domainUrl}/mobile/map_view.html?lng=${item.lng}&lat=${item.lat}`
      }else{
        this.type = 1
        // this.src = `http://api.map.baidu.com/marker?location=${item.lat},${item.lng}&title=${item.name}&content=${item.name}&output=html&src=webapp.baidu.openAPIdemo`
        window.location.href = `http://api.map.baidu.com/marker?location=${item.lat},${item.lng}&title=${item.name}&content=${item.name}&output=html&src=webapp.baidu.openAPIdemo`
      }
      //获取当前页面信息
      if(this.$store.state.index.currentPage.page!=window.location.href){
        this.$store.state.index.currentPage.name = '橡果互动'
        this.$store.state.index.currentPage.page = window.location.href
        this.$store.state.index.currentPage.image = '';
      }
    },
    onBack(){
       if (window.history.length <= 1) {
           this.$router.push({path:'/'})
           return false
       } else {
           this.$router.go(-1)
       }
    }
  }
}
</script>

<style>
body{
  width: 100%;
  height: 100%;
}
.page{
  width: 100%;
  height: 100vh;
}
.map {
  width: 100%;
  height: 100%;
}
.pageIcon{
  width: 2.19rem;
  height: 2.19rem;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: fixed;
  z-index: 100;
}
.iconLeft{
  top: 0.94rem;
  left: 0.75rem;
}
</style>
