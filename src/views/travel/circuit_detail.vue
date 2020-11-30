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
      <van-swipe class="swiper_border" v-if="initData.data!=undefined" @change="onChangeSwiper" :loop="loop" :show-indicators="showIndicators">
        <van-swipe-item  v-for="(item,index) of initData.data.PICS" :key="index">
          <van-image class="swiper_img" fit="cover" :src="domainUrl+'/'+item" />
        </van-swipe-item>
      </van-swipe>
      <!-- 底部 -->
      <div class="swiper_index">
        <div style="margin-left: 0.12rem;" v-if="initData.data!=undefined">{{current}}/{{initData.data.PICS.length}}</div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content_border ">
      <div class="content_title ">
        <div class="content_title_left" :style="{border:initData.data!=undefined?(initData.data.COMMENT_NUM*1==0&&initData.data.COMMENT_COUNT*1==0?'none':''):false}">
          <div class="content_title_left_text " v-if="initData.data!=undefined">{{initData.data.NAME}}</div>
          <div class="content_title_left_tag">
            <van-tag class="content_title_left_tag_once" color="#1C87DD" size="medium" plain v-if="initData.data!=undefined&&allTag!=''?(initData.data.TAG1!=0):false">{{allTag.filter(n=>n.ID==initData.data['TAG1'])[0].NAME}}</van-tag>
            <van-tag class="content_title_left_tag_once" color="#1C87DD" size="medium" plain v-if="initData.data!=undefined&&allTag!=''?(initData.data.TAG2!=0):false">{{allTag.filter(n=>n.ID==initData.data['TAG2'])[0].NAME}}</van-tag>
            <van-tag class="content_title_left_tag_once" color="#1C87DD" size="medium" plain v-if="initData.data!=undefined&&allTag!=''?(initData.data.TAG3!=0):false">{{allTag.filter(n=>n.ID==initData.data['TAG3'])[0].NAME}}</van-tag>
            <van-tag class="content_title_left_tag_once" color="#1C87DD" size="medium" plain v-if="initData.data!=undefined&&allTag!=''?(initData.data.TAG4!=0):false">{{allTag.filter(n=>n.ID==initData.data['TAG4'])[0].NAME}}</van-tag>
            <van-tag class="content_title_left_tag_once" color="#1C87DD" size="medium" plain v-if="initData.data!=undefined&&allTag!=''?(initData.data.TAG5!=0):false">{{allTag.filter(n=>n.ID==initData.data['TAG5'])[0].NAME}}</van-tag>
          </div>
        </div>
        <!-- <div class="content_title_right" >
          <div class="content_title_right_title" ><span class="content_title_right_title_big">{{initData.data.COMMENT_NUM}}</span>/5.0分</div>
          <div class="content_title_right_man">{{initData.data.COMMENT_COUNT * 1}}人点评</div>
        </div> -->
        <div class="content_title_right" v-if="initData.data!=undefined?(initData.data.COMMENT_NUM*1!=0)&&(initData.data.COMMENT_COUNT*1!=0):false">
          <div class="content_title_right_title" v-if="initData.data!=undefined?(initData.data.COMMENT_NUM*1!=0):false"><span class="content_title_right_title_big">{{initData.data.COMMENT_NUM}}</span>/5.0分</div>
          <div class="content_title_right_man" v-if="initData.data!=undefined?(initData.data.COMMENT_COUNT*1!=0):false">{{initData.data.COMMENT_COUNT * 1}}人点评</div>
        </div>
      </div>
      <!-- v-if="initData.data!=undefined" -->
      <div class="content_description_content "  v-if="initData.data!=undefined">
        <div class="content_description_content_position" :style="{marginBottom:height_content==1?'1.5rem':''}">
          <div :class="[height_content>=91?'content_description_text':'content_description_expansionText']" ref="content" v-html="htmlList(initData.data.DESCRIPTION)">
          </div>
            <div class="content_description_white " style="right: 0;" v-if="height_content>=91" @click.stop="height_content=1"></div>
            <div class="content_description_blue " style="right: 0;" v-if="height_content>=91" @click.stop="height_content=1">
              展开更多
              <van-icon name="arrow-down" color="#3A99E5" size="0.9rem" />
            </div>
            <div class="content_detail_white "  v-if="height_content==1" @click.stop="height_content=92">
              <div>收起全文</div>
              <img class="content_detail_white_img" style="transform: rotate(180deg);" :src="require('../../../static/icon/shop_detail/zhankai.png')">
            </div>
        </div>



      </div>
      <div class="content_exponent_border" v-if="initData.data!=undefined">
        <div class="content_exponent " @click="onClickExponent">
          <div class="content_exponent_left ">
            <img class="content_exponent_left_img" :src="require('../../../static/circuit_detail/suzhi.png')">
            <div style="margin-right: 0.78rem;">行程指数</div>
            <van-rate v-model="rateLine" readonly color="#FFC900" size="1rem" gutter="0.1rem" />
            <div class="content_exponent_left_num">{{initData.data.LINE_INDEX * 1}}分</div>
          </div>
          <div class="content_exponent_right">
            <div style="margin-right: 0.18rem;">指数详情</div>
            <van-icon name="arrow-down" v-if="!exponentBoolean" color="#3A99E5" size="0.6rem" />
            <van-icon name="arrow-up" v-if="exponentBoolean" color="#3A99E5" size="0.6rem" />
          </div>
        </div>
        <!-- 隐藏指数 -->
        <div class="content_exponent_hide" v-if="exponentBoolean">
          <div class="content_exponent_hide_img "></div>
          <div class="content_exponent_hide_once">
            <div style="margin-right: 0.78rem;">体力消耗</div>
            <van-rate v-model="rateBoddy" readonly color="#FFC900" size="1rem" gutter="0.1rem" />
            <div class="content_exponent_left_num">{{initData.data.BODY_INDEX_NAME}}</div>
          </div>
          <div class="content_exponent_hide_once">
            <div style="margin-right: 0.78rem;">道路状况</div>
            <van-rate v-model="rateTraffic" readonly color="#FFC900" size="1rem" gutter="0.1rem" />
            <div class="content_exponent_left_num">{{initData.data.TRAFFIC_INDEX_NAME}}</div>
          </div>
          <div class="content_exponent_hide_once">
            <div style="margin-right: 0.78rem;">安全指数</div>
            <van-rate v-model="rateSafe" readonly color="#FFC900" size="1rem" gutter="0.1rem" />
            <div class="content_exponent_left_num">{{initData.data.SAFE_INDEX_NAME}}</div>
          </div>
          <div class="content_exponent_hide_once">
            <div style="margin-right: 0.78rem;">游客数量</div>
            <van-rate v-model="ratePerson" readonly color="#FFC900" size="1rem" gutter="0.1rem" />
            <div class="content_exponent_left_num">{{initData.data.PERSON_INDEX_NAME}}</div>
          </div>
        </div>
      </div>


      <div class="content_traffic" @click="onTrafficClick">
         <img class="content_traffic_left" :src="require('../../../static/circuit_detail/bus.png')">
         <div class="content_traffic_cent ">
            <div>交通信息</div>
            <div class="content_traffic_cent_text app_line2" v-if="initData.data!=undefined" v-html="initData.data.TRAFFIC"></div>
         </div>
         <div class="content_traffic_right">
           <van-icon name="arrow"  color="#C0C0C0" size="0.8rem" />
         </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="station_border ">
      <div class="station_road_border">
        <div class="station_road " :style="roadImg1">
          <div class="station_road_start ">
            <img class="station_road_start_img" :src="require('../../../static/circuit_detail/start.png')">
            <div class="station_road_start_text">Start</div>
          </div>
        </div>
      </div>
      <div class="station_view " v-if="initData.data!=undefined">
        <div class="station_view_once "  v-for="(item,index) of initData.details" :key="index">
          <div class="station_once_title_border ">
              <div class="station_once_title">
                <span style="margin-left: 0.69rem;" v-html="item.LINE_DETAIL_NUM_NAME"></span>
                <span style="margin-left: 0.41rem;color: #999999;font-size: 0.69rem;">第{{item.DAY_NUM}}天 {{item.DAY_TIME}}</span>
              </div>
              <div class="station_once_name">{{item.NAME}}</div>
              <div class="station_once_title_posi ">
                <img class="station_once_title_posi_img" :src="require('../../../static/circuit_detail/juli.png')">
                <img class="station_once_title_posi_text" :src="require('../../../static/circuit_detail/right.png')">
              </div>
              <div class="station_once_title_km " v-if="index!=0">
                <div>相距</div>
                <div>{{item.DISTANCE==''||item.DISTANCE==undefined?0:item.DISTANCE}}KM</div>
              </div>
          </div>
          <div class="station_white ">
            <van-image class="station_white_img" v-if="item.SCENIC.PIC!=''&&item.SCENIC.PIC!=undefined" fit="cover" :src="domainUrl+'/'+item.SCENIC.PIC" />
            <div class="station_white_address" v-if="item.SCENIC.NAME!=''&&item.SCENIC.NAME!=undefined">
               <div class="station_white_address_left " @click="onStationAddress(item)">
                 &nbsp;&nbsp;&nbsp;&nbsp;
                 <div class="app_line" style="margin-left: 0.3;">{{item.SCENIC.NAME}}</div>
               </div>
               <div class="station_white_address_right" @click="onClickMap(item)">
                 <img class="station_white_address_right_img" :src="require('../../../static/circuit_detail/address.png')">
                 <div style="margin-left: 0.22rem;">导航</div>
               </div>
            </div>
			
			
<div class="station_white_address" v-if="item.SCENIC.ADDRESS!=''&&item.SCENIC.ADDRESS!=undefined">
               <div class="station_white_address_left " >
                 <van-icon name="location-o" size="1.03rem" color="#E5E5E5"  />
                 <div class="app_line" style="margin-left: 0.3;">{{item.SCENIC.ADDRESS}}</div>
               </div>
               
            </div>
			
			
			
            <!-- 门票 @click="onNavigateCard(item)" -->
            <div class="station_card_border " @click="onStationAddress(item)" v-if="item.PRO_PRICE!=undefined?item.PRO_PRICE.PRICE!=''&&item.PRO_PRICE.PRICE_SHOP!=''||item.PRO_PRICE.MESS!='':false">
              <div class="station_card_left " >
                <img class="station_card_left_img" :src="require('../../../static/circuit_detail/card.png')">
                <div class="station_card_left_money" v-if="item.PRO_PRICE.PRICE!=''">￥<span class="station_card_left_money2">{{item.PRO_PRICE.PRICE}}</span></div>
                <div class="station_card_left_qi" v-if="item.PRO_PRICE.PRICE!=''">起</div>
                <div class="station_card_left_yuan" v-if="item.PRO_PRICE.PRICE_SHOP!=''&&item.PRO_PRICE.PRICE_SHOP!=0">原价 {{item.PRO_PRICE.PRICE_SHOP}}元</div>
                  <!-- v-if="item.PRO_PRICE.PRICE==''&&item.PRO_PRICE.PRICE_SHOP==''" -->
                <div class="station_card_left_mess" v-if="item.PRO_PRICE.PRICE==''&&item.PRO_PRICE.PRICE_SHOP==''">{{item.PRO_PRICE.MESS}}</div>
              </div>
              <van-icon name="arrow" size="0.75rem" color="#C0C0C0" />
            </div>

            <van-swipe class="play_swipe " :loop="false" width="97.5" height="87.5"  :show-indicators="false">
              <van-swipe-item class="play_swipe_item" v-for="(img,indexs) of playSwiper(item.PIC1,item.PIC2,item.PIC3,item.PIC4,item.PIC5,item.PIC6,item.PIC7,item.PIC8,item.PIC9)" :key="indexs" >
                <van-image class="play_swipe_once" fit="cover" :src="domainUrl+'/'+img" @click="onImagePreview(playSwiper(item.PIC1,item.PIC2,item.PIC3,item.PIC4,item.PIC5,item.PIC6,item.PIC7,item.PIC8,item.PIC9),indexs)"/>
              </van-swipe-item>
            </van-swipe>

            <div class="station_white_description_content ">
              <div :class="[item.scenic_content>=91?'content_description_text':'content_description_expansionText']" ref="scenic_content" v-html="htmlList(item.DESCRIPTION)">
              </div>
              <div class="content_description_white " v-if="item.scenic_content>=91" @click.stop="onScenicContent(index)"></div>
              <div class="content_description_blue " v-if="item.scenic_content>=91" @click.stop="onScenicContent(index)">
                展开更多
                <van-icon name="arrow-down" color="#3A99E5" size="0.9rem" />
              </div>
              <div class="content_detail_white " v-if="item.scenic_content==1" @click.stop="onScenicContentNone(index)">
                <div>收起全文</div>
                <img class="content_detail_white_img" style="transform: rotate(180deg);" :src="require('../../../static/icon/shop_detail/zhankai.png')">
              </div>

            </div>
           <!-- <div class="station_white_more_border">
              <div class="station_white_more_talk" v-if="item.SCENIC.COMMENT_COUNT!=0">更多评论({{item.SCENIC.COMMENT_COUNT}})</div>
            </div> -->
          </div>
        </div>
        <!-- 攻略 -->
        <div class="strategy_border" v-if="initData.data.NOTE!=''&&initData.data.NOTE!=null">
          <div class="strategy_title">攻略须知</div>
          <div v-html="initData.data.NOTE"></div>
        </div>
        <div class="station_bottom_bg ">
          <div class="station_bottom_bg_img" :style="roadImg2"></div>
          <img class="station_bottom_round_bg " :src="require('../../../static/circuit_detail/road2.png')">
          <div class="station_bottom_end ">
            <img class="station_road_start_img" :src="require('../../../static/circuit_detail/start.png')">
            <div class="station_road_start_text">End</div>
          </div>
          <div class="station_bottom_view ">
            <div class="station_bottom_view_text ">
              <van-image class="station_bottom_view_face" fit="cover" :src="user_face(initData.user.pic)" />
               {{initData.user.name}}{{initData.data.ADD_TIME}}发表
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="station_bottom_line ">
      <div class="station_bottom_line_class "></div>
    </div>

    <div class="talk_title">相关评论</div>
    <div class="talk_title_text">分享旅游达人心得</div>



    <!-- 瀑布流 -->
    <!-- <div style="height: 1rem;"></div> -->
    <appWaterfall v-if="initData.data!=undefined" module="2" keyword="" areaid="" :to_id="initData.data.ID"></appWaterfall>

    <div class="tabbar_border">
      <div class="tabbar_item" v-if="initData.data!=undefined?(initData.data.liked==0):false" @click="onTabbarLike(1)">
        <div class="tabbar_item_img_border">
          <img class="tabbar_item_img"  :src="require('../../../static/icon/like.png')" >
          <div class="tabbar_item_tag" v-if="initData.data.LIKED_COUNT!=0">{{initData.data.LIKED_COUNT}}</div>
        </div>
        <div class="tabbar_item_text" style="color: #585858;">点赞</div>
      </div>
      <div class="tabbar_item" v-if="initData.data!=undefined?(initData.data.liked==1):false" @click="onTabbarLike(2)">
        <div class="tabbar_item_img_border">
          <img class="tabbar_item_img" :src="require('../../../static/icon/like2.png')" >
          <div class="tabbar_item_tag" >{{initData.data.LIKED_COUNT}}</div>
        </div>
        <div class="tabbar_item_text" style="color: #01A862;">点赞</div>
      </div>
      <!-- <div class="tabbar_item" @click="onTabbarLike">
        <div class="tabbar_item_img_border">
          <img class="tabbar_item_img" v-if="tabbarLikeBoolean" src="../../../static/icon/like2.png" >
          <img class="tabbar_item_img" v-if="!tabbarLikeBoolean" src="../../../static/icon/like.png" >
          <div class="tabbar_item_tag">{{tabbarLike}}</div>
        </div>
        <div class="tabbar_item_text" :style="{color:tabbarLikeBoolean?'#01A862':'#585858'}">点赞</div>
      </div> -->
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
      <div class="tabbar_item"  @click="onClickIm" >
        <div class="tabbar_item_img_border ">
          <van-icon :badge="$store.state.im.count>0?$store.state.im.count:''" :name="require('../../../static/icon/kefu.png')" class="tabbar_item_img"/>
          <!-- <img class="tabbar_item_img" :src="require('../../../static/icon/kefu.png')" > -->
        </div>
        <div class="tabbar_item_text">客服</div>
      </div>
    </div>

    <!-- 礼物 -->
    <appGift v-if="giftBoolean" :bounty="initData.bounty"  module="1" :userid="initData.data.ID"  @onMask="onMask"></appGift>

    <!-- 分享蒙层 -->
    <appShare v-if="shareBoolean" @onMask="onMask" ></appShare>

    <!-- 交通信息 -->
    <van-popup class="traffic_mask" v-model="trafficBoolean" >
      <div class="traffic_mask_title">交通信息</div>
      <div class="traffic_mask_content" v-if="initData.data!=undefined" v-html="initData.data.TRAFFIC">
        <!-- {{initData.data.TRAFFIC}} -->
      </div>
      <div class="traffic_mask_button" @click="onMask">知道了</div>
    </van-popup>

    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask"></div>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  import { ImagePreview } from 'vant';
  export default {
    // beforeRouteLeave(to, from, next) {
    //     if (to.name == "发表评论") {
    //       this.$store.commit("noKeepAlive", "circuit_detail");
    //     }
    //     next();
    // },
    name:'circuit_detail',
    data() {
      return {
        domainUrl:this.$conf.domain,
        allTag:this.$store.state.index.allTag,
        token : this.$store.state.login.token==undefined||this.$store.state.login.token==''?0:this.$store.state.login.token,

        options:'',
        loop:false,
        showIndicators:false,
        current:1,
        images: [
          'http://img.ewebweb.com/uploads/20191006/19/1570360737-HvGOTkxnum.jpg',
          'http://img1.imgtn.bdimg.com/it/u=3427169086,3097665420&fm=214&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=1753371632,983488119&fm=214&gp=0.jpg',
        ],
        initData:'',//数据

        height_content:'',
        // height_scenic_content:'',
        roadImg1:{
          backgroundImage: "url("+require('../../../static/circuit_detail/road1.png')+")",
        },
        roadImg2:{
          backgroundImage: "url("+require('../../../static/circuit_detail/road3.png')+")",
        },

        tabbarLikeBoolean:false,
        tabbarLike:0,
        maskBoolean:false,

        data: [],
        col: 2,
        loading: false,
        shareBoolean:false,//分享弹窗
        giftBoolean:false,


        trafficBoolean:false,//交通信息弹窗
        exponentBoolean:true,//行程弹窗


      }
    },
    computed:{
      playSwiper:function(){
        return function(p1,p2,p3,p4,p5,p6,p7,p8,p9){
          var list = [p1,p2,p3,p4,p5,p6,p7,p8,p9]
          var swiperList = []
          for(var i = 0 ; i < list.length ; i++ ){
            if(list[i] != ''){
               swiperList.push(list[i])
            }
          }
          return swiperList

        }
      },
      rateBoddy:function(){
        return Number(this.initData.data.BODY_INDEX)
      },
      rateTraffic:function(){
        return Number(this.initData.data.TRAFFIC_INDEX)
      },
      rateSafe:function(){
        return Number(this.initData.data.SAFE_INDEX)
      },
      ratePerson:function(){
        return Number(this.initData.data.PERSON_INDEX)
      },
      rateLine:function(){
        return Number(this.initData.data.LINE_INDEX)
      },
      user_face:function(){
         return function(url){
            var index = url.indexOf("://")
            if(index==-1){
               return this.domainUrl + '/' + url
            }else{
               return url
            }
         }
      },
      htmlList:function(){
        return function(html){
           var richtext=  html
           const regex = new RegExp(`<img src="`, 'gi');
           // console.log(222,html)
           // console.log(1111,html.indexOf(`<img src="`))
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
    updated() {
      this.token =  this.$store.state.login.token==undefined||this.$store.state.login.token==''?0:this.$store.state.login.token
      this.allTag = this.$store.state.index.allTag
    },
    created() {
      this.options = this.$route.query
      // 数据
      this.onInitData(this.$route.query)
    },
    activated(){
      // console.log(123)
    },
    mounted(){
      var that = this
      // setTimeout(function() {
      //   that.$nextTick(() => {
      //     that.onTextDiv();
      //   })
      // }, 600);
    },
    methods: {
      //跳到目的地详情
      onStationAddress(item){
        console.log(item)
        if(item.SCENIC.ID!=undefined&&item.SCENIC.ID!=''){
          this.$router.push({
          	path: '/shop_detail',
             query: {
          	   id: item.SCENIC.ID,
          	}
          })
        }
      },
      //选择图片
      onImagePreview(item,index){
        var that = this;
        var list = item.map((ite,index) =>{
          return that.domainUrl + '/' + item[index]
        })
        ImagePreview({
          images: list,
          startPosition: index,
        });
      },
      onTextDiv(){
        console.log(9999999,this.$refs.content,this.$refs.content.offsetHeight)
        this.height_content = this.$refs.content==undefined?'':this.$refs.content.offsetHeight;//详情

        if(this.$refs.scenic_content!=undefined){
            this.$refs.scenic_content.map((item,index) => {
              this.$set(this.initData.details[index], 'scenic_content', this.$refs.scenic_content[index].offsetHeight)
            })
        }
      },
      //点击展开更多
      onScenicContent(index){
        this.initData.details[index].scenic_content = 1
      },
      //点击收回
      onScenicContentNone(index){
        this.initData.details[index].scenic_content = 91
      },
      //数据
      onInitData(item){
        var that = this;
        var data = {
          id:item.id,
          strdeal:1
        }
        if(this.token == 0){
          // this.$toast('请先登录');
          that.$dopost('/sysapi/line/detail/', data,function (res) {
          	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.initData = res.data.data
              setTimeout(function() {
                  that.onTextDiv();
              }, 600);
              // console.log(22222222,this.allTag.filter(n=>n.ID==this.initData.data.TAG1)[0].)
              //获取当前页面信息
              if(this.$store.state.index.currentPage.page!=window.location.href){
                this.$store.state.index.currentPage.name = res.data.data.data.NAME==''?'橡果互动线路详细页':res.data.data.data.NAME
                this.$store.state.index.currentPage.desc = res.data.data.data.DESCRIPTION.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,'')

                this.$store.state.index.currentPage.page = window.location.href
                this.$store.state.index.currentPage.image = Util.getNull(res.data.data.data.PIC)?this.domainUrl+'/'+res.data.data.data.PIC:''
              }
              that.$wx.wxConfig()
          	}else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this));
        }else{
          that.$dopost('/sysapi/line/detail/', data,function (res) {
          	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.initData = res.data.data
              setTimeout(function() {
                  that.onTextDiv();
              }, 600);
              // console.log(22222222,this.allTag.filter(n=>n.ID==this.initData.data.TAG1)[0].)
              //获取当前页面信息
              if(this.$store.state.index.currentPage.page!=window.location.href){
                this.$store.state.index.currentPage.name = res.data.data.data.NAME==''?'橡果互动线路详细页':res.data.data.data.NAME
                this.$store.state.index.currentPage.desc = res.data.data.data.DESCRIPTION.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,'')

                this.$store.state.index.currentPage.page = window.location.href
                this.$store.state.index.currentPage.image = Util.getNull(res.data.data.data.PIC)?this.domainUrl + '/' +res.data.data.data.PIC:''
              }
              that.$wx.wxConfig()
          	}else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },

      //点赞加一
      onTabbarLike(num){
        console.log(111,this.token)
        var type = Number(num)
        var data = {
          id:this.initData.data.ID,
          module: 1,
          type:type
        }
        if(this.token==1){
          if(type == 1){
            this.$dopost('/sysapi/comment/like',data,function (res) {
              console.log('点赞',res)
              if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
                console.log(123)
                this.initData.data.liked = 1
                this.initData.data.LIKED_COUNT = Number(this.initData.data.LIKED_COUNT)+1
              }else{
                Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
              }
            }.bind(this),true);
          }else{
            this.$dopost('/sysapi/comment/like/',data,function (res) {
              console.log('取消点赞',res)
              if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
                this.initData.data.liked = 0
                this.initData.data.LIKED_COUNT = Number(this.initData.data.LIKED_COUNT)-1
              }else{
                Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
              }
            }.bind(this),true);
          }
        }else{
          this.$toast('请先登录');
        }
      },
      //swiper滑动
      onChangeSwiper(e){
        this.current = e + 1
      },
      // 滑到底部加载
      loadmore() {
        this.loading = true;
        setTimeout(() => {
          this.data = this.data.concat(this.originData, this.originData);
          this.loading = false;
        }, 1000);
      },
      //点击送礼物
      onGift(){
        this.giftBoolean = true
      },
      // 点击分享
      onShare(){
        this.shareBoolean = true
      },
      // 点击交通信息
      onTrafficClick(){
        this.trafficBoolean = true
      },
      //点击行程指数
      onClickExponent(){
        this.exponentBoolean = !this.exponentBoolean
      },
      //跳到导航
      onClickMap(item){
        this.$router.push({
        	path: '/map',
           query: {
        	   name: item.SCENIC.NAME,
             lat: item.SCENIC.LAT,
             lng: item.SCENIC.LNG,
        	}
        })

      },
      //门票页
      onNavigateCard(item){
        console.log(item)
        this.$router.push({
        	path: '/card_detail',
           query: {
        	   id: item.ID,
        	}
        })
      },
      // 发表评论
      onNavigatePingLun(){
        this.$router.push({
        	path: '/comment',
           query: {
        	   id: this.initData.data.ID,
             module:2,
        	}
        })
      },
      //点击蒙层
      onMask(){
        console.log(333)
        this.listBoolean = false
        this.maskBoolean = false
        this.shareBoolean = false
        this.trafficBoolean = false
        this.giftBoolean = false
      },
      //点击选项
      onOptionClick(e){
        this.optionIndex = Number(e)
      },
      // 客服
      onClickIm(){
        this.$router.push({
        	path: '/imlist',
           query: {
        	   id: String(this.initData.user.id),
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
      }
    },

  }


</script>

<style scoped="scoped" src="../../css/circuit_detail.css">
  /* @import url("../../css/circuit_detail.css"); */

</style>
