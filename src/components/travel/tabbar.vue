<template>
  <div class="">
    <!-- <img class="house_swiper_delete " v-if="houseBoolean" src="../../../static/shop_detail/delete.png"> -->
      <div class="tabbar_border">
        <div class="tabbar_item" v-if="data.liked==0" @click="onTabbarLike(1)">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img"  :src="require('../../../static/icon/like.png')" >
            <div class="tabbar_item_tag">{{data.liked_count}}</div>
          </div>
          <div class="tabbar_item_text" style="color: #585858;">点赞</div>
        </div>
        <div class="tabbar_item" v-if="data.liked==1" @click="onTabbarLike(2)">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" :src="require('../../../static/icon/like2.png')" >
            <div class="tabbar_item_tag">{{data.liked_count}}</div>
          </div>
          <div class="tabbar_item_text" style="color: #01A862;">点赞</div>
        </div>
        <div class="tabbar_item">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" :src="require('../../../static/icon/liwu.png')" >
          </div>
          <div class="tabbar_item_text">送礼物</div>
        </div>
        <!-- @click="onNavigatePingLun" -->
        <div class="tabbar_item" >
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" :src="require('../../../static/icon/talk.png')" >
            <div class="tabbar_item_jiang">奖</div>
          </div>
          <div class="tabbar_item_text">写评论</div>
        </div>
        <div class="tabbar_item">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" :src="require('../../../static/icon/kefu.png')">
          </div>
          <div class="tabbar_item_text">客服</div>
        </div>
        <div class="tabbar_item">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" :src="require('../../../static/icon/share.png')">
          </div>
          <div class="tabbar_item_text">分享</div>
        </div>
      </div>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    name: "app_tabbar",
    //属性
    props: {
      like_num:{
        type: null,//属性类型
        value: ""
      },
      like_status:{
        type: null,//属性类型
        value: ""
      },
      share_boolean:{
        type: null,//属性类型
        value: ""
      },
      page_id:{
        type: null,//属性类型
        value: ""
      },

    },
    data() {
      return {
        domainUrl:this.$conf.domain,

        loading: false,
        finished: false,
        offset:100,
        page_index:1,
        pageList:[],
        col: 2,
        data:'',


      }
    },
    created() {
      // this.onShows()
    },
    mounted(){
      var that = this;
      // window.returnLatLng=this.returnLatLng.bind(this);
       // window['returnLatLng'] = (url,ll,wad) => {
       //   console.log(77,that)
       //   that.returnLatLng(url)
       // }
    },
    methods: {
      // 滑到底部加载
      loadmore() {
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
      onShows(){
        var that = this;
        var data = {
          page:that.page_index,
          to_id :'',//评论对象的主键
          module: this.module, //模块；1：发现 2：线路  3：目的地,
          city_id:this.$store.state.index.city.id, //ip获取城市接口中返回的城市id
          area_id:this.areaid, //城市下面的区的主键
          keyword:this.keyword,  //关键字
        }
        that.$dopost('/sysapi/comment/list/', data,function (res) {
          console.log('首页数据',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            if(res.data.data.length == 0){
              that.finished = true
            }
            that.loading = false;
            that.page_index = that.page_index + 1
            that.pageList = that.pageList.concat(res.data.data);
            //获取当前页面信息
            // if(this.$store.state.index.currentPage.page!=window.location.href){
            //   this.$store.state.index.currentPage.name = '橡果互动发现页'
            //   this.$store.state.index.currentPage.page = window.location.href
            //   res.data.data.map((item,index) => {
            //     if(res.data.data[index].PIC!=undefined&&res.data.data[index].PIC!=''||res.data.data[index].PIC!=null){
            //       this.$store.state.index.currentPage.image = that.domainUrl + '/' + res.data.data.data[index].PIC
            //       return
            //     }else if(res.data.data.length-1 == index){
            //       this.$store.state.index.currentPage.image = this.$conf.defaultPicture
            //     }
            //   })
            // }

        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
    },

  }

</script>

<style scoped="scoped" src="../../css/tabbar.css">

</style>
