<template>
  <div class="page_body">
    <div class="page_top_border ">
      <div class="pageIcon iconLeft" @click="onBack">
        <van-icon name="arrow-left" color="#FFFFFF" size="1.09rem" />
      </div>
      <!-- <div class="pageIcon iconRight">
        <img class="pageIcon_home" src="../../../static/icon/shop_detail/home.png">
      </div> -->
      <!-- 轮播 -->
      <van-swipe class="swiper_border" v-if="data.data!=undefined" @change="onChangeSwiper" :loop="loop" :show-indicators="showIndicators">
        <van-swipe-item v-for="(item,index) of swiperImage" :key="index">
          <van-image class="swiper_img" fit="cover" :src="domainUrl+'/'+item" />
        </van-swipe-item>
      </van-swipe>
      <!-- 底部 -->
      <div class="swiper_comment" v-if="data.data!=undefined?data.data.COMMENT_COUNT!=0:false">
        <div>{{data.data.COMMENT_PERSON_COUNT}}人点评</div>
        <van-icon  name="arrow" color="#FFFFFF" size="0.69rem" />
      </div>
      <div class="swiper_index">
        <div style="margin-left: 0.12rem;">{{current}}/{{swiperImage.length}}</div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content_border ">
      <div class="content_title" v-if="data.data!=undefined">{{data.data.NAME}}</div>
      <div class="content_title_text" v-if="data.data!=undefined">
        <div class="content_title_text_left">
          <div class="content_title_text_bold" v-if="data.data.COMMENT_NUM!=0">{{data.data.COMMENT_NUM}}</div>
          <div style="color: #999999;" v-if="data.data.COMMENT_NUM!=0">/5.0分</div>
          <!-- v-if="data.data!=undefined?data.data.COMMENT_COUNT!=0:false" -->
          <div class="content_title_text_youxiu" v-if="data.data.COMMENT_NUM!=0">{{scoreText(data.data.COMMENT_NUM)}}</div>
          <div v-if="data.data.SELL_POINT!=''">“{{data.data.SELL_POINT}}”</div>
        </div>
        <div class="content_title_text_right">
          <div style="margin-right: 0.24rem;" v-if="data.data.COMMENT_COUNT!=0">{{data.data.COMMENT_COUNT}}条点评</div>
          <van-icon  name="arrow" color="#C0C0C0" size="0.69rem" v-if="data.data.COMMENT_COUNT!=0"/>
        </div>
      </div>
      <div class="bottom_border"></div>

      <div class="content_address_border" v-if="data.data!=undefined">
        <div class="content_address_left" >
          {{data.data.ADDRESS}}
          <span style="color: #999999;">{{data.data.AREA_NAME}}</span>
        </div>
        <div class="content_address_right" v-if="data.data.LAT!=''&&data.data.LAT!=undefined" @click="onMap">
          <div style="margin-right: 0.24rem;">地图/周边</div>
          <van-icon  name="arrow" color="#C0C0C0" size="0.69rem" />
        </div>
      </div>
      <div class="bottom_border "></div>
      <div class="content_service" v-if="data.data!=undefined?(data.data.TRAFFIC!=''):false">
        <div class="content_service_title">交通信息</div>
        <div class="content_service_common">{{data.data.TRAFFIC}}</div>
      </div>
      <div class="content_service" v-if="data.data!=undefined?(data.data.TEL!=''):false"  :style="{'margin-top':data.data.TRAFFIC!=''?'-0.75rem':''}">
        <div class="content_service_title">联系电话</div>
        <div class="content_service_common" v-if="data.data.TEL">{{data.data.TEL==''?'暂无':data.data.TEL}}</div>
      </div>
	  
<div class="content_service" v-if="data.data!=undefined?(data.data.OPENING_HOURS!=''):false" >
		<div class="content_service_title">开放时间</div>
        <div class="content_service_common">{{data.data.OPENING_HOURS==''?'暂无':data.data.OPENING_HOURS}}</div>
</div>

<div class="content_service" v-if="data.data!=undefined?(data.data.STATUS_JING!=''):false" >
		<div class="content_service_title">经营状态</div>
        <div class="content_service_common">{{data.data.STATUS_JING==''?'暂无':data.data.STATUS_JING}}</div>
</div>

<div class="content_service" v-if="data.data!=undefined?(data.data.PLAY_TIME!=''):false" >
		<div class="content_service_title">用时参考</div>
        <div class="content_service_common">{{data.data.PLAY_TIME==''?'暂无':data.data.PLAY_TIME}}</div>
</div>

<div class="content_service" v-if="data.data!=undefined?(data.data.MARKET_PRICE!=''):false" >
		<div class="content_service_title">门票信息</div>
        <div class="content_service_common">{{data.data.MARKET_PRICE==''?'暂无':data.data.MARKET_PRICE}}</div>
</div>

<div class="content_service" v-if="data.data!=undefined?(data.data.NOTICE!=''):false" >
		<div class="content_service_title">预订须知</div>
        <div class="content_service_common">{{data.data.NOTICE==''?'暂无':data.data.NOTICE}}</div>
</div>

<div class="content_service" v-if="data.data!=undefined?(data.data.SELF_MEDIA_NAME!=''):false" >
		<div class="content_service_title">自媒体</div>
        <div class="content_service_common"><a :href="data.data.SELF_MEDIA_URL">{{data.data.SELF_MEDIA_NAME==''?'暂无':data.data.SELF_MEDIA_NAME}}</a></div>
</div>
		

      <div class="bottom_border "></div>
      <div :class="['content_detail',height_content?'content_detail_line':'']" ref="content" >
        <div class="" v-html="contentDetail"></div>
        <!-- v-if="height_content>106" v-html="contentDetail"-->
        <div class="content_detail_white " v-if="height_content" @click="onHeight_content">
          <div>展开阅读全文</div>
          <img class="content_detail_white_img" :src="require('../../../static/icon/shop_detail/zhankai.png')">
        </div>
        <div class="content_detail_white" v-if="height_content_top" @click="onHeight_content">
          <div>收起全文</div>
          <img class="content_detail_white_img" style="transform: rotate(180deg);" :src="require('../../../static/icon/shop_detail/zhankai.png')">
        </div>
      </div>
    </div>

    <!-- 房型 -->
    <div class="whiteList_vant_border">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoadDown"
        class="whiteList_vant "
        :offset="offset"
        :immediate-check="false"
        >
          <div class="home_once " v-for="(item,index) of findList" :key="index" @click="onClickDetails(item)" >
            <div class="home_left ">
              <van-image class="home_left_img" fit="cover" :src="domainUrl+'/'+item.PIC" />
              <div class="home_left_content ">
                <div class="home_left_content_title">{{item.NAME}}</div>
                <div class="home_left_content_text">{{item.NAME2}}</div>
              </div>
            </div>
            <div class="home_right" >
              <div class="home_right_title" v-if="item.PRICE_SHOP!=0">原价 {{item.PRICE_SHOP}}元</div>
              <div class="home_money">￥<span class="home_money2">{{item.PRICE}}</span><span class="home_money3">元</span></div>
            </div>
          </div>
      </van-list>
    </div>


    <!-- 评价列表 -->
    <div class="evaluateList_view ">
      <evaluateList v-if="data.data!=undefined" module="3" :pageid="data.data.ID" ></evaluateList>
    </div>


    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask" @touchmove.prevent="catchtouchmove"></div>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {
        domainUrl:this.$conf.domain,
        token : this.$store.state.login.token,
        allTag:this.$store.state.index.allTag,
        options:'',
        data:'',

        loop:true,
        showIndicators:false,
        current:1,
        swiperImage:[],
        homeList:[1,2],
        height_content:false,
        height_content_top:false,
        height_evaluate:'',
        height_house:'',
        evaluate_all_boolean:false,
        maskBoolean:false,
        tabbarLikeBoolean:false,
        tabbarLike:0,

        houseBoolean:false,
        current_house:1,
        houseFacilityMore:false,

        serivceBoolean:false,

        // icon:[
        //   '../../../static/shop_detail/chuang.png',
        //   '../../../static/shop_detail/man.png',
        //   '../../../static/shop_detail/house.png',
        //   '../../../static/shop_detail/chuanghu.png',
        // ],
        contentDetail:'',

        loading:false,
        finished:false,
        offset:100,
        findList:[],
        page_index:1,


      }
    },
    computed:{
      scoreText:function(){
        return function(index){
          var int = Math.floor(index)
          var scoreList = ['较差','尚可','一般','良好','优秀']
          return scoreList[int]　
        }
      }
      //评分
      // scoreText:[较差、尚可、一般、良好、优秀 ]
    },
    updated() {
      this.token =  this.$store.state.login.token
      this.allTag = this.$store.state.index.allTag
    },
    created() {
      this.options = this.$route.query
      // 页面数据
      this.initData()

    },
    mounted(){
      var that = this
      // setTimeout(function() {
      //   that.$nextTick(() => {
      //     that.onTextDiv();
      //   })
      // }, 500);

    },
    methods: {
      onTextDiv(){
        console.log(99999,this.$refs.content.offsetHeight)
        this.height_content = this.$refs.content.offsetHeight>106?true:false;//详情
        // this.height_evaluate = this.$refs.evaluate.offsetHeight;//详情
        // this.height_house = this.$refs.house.offsetHeight;//详情
      },
      //滑倒底部
      onLoadDown(){
        this.findData()
      },
      //发现列表
      findData(){
        var data = {
          page:this.page_index,
          scenic:this.options.id
        }
        if(this.token!=1){
          // this.$toast('请先登录');
          this.$dopost('/sysapi/travel/list/',data,function (res) {
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.loading = false
              if(res.data.data.data.length==0){
                this.finished = true
              }
              this.page_index = this.page_index + 1
              this.findList = this.findList.concat(res.data.data.data)
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this));
        }else{
          this.$dopost('/sysapi/travel/list/',data,function (res) {
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.loading = false
              if(res.data.data.data.length==0){
                this.finished = true
              }
              this.page_index = this.page_index + 1
              this.findList = this.findList.concat(res.data.data.data)
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },
      initData(){
        var that = this;
        var data = {
         id:this.options.id,//25828 this.pageid
        }
        if(this.token!=1){
          // this.$toast('请先登录');
          this.$dopost('/sysapi/scenic/detail/',data,function (res) {
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.data = res.data.data
              var img = res.data.data.data
              var list = [img.PIC1,img.PIC2,img.PIC3,img.PIC4,img.PIC5,]
              var data = []
              list.forEach(item => {
                if(item!=''){
                  data.push(item)
                }
              })
              this.swiperImage = data

              // 发现列表
              this.findData()

              var richtext=  res.data.data.data.CONTENT
              if(richtext!=''&&richtext!=undefined){
                if(richtext.indexOf(`<img src="`)!=-1){
                  const regex = new RegExp(`<img src="`, 'gi');
                  richtext = richtext.replace(regex, `<img style="width:100%" src="`);
                  this.contentDetail = richtext
                }else{
                  this.contentDetail = richtext
                }
              }else{
                this.contentDetail = ''
              }
              setTimeout(function() {
                  that.onTextDiv();
              }, 500);
              //获取当前页面信息
              if(this.$store.state.index.currentPage.page!=window.location.href){
                this.$store.state.index.currentPage.name = res.data.data.data.NAME
                this.$store.state.index.currentPage.desc = res.data.data.data.NAME2
                this.$store.state.index.currentPage.page = window.location.href
                this.$store.state.index.currentPage.image = Util.getNull(res.data.data.data.PIC)?this.domainUrl + '/' +res.data.data.data.PIC:''
              }
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this));
        }else{
          this.$dopost('/sysapi/scenic/detail/',data,function (res) {
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.data = res.data.data
              var img = res.data.data.data
              var list = [img.PIC1,img.PIC2,img.PIC3,img.PIC4,img.PIC5,]
              var data = []
              list.forEach(item => {
                if(item!=''){
                  data.push(item)
                }
              })
              this.swiperImage = data
              // 发现列表
              this.findData()

              var richtext=  res.data.data.data.CONTENT
              if(richtext!=''&&richtext!=undefined){
                if(richtext.indexOf(`<img src="`)!=-1){
                  const regex = new RegExp(`<img src="`, 'gi');
                  richtext = richtext.replace(regex, `<img style="width:100%" src="`);
                  this.contentDetail = richtext
                }else{
                  this.contentDetail = richtext
                }
              }else{
                this.contentDetail = ''
              }
              setTimeout(function() {
                  that.onTextDiv();
              }, 500);
              //获取当前页面信息
              if(this.$store.state.index.currentPage.page!=window.location.href){
                this.$store.state.index.currentPage.name = res.data.data.data.NAME
                this.$store.state.index.currentPage.desc = res.data.data.data.NAME2
                this.$store.state.index.currentPage.page = window.location.href
                this.$store.state.index.currentPage.image = Util.getNull(res.data.data.data.PIC)?this.domainUrl + '/' +res.data.data.data.PIC:''
              }
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },

      //点击房屋更多设施
      onHouseFacilityMore(){
        this.houseFacilityMore = !this.houseFacilityMore
      },
      //点赞加一
      onTabbarLike(){
        if(this.tabbarLikeBoolean){
          this.tabbarLike = this.tabbarLike - 1
          this.tabbarLikeBoolean = false
        }else{
          this.tabbarLike = this.tabbarLike + 1
          this.tabbarLikeBoolean = true
        }
      },
      //swiper滑动
      onChangeSwiper(e){
        this.current = e + 1
      },
      //房屋swiper滑动
      onChangeSwiperHouse(){
        this.current_house = e + 1
      },
      // 滑到底部加载
      loadmore() {
        this.loading = true;
        setTimeout(() => {
          this.data = this.data.concat(this.originData, this.originData);
          this.loading = false;
        }, 1000);
      },
      //点击房型跳到详情页
      onClickDetails(item){
        console.log(item)
        this.$router.push({
        	path: '/shop_new_detail',
           query: {
             id:item.ID,
        	}
        })
      },
      //点击房屋弹出框
      onClickHome(){
        this.maskBoolean = true
        this.houseBoolean = true
      },
      // 地图
      onMap(){
        console.log(this.data)
        var data = this.data.data
        this.$router.push({
        	path: '/map',
           query: {
             type:2,
        	   lat: data.LAT,
             lng: data.LNG,
        	}
        })
      },
      //点击蒙层
      onMask(){
        this.listBoolean = false
        this.maskBoolean = false
        this.houseBoolean = false
        this.serivceBoolean = false
      },
      //点击阅读全文
      onHeight_content(){
        if(this.height_content){
          this.height_content = false;
          this.height_content_top = true;
        }else{
          this.height_content = true;
          this.height_content_top = false;
        }
      },
      catchtouchmove(e){
        // console.log(e)
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

<style scoped="scoped" src="../../css/shop_detail.css">
  /* @import url("../../css/shop_detail.css"); */
 /* .option_border2::-webkit-scrollbar {
    width: 0;
  } */
</style>
