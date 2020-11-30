<template>
  <div class="page_body">
    <!-- <img class="house_swiper_delete " v-if="houseBoolean" src="../../../static/shop_detail/delete.png"> -->
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
      <div class="house_title">{{pageData.PRO==undefined?'':pageData.PRO.NAME}}</div>
      <!-- <div class="house_facility ">
        <div class="house_facility_once" v-for="(item,index) of icon" :key="index">
          <van-icon :name="icon[index]" color="#4C4C4C" size="0.84rem" />
          <div class="app_line house_facility_once_text">大床(2 x1.5</div>
        </div>
      </div> -->

      <div class="house_flex">
        <div class="house_flex_once" v-if="pageData.EXTRA==undefined?'':pageData.EXTRA.TIME_IN!=''">入住时间：{{pageData.EXTRA==undefined?'':pageData.EXTRA.TIME_IN}}</div>
        <div class="house_flex_once" v-if="pageData.EXTRA==undefined?'':pageData.EXTRA.TIME_OUT!=''">退房时间：{{pageData.EXTRA==undefined?'':pageData.EXTRA.TIME_OUT}}</div>
        <div class="house_flex_once" v-if="pageData.EXTRA==undefined?'':pageData.EXTRA.RENT_TYPE!=''">出租方式：{{pageData.EXTRA==undefined?'':(pageData.EXTRA.RENT_TYPE==1?'整套出租':'单间出租')}}</div>
        <div class="house_flex_once" v-if="pageData.EXTRA==undefined?'':pageData.EXTRA.PERSON_COUNT!=''">适合人数：{{pageData.EXTRA==undefined?'':pageData.EXTRA.PERSON_COUNT}}人</div>
        <div class="house_flex_once" v-if="pageData.EXTRA==undefined?'':pageData.EXTRA.MIN_DAY!=''">最少起订：{{pageData.EXTRA==undefined?'':pageData.EXTRA.MIN_DAY}}间</div>
        <div class="house_flex_once" v-if="pageData.EXTRA==undefined?'':pageData.EXTRA.HOUSE_AREA!=''">房源面积：{{pageData.EXTRA==undefined?'':pageData.EXTRA.HOUSE_AREA}}平方米</div>
      </div>
      <div class="house_content_detail">
        <div class="house_content_detail_once">
          <div class="house_content_detail_once_left">房源户型</div>
          <div class="house_content_detail_once_right" v-if="pageData.EXTRA!=undefined">
            <span style="margin-right: 0.4rem;" v-if="pageData.EXTRA.BED_ROOM!=0">卧室：{{pageData.PRO==undefined?'':pageData.EXTRA.BED_ROOM}}个</span>
            <span style="margin-right: 0.4rem;" v-if="pageData.EXTRA.BATH_ROOM!=0">卫生间：{{pageData.PRO==undefined?'':pageData.EXTRA.BATH_ROOM}}个</span>
            <span style="margin-right: 0.4rem;" v-if="pageData.EXTRA.LIVING_ROOM!=0">客厅：{{pageData.PRO==undefined?'':pageData.EXTRA.LIVING_ROOM}}个</span>
            <span style="margin-right: 0.4rem;" v-if="pageData.EXTRA.KITCHEN!=0">厨房：{{pageData.PRO==undefined?'':pageData.EXTRA.KITCHEN}}个</span>
            <span style="margin-right: 0.4rem;" v-if="pageData.EXTRA.STUDY!=0">书房：{{pageData.PRO==undefined?'':pageData.EXTRA.STUDY}}个</span>
            <span style="margin-right: 0.4rem;" v-if="pageData.EXTRA.BALCONY!=0">阳台：{{pageData.PRO==undefined?'':pageData.EXTRA.BALCONY}}个</span>
          </div>
        </div>
        <div class="house_content_detail_once">
          <div class="house_content_detail_once_left">地址</div>
          <div class="house_content_detail_once_right">{{pageData.PRO==undefined?'':pageData.EXTRA.ADDRESS}}</div>
        </div>
        <div class="house_content_detail_once">
          <div class="house_content_detail_once_left">房源卖点</div>
          <div class="house_content_detail_once_right">{{pageData.PRO==undefined?'':pageData.EXTRA.SELL_POINT}}</div>
        </div>
        <div class="house_content_detail_once">
          <div class="house_content_detail_once_left">交通情况</div>
          <div class="house_content_detail_once_right">{{pageData.PRO==undefined?'':pageData.EXTRA.TRAFFIC}}</div>
        </div>
      </div>

      <div class="house_content_detail" v-if="houseFacilityMore">

        <div class="house_content_detail_title">核心设施</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_CORE" :key="index">{{item.NAME}}</span>
        </div>

        <div class="house_content_detail_title">周边500米</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_SUPPORT" :key="index">{{item.NAME}}</span>
        </div>

        <div class="house_content_detail_title">服务设施</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_SERVICE" :key="index">{{item.NAME}}</span>
        </div>

        <div class="house_content_detail_title">居家设施</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_JU_JIA" :key="index">{{item.NAME}}</span>
        </div>

        <div class="house_content_detail_title">休闲设施</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_LEISURE" :key="index">{{item.NAME}}</span>
        </div>

        <div class="house_content_detail_title">卫浴设施</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_WEI_YU" :key="index">{{item.NAME}}</span>
        </div>

        <div class="house_content_detail_title">餐厨设施</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_KITCHEN" :key="index">{{item.NAME}}</span>
        </div>

        <div class="house_content_detail_title">附近景观</div>
        <div class="house_content_detail_text">
          <span class="house_content_detail_span" v-for="(item,index) of FACILITY_SCENIC" :key="index">{{item.NAME}}</span>
        </div>
      </div>
      <div class="house_facility_more" @click="onHouseFacilityMore">
        <div style="margin-right: 0.3rem;" v-if="!houseFacilityMore">更多房型设施</div>
        <van-icon name="arrow-down" color="#C0C0C0" size="0.68rem" v-if="!houseFacilityMore"/>
        <div style="margin-right: 0.3rem;" v-if="houseFacilityMore">收起</div>
        <van-icon name="arrow-up" color="#C0C0C0" size="0.68rem" v-if="houseFacilityMore"/>
      </div>
      <!-- <div class="house_bottom_line "></div> -->

      <div class="" style="width: 100%;" ref="vchose"></div>
      <v-chose style="width: 100%;" :viewBoolean="false" ></v-chose>

      <div class="shop_destination" v-if="pageData.SCENIC!=undefined?(pageData.SCENIC.ID!=''||pageData.SCENIC.ID!=undefined):false" @click="onNavigateRoad(pageData.SCENIC)">
        <div>关联目的地: {{pageData.SCENIC.NAME}}</div>
        <van-icon name="arrow" size="0.9rem" color="#ccc" />
      </div>


      <div class="shop_state_title" v-show="pageData.EXTRA!=undefined?pageData.EXTRA.TAKE_ORDER_MESS!='':false">预订须知</div>
      <div class="house_detail_border " v-show="pageData.EXTRA!=undefined?pageData.EXTRA.TAKE_ORDER_MESS!='':false">
        <div :class="['house_detail',height_content>106?'content_detail_line':'']" ref="content"  v-html="htmlList(pageData.EXTRA!=undefined?pageData.EXTRA.TAKE_ORDER_MESS:'')">
        </div>
        <div class="content_detail_white " v-if="height_content>106" @click="height_content=1">
          <div>展开阅读全文</div>
          <img class="content_detail_white_img" :src="require('../../../static/icon/shop_detail/zhankai.png')">
        </div>
        <div class="content_detail_white2 " v-if="height_content==1" @click.stop="height_content=107">
          <div>收起全文</div>
          <img class="content_detail_white_img2" style="transform: rotate(180deg);" :src="require('../../../static/icon/shop_detail/zhankai.png')">
        </div>
      </div>

      <div class="shop_state_title">商品介绍</div>
      <div class="house_detail_border" style="margin-bottom: 1rem;">
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

      <iframe id="baidumapiframe" :src="mapUrl" v-if="pageData.EXTRA==undefined?false:pageData.EXTRA.LAT!=0" allowtransparency="true" style="width: 100%; height: 300px; border: 0px none;margin: 0.4rem 0;"></iframe>

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

    <van-calendar v-model="timeShow" @confirm="onTimeShow" type="multiple" />

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
        height_content:'',
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
    beforeCreate(){
      this.$store.state.index.shopType = ''
      this.$store.state.index.shopTime = []
    },
    created() {
      this.$dopost('/sysapi/pro/detail/', {id:this.id},
      function (res) {
      	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
      	{//console.log(res.data.data);
          this.$store.state.detail.selectType={};
          this.$store.commit('SET_DATAS',res.data.data);
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
    computed:{
      htmlList:function(){
        return function(html){
           var richtext=  html
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
    methods: {
      onTextDiv(){
        this.height_content = this.$refs.content.offsetHeight;//详情
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
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.mapUrl = `${this.domainUrl}/mobile/map_view.html?lng=${res.data.data.EXTRA.LNG}&lat=${res.data.data.EXTRA.LAT}`
            var core = res.data.data.EXTRA.FACILITY_CORE.split(",");
            core.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_CORE = that.FACILITY_CORE.concat(item)
            })
            var FACILITY_SUPPORT = res.data.data.EXTRA.FACILITY_SUPPORT.split(",");
            FACILITY_SUPPORT.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_SUPPORT = that.FACILITY_SUPPORT.concat(item)
            })
            var FACILITY_SERVICE = res.data.data.EXTRA.FACILITY_SERVICE.split(",");
            FACILITY_SERVICE.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_SERVICE = that.FACILITY_SERVICE.concat(item)
            })
            var FACILITY_JU_JIA = res.data.data.EXTRA.FACILITY_JU_JIA.split(",");
            FACILITY_JU_JIA.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_JU_JIA = that.FACILITY_JU_JIA.concat(item)
            })
            var FACILITY_LEISURE = res.data.data.EXTRA.FACILITY_LEISURE.split(",");
            FACILITY_LEISURE.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_LEISURE = that.FACILITY_LEISURE.concat(item)
            })
            var FACILITY_WEI_YU = res.data.data.EXTRA.FACILITY_WEI_YU.split(",");
            FACILITY_WEI_YU.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_WEI_YU = that.FACILITY_WEI_YU.concat(item)
            })
            var FACILITY_KITCHEN = res.data.data.EXTRA.FACILITY_KITCHEN.split(",");
            FACILITY_KITCHEN.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_KITCHEN = that.FACILITY_KITCHEN.concat(item)
            })
            var FACILITY_SCENIC = res.data.data.EXTRA.FACILITY_SCENIC.split(",");
            FACILITY_SCENIC.map((item,index) => {
              var item = allTag.filter(n=>n.ID==item);
              that.FACILITY_SCENIC = that.FACILITY_SCENIC.concat(item)
            })
            if(res.data.data.PRO.TO_TYPE==1){
              window.location.href=String(res.data.data.PRO.TO_URL)
            }
            var picList = res.data.data.EXTRA.PIC.split(","); //字符分割
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
              this.$wx.wxConfig()
            }
          }else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      //评价列表
      talkData(){
        var token = this.$store.state.login.token
        if(token!=1){
          this.$toast('请先登录');
        }else{
          var data = {
           page:1,
           to_id:25828,
           module:1,
           // city_id:this.$store.state.index.city.id==undefined?'':this.$store.state.index.city.id,
           // area_id:this.$store.state.index.area.id==undefined?'':this.$store.state.index.area.id,
           // keyword:'',
          }
          this.$dopost('/sysapi/comment/list/',data,function (res) {
            console.log('评论列表',res)
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){

            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }


      },

      // 客服
      onClickIm(){
        this.$router.push({
        	path: '/im',
           query: {
        	   id: String(this.pageData.PRO.USER_ID),
        	}
        })
      },
      // 商家详情
      onStore(){
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

      formatDate(date) {
        var list =  date.map((item,index) => {
          return `${item.getFullYear()}-${item.getMonth() + 1}-${item.getDate()}`;
        })
        return list
      },
      onTimeShow(date) {
        console.log(date)
        this.timeShow = false;
        // this.timeDate = this.formatDate(date);
        this.$store.state.index.shopTime = this.formatDate(date);
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
               type: 2,
          	   // id: item.ID,
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

<style scoped="scoped" src="../../css/shop_detail_hotel.css">
  /* @import url("../../css/shop_detail_play.css"); */

</style>
