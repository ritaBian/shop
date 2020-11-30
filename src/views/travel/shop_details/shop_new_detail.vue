<template>
  <div class="page_body">
    <!-- <img class="house_swiper_delete " v-if="houseBoolean" src="../../../static/shop_detail/delete.png"> -->
    <div class="house_swiper_border">
      <div class="pageIcon iconLeft">
        <van-icon name="arrow-left" color="#FFFFFF" size="1.09rem" />
      </div>
        <van-swipe class="swiper_border" @change="onChangeSwiperHouse" :loop="loop" :show-indicators="showIndicators">
          <van-swipe-item v-for="(item,index) of images" :key="index">
            <van-image class="swiper_img" fit="cover" :src="item" />
          </van-swipe-item>
        </van-swipe>
        <div class="house_swiper_index">
          <div style="margin-left: 0.12rem;">{{current_house}}/{{images.length}}</div>
        </div>
    </div>
    <div class="house_content">
      <div class="house_title">海景大床房</div>
      <div class="house_facility ">
        <div class="house_facility_once" v-for="(item,index) of icon" :key="index">
          <van-icon :name="icon[index]" color="#4C4C4C" size="0.84rem" />
          <div class="app_line house_facility_once_text">大床(2 x1.5</div>
        </div>
      </div>
      <div class="house_content_detail" v-if="houseFacilityMore">
        <div class="house_content_detail_once" v-for="(item,index) of 2">
          <div class="house_content_detail_once_left">基础设施</div>
          <div class="house_content_detail_once_right">无线网络，空调（冷暖)，电视，洗衣机，冰箱，新风系统，暖气，电热水壶，电吹风，晾衣架，拖鞋，装饰字画，沙发，休闲椅，茶几</div>
        </div>
      </div>
      <div class="house_facility_more" @click="onHouseFacilityMore">
        <div style="margin-right: 0.3rem;" v-if="!houseFacilityMore">更多房型设施</div>
        <van-icon name="arrow-down" color="#C0C0C0" size="0.68rem" v-if="!houseFacilityMore"/>
        <div style="margin-right: 0.3rem;" v-if="houseFacilityMore">收起</div>
        <van-icon name="arrow-up" color="#C0C0C0" size="0.68rem" v-if="houseFacilityMore"/>
      </div>
      <div class="house_bottom_line "></div>
      <div class="shop_state_title">商品介绍</div>
      <div :class="['house_detail',height_house>106?'content_detail_line':'']" ref="house" >
        青岛朴宿栖澜海居延续朴宿“打造城市人文居所”这一主线，作为朴宿文旅中，山海泉城艺中“海”的体现，以大海为载体、诗歌为主题，作为青岛乃至北方一家融合海洋景致与现代设计理念的设计师酒店，
        栖澜海居建造在探入仰口崂山湾的海岬之上，
        与微澜山居遥相辉映。设计师友好的整合周围树、山、海等视觉元素，使其精美的组合结构，以及新颖的几何造型成为自然形态的延展形态的延展
        与微澜山居遥相辉映。设计师友好的整合周围树、山、海与微澜山居遥相辉映。设计师友好的整合周围树、山、海与微澜山居遥相辉映。设计师友好的整合周围树、山、海
        <div class="content_detail_white " v-if="height_house>106" @click="height_house=0">
          <div>展开阅读全文</div>
          <img class="content_detail_white_img" src="../../../../static/icon/shop_detail/zhankai.png">
        </div>
      </div>


      <!-- 评价列表 -->
      <div class="whiteList2 ">
        <div class="whiteList_title" style="margin-top: 0.25rem;">评价列表</div>

        <div class="evaluate">
          <van-image class="evaluate_face" fit="cover" src="../../../../static/img/img1.png" />
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
              <van-image class="evaluate_smallimg" v-for="(item,index) of 6" :key="index" fit="cover" src="../../../../static/img/img1.png" />
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
              <img class="evaluate_like_img" src="../../../../static/icon/like3.png">
              <div>100</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 查看评论 -->
      <div class="evaluate_all_bottom " v-if="evaluate_all_boolean">
        <div style="margin-right: 0.22rem;">查看全部6条评价</div>
        <van-icon  name="arrow-down" color="#008BFF" size="0.66rem" />
      </div>


    </div>
    <div style="height: 3.5rem;"></div>
    <div class="house_fixed" v-if="houseBoolean">
      <div class="house_fixed_left">
        <div class="house_fixed_left_icon_border">
          <van-icon :name="require('../../../../static/icon/shop_detail/kefu.png')"  size="1.41rem" />
          <div class="house_fixed_left_icon_text">客服</div>
        </div>
        <div class="house_fixed_left_line"></div>
      </div>
      <div class="house_fixed_right">
        <div class="fixed_right_box">
          <div class="fixed_right_box_yuan">原价380元</div>
          <div class="fixed_right_box_money ">￥<span style="font-size: 1.81rem;">158</span></div>
          <div class="fixed_right_box_button">在线预订</div>
        </div>
      </div>
    </div>


    <!-- <div class="page_top_border ">
      <div class="pageIcon iconLeft">
        <van-icon name="arrow-left" color="#FFFFFF" size="1.09rem" />
      </div>
      <div class="pageIcon iconRight">
        <img class="pageIcon_home" src="../../../static/icon/shop_detail/home.png">
      </div>
      <van-swipe class="swiper_border" @change="onChangeSwiper" :loop="loop" :show-indicators="showIndicators">
        <van-swipe-item v-for="(item,index) of images" :key="index">
          <van-image class="swiper_img" fit="cover" :src="item" />
        </van-swipe-item>
      </van-swipe>
      <div class="swiper_comment">
        <div>165人点评</div>
        <van-icon  name="arrow" color="#FFFFFF" size="0.69rem" />
      </div>
      <div class="swiper_index">
        <div style="margin-left: 0.12rem;">{{current}}/{{images.length}}</div>
      </div>
    </div> -->

    <!-- 内容 -->
    <!-- <div class="content_border ">
      <div class="content_title">朴宿栖澜海居（青岛崂山仰口店）</div>
      <div class="content_title_text">
        <div class="content_title_text_left">
          <div class="content_title_text_bold" >5.0</div>
          <div style="color: #999999;">/5.0分</div>
          <div class="content_title_text_youxiu">优秀</div>
          <div>“风景很好，早餐丰富”</div>
        </div>
        <div class="content_title_text_right">
          <div style="margin-right: 0.24rem;">165条点评</div>
          <van-icon  name="arrow" color="#C0C0C0" size="0.69rem" />
        </div>
      </div>
      <div class="bottom_border"></div>

      <div class="content_address_border">
        <div class="content_address_left">
          王哥庄街道曲家庄社区，近崂山仰口景区入口
          <span style="color: #999999;">崂山风景区/沙子口</span>
        </div>
        <div class="content_address_right">
          <div style="margin-right: 0.24rem;">地图/周边</div>
          <van-icon  name="arrow" color="#C0C0C0" size="0.69rem" />
        </div>
      </div>
      <div class="bottom_border "></div>
      <div class="content_service" @click="onClickService">
        <div class="content_service_title">配套服务与设施</div>
        <div class="content_service_content">
          <div class="content_service_once_border">
            <div class="content_service_once">
              <img class="content_service_once_img" src="../../../static/icon/shop_detail/wifi.png">
              <div>客房WIFI免费</div>
            </div>
            <div class="content_service_once">
              <img class="content_service_once_img" src="../../../static/icon/shop_detail/chuifengji.png">
              <div>吹风机</div>
            </div>
            <div class="content_service_once">
              <img class="content_service_once_img" src="../../../static/icon/shop_detail/airplane.png">
              <div>接机服务</div>
            </div>
            <div class="content_service_once">
              <img class="content_service_once_img" src="../../../static/icon/shop_detail/car.png">
              <div>接站服务</div>
            </div>
          </div>
          <van-icon  name="arrow" color="#C0C0C0" size="0.69rem" />
        </div>
      </div>
      <div class="bottom_border "></div>
      <div :class="['content_detail',height_content>91?'content_detail_line':'']" ref="content" >
        青岛朴宿栖澜海居延续朴宿“打造城市人文居所”这一主线，作为朴宿文旅中，山海泉城艺中“海”的体现，以大海为载体、诗歌为主题，作为青岛乃至北方一家融合海洋景致与现代设计理念的设计师酒店，
        栖澜海居建造在探入仰口崂山湾的海岬之上，
        与微澜山居遥相辉映。设计师友好的整合周围树、山、海等视觉元素，使其精美的组合结构，以及新颖的几何造型成为自然形态的延展形态的延展
        与微澜山居遥相辉映。设计师友好的整合周围树、山、海等视觉元素，使其精美的组合结构，以及新颖的几何造型成为自然形态的延展形态的延展
        <div class="content_detail_white " v-if="height_content>106">
          <div>展开阅读全文</div>
          <img class="content_detail_white_img" src="../../../static/icon/shop_detail/zhankai.png">
        </div>
      </div>
    </div>

    <div class="whiteList" style="margin-top: -1rem;">
      <div class="whiteList_title">房型列表</div>
      <div style="height: 0.31rem;"></div>
      <div class="home_once" v-for="(item,index) of homeList" :key="index" @click="onClickHome">
        <div class="home_left">
          <van-image class="home_left_img" fit="cover" src="../../../static/img/img1.png" />
          <div class="home_left_content ">
            <div class="home_left_content_title">海景大床房</div>
            <div class="home_left_content_text">80㎡ 大床 有窗</div>
          </div>
        </div>
        <div class="home_right" v-if="index == 0">
          <div class="home_right_title">原价 360元</div>
          <div class="home_money">￥<span class="home_money2">158</span><span class="home_money3">起</span></div>
          <div class="home_num">房量紧张</div>
        </div>
        <div class="home_num_man" v-if="index == 1">满房</div>
      </div>
    </div>

      <div class="whiteList_title" style="margin-top: 0.25rem;">评价列表</div>

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
          <van-image class="evaluate_img" fit="cover" src="../../../static/img/img1.png" />
          <div class="evaluate_shopMaster">
            <div class="evaluate_shopMaster_icon"></div>
            <span style="font-weight: bold;">商家回复：</span>有缘千里来相会，能入住朴宿栖澜海居也是缘分。
          </div>

          <div class="evaluate_like">
            <img class="evaluate_like_img" src="../../../static/icon/like.png">
            <div>100</div>
          </div>
          <div class="evaluate_like2">
            <img class="evaluate_like_img" src="../../../static/icon/like3.png">
            <div>100</div>
          </div>
        </div>
      </div>
    </div>
    <div class="evaluate_all_bottom " v-if="evaluate_all_boolean">
      <div style="margin-right: 0.22rem;">查看全部6条评价</div>
      <van-icon  name="arrow-down" color="#008BFF" size="0.66rem" />
    </div>
 -->



      <!-- <div class="tabbar_border">
        <div class="tabbar_item" @click="onTabbarLike">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" v-if="tabbarLikeBoolean" src="../../../static/icon/like2.png" >
            <img class="tabbar_item_img" v-if="!tabbarLikeBoolean" src="../../../static/icon/like.png" >
            <div class="tabbar_item_tag">{{tabbarLike}}</div>
          </div>
          <div class="tabbar_item_text" :style="{color:tabbarLikeBoolean?'#01A862':'#585858'}">点赞</div>
        </div>
        <div class="tabbar_item">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" src="../../../static/icon/liwu.png" >
          </div>
          <div class="tabbar_item_text">送礼物</div>
        </div>
        <div class="tabbar_item">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" src="../../../static/icon/talk.png" >
            <div class="tabbar_item_jiang">奖</div>
          </div>
          <div class="tabbar_item_text">写评论</div>
        </div>
        <div class="tabbar_item">
          <div class="tabbar_item_img_border">
            <img class="tabbar_item_img" src="../../../static/icon/shop_detail/kefu.png" >
          </div>
          <div class="tabbar_item_text">客服</div>
        </div>
      </div> -->


    <!-- 房屋信息 -->
    <!-- <div class="house_white" :style="{height: houseBoolean?'84.37%':'0'}" > -->

    <!-- </div> -->

    <!-- 设施服务 -->
    <!-- <div class="serivce_white"  :style="{height: serivceBoolean?'81%':'0rem'}">
      <div class="serivce_white_title">
        <div class="serivce_white_title_delete" @click="onMask">取消</div>
        设施服务
      </div>
      <div style="height: 2.26rem;"></div>
      <div class="serivce_white_once" >
        <div class="serivce_white_once_title">停车场</div>
        <div class="serivce_white_once_text">有停车场</div>
        <div class="serivce_white_once_text"> 需预约：酒店附近提供私人停车场（免费）。</div>
      </div>
      <div class="serivce_white_once" >
        <div class="serivce_white_once_title">交通服务</div>
        <div class="serivce_white_once_list">
          <div class="serivce_white_once_list_wrap">接机服务</div>
          <div class="serivce_white_once_list_wrap">接站服务</div>
          <div class="serivce_white_once_list_wrap">租车服务</div>
        </div>
      </div>
    </div> -->


    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask" @touchmove.prevent="catchtouchmove"></div>


  </div>
</template>

<script>
  import Util from '@/util/common';
  export default {
    data() {
      return {
        loop:false,
        showIndicators:false,
        current:1,
        images: [
          'http://img.ewebweb.com/uploads/20191006/19/1570360737-HvGOTkxnum.jpg',
          'http://img1.imgtn.bdimg.com/it/u=3427169086,3097665420&fm=214&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=1753371632,983488119&fm=214&gp=0.jpg',
        ],
        homeList:[1,2],
        height_content:'',
        height_evaluate:'',
        height_house:'',
        evaluate_all_boolean:true,
        maskBoolean:false,
        tabbarLikeBoolean:false,
        tabbarLike:0,

        houseBoolean:true,
        current_house:1,
        houseFacilityMore:false,

        serivceBoolean:false,

        icon:[
          '../../../../static/shop_detail/chuang.png',
          '../../../../static/shop_detail/man.png',
          '../../../../static/shop_detail/house.png',
          '../../../../static/shop_detail/chuanghu.png',
        ]

      }
    },
    mounted(){
        // this.onOffsetDiv();
        this.onTextDiv();
        this.data = this.originData;

    },
    methods: {
      onTextDiv(){
        // this.height_content = this.$refs.content.offsetHeight;//详情
        // this.height_evaluate = this.$refs.evaluate.offsetHeight;//详情
        this.height_house = this.$refs.house.offsetHeight;//详情

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

      //点击房屋弹出框
      onClickHome(){
        this.maskBoolean = true
        this.houseBoolean = true
      },
      onClickService(){
        this.maskBoolean = true
        this.serivceBoolean = true
      },

      //点击蒙层
      onMask(){
        this.listBoolean = false
        this.maskBoolean = false
        this.houseBoolean = false
        this.serivceBoolean = false
      },
      //点击选项
      onOptionClick(e){
        this.optionIndex = Number(e)
      },
      catchtouchmove(e){
        // console.log(e)
      }
    },

  }


</script>

<style scoped="scoped">
  @import url("../../../css/shop_new_detail.css");

</style>
