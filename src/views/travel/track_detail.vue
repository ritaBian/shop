<template>
  <div class="page_body">
    <div class="page_top_border ">
      <div class="pageIcon iconLeft" @click="onBack">
        <van-icon name="arrow-left" color="#FFFFFF" size="1.09rem" />
      </div>
      <!-- <div class="pageIcon iconRight">
        <van-icon name="wap-home-o" color="#FFFFFF" size="1.09rem" />
      </div> -->
      <!-- 轮播 -->
      <van-swipe class="swiper_border" @change="onChangeSwiper" :loop="loop" :show-indicators="showIndicators">
        <van-swipe-item v-for="(item,index) of swiperImage" :key="index">
          <van-image class="swiper_img" fit="cover" :src="domainUrl+'/'+item" />
        </van-swipe-item>
      </van-swipe>
      <!-- 底部 -->
      <div class="swiper_address" v-if="data.data!=undefined?(data.data.NAME!=''):false">
        <van-icon name="location-o" color="#FFFFFF" size="1rem" />
        <div class="app_line" style="margin-left: 0.12rem;margin-bottom: 0.06rem;" >{{data.data.NAME}}</div>
      </div>
      <div class="swiper_index" v-if="swiperImage.length>0">
        <div style="margin-left: 0.12rem;" >{{current}}/{{swiperImage.length}}</div>
      </div>
    </div>

    <!-- 用户栏 -->
    <div class="user_border ">
      <div class="user_left ">
        <img class="user_face " v-if="data.user!=undefined" :src="user_face(data.user.pic)">
        <div class="user_text_border ">
          <div class="user_name" v-if="data.user!=undefined">{{data.user.name}}</div>
          <div class="user_time" v-if="data.user!=undefined">{{data.data.ADD_TIME}}发表</div>
        </div>
      </div>
      <!-- <div class="user_right" @click="onClickIm">
        <van-icon name="plus" color="#FFFFFF" size="0.69rem" />
        <div style="margin-left: 0.2rem;">关注</div>
      </div> -->
    </div>

    <!-- 内容 -->
    <div class="content_border ">
       <!-- <div class="content_title">崂山游记</div> -->
       <div class="content_view" v-if="data.user!=undefined&&data.user!=''" v-html="data.data.CONTENT"></div>
       <div class="content_address_title">文中提到的地点</div>
       <div class="address_border" v-if="data.user!=undefined" v-for="(item,index) of data.target" :key="index">
          <div class="address_img_border ">
            <div class="address_img_label" v-if="item.sort_name">{{item.sort_name}}</div>
            <van-image class="address_img" fit="cover" :src="domainUrl+'/'+item.pic"  @click="onImagePreview(item.pic)"/>
          </div>
          <div class="address_right ">
            <div class="address_title app_line">{{item.name}}</div>
            <div class="address_right_bottom">
              <div ><span style="color: #008BFF;margin-right: .38rem;" v-if="item.point!=0">{{item.point}}分</span><span v-if="item.comment_count!=0">{{item.comment_count}}条评论</span></div>
              <div class="address_right_button" @click="onTargetNavigate(item)">去看看</div>
            </div>
          </div>
       </div>

       <!-- 点赞栏 -->
       <div class="content_like">
         <van-image class="content_face" fit="cover" v-if="index<=5" :src="user_face(item.PIC)" v-for="(item,index) of data.like_user" :key="index"/>
       </div>
       <div class="content_click_border" v-if="data.liked==0" @click="onTabbarLike(1)">
          <van-icon  name="like-o" color="#9DA0A4" size="1.25rem" />
          <div style="margin-left: 0.4rem;margin-top: 0rem;" v-if="data.liked_count!=0">{{data.liked_count}}</div>
       </div>
       <div class="content_click_border" v-if="data.liked==1" @click="onTabbarLike(2)">
          <van-icon  name="like" color="#E56565" size="1.25rem" />
          <div style="margin-left: 0.4rem;margin-top: 0rem;">{{data.liked_count}}</div>
       </div>
    </div>


    <!-- 回复 -->
    <div class="message_reply ">
      <evaluateList v-if="data.data!=undefined" module="1" :pageid="data.data.ID" :commentShow="false"></evaluateList>
    </div>

    <!-- 相关享迹 -->
    <div class="track_title">相关享迹</div>
    <appWaterfall v-if="data.data!=undefined" :module='data.data.MODULE' :to_id="data.data.MESS_ID"></appWaterfall>

      <div class="tabbar_border">
        <div class="tabbar_item" v-if="data.liked==0" @click="onTabbarLike(1)">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img"  :src="require('../../../static/icon/like.png')" >
            <div class="tabbar_item_tag" v-if="data.liked_count!=0">{{data.liked_count}}</div>
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
        <div class="tabbar_item" @click="onGift">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" :src="require('../../../static/icon/liwu.png')" >
          </div>
          <div class="tabbar_item_text">送礼物</div>
        </div>
        <div class="tabbar_item" @click="onNavigatePingLun">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" :src="require('../../../static/icon/talk.png')" >
            <div class="tabbar_item_jiang">奖</div>
          </div>
          <div class="tabbar_item_text">写评论</div>
        </div>
        <!-- @click="onShare" -->
        <div class="tabbar_item" @click="onClickIm">
          <div class="tabbar_item_img_border">
            <van-icon :badge="$store.state.im.count>0?$store.state.im.count:''" :name="require('../../../static/icon/kefu.png')" class="tabbar_item_img" />
            <!-- <img class="tabbar_item_img" :src="require('../../../static/icon/share.png')"> -->
          </div>
          <div class="tabbar_item_text">客服</div>
        </div>
      </div>


    <!-- 礼物 -->
    <appGift v-if="giftBoolean" :bounty="data.bounty"  module="0" :userid="data.data.ID"  @onMask="onMask"></appGift>
    <!-- 分享蒙层 -->
      <appShare class="appShare_border" v-if="shareBoolean" @onMask="onMask"></appShare>

    <!-- <van-popup class="share_mask" v-model="shareBoolean" position="bottom" :style="{ height: '34.03%' }">
      <div class="share_mask_title ">分享至</div>
      <div class="share_mask_content">
        <div class="share_mask_content_once " v-for="(item,index) of shareList" :key="index">
          <img class="share_mask_content_once_img" :src="item.img" >
          <div class="share_mask_content_once_name">{{item.name}}</div>
        </div>
      </div>
      <div class="share_mask_delete" @click="onMask">取消</div>
    </van-popup> -->

    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask"></div>

    <!-- 加载 -->
    <!-- <loading :show="loading" /> -->

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  import { ImagePreview } from 'vant';
  export default {
    data() {
      return {
        domainUrl:this.$conf.domain,
        allTag:this.$store.state.index.allTag,
        token : this.$store.state.login.token,

        options:'',

        loop:false,
        showIndicators:false,
        current:1,
        swiperImage: [],

        maskBoolean:false,
        shareBoolean:false,
        giftBoolean:false,

        data:'',
        col: 2,
        loading: false,


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
      this.token =  this.$store.state.login.token
      this.allTag = this.$store.state.index.allTag
    },
    created() {
      console.log(this.$route.query)
      this.options = this.$route.query
      this.onInitData(this.$route.query)
    },
    mounted(){
        // this.onOffsetDiv();
    },
    methods: {
      //选择图片
      onImagePreview(item){
        var that = this;
        var pic =  that.domainUrl + '/' + item
        ImagePreview({
          images: [pic],
        });
      },
      // 数据
      onInitData(){
        var data = {
          id : this.options.id
        }
        var that = this;
        if(this.token!=1){
          that.$dopost('/sysapi/comment/detail/', data,function (res) {
          	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.data = res.data.data
              var pic = res.data.data.data
              var targetPic = []
              targetPic = res.data.data.target.map(item => {
                  return item.pic
              })
              var list = [pic.PIC1,pic.PIC2,pic.PIC3,pic.PIC4,pic.PIC5]
              list = list.concat(targetPic)

              list.map((item,index) => {
                if(list[index]!=''){
                  that.swiperImage.push(list[index])
                }
              })
              this.tabbarLike = res.data.data.liked_count
              //获取当前页面信息
              // if(this.$store.state.index.currentPage.page!=window.location.href){
                this.$store.state.index.currentPage.name = res.data.data.data.NAME==''?'橡果互动享迹详情页':res.data.data.data.NAME
                this.$store.state.index.currentPage.desc = res.data.data.data.CONTENT.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,'')

                this.$store.state.index.currentPage.page = window.location.href
                this.$store.state.index.currentPage.image = res.data.data.data.PIC1==''?(res.data.data.target.length!=0?that.domainUrl+'/'+res.data.data.target[0].pic:''):that.domainUrl + '/' +res.data.data.data.PIC1
              // }
              this.$wx.wxConfig()

          	}else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this));
        }else{
          that.$dopost('/sysapi/comment/detail/', data,function (res) {
          	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.data = res.data.data
              var pic = res.data.data.data
              var targetPic = []
              targetPic = res.data.data.target.map(item => {
                  return item.pic
              })
              var list = [pic.PIC1,pic.PIC2,pic.PIC3,pic.PIC4,pic.PIC5]
              list = list.concat(targetPic)

              list.map((item,index) => {
                if(list[index]!=''){
                  that.swiperImage.push(list[index])
                }
              })
              this.tabbarLike = res.data.data.liked_count
              //获取当前页面信息
              // if(this.$store.state.index.currentPage.page!=window.location.href){
                this.$store.state.index.currentPage.name = res.data.data.data.NAME==''?'橡果互动享迹详情页':res.data.data.data.NAME
                this.$store.state.index.currentPage.desc = res.data.data.data.CONTENT.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,'')

                this.$store.state.index.currentPage.page = window.location.href
                this.$store.state.index.currentPage.image = res.data.data.data.PIC1==''?(res.data.data.target.length!=0?that.domainUrl+'/'+res.data.data.target[0].pic:''):that.domainUrl + '/' +res.data.data.data.PIC1
              // }
              this.$wx.wxConfig()
          	}else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },

      //点赞加一
      onTabbarLike(num){
        var type = Number(num)
        var data = {
          id:this.data.data.ID,
          type:type
        }
        if(this.token!=1){
          this.$toast('请先登录');
        }else{
          if(type == 1){
            this.$dopost('/sysapi/comment/like/',data,function (res) {
              console.log('点赞',res)
              if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
                this.swiperImage = []
                this.onInitData()
              }else{
                Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
              }
            }.bind(this),true);
          }else{
            this.$dopost('/sysapi/comment/like/',data,function (res) {
              console.log('取消点赞',res)
              if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
                this.swiperImage = []
                this.onInitData()
              }else{
                Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
              }
            }.bind(this),true);
          }
        }
      },
      //swiper滑动
      onChangeSwiper(e){
        this.current = e + 1
      },
      // 滑到底部加载
      loadmore() {
        console.log(9999)
        this.loading = true;
        setTimeout(() => {
          this.data = this.data.concat(this.originData, this.originData);
          this.loading = false;
        }, 1000);
      },
      //蒙层
      onMask(){
        this.shareBoolean = false
        this.giftBoolean = false
      },
      // 发表评论
      onNavigatePingLun(){
        this.$router.push({
        	path: '/comment',
           query: {
        	  id: this.data.data.ID,
            module:100,
        	}
        })
      },
      //跳到目的地详情
      onTargetNavigate(item){
        console.log('目的地',item)
        var type = Number(item.type)
        // 1发现，2线路，3目的地
        switch(type){
          case 1:
            this.$router.push({
            	path: '/shop_new_detail',
               query: {
            	   id: item.id,
            	}
            })
          break;
          case 2:
            this.$router.push({
            	path: '/circuit_detail',
               query: {
            	   id: item.id,
            	}
            })
          break;
          case 3:
            this.$router.push({
            	path: '/shop_detail',
               query: {
            	   id: item.id,
            	}
            })
          break;
        }

      },
      //点击送礼物
      onGift(){
        this.giftBoolean = true
      },
      // 点击分享
      onShare(){
        this.shareBoolean = true
      },
      //返回
      onBack(){
        if (window.history.length <= 1) {
            this.$router.push({path:'/'})
            return false
        } else {
            this.$router.go(-1)
        }
      },
      // 客服
      onClickIm(){
        this.$router.push({
        	path: '/imlist',
           query: {
        	   id: String(this.data.user.id),
        	}
        })
      },

    },

  }


</script>

<style scoped="scoped" src="../../css/track_detail.css">
  /* @import url("../../css/track_detail.css"); */
</style>
