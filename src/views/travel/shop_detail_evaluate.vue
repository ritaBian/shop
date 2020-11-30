<template>
  <div class="body">
    <van-nav-bar title="朴宿栖澜海居（青岛" left-arrow  @click-left="onClickLeft" />

    <div class="page_body">

      <div class="page_tag">
        <div class="page_tag_once">全部</div>
        <div class="page_tag_once">服务周到 (10)</div>
        <div class="page_tag_once">服务周到 (10)</div>
        <div class="page_tag_once">推荐(150)</div>
        <div class="page_tag_once">推荐(150)</div>
      </div>

      <!-- 评价列表 -->
      <div class="whiteList">
        <!-- <div class="whiteList_title" style="margin-top: 0.25rem;">评价列表</div> -->

        <div class="evaluate">
          <van-image class="evaluate_face" fit="cover" src="../../../static/img/img1.png" />
          <div class="evaluate_right ">
            <div class="evaluate_nickname">执子之手</div>
            <div class="evaluate_rate">
              <van-rate v-model="current" readonly gutter="0.15rem" size="1.2rem" color="#FFC900" />
              <div class="evaluate_rate_text">5.0分</div>
            </div>
            <div class="evaluate_time">2018.09.30发表 | 海景大床房</div>
            <div :class="['evaluate_content',height_evaluate>134?'content_detail_line':'']" ref="evaluate">非常棒的地方，听海，漫步，放松节奏，慢生活非常棒</div>
            <div class="evaluate_expansion" v-if="height_evaluate>134">
              <div style="margin-right: 0.38rem;">展开</div>
              <van-icon  name="arrow-down" color="#3A99E5" size="0.59rem" />
            </div>
            <div class="evaluate_smallimg_border">
              <van-image class="evaluate_smallimg" v-for="(item,index) of 6" :key="index" fit="cover" src="../../../static/img/img1.png" />
            </div>
            <!-- <van-image class="evaluate_img" fit="cover" src="../../../static/img/img1.png" /> -->
            <div class="evaluate_shopMaster">
              <div class="evaluate_shopMaster_icon"></div>
              <span style="font-weight: bold;">商家回复：</span>有缘千里来相会，能入住朴宿栖澜海居也是缘分。
            </div>

            <!-- 点赞 -->
            <!-- <div class="evaluate_like">
              <img class="evaluate_like_img" src="../../../static/icon/like.png">
              <div>100</div>
            </div> -->
            <div class="evaluate_like2">
              <img class="evaluate_like_img" src="../../../static/icon/like3.png">
              <div>100</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 查看评论 -->
      <!-- <div class="evaluate_all_bottom " v-if="evaluate_all_boolean">
        <div style="margin-right: 0.22rem;">查看全部6条评价</div>
        <van-icon  name="arrow-down" color="#008BFF" size="0.66rem" />
      </div> -->

      <!-- <div class="pullClick_class">
        <img class="pullClick" src="../../../static/pull_icon.png" >
      </div> -->


    </div>
  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {
        loop:false,
        showIndicators:false,
        current:1,
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],

        height_content:'',
        height_evaluate:'',
        evaluate_all_boolean:true,

        maskBoolean:false,
        tabbarLikeBoolean:false,
        tabbarLike:0,


      }
    },
    mounted(){
        // this.onOffsetDiv();
        this.onTextDiv();
        this.data = this.originData;

    },
    methods: {
      onTextDiv(){
        this.height_content = this.$refs.content.offsetHeight;//详情
        this.height_evaluate = this.$refs.evaluate.offsetHeight;//详情
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

      // 滑到底部加载
      loadmore() {
        this.loading = true;
        setTimeout(() => {
          this.data = this.data.concat(this.originData, this.originData);
          this.loading = false;
        }, 1000);
      },




      // //点击蒙层
      // onMask(){
      //   this.listBoolean = false
      //   this.maskBoolean = false
      // },
      //点击选项
      onOptionClick(e){
        this.optionIndex = Number(e)
      },
    },

  }


</script>

<style scoped="scoped" src="../../css/shop_detail_evaluate.css">
  /* @import url("../../css/shop_detail_evaluate.css"); */
 /* .option_border2::-webkit-scrollbar {
    width: 0;
  } */
</style>
