<template>
  <div class="body">
    <div class="page_body">
      <div class="page_title_border">
        <div class="page_title ">
          <van-icon name="arrow-left" style="margin-left: 0.2rem;" color="#8D8D8D" size="23" @click="onBack" />
          <div class="title_input_border ">
            <div class="title_input_left " @click="onClickCity">
              <van-icon name="location-o" color="#8D8D8D" size="15"/>
              <div class="app_line">{{city.name}}</div>
            </div>
            <div class="title_input_right ">
              <van-search v-model="inputValue" placeholder="搜索周边" @blur="onBlur" />
            </div>
          </div>
          <!-- require('../../static/images/no' + index + '.png') -->
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

            <van-dropdown-item  :title="typeValue.name==undefined||typeValue.name==''?'类型':typeValue.name" ref="type">
              <!-- :data-item="item" :data-index="index" -->
              <div class="dropdown_item_white" v-for="(item,index) of typeList" :key="index" @click="onSelectClick_type(item,index)" >
                <div :style="{color:typeValue.id==item.id?'#01A862':''}">{{item.name}}</div>
                <van-icon name="success" size="0.9rem" color="#01A862" v-if="typeValue.id==item.id" />
              </div>
            </van-dropdown-item>

            <van-dropdown-item  :title="peopleValue.name==undefined||peopleValue.name==''?'适合人数':peopleValue.name" ref="people">
              <div class="dropdown_item_white" v-for="(item,index) of peopleList" :key="index" @click="onSelectClick_people(item)">
                <div :style="{color:peopleValue.id==item.id?'#01A862':''}">{{item.name}}</div>
                <van-icon name="success" size="0.9rem" color="#01A862" v-if="peopleValue.id==item.id" />
              </div>
            </van-dropdown-item>

            <van-dropdown-item title="筛选" ref="screen" @close="onClose">
              <div class="dropdown_flex_warp">
                <div :class="[typeModuleValue.id==item.id?'dropdown_flex_warp_once_bg':'dropdown_flex_warp_once']" v-for="(item,index) of typeModuleList" :key="index" @click="onSelectType(item)">{{item.name}}</div>
              </div>
              <div class="dropdown_flex">
                <div style="margin-left: 1rem;margin-right: 3rem;">价格</div>
                <input class="dropdown_flex_input" type="number" v-model="price.low" placeholder="最低价">
                <div class="dropdown_flex_line"></div>
                <input class="dropdown_flex_input" type="number" v-model="price.height" placeholder="最高价">
              </div>
              <div class="dropdown_flex">
                <div style="margin-left: 1rem;margin-right: 2.2rem;">推荐值</div>
                <van-rate v-model="rateVlaue" size="1.25rem" color="#FFC900" />
                <div class="dropdown_flex_warp_once" style="color: #333333;margin-left: 1rem;" @click="onClickRate">重置推荐值</div>
              </div>
              <div class="dropdown_flex_button" @click="onSelectClick_screen">确定</div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>


        <!-- 选项 -->
        <div class="wrapper" ref="wrapper">
            <ul class="wrapper_cont" ref="cont">
              <li :class="['cont_once',optionValue.id==item.id?'option_once2':'option_once1']" @click="onOptionClick(item)" v-for="(item,index) of optionList" :key="index">{{item.name}}</li>
            </ul>
        </div>

        <!-- <div class="option_border" >
          <div class="option_border2 ">
            <div :class="['option_once',optionValue.id==item.id?'option_once2':'option_once1']" @click="onOptionClick(item)" v-for="(item,index) of optionList" :key="index">{{item.name}}</div>
          </div>
        </div> -->
      </div>
      <div style="height: 0.69rem;"></div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onShowsDown"
        class="list_once_border"
        :offset="offset"
        :immediate-check="false"
        >

        <div class="list_once" v-for="(item,index) of pageList" :key="index" @click="onClickPageList(item)">
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
          <!-- 金额栏 -->
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
        </div>
      </van-list>

      <div style="height: 4.9rem;"></div>

    </div>
    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask"></div>
    <!-- 底部栏 -->
    <v-footer2></v-footer2>

  </div>
</template>

<script>
  import Footer2 from '@/common/travel/_footer.vue'
  import BScroll from 'better-scroll'
  // import {mapState} from 'vuex'
  import { Icon,Search,Image,Tag,Toast   } from 'vant';
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
          this.$store.commit("noKeepAlive", "travel_index");
        }
        next();
    },
    name:'travel_index',
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
        pageDetail:'',
        allTag:this.$store.state.index.allTag,

        inputValue:'',//搜索值
        maskBoolean:false,//蒙层
        // tag
        optionValue:{
          id:'',
        },
        optionList:[],//选项数组
        selectedId: 123,
        options: {
          activeColor: 'none'
          // 可在这里指定labelKey为你数据里文字对应的字段名
        },

        //区域
        cityValue: '',
        cityList:[],
        // 类型
        typeValue:{
          // id:'',
          // name:''
        },
        typeList:[],
        //三级类型
        typeModuleValue:{
          id:'',
        },
        typeModuleList:[],
        typeAllList:[],//类型总数据
        //适合人数
        peopleValue:'',
        peopleList:[
          {
            id:'',
            name:'全部人数'
          },
          {
            id:1,
            name:'1人'
          },
          {
            id:2,
            name:'2人'
          },
          {
            id:3,
            name:'3人'
          },
          {
            id:4,
            name:'4人'
          },
          {
            id:5,
            name:'5人'
          }
        ],
        rateVlaue:0,//评星级

        loading: false,
        finished: false,
        offset:100,
        page_index:1,
        pageList:[],

        city:'',
        price:{
          low:'',
          height:'',
        },
        click_type_index:'',
      }
    },
    updated() {
      this.allTag = this.$store.state.index.allTag
      // this.city = this.$store.state.index.city
      // this.areaList = this.$store.state.index.areaList
    },
    created() {


      this.pageList = []
      this.page_index = 1
      //获取城市
      // this.onAddress()
      //旅游产品分类(数据)
      this.preloadData()
      //tag数据
      this.tagData()
      // this.onShows();
    },
    mounted() {
      var that = this;
      this.$nextTick(() => {
        that._initMenu()
      })
      // setTimeout(function() {
      //   that.$nextTick(() => {
      //     that.searchUrl()
      //   })
      // }, 500);
    },
    activated(){
      this.onShowsData()
    },
    methods: {
      searchUrl(){
        var that = this;
        // var searchURL = decodeURI(window.location.search) ;
        // console.log(888,searchURL)
        if(this.$store.state.index.indexUrlBoolean==1){
          var city = {
            id:Util.getValue(Util.GetQuery('city_id')),
            name:Util.getValue(Util.GetQuery('city'))
          }
          var area = {
            id:Util.getValue(Util.GetQuery('area_id')),
            name:Util.getValue(Util.GetQuery('area'))==''||Util.getValue(Util.GetQuery('area'))=='全部区域'?'区域':decodeURI(Util.getValue(Util.GetQuery('area')))
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
          this.cityValue = area
          this.$store.state.index.area = area
          var typeValue = {
            id:Util.getValue(Util.GetQuery('sort_id')),
            name:Util.getValue(Util.GetQuery('sort_text'))
          }
          this.typeValue = {
            id:'',
            name:''
          }
          if(typeValue.id!=''){
            this.onSelectClick_type(typeValue,Util.GetQuery('click_type_index'),1)
          }
          var typeModuleValue = {
            id:Util.getValue(Util.GetQuery('sort_small_id'))
          }
          this.typeModuleValue = typeModuleValue
          var peopleValueId = Util.getValue(Util.GetQuery('person_count'))
          if(peopleValueId!=''){
            this.peopleList.map((item,index) => {
              if(peopleValueId == item.id){
                this.peopleValue = item
              }
            })
          }

          this.rateVlaue = Number(Util.getValue(Util.GetQuery('level')))
          this.price.low = Util.getValue(Util.GetQuery('minprice'))
          this.price.height = Util.getValue(Util.GetQuery('maxprice'))
          // this.optionValue.id = Util.getValue(Util.GetQuery('tag'))
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
              var areaListTemporary=areaList.slice(0);
              data = {
                id:'',
                name:'全部区域',
              }
              if(areaListTemporary[0].name!='全部区域'){
                areaListTemporary.unshift(data);
              }
              this.cityList = areaListTemporary
              this.city = city
            }
            // this.onShows();
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
        var that = this;
        var data = {
           page:that.page_index,
           city_id:that.city.id,//城市id
           sort_id:that.typeModuleValue.id==''||that.typeModuleValue.id==undefined?(that.typeValue.id==undefined?'':that.typeValue.id):that.typeModuleValue.id,//分类主键
           area_id:that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id,//城市下面的区的主键
           person_count:that.peopleValue.id==''||that.peopleValue.id==undefined?'':that.peopleValue.id,//适合人数
           // that.rateVlaue
           level:that.rateVlaue,//推荐值 取值范围1-5
           minprice:that.price.low,//筛选中的价格小
           maxprice:that.price.height,//筛选中的价格大
           tag:that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id,//tag的主键
           keyword:that.inputValue,//关键字
        }
        that.$dopost('/sysapi/travel/list/', data,function (res) {
          console.log('首页数据',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            if(res.data.data.data.length == 0){
              that.finished = true
            }
            this.pageDetail = res.data.data
            that.loading = false;
            that.page_index = that.page_index + 1
            that.pageList = that.pageList.concat(res.data.data.data);


            var getNull = Util.getNull(that.cityValue.id)||Util.getNull(that.typeModuleValue.id)||Util.getNull(that.peopleValue.id)||Util.getNull(that.rateVlaue)
            ||Util.getNull(that.price.low)||Util.getNull(that.price.height)||Util.getNull(that.optionValue.id)||Util.getNull(that.inputValue)

            var pageNullNum = that.$store.state.index.indexPageNum
            if(pageNullNum==1&&that.pageList.length==0&&getNull==false){
              this.$router.push({
              	path: '/city',
                query: {
                   type: 2,
                }
              })
            }
            //获取当前页面信息
            // if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = `橡果互动发现页-${that.city.name}`
              var urlList = []
              if(Util.getNull(that.cityValue.id)){urlList.push(that.cityValue.name)}
              if(Util.getNull(that.typeValue.id)){urlList.push(that.typeValue.name)}
              if(Util.getNull(that.peopleValue.id)){urlList.push(that.peopleValue.name)}
              if(Util.getNull(that.typeModuleValue.id)){urlList.push(that.typeModuleValue.name)}
              if(Util.getNull(that.rateVlaue)){urlList.push(that.rateVlaue+'星')}

              if(Util.getNull(that.price.low)&&Util.getNull(that.price.height)){urlList.push(that.price.low+'元到'+that.price.height+'元')}
              if(Util.getNull(that.optionValue.id)){urlList.push(that.optionValue.name)}
              var urlListText = String(urlList)
              urlListText = urlListText==''?`橡果互动发现页-${that.city.name}`:urlListText.replace(/,/g, '-')
              this.$store.state.index.currentPage.desc = urlListText

              var city = that.city//城市id
              var area = that.cityValue.name==''||that.cityValue.name==undefined?'':that.cityValue.name
              var area_id = that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id
              var sort_id = that.typeValue.id==undefined?'':that.typeValue.id//分类主键
              var sort_text = that.typeValue.name==undefined?'':that.typeValue.name//分类主键
              var sort_small_id = that.typeModuleValue.id==undefined?'':that.typeModuleValue.id//分类主键

              var person_count = that.peopleValue.id==''||that.peopleValue.id==undefined?'':that.peopleValue.id//适合人数
              var level = that.rateVlaue//推荐值 取值范围1-5
              var minprice = that.price.low//筛选中的价格小
              var maxprice = that.price.height//筛选中的价格大
              var tag = that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id//tag的主键
              var keyword = that.inputValue//关键字
              var many = encodeURI(`city=${city.name}&city_id=${city.id}&click_type_index=${this.click_type_index}&sort_small_id=${sort_small_id}&sort_text=${sort_text}&sort_id=${sort_id}&area=${area}&area_id=${area_id}&person_count=${person_count}&level=${level}&minprice=${minprice}&maxprice=${maxprice}&tag=${tag}&keyword=${keyword}`)
              var hrefurl = `${this.$conf.domainPage}#/index?${many}`
              // var aa = hrefurl.replace('#/', "&u=6681549#/")
              console.log(3333,this.$store.state.index.currentPage.name)
              console.log(2222,this.$store.state.index.currentPage.desc)
              console.log(111133,hrefurl)

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
      //分页数据
      onShowsData(){
        var that = this;
        var data = {
           page:that.page_index,
           city_id:that.city.id,//城市id
           sort_id:that.typeModuleValue.id==''?(that.typeValue.id==undefined?'':that.typeValue.id):that.typeModuleValue.id,//分类主键
           area_id:that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id,//城市下面的区的主键
           person_count:that.peopleValue.id==''||that.peopleValue.id==undefined?'':that.peopleValue.id,//适合人数
           // that.rateVlaue
           level:that.rateVlaue,//推荐值 取值范围1-5
           minprice:that.price.low,//筛选中的价格小
           maxprice:that.price.height,//筛选中的价格大
           tag:that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id,//tag的主键
           keyword:that.inputValue,//关键字
        }
        that.$dopost('/sysapi/travel/list/', data,function (res) {
          console.log('首页数据1123',res)
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            //获取当前页面信息
            // if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = `橡果互动发现页-${that.city.name}`
              var urlList = []
              if(Util.getNull(that.cityValue.id)){urlList.push(that.cityValue.name)}
              if(Util.getNull(that.typeValue.id)){urlList.push(that.typeValue.name)}
              if(Util.getNull(that.peopleValue.id)){urlList.push(that.peopleValue.name)}
              if(Util.getNull(that.typeModuleValue.id)){urlList.push(that.typeModuleValue.name)}
              if(Util.getNull(that.rateVlaue)){urlList.push(that.rateVlaue+'星')}

              if(Util.getNull(that.price.low)&&Util.getNull(that.price.height)){urlList.push(that.price.low+'元到'+that.price.height+'元')}
              if(Util.getNull(that.optionValue.id)){urlList.push(that.optionValue.name)}
              var urlListText = String(urlList)
              urlListText = urlListText==''?`橡果互动发现页-${that.city.name}`:urlListText.replace(/,/g, '-')
              this.$store.state.index.currentPage.desc = urlListText

              var city = that.city//城市id
              var area = that.cityValue.name==''||that.cityValue.name==undefined?'':that.cityValue.name
              var area_id = that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id
              var sort_id = that.typeValue.id==undefined?'':that.typeValue.id//分类主键
              var sort_text = that.typeValue.name==undefined?'':that.typeValue.name//分类主键
              var sort_small_id = that.typeModuleValue.id==undefined?'':that.typeModuleValue.id//分类主键

              var person_count = that.peopleValue.id==''||that.peopleValue.id==undefined?'':that.peopleValue.id//适合人数
              var level = that.rateVlaue//推荐值 取值范围1-5
              var minprice = that.price.low//筛选中的价格小
              var maxprice = that.price.height//筛选中的价格大
              var tag = that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id//tag的主键
              var keyword = that.inputValue//关键字
              var many = encodeURI(`city=${city.name}&city_id=${city.id}&click_type_index=${this.click_type_index}&sort_small_id=${sort_small_id}&sort_text=${sort_text}&sort_id=${sort_id}&area=${area}&area_id=${area_id}&person_count=${person_count}&level=${level}&minprice=${minprice}&maxprice=${maxprice}&tag=${tag}&keyword=${keyword}`)
              var hrefurl = `${this.$conf.domainPage}#/index?${many}`
              console.log(1111,hrefurl)

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
      //数据
      preloadData(){
        var that = this;
        this.$dopost('/sysapi/travel/sort/', null,function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            console.log('数据',res)
            this.typeAllList = res.data.data
              // 类型
            	var type = {}
              res.data.data.map((item,index) =>{
                type = {
                  id:item.ID,
                  name:item.NAME,
                }
                that.typeList[index] = type
                if(index == res.data.data.length-1){
                  var data = {
                      id:'',
                      name:'全部类型',
                  }
                  that.typeList.unshift(data);
                }
              })
              // 三级类型
              var type_module = {}
              for (var i = 0 ; i < res.data.data.length ; i++) {
                for(var k = 0 ; k < res.data.data[i].CHILDREN.length ; k++){
                  type_module = {
                    id:res.data.data[i].CHILDREN[k].ID,
                    name:res.data.data[i].CHILDREN[k].NAME,
                  }
                  that.typeModuleList.push(type_module)
                }
              }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      //tag数据
      tagData(){
        var that = this;
         var data = {
            parent_id:''
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
      },
      //跳转到城市列表
      onClickCity(){
        this.$router.push({
        	path: '/city',
        })
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
      // 选择类型
      onSelectClick_type(item,index,types){
        this.click_type_index = index
        this.finished = false
        var that = this;
        that.typeModuleValue = that.typeValue.id==item.id?that.typeModuleValue:''
        that.typeValue = item
        that.typeModuleList = []

        var type_module = {}
        if(index == 0){
          // 三级类型
          for (var i = 0 ; i < that.typeAllList.length ; i++) {
            for(var k = 0 ; k < that.typeAllList[i].CHILDREN.length ; k++){
              type_module = {
                id:that.typeAllList[i].CHILDREN[k].ID,
                name:that.typeAllList[i].CHILDREN[k].NAME,
              }
              that.typeModuleList.push(type_module)
            }
          }
        }else{
          console.log(99999,that.typeAllList)
          var typeModuleList = that.typeAllList[index-1].CHILDREN
          typeModuleList.map((item,index) => {
            type_module = {
              id:typeModuleList[index].ID,
              name:typeModuleList[index].NAME,
            }
            that.typeModuleList.push(type_module)
          })

        }
        this.page_index = 1
        this.pageList = []
        this.onShows()

        if(types!=1){
          this.$refs.type.toggle();
        }

      },
      // 选择适合人数
      onSelectClick_people(e){
        this.finished = false
        this.peopleValue = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.people.toggle();
      },
      //点击筛选里的类型
      onSelectType(item){
        if(this.typeModuleValue.id==item.id){
          this.typeModuleValue = ''
        }else{
          this.typeModuleValue = item
        }
      },
      // 关闭筛选
      onClose(e){
        this.finished = false
        this.page_index = 1
        this.pageList = []
        this.onShows()
      },
      //点击评分
      onClickRate(){
        this.rateVlaue = 0
      },
      // 筛选
      onSelectClick_screen(e){
        console.log(e)
        this.finished = false
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.screen.toggle();
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
    },
  }


</script>

<style scoped="scoped" src="../../css/index.css">
  /* @import url("../../css/index.css"); */
 ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
 }
 .dropdown_flex_input::-webkit-input-placeholder {
    color: #b3b3b3;
    font-size: 0.75rem;
  }
</style>
