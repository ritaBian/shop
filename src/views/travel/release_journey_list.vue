<template>
  <div class="body">
    <div class="page_body">
      <div class="page_title_border">
        <van-nav-bar title="我的线路列表" left-arrow  @click-left="onBack" @click-right="onNavigateAdd" right-text="添加线路"/>
      </div>


      <!-- <div style="height: 0.9rem;"></div> -->
      <div class="list" v-for="(item,index) of pageList" :key="index" @click.stop="onClickPageList(item)">
        <div class="list_img_border">
          <van-image class="list_img" :src="domainUrl+'/'+item.PIC" fit="cover" />
          <div class="list_img_mask app_line" v-if="item.AREA_NAME!=''&&item.AREA_NAME!=undefined">{{item.AREA_NAME}}</div>
        </div>
        <div class="list_right ">
          <div class="list_right_title app_line2" v-if="item">
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
          <div class="list_right_bottom app_line ">
            <div class="list_right_bottom_view">
              <div class="list_right_bottom_once" v-if="item.COMMENT_NUM!=0">{{item.COMMENT_NUM}}分</div>
              <div class="list_right_bottom_once2" v-if="item.COMMENT_COUNT!=0">{{item.COMMENT_COUNT}}人点评</div>
            </div>
            <div class="list_right_bottom_view_right">
              <div class="list_right_bottom_view_status">{{statusNum(item.STATUS)}}</div>
              <div class="list_right_bottom_edit" @click.stop="onEdit(item)">编辑</div>
            </div>


          </div>
        </div>
      </div>

      <div style="height: 4.9rem;"></div>
    </div>
    <!-- 蒙层 -->
    <div class="mask" v-if="maskBoolean" @click="onMask"></div>
    <!-- 底部栏 -->
    <v-footer2 ></v-footer2>


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


        page_index:1,
        pageList:[],
        // tag
        optionValue:'',
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
    computed:{
      statusNum:function(){
        return function(item){
          if(item=='-5'){
              return '草稿'
          }else if(item=='-4'){
              return '已提交审核'
          }else if(item=='-3'){
              return '审核驳回'
          }else if(item=='1'){
              return '已审核'
          }else{
            return ''
          }
        }
      }
    },
    created() {
      this.pageList = []
      this.page_index = 1
      //获取城市
      this.onAddress()
      //tag数据
      this.tagData()
    },
    mounted() {
      var that = this;
    },
    methods: {
      // 添加线路
      onNavigateAdd(){
        this.$router.push({
        	path: '/release_journey',
        })
      },
      //滑到底部
      onShowsDown(e){
         var that = this
        setTimeout(() => {
          // 加载状态结束
          that.onShows()
        }, 1000);
      },
      //分页数据
      onShows(){
        var that = this;
        var data = {
           page:that.page_index,
           // city_id:that.city.id,//城市id
           // area_id:that.cityValue.id==''||that.cityValue.id==undefined?'':that.cityValue.id,//城市下面的区的主键
           // sort_id:that.themeValue.id==''||that.themeValue.id==undefined?'':that.themeValue.id,//分类主键

           // day:that.dayValue.id==''||that.dayValue.id==undefined?'':that.dayValue.id,//适合人数
           // level:that.rateValue.id==''||that.rateValue.id==undefined?'':that.rateValue.id,//推荐值 取值范围1-5
           // tag:that.optionValue.id==''||that.optionValue.id==undefined?'':that.optionValue.id,//tag的主键
           // keyword:that.inputValue,//关键字
        }
        that.$dopost('/sysapi/line/userline/', data,function (res) {
          console.log('首页数据',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            if(res.data.data.data.length == 0){
              that.finished = true
            }
            this.pageDetail = res.data.data
            that.loading = false;
            that.page_index = that.page_index + 1
            that.pageList = that.pageList.concat(res.data.data.data);


            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = '橡果互动个人中心线路列表'
              this.$store.state.index.currentPage.page = window.location.href
              res.data.data.data.map((item,index) => {
                if(res.data.data.data[index].PIC!=undefined&&res.data.data.data[index].PIC!=''||res.data.data.data[index].PIC!=null){
                  this.$store.state.index.currentPage.image = that.domainUrl + '/' + res.data.data.data[index].PIC
                  return
                }else if(res.data.data.data.length-1 == index){
                  this.$store.state.index.currentPage.image = this.$conf.defaultPicture
                }
              })
            }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this),true);

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
      //获取城市
      onAddress(){
        var data = {
         page:1,
        }
        this.$dopost('/sysapi/travel/ip/', data,function (res) {
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            var city = this.$store.state.index.city
            if(city==null||city==''){
              this.city = {
                id:res.data.data.id,
                name:res.data.data.name
              };
              this.$store.state.index.city = this.city
            }else{
              this.city = city
            }
            var list = res.data.data.children
            data = {
              id:'',
              name:'全部区域',
            }
            list.unshift(data);
            this.cityList = list
            this.onShows();
          }else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));

      },
      // 选择区域
      onSelectClick_area(e){
        this.cityValue = e

        this.$store.state.index.area = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.area.toggle();
      },
      //选择主题类型
      onSelectClick_theme(e){
        this.themeValue = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.theme.toggle();
      },
      // 选择天数
      onSelectClick_day(e){
        console.log(e)
        this.dayValue = e
        this.page_index = 1
        this.pageList = []
        this.onShows()
        this.$refs.day.toggle();
      },
      //选择推荐数
      onSelectClick_rate(e){
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
        	path: '/im',
           query: {
        	   id: String(this.pageDetail.user_id),
        	}
        })
      },
      //搜索
      onBlur(){
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
      onEdit(item){
        this.$store.state.index.road_edit_type = 1
        this.$router.push({
        	path: '/release_journey_edit',
           query: {
        	   id: item.ID,
        	}
        })
      },

    }

  }


</script>

<style scoped="scoped" src="../../css/release_journey_list.css">
  /* @import url("../../css/release_journey_list.css"); */

</style>
