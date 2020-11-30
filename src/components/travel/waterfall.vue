<template>
  <div class="">
    <!-- <img class="house_swiper_delete " v-if="houseBoolean" src="../../../static/shop_detail/delete.png"> -->
    <!-- 评价列表 -->


    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadmore"
    > -->
    <!-- @loadmore="loadmore" -->

    <!-- </van-list> -->




    <waterfall :col="col" :data="pageList"  @loadmore="loadmore">
      <template>
          <div class="cell-item" v-for="(item,index) in pageList" :key="index" @click="app_TrackDetail(item)">
            <!-- v-if="item.PIC1||item.PIC&&item.target.name" -->
           <div :class="[item.PIC1||item.PIC&&item.target.name?'item-img-border':'item-img-border2']" >
              <img class="cell-item-img" v-if="type_id==''&&item.PIC1" :lazy-src="user_face(item.PIC1)"   >
              <img class="cell-item-img" v-if="type_id!=''&&item.PIC" :lazy-src="user_face(item.PIC)"  >
              <div class="cell-item-img2"></div>
              <div class="cell-item-img-label app_line " v-if="type_id!=''&&item.target.name">{{item.target.name}}</div>
            </div>
            <div class="cell-item-title app_line2" v-if="item.CONTENT!=''&&item.CONTENT!=undefined">{{item.CONTENT}}</div>
            <div class="cell-item-user ">
              <img class="cell-item-face " :src="user_face(item.USER_ID_PIC)" v-if="item.USER_ID_PIC" >
              <div class="cell-item-nickname ">{{item.USER_ID_NAME}}</div>
            </div>
          </div>
      </template>
    </waterfall>

    <div class="loadingClass " >
       <van-loading v-if="loading" type="circular" size="1.9rem" >加载中....</van-loading>
       <div v-if="finished" class="loadingClassBottom">已经到底啦</div>
     </div>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    name: "app_waterfall",
    //属性
    props: {
      module: {
      	type: null,//属性类型
      	value: "",
         default:'',
      },
      keyword: {
      	type: null,//属性类型
      	value: "",
         default:'',
      },
      areaid: {
      	type: null,//属性类型
      	value: "",
         default:'',
      },
      to_id: {
      	type: null,//属性主键
      	value: "",
        default:'',
      },
      city_id: {
      	type: null,//属性主键
      	value: "",
        default:'',
      },
      type_id: {
      	type: null,//判断是不是享迹列表
      	value: "",
        default:'',
      },
    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        // city:this.$store.state.index.city,

        loading: false,
        finished: false,
        offset:100,
        page_index:1,
        pageList:[],
        col: 2,
        area_id:'',


      }
    },
    computed:{
      user_face:function(){
         return function(url){
            var index = url.indexOf("://")
            if(index==-1){
               return this.domainUrl + '/' + url
            }else{
               return url
            }
         }
      }
    },
    updated() {
      this.keyword = this.keyword
      // this.city = this.$store.state.index.city
    },
    created() {


    },
    mounted(){
      var that = this;
      setTimeout(function() {
        that.onShows()
      }, 300);
      // window.returnLatLng=this.returnLatLng.bind(this);
       // window['returnLatLng'] = (url,ll,wad) => {
       //   console.log(77,that)
       //   that.returnLatLng(url)
       // }
    },
    methods: {
      // 滑到底部加载
      loadmore() {
        console.log(999999)
        this.loading = true;
        if(!this.finished){
          this.onShows()
        }else{
          this.loading = false;
        }
      },
      //点击享迹跳转
      app_TrackDetail(item){
        this.$router.push({
        	path: '/track_detail',
           query: {
             id:item.ID
        	}
        })

      },
      //分页数据
      onShows(e,id,word){
        if(e==1){
          this.page_index = 1
          this.pageList = []
          this.area_id = id
          this.finished = false
        }
        if(e==2){
          this.page_index = 1
          this.pageList = []
          this.area_id = id
          this.finished = false
        }
        var that = this;
        var data = {
          page:that.page_index,
          to_id :this.to_id,//评论对象的主键
          module: this.module, //模块；1：发现 2：线路  3：目的地,
          city_id:this.city_id, //ip获取城市接口中返回的城市id
          area_id:this.area_id, //城市下面的区的主键
          keyword:e==2?word:this.keyword,  //关键字
        }
        var token = this.$store.state.login.token
        console.log(111111111111,data)
        if(token!=1){
          that.$dopost('/sysapi/comment/list/', data,function (res) {
            console.log('首页数据',res)
          	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              if(res.data.data.length == 0){
                that.finished = true
              }
              that.loading = false;
              that.page_index = that.page_index + 1
              that.pageList = that.pageList.concat(res.data.data);

              // var src = window.location.href
              // var srcList = src.split("/")
              // if(srcList[srcList.length-1]=='track'){
              //  var getNull = Util.getNull(that.area_id)||Util.getNull(that.keyword)

              //   var pageNullNum = that.$store.state.index.trackPageNum
              //   if(pageNullNum==1&&that.pageList.length==0&&getNull==false){
              //     this.$router.push({
              //     	path: '/city',
              //       query: {
              //          type: 3,
              //       }
              //     })
              //   }
              // }
          	}else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this));
        }else{
          that.$dopost('/sysapi/comment/list/', data,function (res) {
            console.log('首页数据',res)
          	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              if(res.data.data.length == 0){
                that.finished = true
              }
              that.loading = false;
              that.page_index = that.page_index + 1
              that.pageList = that.pageList.concat(res.data.data);

              var src = window.location.href
              var srcList = src.split("/")
              if(srcList[srcList.length-1]=='track'){
               var getNull = Util.getNull(that.area_id)||Util.getNull(that.keyword)

                var pageNullNum = that.$store.state.index.trackPageNum
                if(pageNullNum==1&&that.pageList.length==0&&getNull==false){
                  this.$router.push({
                  	path: '/city',
                    query: {
                       type: 3,
                    }
                  })
                }
              }
          	}else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }

      },
    },

  }

</script>

<style scoped="scoped" src="../../css/waterfall.css">

</style>
