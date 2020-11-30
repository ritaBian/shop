<!-- 门票玩乐页 -->
<template>
  <div class="page_body">
    <div class="house_swiper_border">
      <div class="pageIcon iconLeft" @click="onBack">
        <van-icon name="arrow-left" color="#FFFFFF" size="1.09rem" />
      </div>

      <div class="pageIcon iconRight" @click="onStore">
        <img class="pageIcon_home" :src="require('../../../static/icon/shop_detail/home.png')">
      </div>

        <van-swipe class="swiper_border" @change="onChangeSwiperHouse" :loop="loop" :show-indicators="showIndicators">
          <van-swipe-item v-for="(item,index) of pageData.PICS" :key="index">
            <van-image class="swiper_img" fit="cover" :src="domainUrl + '/' + item" />
          </van-swipe-item>
        </van-swipe>
        <div class="house_swiper_index">
          <div style="margin-left: 0.12rem;">{{current_house}}/{{pageData.PICS==undefined?'':pageData.PICS.length}}</div>
        </div>
    </div>
    <div class="house_content">
      <div class="house_title" v-if="pageData.PRO!=undefined">{{pageData.PRO.NAME}} {{pageData.PRO.NAME2}}</div>
      <div class="house_address" v-if="pageData.EXTRA!=undefined?pageData.EXTRA.ADDRESS!='':false">领票地址: {{pageData.EXTRA.ADDRESS}}</div>

      <iframe id="baidumapiframe" :src="mapUrl" v-if="pageData.EXTRA==undefined?false:pageData.EXTRA.LAT!=0" allowtransparency="true" style="width: 100%; height: 12rem; border: 0px none;margin: 0.4rem 0;"></iframe>

      <div class="house_flex" v-if="pageData.EXTRA!=undefined">
        <div class="house_flex_once" >是否允许退单：{{pageData.EXTRA.IF_ORDER_BACK==0?'禁止退单':'允许退单'}}</div>
        <div class="house_flex_once" >提前多久购票：{{delay_hour(pageData.EXTRA.DELAY_HOUR)}}</div>
      </div>
      <div class="" style="width: 100%;" ref="vchose"></div>
      <v-chose style="width: 100%;" :viewBoolean="false"></v-chose>


      <div class="shop_destination" v-if="pageData.SCENIC!=undefined?(pageData.SCENIC.ID!=''||pageData.SCENIC.ID!=undefined):false" @click="onNavigateRoad(pageData.SCENIC)">
        <div>关联目的地: {{pageData.SCENIC.NAME}}</div>
        <van-icon name="arrow" size="0.9rem" color="#ccc" />
      </div>

      <div class="shop_state_title">商品介绍</div>
      <div class="house_detail_border">
        <div :class="['house_detail',height_house>106?'content_detail_line':'']" v-if="pageData.PRO!=undefined" ref="house" v-html="htmlList(pageData.PRO.MESS)">
        </div>
        <div class="content_detail_white " v-if="height_house>106" @click="height_house=1">
          <div>展开阅读全文</div>
          <img class="content_detail_white_img" :src="require('../../../static/icon/shop_detail/zhankai.png')">
        </div>
        <div class="content_detail_white2 " v-if="height_house==1" @click.stop="height_house=107">
          <div>收起全文</div>
          <img class="content_detail_white_img2" style="transform: rotate(180deg);" :src="require('../../../static/icon/shop_detail/zhankai.png')">
        </div>
      </div>

      <!-- 评价列表 -->
      <evaluateList style="margin-top: 0.6rem;" v-if="pageData.EXTRA==undefined?false:true" module="1" :pageid="pageData.EXTRA.ID"></evaluateList>
    </div>
    <div style="height: 3.5rem;"></div>
    <div class="house_fixed" v-if="houseBoolean">
      <div class="house_fixed_left ">
        <div class="house_fixed_left_icon_border" @click="onClickIm">
          <van-icon :name="require('../../../static/icon/shop_detail/kefu.png')"  size="1.41rem" />
          <div class="house_fixed_left_icon_text">客服</div>
        </div>
        <div class="house_fixed_left_line"></div>
      </div>
      <div class="house_fixed_right">
        <div class="fixed_right_box">
          <div class="fixed_right_box_yuan" v-if="pageData.PRO!=undefined?(pageData.PRO.SHI_CHANG_PRICE!=0.00):false">原价{{pageData.PRO.SHI_CHANG_PRICE}}元</div>
          <div class="fixed_right_box_money ">￥<span style="font-size: 1.81rem;" v-if="pageData.PRO!=undefined">{{pageData.PRO.PRICE}}</span></div>
          <div class="fixed_right_box_button" @click="onClickHref(pageData.PRO.TO_URL)">在线预订</div>
        </div>
      </div>
    </div>

    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask" @touchmove.prevent="catchtouchmove"></div>

    <van-calendar v-model="timeShow" @confirm="onTimeShow" />

  </div>
</template>

<script>
  import Util from '@/util/common';
  import Chose from '@/components/detail/chose.vue'
  import {Toast} from 'vant';
  export default {
    components:{
      'v-chose':Chose,
    },
    name: "shop_detail",
    //属性
    props: {
      id: {
      	type: null,//属性类型
      	value: ""
      },

    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        mapUrl:'',
        pageData:'',

        FACILITY_CORE:[],
        FACILITY_SUPPORT:[],
        FACILITY_SERVICE:[],
        FACILITY_JU_JIA:[],
        FACILITY_LEISURE:[],
        FACILITY_WEI_YU:[],
        FACILITY_KITCHEN:[],
        FACILITY_SCENIC:[],

        loop:false,
        showIndicators:false,
        current:1,
        // images: [
        //   'http://img.ewebweb.com/uploads/20191006/19/1570360737-HvGOTkxnum.jpg',
        //   'http://img1.imgtn.bdimg.com/it/u=3427169086,3097665420&fm=214&gp=0.jpg',
        //   'http://img2.imgtn.bdimg.com/it/u=1753371632,983488119&fm=214&gp=0.jpg',
        // ],
        homeList:[1,2],
        height_house:'',
        maskBoolean:false,
        tabbarLikeBoolean:false,
        tabbarLike:0,

        houseBoolean:true,
        current_house:1,
        houseFacilityMore:false,

        serivceBoolean:false,

        timeShow:false,
        timeDate:'',

      }
    },
    computed:{
      delay_hour:function(){
        return function(item){
          var index = Number(item)
          switch(index){
            case 0:
              return '无延迟'
            break;
            case 2:
              return '2小时'
            break;
            case 4:
              return '4小时'
            break;
            case 24:
              return '24小时'
            break;
            case 48:
              return '48小时'
            break;
          }
        }
      },
      htmlList:function(){
        return function(html){
           var richtext=  html
           console.log('商品介绍',richtext)
           const regex = new RegExp(`<img src="`, 'gi');
           if(html!=''&&html!=undefined){
             if(html.indexOf(`<img src="`)!=-1){
               richtext = richtext.replace(regex, `<img style="width:100%" src="`);
               return richtext
             }else{
               return richtext
             }
           }else{
             return ''
           }
        }
      }

    },
    beforeCreate(){
      this.$store.state.index.shopType = ''
      this.$store.state.index.shopTime = []
    },
    created() {
      console.log(111111,this.$conf.domain,this.id)
      this.$dopost('/sysapi/pro/detail/', {id:this.id},
      function (res) {
      	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
      	{//console.log(res.data.data);
          this.$store.state.detail.selectType={};
          this.$store.commit('SET_DATAS',res.data.data);
          //this.$forceUpdate();
          //this.$set(this.$store.state.detail.proData.PRO, 'PICS', res.data.data.PRO.PICS);
      	}
      	else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
      }.bind(this));
      // 详情
      this.fromData(this.id);
      // 评价列表
      // this.talkData(this.id);


    },
    mounted(){
      var that = this;
      this.$nextTick(()=>{ // 页面渲染完成后的回调
        setTimeout(function() {
          //文章高度
          that.onTextDiv()
        }, 500);
      })
    },
    methods: {
      onTextDiv(){
        console.log(999999,this.$refs.house.offsetHeight,this.$refs.house)
        this.height_house = this.$refs.house.offsetHeight;//详情
      },
      // 页面数据
      fromData(id){
        var data = {
         id:this.id,
        }
        var that = this;
        var allTag = this.$store.state.index.allTag
        this.$dopost('/sysapi/travel/detail/',data,function (res) {
          this.pageData = res.data.data
          console.log('获取详情游玩页',res)
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.mapUrl = `${this.domainUrl}/mobile/map_view.html?lng=${res.data.data.EXTRA.LNG}&lat=${res.data.data.EXTRA.LAT}`

            if(res.data.data.PRO.TO_TYPE==1){
              window.location.href=String(res.data.data.PRO.TO_URL)
            }
            var picList = res.data.data.PICS //字符分割
            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
               this.$store.state.index.currentPage.page = window.location.href
               this.$store.state.index.currentPage.name = res.data.data.PRO.NAME==''?'橡果互动发现详情页':res.data.data.PRO.NAME
               this.$store.state.index.currentPage.desc = res.data.data.PRO.MESS.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,'')

              picList.map((item,index) => {
                if(picList[index]!=undefined&&picList[index]!=''||picList[index]!=null){
                  this.$store.state.index.currentPage.image = that.domainUrl + '/' + picList[index]
                  return
                }else if(picList.length-1 == index){
                  this.$store.state.index.currentPage.image = this.$conf.defaultPicture
                }
              })
            }
            this.$wx.wxConfig()
          }else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },

      // 客服
      onClickIm(){
        console.log(this.pageData)
        this.$router.push({
        	path: '/im',
           query: {
        	   id: String(this.pageData.PRO.USER_ID),
        	}
        })
      },
      // 商家详情
      onStore(){
        this.$store.commit("noKeepAlive", "store");
        this.$router.push({
        	path: '/store',
           query: {
        	   id: String(this.pageData.PRO.USER_ID),
        	}
        })
      },
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
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
        console.log(9999)
        this.loading = true;
        setTimeout(() => {
          this.data = this.data.concat(this.originData, this.originData);
          this.loading = false;
        }, 1000);
      },
      //关联目的地
      onNavigateRoad(item){
        this.$router.push({
        	path: '/shop_detail',
           query: {
        	   id: item.ID,
        	}
        })
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
      formatDate(item) {
          return `${item.getFullYear()}-${item.getMonth() + 1}-${item.getDate()}`;
      },
      onTimeShow(date) {
        console.log(date)
        this.timeShow = false;
        // this.timeDate = this.formatDate(date);
        console.log(this.formatDate(date))
        this.$store.state.index.shopTime = [this.formatDate(date)];
        this.onClickHref()
      },
      onClickHref(e){
        var type = this.$store.state.index.shopType
        var time = this.$store.state.index.shopTime

        if(this.pageData.TYPE.length>1){
          var typeList = this.pageData.TYPE[type-1]
        }else{
          var typeList = this.pageData.TYPE[0]
        }

        if(this.pageData.PRO.TO_TYPE==2){
          window.location.href = String(e)
        }else{
          if(type==''&&this.pageData.TYPE.length>1){
            this.$toast('请选择规格');
            var top = Number(this.$refs.vchose.offsetTop)+16
            window.scrollTo(0, top);
            return
          }
          if(time==''||time.length==0){
            this.timeShow = true;
            return
          }
          const product = [{
            title:this.pageData.PRO.NAME,
            price:this.pageData.PRO.PRICE,
            id:this.pageData.PRO.ID,
            count:1,
            promotion:this.$store.state.detail.proData.PROMOTION,
            yunfei:this.pageData.YUN_FEI[0],
            type:typeList,
            imgPath:this.$conf.domain + '/' + this.pageData.PRO.PIC,
            choseBool:true
          }];

          this.$store.state.index.shopList = product
          //初始化
          this.SetPromotion()
          this.$router.push({
          	path: '/par_for',
             query: {
          	   type: 1,
          	}
          })

        }
      },
      SetPromotion(){
          if (this.$store.state.index.shopList != "" && this.$store.state.index.shopList.length>0)
          {
              for (let k = 0; k < this.$store.state.index.shopList.length; k++)
              {
                  this.$store.state.index.shopList[k]['promotion_id']=0;this.$store.state.index.shopList[k]['promotion_price']=0;
                  let LastPrice=0;
                  for (let o = 0; o < this.$store.state.index.shopList[k].promotion.length; o++)
                  {
                      if(Util.Cheng(this.$store.state.index.shopList[k]['price'],this.$store.state.index.shopList[k]['count'])>=Number(this.$store.state.index.shopList[k].promotion[o]['V2']))
                      {
                          if(Math.abs(this.$store.state.index.shopList[k].promotion[o]['V'])>LastPrice)
                          {
                              LastPrice=Math.abs(this.$store.state.index.shopList[k].promotion[o]['V']);
                              this.$store.state.index.shopList[k]['promotion_id']=this.$store.state.index.shopList[k].promotion[o]['ID'];
                              this.$store.state.index.shopList[k]['promotion_price']=Number(this.$store.state.index.shopList[k].promotion[o]['V']);
                          }
                      }

                  }
                  //console.log(this.$store.state.index.shopList[k]);
              }
          }
      },
      catchtouchmove(e){
        // console.log(e)
      }
    },

  }


</script>

<style scoped="scoped" src="../../css/shop_detail_play.css">
  /* @import url("../../css/shop_detail_play.css"); */

</style>
