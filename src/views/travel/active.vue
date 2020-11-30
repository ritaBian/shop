<template>
  <div class="body">

    <div class="page_navite">
      <img class="page_navite_left" @click="onClickMenu" :src="require('../../../static/icon/caidan.png')">

      <van-search class="page_navite_search" v-model="inputValue" placeholder="请输入搜索关键词" shape="round" background="#01A862"  @blur="onBlur"  />

      <!-- <div class="page_navite_center">
        <img class="page_navite_logo" :src="require('../../../static/icon/logo.png')" >
        <div>橡果互动</div>
      </div>
      <img class="page_navite_right" :src="require('../../../static/icon/search.png')" > -->
    </div>

    <!-- <div class="wrapper" ref="wrapper">
        <ul class="wrapper_cont" ref="cont">
          <li :class="['cont_once',optionValue.id==item.id?'option_once2':'option_once1']" @click="onOptionClick(item)" v-for="(item,index) of optionList" :key="index">{{item.name}}</li>
        </ul>
    </div> -->

    <div class="page_title " ref="wrapper">
      <ul class="wrapper_cont" ref="cont">
        <div class="wrapper_cont_once" v-for="(item,index) of data.tag" :key="index" @click="onClickTag(item,index)">
          <div :style="{color:item.color==''?'':item.color}">{{item.name}}</div>
          <!-- <div class="page_title_bottom" :style="{backgroundColor:item.color}" v-if="tagIndex==index"></div> -->
        </div>
      </ul>
    </div>

    <van-swipe class="swipeClass " :autoplay="4000" indicator-color="#01A862">
      <van-swipe-item v-for="(item,index) of data.pics" :key="index" @click="onSwiperClick(item)">
        <van-image class="swiperImage" fit="cover" :src="domainUrl+'/'+item.pic" />
      </van-swipe-item>
    </van-swipe>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onShowsDown"
      class="list_once_border"
      :offset="offset"
      :immediate-check="false"
      >

      <div class="view_once" v-for="(item,index) of pageList" :key="index" @click="onClickPageList(item)">
        <div class="view_left ">
          <div class="view_left_title app_line2">{{item.NAME}} {{item.NAME2}}</div>
          <div class="view_left_content">{{item.ADD_TIME}} <span style="margin-left: 0.8rem;" v-if="item.COMMENT_COUNT!=''&&item.COMMENT_COUNT!=0">{{item.COMMENT_COUNT}}人评价</span></div>
        </div>
          <van-image class="view_img" fit="cover" :src="domainUrl+'/'+item.PIC" />
      </div>




      <!-- <div class="list_once" v-for="(item,index) of pageList" :key="index" @click="onClickPageList(item)">
        <van-image class="list_once_img" :src="domainUrl+'/'+item.PIC" fit="cover" />
        <div class="list_title app_line2 ">{{item.NAME}}</div>
        <div class="list_tag">
          <div>{{item.NAME2}}</div>
        </div>
        <div class="list_label" v-if="allTag!=''&&allTag!=undefined">
          <van-tag class="list_label_once" plain v-if="item.TAG1!=0" color="#57A9E9" size="medium">{{allTag.filter(n=>n.ID==item['TAG1'])[0].NAME}}</van-tag>
          <van-tag class="list_label_once" plain v-if="item.TAG2!=0" color="#57A9E9" size="medium">{{allTag.filter(n=>n.ID==item['TAG2'])[0].NAME}}</van-tag>
          <van-tag class="list_label_once" plain v-if="item.TAG3!=0" color="#57A9E9" size="medium">{{allTag.filter(n=>n.ID==item['TAG3'])[0].NAME}}</van-tag>
          <van-tag class="list_label_once" plain v-if="item.TAG4!=0" color="#57A9E9" size="medium">{{allTag.filter(n=>n.ID==item['TAG4'])[0].NAME}}</van-tag>
          <van-tag class="list_label_once" plain v-if="item.TAG5!=0" color="#57A9E9" size="medium">{{allTag.filter(n=>n.ID==item['TAG5'])[0].NAME}}</van-tag>
        </div>
        <div class="list_bottom_border">
          <div class="list_bottom_left">
            <div style="color: #2291E3;" v-if="item.COMMENT_NUM!=0.0">{{item.COMMENT_NUM}}分</div>
            <div style="margin-left: 0.5rem;" v-if="item.COMMENT_COUNT!=0">{{item.COMMENT_COUNT}}人点评</div>
          </div>
          <div class="list_bottom_right">
            <div class="list_money">￥</div>
            <div class="list_money2">{{item.PRICE}}</div>
            <div class="list_money3">起</div>
          </div>
        </div>
      </div> -->
    </van-list>


    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask" ></div>

    <div class="menu_border" :style="{width: maskBoolean?'80%':'0'}" >
      <div class="menu_title">
        <van-icon class="menu_icon" @click="onMask" name="cross" color="#FFFFFF" size="1.12rem"/>
        <div class="menu_title_center">
          <img class="menu_title_logo" src="../../../static/icon/logo.png">
          <div>橡果互动</div>
        </div>
      </div>
      <div class="menu_once" style="margin-top: 3.65rem;" @click="onNavigateUs">
        <div class="menu_once_title ">关于我们</div>
      </div>
      <div class="menu_once" @click="onNavigateUs">
        <div class="menu_once_title">联系合作</div>
      </div>
      <div class="menu_once" @click="onNavigateUs">
        <div class="menu_once_title">加入我们</div>
      </div>
    </div>

    <!-- 底部栏 -->
    <v-footer2></v-footer2>
  </div>
</template>

<script>
  import Util from '@/util/common';
  import BScroll from 'better-scroll'
  import Footer2 from '@/common/travel/_footer.vue'
  import {Toast} from 'vant';
  export default {
    name:'active',
    components:{
      'v-footer2':Footer2
    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        allTag:this.$store.state.index.allTag,

        pageDetail:'',
        maskBoolean:false,
        data:'',
        tagIndex:null,
        inputValue:'',
        loading: false,
        finished: false,
        offset:100,
        page_index:1,
        pageList:[],
      }
    },
    updated() {
      this.allTag = this.$store.state.index.allTag
    },
    created() {
      //数据
      this.initData()
      //发现数据
      this.onFindData()
    },
    mounted(){
      var that = this;
      this.$nextTick(() => {
        this._initMenu()
      })
    },
    activated(){
      this.initData_data()
    },
    methods: {
      _initMenu(){
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollX: true,
              eventPassthrough: 'vertical',
              click: true,
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      //滑到底部
      onShowsDown(e){
         var that = this;
         setTimeout(function() {
           that.onFindData()
         }, 1000);
      },
      //发现数据
      onFindData(){
        var that = this;
        var data = {
           page:that.page_index,
           level:100,//推荐值 取值范围1-5
           keyword:that.inputValue,//关键字
        }
        that.$dopost('/sysapi/travel/list/', data,function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            if(res.data.data.data.length == 0){
              that.finished = true
            }
            that.loading = false;
            that.page_index = that.page_index + 1
            that.pageList = that.pageList.concat(res.data.data.data);

        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));

      },
      //点击跳到详情页
      onClickPageList(item){
        this.$router.push({
        	path: '/shop_new_detail',
           query: {
        	   id: item.ID,
             // pid:item.SORT_PARENT_ID
        	}
        })
      },
      //数据
      initData(){
        var that = this;
        this.$dopost('/sysapi/travel/discount/', null,function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.data = res.data.data
            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = '橡果互动活动页'
              this.$store.state.index.currentPage.page = window.location.href
              this.$store.state.index.currentPage.image = Util.getNull(res.data.data.pics[0].pic)?this.domainUrl + '/' +res.data.data.pics[0].pic:'';
            }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      //数据
      initData_data(){
        var that = this;
        this.$dopost('/sysapi/travel/discount/', null,function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = '橡果互动活动页'
              this.$store.state.index.currentPage.page = window.location.href
              this.$store.state.index.currentPage.image = Util.getNull(res.data.data.pics[0].pic)?this.domainUrl + '/' +res.data.data.pics[0].pic:'';
            }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      onClickTag(item,index){
        this.tagIndex = index
        var url = item.url
        if(url==''){
          return
        }
        var urlIndex=url.indexOf("//:");
        if(urlIndex!=-1){
          window.location.href = url
        }else{
          this.$router.push({
           path: url,
          })
        }
      },
      //搜索
      onBlur(){
        this.page_index = 1
        this.pageList = []
        this.finished = false
        this.onFindData()
      },
      //swiper
      onSwiperClick(item){
        var url = item.url
        console.log(url)
        if(url==''){
          return
        }
        var urlIndex=url.indexOf("//:");
        if(urlIndex!=-1){
          window.location.href = url
        }else{
          this.$router.push({
           path: url,
          })
        }
      },
      onClickMenu(){
        this.maskBoolean = true
      },
      onMask(){
        this.maskBoolean = false
      },
      onNavigateUs(){
        this.$router.push({
         path: '/active_us',
        })
      }
    },

  }


</script>

<style scoped="scoped" src="../../css/active.css">
  /* @import url("../../css/active.css"); */
</style>
