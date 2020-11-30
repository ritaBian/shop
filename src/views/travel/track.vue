<template>
  <div class="body">
    <div class="page_body">
      <div class="page_title_border">
        <div class="page_title ">
          <van-icon name="arrow-left" style="margin-left: 0.2rem;" color="#8D8D8D" size="23" @click="onBack"/>
          <div class="title_input_border ">
            <div class="title_input_left " @click="onClickCity" >
              <van-icon name="location-o" color="#8D8D8D" size="15"/>
              <div v-if="city.name!=''" class="app_line">{{city.name}}</div>
            </div>
            <div class="title_input_right ">
              <van-search v-model="inputValue" placeholder="搜索周边"  @blur="onBlur"  />
            </div>
          </div>
          <van-icon :info="$store.state.im.count>0?$store.state.im.count:''" :name="require('../../../static/icon/kefu.png')" class="kefuImg" @click="onClickIm" />
          <!-- <van-icon name="service-o" color="#8D8D8D" size="25"/> -->
        </div>

        <!-- 选项 -->
        <div class="wrapper" ref="wrapper">
            <ul class="wrapper_cont" ref="cont" >
              <li v-if="optionList.length!=0" :class="['cont_once',optionValue.id==item.id?'option_once2':'option_once1']" @click="onOptionClick(item)" v-for="(item,index) of optionList" :key="index">{{item.name}}</li>
            </ul>
        </div>
        <!-- <div class="option_border" >
          <div class="option_border2 ">
            <div :class="['option_once',optionValue.id==item.id?'option_once2':'option_once1']" @click="onOptionClick(item)" v-for="(item,index) of optionList" :key="index">{{item.name}}</div>
          </div>
        </div> -->

      </div>

      <!-- 瀑布流 -->
      <div style="height: 1rem;"></div>
      <!-- v-if="appWaterfallBoolean"  -->
      <appWaterfall module='' :keyword="inputValue" areaid="" type_id="1" :city_id="city.id" ref="waterfall"></appWaterfall>
     <!-- <waterfall :col="col" :data="pageList1" @loadmore="loadmore" >
        <template>
            <div class="cell-item" v-for="(item,index) in pageList1" :key="index">
              <div class="item-img-border ">
                <img class="cell-item-img" v-if="item.img" :src="item.img" alt="加载错误">
                <div class="cell-item-img-label">北九水</div>
              </div>
              <div class="cell-item-title app_line2">{{item.CONTENT}}</div>
              <div class="cell-item-user">
                <img class="cell-item-face " :src="domainUrl+item.USER_ID_PIC" v-if="item.USER_ID_PIC" alt="加载错误">
                <div class="cell-item-nickname ">{{item.USER_ID_NAME}}</div>
              </div>

            </div>
        </template> -->
      <!-- </waterfall> -->
      <div style="height: 4rem;"></div>



    </div>
    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask"></div>
    <!-- 底部栏 -->
    <v-footer2 id="track"></v-footer2>


    <!-- 加载 -->
    <!-- <loading :show="loading" /> -->

  </div>
</template>

<script>
  import Footer2 from '@/common/travel/_footer.vue'
  import BScroll from 'better-scroll'
  // import {mapState} from 'vuex'
  import { Icon,Search,Image,Toast  } from 'vant';
  import Util from '@/util/common';
  import 'vant/lib/index.css';

  export default {
    beforeRouteLeave(to, from, next) {
        if (to.name == "城市索引"||to.name == '到此一游') {
          this.$store.commit("noKeepAlive", "track");
        }
        next();
    },
    name:'track',
    components:{
      [Icon.name]: Icon,
      [Search.name]: Search,
      [Image.name]: Image,
      'v-footer2':Footer2
    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        inputValue:'',//搜索值
        pageDetail:'',

        maskBoolean:false,//蒙层
        optionIndex:null,
        waterfallList_left:[],
        waterfallList_right:[1,123,1,1,2],

        waterfall_height_left:0,
        waterfall_height_right:0,
        arrRemoved:[],

        loading: false,
        finished: false,
        offset:100,
        page_index:1,
        pageList1:[],
        col: 2,

        city:this.$store.state.index.city,
        optionValue:'',
        optionList:this.$store.state.index.areaList,//选项数组
        appWaterfallBoolean:false,


      }
    },
    // activated(){
    //   console.log('这个不管用吗。。。。。。。。。。。。。。。。')
    //   // this.onShows()
    // },
    updated() {
       this.optionList = this.$store.state.index.areaList
    },
    created() {
      // this.onShows()

    },
    mounted(){
      var that = this;
        this.$nextTick(() => {
          this._initMenu()
        })
        setTimeout(function() {
          that.$nextTick(() => {
            that.searchUrl()
          })
        }, 400);
    },
    activated(){
      this.onShows()
      this.$refs.waterfall.onShows()
    },
    methods: {
      searchUrl(){
        // var searchURL = decodeURI(window.location.search) ;
        // console.log(888,searchURL)
        var that = this;
        if(this.$store.state.index.indexUrlBoolean==1){
          var city = {
            id:Util.getValue(Util.GetQuery('city_id')),
            name:Util.getValue(Util.GetQuery('city'))
          }
          var area = {
            id:Util.getValue(Util.GetQuery('area_id')),
            name:Util.getValue(Util.GetQuery('area'))==''?'区域':decodeURI(Util.getValue(Util.GetQuery('area')))
          }
          if(city.id!=''){
            this.city = city
            this.$store.state.index.city = city
            //获取城市
            this.onAddress(city)
          }

          this.optionValue = area
          this.$store.state.index.area = area
          this.inputValue = Util.getValue(Util.GetQuery('keyword'))

          this.page_index = 1
          this.pageList1 = []
          // that.onShows()
          // that.$refs.waterfall.onShows(2,area.id,this.inputValue)
          // that.appWaterfallBoolean = true
          setTimeout(function() {
            that.onShows()
            that.$refs.waterfall.onShows(2,area.id,that.inputValue)
          }, 600);
          this.$store.state.index.indexUrlBoolean = 2
        }else{
          that.onShows()
          that.$refs.waterfall.onShows()
          // //获取城市
          // this.onAddress()
          // setTimeout(function() {
          //     that.onShows()
          //     that.$refs.waterfall.onShows()
          // }, 600);

        }
      },
      //获取城市
      onAddress(item){
        this.$store.state.index.areaList = []
        Util.getCity(item.name)
        var areaList = this.$store.state.index.areaList
        this.optionList = areaList

      },
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
      //滑到底部加载
      loadmore() {
        this.loading = true;
        if(!this.finished){
          // this.onShows()
        }
      },
      //分页数据
      onShows(){
        var that = this;
        var data = {
          page:that.page_index,
          module: '', //模块；1：发现 2：线路  3：目的地,
          city_id:that.city.id, //ip获取城市接口中返回的城市id
          area_id:that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id, //城市下面的区的主键
          keyword:that.inputValue,  //关键字
        }
        that.$dopost('/sysapi/comment/list/', data,function (res) {
          console.log('首页数据111111',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){

            // var src = window.location.href
            // var srcList = src.split("/")
            // if(srcList[srcList.length-1]=='track'){
            that.pageList1 = that.pageList1.concat(res.data.data);
             var getNull = Util.getNull(that.optionValue.id)||Util.getNull(that.keyword)

              var pageNullNum = that.$store.state.index.trackPageNum
              if(pageNullNum==1&&that.pageList1.length==0&&getNull==false){
                this.$router.push({
                	path: '/city',
                  query: {
                     type: 3,
                  }
                })
              }
            // }


            //获取当前页面信息
            // if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = `橡果互动享迹页-${that.city.name}`
              var urlList = []
              if(Util.getNull(that.optionValue.id)){urlList.push(that.optionValue.name)}
              var urlListText = String(urlList)
              urlListText = urlListText==''?`橡果互动享迹页-${that.city.name}`:urlListText.replace(/,/g, '-')
              this.$store.state.index.currentPage.desc = urlListText

              var city = that.city//城市id
              var area = that.optionValue.name==''||that.optionValue.name==undefined?'':that.optionValue.name
              var area_id = that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id
              var keyword = that.inputValue//关键字

              var many = encodeURI(`city=${city.name}&city_id=${city.id}&area=${area}&area_id=${area_id}&keyword=${keyword}`)
              var hrefurl = `${this.$conf.domainPage}#/track?${many}`
              console.log(3333,this.$store.state.index.currentPage.name)
              console.log(2222,this.$store.state.index.currentPage.desc)
              console.log(hrefurl)
              this.$store.state.index.currentPage.page = hrefurl
              res.data.data.map((item,index) => {
                if(res.data.data[index].PIC!=undefined&&res.data.data[index].PIC!=''||res.data.data[index].PIC!=null){
                  this.$store.state.index.currentPage.image = that.domainUrl + '/' + res.data.data[index].PIC
                  return
                }else if(res.data.data.length-1 == index){
                  this.$store.state.index.currentPage.image = this.$conf.defaultPicture
                }
              })
              this.$wx.wxConfig()
            // }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      //跳转到城市列表
      onClickCity(){
        this.$router.push({
        	path: '/city',
         //   params: {
        	//    item: 1,
        	// }
        })
      },
      //点击选项
      onOptionClick(item){
        if(this.optionValue.id == item.id){
          this.optionValue = ''
        }else{
          this.optionValue = item
        }
        // this.optionValue = item
        this.page_index = 1
        this.pageList1 = []
        var id = this.optionValue.id==undefined?'':this.optionValue.id
        this.$refs.waterfall.onShows(1,id)

        this.onShows()
      },
      // 客服
      onClickIm(){
        console.log(this.pageDetail)
        this.$router.push({
        	path: '/imlist',
           query: {
        	   id: String(this.pageDetail.user_id),
        	}
        })
      },
      //搜索
      onBlur(){
        this.page_index = 1
        this.pageList1 = []
        this.$refs.waterfall.onShows(1,'')
        this.onShows()

      },
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
      },
    },

  }


</script>

<style scoped="scoped" src="../../css/track.css">

</style>
