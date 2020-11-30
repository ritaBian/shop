<template>
  <div class="body">
    <div class="page_body">
      <div class="page_title_border">
        <div class="page_title ">
          <van-icon name="arrow-left" style="margin-left: 0.2rem;" color="#8D8D8D" size="23" @click="onBack" />
          <div class="title_input_border ">
            <div class="title_input_left " @click="onClickCity">
              <van-icon name="location-o" color="#8D8D8D" size="15"/>
              <div class="app_line" >{{city.name}}</div>
            </div>
            <div class="title_input_right ">
              <van-search v-model="inputValue" placeholder="搜索周边" @blur="onBlur" />
            </div>
          </div>
          <van-icon :info="$store.state.im.count>0?$store.state.im.count:''" :name="require('../../../static/icon/kefu.png')" class="kefuImg" @click="onClickIm" />
          <!-- <van-icon name="service-o" color="#8D8D8D" size="25"/> -->
        </div>
        <!-- 选择 -->


        <div class="select_border_position " >
          <van-dropdown-menu  active-color="#01A862">
            <van-dropdown-item  :title="cityValue.name==undefined||cityValue.name==''?'区域':cityValue.name" ref="area">
              <div class="dropdown_item_white" v-for="(item,index) of cityList" :key="index" @click="onSelectClick_area(item)">
                <div :style="{color:cityValue.id==item.id?'#01A862':''}">{{item.name}}</div>
                <van-icon name="success" size="0.9rem" color="#01A862" v-if="cityValue.id==item.id" />
              </div>
            </van-dropdown-item>

            <van-dropdown-item  :title="themeValue.name==undefined||themeValue.name==''?'主题类型':themeValue.name" ref="theme">
              <!-- :data-item="item" :data-index="index" -->
              <div class="dropdown_item_white" v-for="(item,index) of themeList" :key="index" @click="onSelectClick_theme(item,index)" >
                <div :style="{color:themeValue.id==item.id?'#01A862':''}">{{item.name}}</div>
                <van-icon name="success" size="0.9rem" color="#01A862" v-if="themeValue.id==item.id" />
              </div>
            </van-dropdown-item>

            <van-dropdown-item  :title="dayValue.name==undefined||dayValue.name==''?'天数':dayValue.name" ref="day">
              <div class="dropdown_item_white" v-for="(item,index) of dayList" :key="index" @click="onSelectClick_day(item)">
                <div :style="{color:dayValue.id==item.id?'#01A862':''}">{{item.name}}</div>
                <van-icon name="success" size="0.9rem" color="#01A862" v-if="dayValue.id==item.id" />
              </div>
            </van-dropdown-item>

            <van-dropdown-item :title="rateValue.name==undefined||rateValue.name==''?'推荐值':rateValue.name" ref="rate" >
              <div class="dropdown_item_white" v-for="(item,index) of rateList" :key="index" @click="onSelectClick_rate(item)">
                <div class="dropdown_item_white_left">
                  <van-rate v-model="item.id" size="1.25rem" v-if="item.id!=''" readonly color="#FFC900" />
                  <div class="dropdown_item_white_tetx" :style="{color:rateValue.id==item.id?'#01A862':''}">{{item.name}}</div>
                </div>

                <van-icon name="success" size="0.9rem" color="#01A862" v-if="rateValue.id==item.id" />
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>



        <!-- 选项 -->
        <div class="wrapper" ref="wrapper">
            <ul class="wrapper_cont" ref="cont">
              <li :class="['cont_once',optionValue.id==item.id?'option_once2':'option_once1']" @click="onOptionClick(item)" v-for="(item,index) of optionList" :key="index">{{item.name}}</li>
            </ul>
        </div>

        <!-- <div class="option_border " >
          <div class="option_border2 ">
            <div :class="['option_once',optionValue.id==item.id?'option_once2':'option_once1']" @click="onOptionClick(item)" v-for="(item,index) of optionList" :key="index">{{item.name}}</div>
          </div>
        </div> -->

      </div>


      <!-- <div style="height: 0.9rem;"></div> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onShowsDown"
        class="list_border"
        :offset="offset"
        :immediate-check="false"
        >
        <div class="list" v-for="(item,index) of pageList" :key="index" @click="onClickPageList(item)">
          <div class="list_img_border">
            <van-image class="list_img" :src="domainUrl+'/'+item.PIC" fit="cover" />
            <div class="list_img_mask app_line" v-if="item.AREA_NAME!=''&&item.AREA_NAME!=undefined">{{item.AREA_NAME}}</div>
          </div>
          <div class="list_right ">
            <div class="list_right_title app_line2 " v-if="item">
              <span class="list_right_text-tag">{{item.DAY_ALL}}天</span>
              <span class="list_right_text ">{{item.NAME}}</span>
            </div>
            <div class="list_right_tag app_line">
                <div v-if="item.TAG1!=0&&allTag.filter(n=>n.ID==item['TAG1'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TAG1'])[0].NAME}}</div>
                <div v-if="item.TAG2!=0&&allTag.filter(n=>n.ID==item['TAG2'])[0]!=undefined" class="list_tag_line"></div>
                <div v-if="item.TAG2!=0&&allTag.filter(n=>n.ID==item['TAG2'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TAG2'])[0].NAME}}</div>
                <div v-if="item.TAG3!=0&&allTag.filter(n=>n.ID==item['TAG3'])[0]!=undefined" class="list_tag_line"></div>
                <div v-if="item.TAG3!=0&&allTag.filter(n=>n.ID==item['TAG3'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TAG3'])[0].NAME}}</div>
                <div v-if="item.TAG4!=0&&allTag.filter(n=>n.ID==item['TAG4'])[0]!=undefined" class="list_tag_line"></div>
                <div v-if="item.TAG4!=0&&allTag.filter(n=>n.ID==item['TAG4'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TAG4'])[0].NAME}}</div>
                <div v-if="item.TAG5!=0&&allTag.filter(n=>n.ID==item['TAG5'])[0]!=undefined" class="list_tag_line"></div>
                <div v-if="item.TAG5!=0&&allTag.filter(n=>n.ID==item['TAG5'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TAG5'])[0].NAME}}</div>
            </div>
            <div class="list_right_label app_line">
              <!-- <div class="list_label_once_git">赠</div> -->
              <div class="list_label_once" v-if="item.TYPE1!=0&&allTag.filter(n=>n.ID==item['TYPE1'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TYPE1'])[0].NAME}}</div>
              <div class="list_label_once" v-if="item.TYPE2!=0&&allTag.filter(n=>n.ID==item['TYPE2'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TYPE2'])[0].NAME}}</div>
              <div class="list_label_once" v-if="item.TYPE3!=0&&allTag.filter(n=>n.ID==item['TYPE3'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TYPE3'])[0].NAME}}</div>
              <div class="list_label_once" v-if="item.TYPE4!=0&&allTag.filter(n=>n.ID==item['TYPE4'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TYPE4'])[0].NAME}}</div>
              <div class="list_label_once" v-if="item.TYPE5!=0&&allTag.filter(n=>n.ID==item['TYPE5'])[0]!=undefined">{{allTag.filter(n=>n.ID==item['TYPE5'])[0].NAME}}</div>
              <!-- <van-tag class="list_label_once" plain color="#57A9E9" size="medium">安心游</van-tag> -->
            </div>
            <div class="list_right_bottom app_line">
              <div class="list_right_bottom_once" v-if="item.COMMENT_NUM!=0.0">{{item.COMMENT_NUM}}分</div>
              <div class="list_right_bottom_once2" v-if="item.COMMENT_COUNT!=0">{{item.COMMENT_COUNT}}人点评</div>
            </div>
          </div>
        </div>
      </van-list>


      <div style="height: 4.9rem;"></div>

    </div>



    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask"></div>
    <!-- 底部栏 -->
    <v-footer2 id="route"></v-footer2>


  </div>
</template>

<script>
  import Footer2 from '@/common/travel/_footer.vue'
  import BScroll from 'better-scroll'
  // import {mapState} from 'vuex'
  import { Icon,Search,Image,Tag,Toast  } from 'vant';
  import Util from '@/util/common';
  import 'vant/lib/index.css';


  // import Header from '@/common/_header.vue'
  // import Nothing from '@/components/car/nothing.vue'
  // import prolist from '@/components/car/prolist.vue'
  // import Footer from '@/components/car/footer.vue'
  // import Footer2 from '@/common/_footer.vue'
  // import { NavBar,Dialog } from 'vant';
  // import Util from '@/util/common';
  // import 'vant/lib/index.css';

  export default {
    beforeRouteLeave(to, from, next) {
        if (to.name == "城市索引") {
          this.$store.commit("noKeepAlive", "circuit");
          this.$store.commit("noKeepAlive", "track");
          this.$store.commit("noKeepAlive", "travel_index");
        }
        next();
    },
    name:'circuit',
    components:{
      [Icon.name]: Icon,
      [Search.name]: Search,
      [Image.name]: Image,
      [Tag.name]: Tag,
      'v-footer2':Footer2
    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        allTag:this.$store.state.index.allTag,
        inputValue:'',//搜索值
        maskBoolean:false,//蒙层
        pageDetail:'',

        loading: false,
        finished: false,
        offset:100,
        page_index:1,
        pageList:[],
        // tag
        optionValue:{
          id:'',
        },
        optionList:[],//选项数组
        //区域
        cityValue: '',
        cityList:[],
        city:'',
        // 类型
        typeValue:'',
        typeList:[],
        //三级类型
        typeModuleValue:'',
        typeModuleList:[],
        typeAllList:[],//类型总数据
        // 主题
        themeValue:'',
        themeList:[],
        //适合人数
        dayValue:'',
        dayList:[
          {
            id:'',
            name:'全部天数'
          },
          {
            id:1,
            name:'1天'
          },
          {
            id:2,
            name:'2天'
          },
          {
            id:3,
            name:'3天'
          },
          {
            id:4,
            name:'4天'
          },
          {
            id:5,
            name:'5天'
          }
        ],
        // 推荐数
        rateValue:'',//评星级
        rateList:[
          {
            id:'',
            name:'全部推荐'
          },
          {
            id:1,
            name:'1星'
          },
          {
            id:2,
            name:'2星'
          },
          {
            id:3,
            name:'3星'
          },
          {
            id:4,
            name:'4星'
          },
          {
            id:5,
            name:'5星'
          }
        ],

      }
    },
    updated() {
      this.allTag = this.$store.state.index.allTag
    },
    created() {
      //tag数据
      this.tagData()

    },
    mounted() {
      var that = this;
      this.$nextTick(() => {
        this._initMenu()
      })
      
    },
    activated(){
      this.onShowsData()
    },
    methods: {
      searchUrl(){
        // var searchURL = decodeURI(window.location.search) ;
        // console.log(888,Util.getValue(Util.GetQuery('keyword')))
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

            this.$store.state.index.areaList = []
            Util.getCity(city.name)
            var areaList = this.$store.state.index.areaList
            var areaListTemporary=areaList.slice(0);
            var data = {
              id:'',
              name:'全部区域',
            }
            if(areaListTemporary[0].name!='全部区域'){
              areaListTemporary.unshift(data);
            }
            this.cityList = areaListTemporary
          }else{
            //获取城市
            this.onAddress()
          }
          if(area.id!=''){
            this.cityValue = area
            this.$store.state.index.area = area
          }


          var themeValue = {
            id:Util.getValue(Util.GetQuery('sort_id')),
            name:Util.getValue(Util.GetQuery('sort_text'))
          }
          if(themeValue.id!=''){this.themeValue = themeValue}
          console.log(222222,this.themeValue)
          var day = Util.getValue(Util.GetQuery('day'))
          if(day!=''){
            this.dayList.map((item,index) => {
              if(day == item.id){
                this.dayValue = item
              }
            })
          }
          var level = Util.getValue(Util.GetQuery('level'))
          if(level!=''){
            this.rateList.map((item,index) => {
              if(level == item.id){
                this.rateValue = item
              }
            })
          }

          var optionValue = {
            id:Util.getValue(Util.GetQuery('tag')),
            name:''
          }
          if(optionValue.id!=''&&this.optionList.length!=0){
            optionValue.name = this.optionList.filter(item => item.id==optionValue.id)[0].name;
            this.optionValue = optionValue
          }


          this.inputValue = Util.getValue(Util.GetQuery('keyword'))

          this.finished = false
          this.page_index = 1
          this.pageList = []
          setTimeout(function() {
              that.onShows();
          }, 600);
          this.$store.state.index.indexUrlBoolean = 2
        }else{
          //获取城市
          this.onAddress()
          setTimeout(function() {
              that.onShows();
          }, 600);
        }
      },
      //获取城市
      onAddress(){
        var data = {
         page:1,
        }
        this.$dopost('/sysapi/travel/ip/', data,function (res) {
          console.log('获取城市',res)
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            var city = this.$store.state.index.city
            var areaList = this.$store.state.index.areaList
            if(city==null||city==''||areaList.length==0){
              this.city = {
                id:res.data.data.id,
                name:res.data.data.name
              };
              var list = res.data.data.children
              data = {
                id:'',
                name:'全部区域',
              }
              list.unshift(data);
              this.cityList = list
              this.$store.state.index.city = this.city
            }else{
              data = {
                id:'',
                name:'全部区域',
              }
              var areaListTemporary=areaList.slice(0);
              if(areaListTemporary[0].name!='全部区域'){
                areaListTemporary.unshift(data);
              }
              this.cityList = areaListTemporary
              this.city = city
            }

          }else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
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
      //滑到底部
      onShowsDown(e){
        var that = this;
        setTimeout(function() {
          that.onShows()
        }, 1000);

      },
      //分页数据
      onShows(){
        console.log('类型23123',this.rateValue)
        var that = this;
        var data = {
           page:that.page_index,
           city_id:that.city.id,//城市id
           area_id:that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id,//城市下面的区的主键
           sort_id:that.themeValue.id==''||that.themeValue.id==undefined?'':that.themeValue.id,//分类主键

           day:that.dayValue.id==''||that.dayValue.id==undefined?'':that.dayValue.id,//适合人数
           level:that.rateValue.id==''||that.rateValue.id==undefined?'':that.rateValue.id,//推荐值 取值范围1-5
           tag:that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id,//tag的主键
           keyword:that.inputValue,//关键字
        }
        that.$dopost('/sysapi/line/list/', data,function (res) {
          console.log('首页数据',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            if(res.data.data.data.length == 0){
              that.finished = true
            }
            this.pageDetail = res.data.data
            that.loading = false;
            that.page_index = that.page_index + 1
            that.pageList = that.pageList.concat(res.data.data.data);

            var getNull = Util.getNull(that.cityValue.id)||Util.getNull(that.themeValue.id)||Util.getNull(that.dayValue.id)||Util.getNull(that.rateValue.id)
            ||Util.getNull(that.optionValue.id)||Util.getNull(that.inputValue)

            var pageNullNum = that.$store.state.index.circuitPageNum
            if(pageNullNum==1&&that.pageList.length==0&&getNull==false){
              this.$router.push({
              	path: '/city',
                query: {
                   type: 1,
                }
              })
            }
            //获取当前页面信息
            // if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = `橡果互动线路页-${that.city.name}`
              var urlList = []
              if(Util.getNull(that.cityValue.id)){urlList.push(that.cityValue.name)}
              if(Util.getNull(that.themeValue.id)){urlList.push(that.themeValue.name)}
              if(Util.getNull(that.dayValue.id)){urlList.push(that.dayValue.name)}
              if(Util.getNull(that.rateValue.id)){urlList.push(that.rateValue.name)}
              if(Util.getNull(that.optionValue.id)){urlList.push(that.optionValue.name)}
              var urlListText = String(urlList)
              urlListText = urlListText==''?`橡果互动线路页-${that.city.name}`:urlListText.replace(/,/g, '-')
              this.$store.state.index.currentPage.desc = urlListText

              var city = that.city//城市id
              var area = that.cityValue.name==''||that.cityValue.name==undefined?'':that.cityValue.name
              var area_id = that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id
              var sort_id = that.themeValue.id==''||that.themeValue.id==undefined?'':that.themeValue.id//分类主键
              var sort_text = that.themeValue.name==''||that.themeValue.name==undefined?'':that.themeValue.name//分类主键

              var day = that.dayValue.id==''||that.dayValue.id==undefined?'':that.dayValue.id//天数
              var level = that.rateValue.id==''||that.rateValue.id==undefined?'':that.rateValue.id//推荐值 取值范围1-5
              var tag = that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id//tag的主键
              var keyword = that.inputValue//关键字
              var many = encodeURI(`city=${city.name}&city_id=${city.id}&sort_text=${sort_text}&sort_id=${sort_id}&area=${area}&area_id=${area_id}&day=${day}&level=${level}&tag=${tag}&keyword=${keyword}`)
              var hrefurl = `${this.$conf.domainPage}#/circuit?${many}`
              this.$store.state.index.currentPage.page = hrefurl
              console.log(3333,this.$store.state.index.currentPage.name)
              console.log(2222444,this.$store.state.index.currentPage.desc)
              console.log(1111,this.$store.state.index.currentPage.page)
              res.data.data.data.map((item,index) => {
                if(res.data.data.data[index].PIC!=undefined&&res.data.data.data[index].PIC!=''||res.data.data.data[index].PIC!=null){
                  this.$store.state.index.currentPage.image = that.domainUrl + '/' + res.data.data.data[index].PIC
                  return
                }else if(res.data.data.data.length-1 == index){
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


      //tag数据
      tagData(){
        var that = this;
         var data = {
            parent_id:121
         }
         this.$dopost('/sysapi/travel/tag/', data,function (res) {
           console.log('获取tag',res)
           if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              var list = {}
              res.data.data.map((item,index) => {
                list = {
                  id:res.data.data[index].ID,
                  name:res.data.data[index].NAME
                }
                that.optionList.push(list)
              })
              setTimeout(function() {
                  that.searchUrl()
              }, 300);
           }else{
             Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
           }
         }.bind(this));

         data = {
            parent_id:122
         }
         this.$dopost('/sysapi/travel/tag/', data,function (res) {
           if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              var list = {}
              res.data.data.map((item,index) => {
                list = {
                  id:res.data.data[index].ID,
                  name:res.data.data[index].NAME
                }
                that.themeList.push(list)
                if(index == res.data.data.length-1){
                  var theme = {
                    id:'',
                    name:'全部类型',
                  }
                  that.themeList.unshift(theme);
                }
              })

           }else{
             Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
           }
         }.bind(this));
      },
      //点击跳到详情页
      onClickPageList(item){
        this.$router.push({
        	path: '/circuit_detail',
           query: {
        	   id: item.ID,
             // pid:item.SORT_PARENT_ID
        	}
        })

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
      //分页数据
      onShowsData(){
        var that = this;
        var data = {
           page:that.page_index,
           city_id:that.city.id,//城市id
           area_id:that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id,//城市下面的区的主键
           sort_id:that.themeValue.id==''||that.themeValue.id==undefined?'':that.themeValue.id,//分类主键

           day:that.dayValue.id==''||that.dayValue.id==undefined?'':that.dayValue.id,//适合人数
           level:that.rateValue.id==''||that.rateValue.id==undefined?'':that.rateValue.id,//推荐值 取值范围1-5
           tag:that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id,//tag的主键
           keyword:that.inputValue,//关键字
        }
        that.$dopost('/sysapi/line/list/', data,function (res) {
          console.log('首页数据',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            //获取当前页面信息
            // if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = `橡果互动线路页-${that.city.name}`

             var urlList = []
             if(Util.getNull(that.cityValue.id)){urlList.push(that.cityValue.name)}
             if(Util.getNull(that.themeValue.id)){urlList.push(that.themeValue.name)}
             if(Util.getNull(that.dayValue.id)){urlList.push(that.dayValue.name)}
             if(Util.getNull(that.rateValue.id)){urlList.push(that.rateValue.name)}
             if(Util.getNull(that.optionValue.id)){urlList.push(that.optionValue.name)}
             var urlListText = String(urlList)
             urlListText = urlListText==''?`橡果互动线路页-${that.city.name}`:urlListText.replace(/,/g, '-')
             this.$store.state.index.currentPage.desc = urlListText

              var city = that.city//城市id
              var area = that.cityValue.name==''||that.cityValue.name==undefined?'':that.cityValue.name
              var area_id = that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id
              var sort_id = that.themeValue.id==''||that.themeValue.id==undefined?'':that.themeValue.id//分类主键
              var sort_text = that.themeValue.name==''||that.themeValue.name==undefined?'':that.themeValue.name//分类主键

              var day = that.dayValue.id==''||that.dayValue.id==undefined?'':that.dayValue.id//天数
              var level = that.rateValue.id==''||that.rateValue.id==undefined?'':that.rateValue.id//推荐值 取值范围1-5
              var tag = that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id//tag的主键
              var keyword = that.inputValue//关键字
              var many = encodeURI(`city=${city.name}&city_id=${city.id}&sort_text=${sort_text}&sort_id=${sort_id}&area=${area}&area_id=${area_id}&day=${day}&level=${level}&tag=${tag}&keyword=${keyword}`)
              var hrefurl = `${this.$conf.domainPage}#/circuit?${many}`
              this.$store.state.index.currentPage.page = hrefurl
              res.data.data.data.map((item,index) => {
                if(res.data.data.data[index].PIC!=undefined&&res.data.data.data[index].PIC!=''||res.data.data.data[index].PIC!=null){
                  this.$store.state.index.currentPage.image = that.domainUrl + '/' + res.data.data.data[index].PIC
                  return
                }else if(res.data.data.data.length-1 == index){
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

      // 选择区域
      onSelectClick_area(e){
        console.log(e)
        this.cityValue = e
        this.finished = false
        this.$store.state.index.area = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.area.toggle();
      },
      //选择主题类型
      onSelectClick_theme(e){
        this.finished = false
        this.themeValue = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.theme.toggle();
      },
      // 选择天数
      onSelectClick_day(e){
        this.finished = false
        console.log(e)
        this.dayValue = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.day.toggle();
      },
      //选择推荐数
      onSelectClick_rate(e){
        this.finished = false
        this.rateValue = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.rate.toggle();
      },

      //点击蒙层
      onMask(){
        this.maskBoolean = false
      },
      //点击选项
      onOptionClick(item){
        this.finished = false
        if(this.optionValue.id == item.id){
          this.optionValue = ''
        }else{
          this.optionValue = item
        }
        // this.optionValue = item
        this.page_index = 1
        this.pageList = []
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
        this.finished = false
        this.page_index = 1
        this.pageList = []
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

    }

  }


</script>

<style scoped="scoped" src="../../css/circuit.css">
  /* @import url("../../css/circuit.css"); */

</style>
