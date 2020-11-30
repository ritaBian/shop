<template>
  <div class="body">
      <van-nav-bar title="编辑行程" left-arrow  @click-left="onBack" @click-right="onNavigateList" right-text="我的行程"/>

      <div class="page_body" >
        <div class="content_body">
          <div class="content_description_border " v-show="road_data.road_title!=''">
            <div class="content_title ">
              <div>行程标题</div>
              <div class="content_title_right" @click="onRoadTitle">
                <img class="content_title_img" :src="require('../../../static/icon/release_journey/bianji.png')">
                <div>编辑</div>
              </div>
            </div>
            <div class="content_description_content" >
              <span :class="[height_title>=76?'content_description_text':'content_description_expansionText']" ref="title" id='aa' v-html="road_description(road_data.road_title)">
                <div class="content_description_white" v-show="height_title>=76" @click.stop="height_title=0"></div>
                <div class="content_description_blue" v-show="height_title>=76" @click.stop="height_title=0">
                  展开更多
                  <van-icon name="arrow-down" color="#3A99E5" size="0.59rem" />
                  </div>
              </span>
            </div>
          </div>

          <div class="write_white" @click="onRoadTitle" v-show="road_data.road_title==''">
            <div style="margin-right: 0.38rem;">编写线路标题</div>
            <van-icon :name="require('../../../static/icon/bianji.png')" size="0.88rem" />
          </div>

          <div class="content_description_border " v-show="road_data.road_description!=''">
            <div class="content_title ">
              <div>行程描述</div>
              <div class="content_title_right" @click="onRoadDescription">
                <img class="content_title_img" :src="require('../../../static/icon/release_journey/bianji.png')">
                <div>编辑</div>
              </div>
            </div>
            <div class="content_description_content">
              <span :class="[height_content>=76?'content_description_text':'content_description_expansionText']" ref="content" v-html="road_description(road_data.road_description)">
                <div class="content_description_white" v-show="height_content>=76" @click.stop="height_content=0"></div>
                <div class="content_description_blue" v-show="height_content>=76" @click.stop="height_content=0">
                  展开更多
                  <van-icon name="arrow-down" color="#3A99E5" size="0.59rem" />
                  </div>
              </span>
            </div>
          </div>
          <div class="write_white" @click="onRoadDescription" v-show="road_data.road_description==''">
            <div style="margin-right: 0.38rem;">编写行程描述</div>
            <van-icon :name="require('../../../static/icon/bianji.png')" size="0.88rem" />
          </div>


          <div class="content_description_border " v-show="road_data.road_announcements!=''">
            <div class="content_title ">
              <div>注意事项</div>
              <div class="content_title_right" @click="onRoadAnnouncements">
                <img class="content_title_img" :src="require('../../../static/icon/release_journey/bianji.png')">
                <div>编辑</div>
              </div>
            </div>
            <div class="content_description_content">
              <span :class="[height_announcements>=76?'content_description_text':'content_description_expansionText']" ref="announcements" v-html="road_description(road_data.road_announcements)">
                <div class="content_description_white" v-show="height_announcements>=76" @click.stop="height_announcements=0"></div>
                <div class="content_description_blue" v-show="height_announcements>=76" @click.stop="height_announcements=0">
                  展开更多
                  <van-icon name="arrow-down" color="#3A99E5" size="0.59rem" />
                  </div>
              </span>
            </div>
          </div>
          <div class="write_white" @click="onRoadAnnouncements" v-show="road_data.road_announcements==''">
            <div style="margin-right: 0.38rem;">编写注意事项</div>
            <van-icon :name="require('../../../static/icon/bianji.png')" size="0.88rem" />
          </div>


          <div class="content_description_border " v-show="road_data.road_traffic!=''">
            <div class="content_title ">
              <div>交通信息</div>
              <div class="content_title_right" @click="onRoadTraffic">
                <img class="content_title_img" :src="require('../../../static/icon/release_journey/bianji.png')">
                <div>编辑</div>
              </div>
            </div>
            <div class="content_description_content">
              <span :class="[height_traffic>=76?'content_description_trafficText':'content_description_expansionText']" ref="traffic" v-html="road_description(road_data.road_traffic)">
                <div class="content_description_white" v-show="height_traffic>=76" @click.stop="height_traffic=0"></div>
                <div class="content_description_blue" v-show="height_traffic>=76" @click.stop="height_traffic=0">
                  展开更多
                  <van-icon name="arrow-down" color="#3A99E5" size="0.59rem" />
                  </div>
              </span>
            </div>
          </div>

          <div class="write_white" @click="onRoadTraffic" v-show="road_data.road_traffic==''">
            <div style="margin-right: 0.38rem;">编写交通信息</div>
            <van-icon :name="require('../../../static/icon/bianji.png')" size="0.88rem" />
          </div>

            <div class="write_white" @click="cityShow = true" >
              <div v-if="road_data.road_city!=undefined&&road_data.road_city.length==0?(road_data.road_city.length==0):false" style="margin-right: 0.38rem;" >添加位置信息</div>
              <van-icon v-if="road_data.road_city!=undefined?(road_data.road_city.length==0):false" :name="require('../../../static/icon/add.png')" size="0.69rem" />
              <div class="write_white_city"  v-for="(item,index) of road_data.road_city" :key="index">
                {{item.name}}
                <div class="cityvalue_line " v-if="index != road_data.road_city.length-1"></div>
              </div>
            </div>

            <div class="write_white" >
              <div class="write_white_input_border">
                <div class="">行程总天数：</div>
                <input class="write_white_input" type="number" v-model="day_alls" placeholder="请输入天数" @input="onDayAll">
                <div style="margin-left: 0.3rem;">天</div>
              </div>
            </div>

            <van-uploader class="upload_class" v-model="fileList" :max-count="1"  :after-read="onUploadImg" @delete="onPhotoDelete">
              <div class="upload_view">
                <div style="margin-right: 0.38rem;" >添加主图</div>
                <van-icon :name="require('../../../static/icon/add.png')" size="0.69rem" />
              </div>
            </van-uploader>





          <div class="content_select_title">主题类型</div>
          <div class="content_select_tag" v-if="road_data.tag!=undefined">
            <div :class="[road_data.tag.indexOf(item.ID)!=-1?'content_select_tag_once2':'content_select_tag_once']" v-for="(item,index) of tagList" :key="index" @click="onSeleteTag(item)">
              <img class="content_select_tag_img" v-if="road_data.tag.indexOf(item.ID)==-1" :src="require('../../../static/icon/release_journey/tick1.png')" >
              <img class="content_select_tag_img" v-if="road_data.tag.indexOf(item.ID)!=-1" :src="require('../../../static/icon/release_journey/tick2.png')">
              <div>{{item.NAME}}</div>
            </div>
          </div>

          <div class="content_select_title">选择标签</div>
          <div class="content_select_tag" v-if="road_data.label!=undefined">
            <div :class="[road_data.label.indexOf(item.ID)!=-1?'content_select_tag_once2':'content_select_tag_once']" v-for="(item,index) of labelList" :key="index" @click="onSeleteLabel(item)">
              <img class="content_select_tag_img" v-if="road_data.label.indexOf(item.ID)==-1" :src="require('../../../static/icon/release_journey/tick1.png')">
              <img class="content_select_tag_img" v-if="road_data.label.indexOf(item.ID)!=-1" :src="require('../../../static/icon/release_journey/tick2.png')">
              <div>{{item.NAME}}</div>
            </div>
            <!-- <div class="content_select_tag_once">
              <img class="content_select_tag_img" src="../../../static/icon/release_journey/tick1.png">
              <div>美食</div>
            </div>
            <div class="content_select_tag_once2">
              <img class="content_select_tag_img" src="../../../static/icon/release_journey/tick2.png">
              <div>徒步穿越</div>
            </div> -->
          </div>

          <div class="content_select_title">行程指数</div>
          <div class="content_select_white">
            <div class="content_select_white_once ">
                <div>体力消耗</div>
                <van-rate class="content_select_rate" v-model="road_data.BODY_INDEX" size="1.06rem" gutter="0.78rem" color="#FD4F1A" void-color="#757575" />
                <div class="content_select_state">{{rateList.stamina[road_data.BODY_INDEX-1]}}</div>
            </div>
            <div class="content_select_white_once ">
                <div>道路状况</div>
                <van-rate class="content_select_rate" v-model="road_data.TRAFFIC_INDEX" size="1.06rem" gutter="0.78rem" color="#FD4F1A" void-color="#757575" />
                <div class="content_select_state">{{rateList.road[road_data.TRAFFIC_INDEX-1]}}</div>
            </div>
            <div class="content_select_white_once ">
                <div>安全指数</div>
                <van-rate class="content_select_rate" v-model="road_data.SAFE_INDEX" size="1.06rem" gutter="0.78rem" color="#FD4F1A" void-color="#757575" />
                <div class="content_select_state">{{rateList.safety[road_data.SAFE_INDEX-1]}}</div>
            </div>
            <div class="content_select_white_once ">
                <div>游客数量</div>
                <van-rate class="content_select_rate" v-model="road_data.PERSON_INDEX" size="1.06rem" gutter="0.78rem" color="#FD4F1A" void-color="#757575" />
                <div class="content_select_state">{{rateList.visitor[road_data.PERSON_INDEX-1]}}</div>
            </div>
          </div>
        </div>




        <!-- 游玩站 -->
        <div class="play_border ">
          <div class="play_once " v-for="(item,index) of play_list" :key="index">
            <div class="play_left ">
              <div class="play_left_circle">{{(index+1)<10?'0'+(index+1):index+1}}</div>
              <div class="play_left_line" v-show="index != play_list.length-1"></div>
            </div>
            <div class="play_right " v-if="!play_Boolean(item)">
              <div class="play_right_title">
                <div class="play_right_title_right">
                  <div>第{{index+1}}站</div>
                  <div class="play_right_title_time">第{{item.DAY_NUM}}天 {{item.DAY_TIME=='时间日期'?'':item.DAY_TIME}}</div>
                </div>
                <div class="play_right_title_left">
                  <div class="play_right_title_left_once" style="margin-left: 0.38rem;" @click="onDeleteRoad(index)">删除</div>
                </div>
              </div>
              <div class="play_white">
                <div class="play_white_address app_line" v-if="item.addressName!=undefined&&item.addressName!=''">{{item.addressName}}</div>
                <div class="play_white_title" v-html="road_description(item.NAME)"></div>
                <van-swipe class="play_swipe " :loop="false" width="97.5" height="87.5"  :show-indicators="false" v-if="item.PIC1!=''&&item.PIC1!=undefined">
                  <van-swipe-item class="play_swipe_item" v-for="(img,indexs) of item.imgList"  :key="indexs" >
                    <van-image class="play_swipe_once" style="background-color: #000066;" fit="cover" :src="domainUrl+'/'+img" @click="onImagePreview(item.imgList,indexs)" />
                  </van-swipe-item>
                </van-swipe>
               <!-- <van-swipe class="play_swipe" :loop="false" width="97.5" height="87.5" :show-indicators="false">
                  <van-swipe-item class="play_swipe_item "   v-for="(img,indexs) of 4"  :key="indexs">
                    <van-image class="play_swipe_once" style="background-color: #000066;" fit="cover" :src="domainUrl+'/'+img" />
                  </van-swipe-item>
                </van-swipe> -->

                <div class="play_content_text" v-html="road_description(item.DESCRIPTION)"></div>
                <div class="play_button_border">
                  <div class="play_button" @click="onRoadAll(index)">编辑</div>
                </div>
              </div>
            </div>
            <!-- 没数据时 -->
            <div class="play_right " v-if="play_Boolean(item)">
              <div class="play_right_title">
                <div class="play_right_title_right">
                  <div>第{{index+1}}站</div>
                </div>
                <div class="play_right_title_left">
                  <div class="play_right_title_left_once" @click="onDeleteRoad(index)" style="margin-left: 0.38rem;">删除</div>
                </div>
              </div>
              <div class="play_add_road" @click="onRoadAll(index)">
                <van-icon :name="require('../../../static/icon/add.png')" size="0.88rem" />
                <div style="margin-left: 0.38rem;">完善路线</div>
              </div>
            </div>
          </div>
        </div>

        <div class="addJourneyButton_border" @click="onRoadAdd">
          <div class="addJourneyButton border">增加行程</div>
        </div>

        <div class="fixed_white">
          <div class="fixed_left" @click="onSubmitRoad(1)">
            <div class="fixed_left_img_bg">
              <img class="fixed_left_img" :src="require('../../../static/icon/release_journey/draft.png')">
            </div>
            <div>存草稿</div>
          </div>
          <div class="fixed_right_button" @click="onSubmitRoad(0)">发布线路</div>
        </div>
        </div>


        <van-popup v-model="cityShow" position="bottom">
           <van-area title="标题" :area-list="areaList" @confirm="cityConfirm" />
        </van-popup>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  import { ImagePreview } from 'vant';
  export default {
    data() {
      return {
        domainUrl:this.$conf.domain,
        allTag:this.$store.state.index.allTag,
        cityList:this.$store.state.index.cityList,
        options:'',

        height_title:'',
        height_content:'',
        height_announcements:'',
        height_traffic:'',

        // stamina_rate:5,//体能消耗
        // road_rate:5,//道路状况
        // safety_rate:5,//安全指数
        // visitor_rate:5,//游客数量
        play_list:[],

        rateList:this.$store.state.index.rateList,
        road_data:'',
        tagList:[],
        tagSelectList:[],

        labelList:[],
        labelSelectList:[],
        fileList:[],
        imgPic:'',

        areaList:this.$store.state.index.cityList,
        cityShow:false,
        cityValue:[],
        swiperList:[],
        post_details:[],
        day_alls:'',

      }
    },

    updated() {
      this.allTag = this.$store.state.index.allTag
      this.cityList = this.$store.state.index.cityList
      // this.road_data = this.$store.state.index.road_data
    },
    mounted(){
      if(this.allTag!=undefined&&this.allTag!=''){
        // 主题类型
        this.tagAll()
      }
      // this.onTextDiv();
    },
    computed:{
      play_Boolean:function(){
        return function(item){
          if(Util.getNull(item.DAY_NUM)||Util.getNull(item.DAY_TIME)||Util.getNull(item.DESCRIPTION)||Util.getNull(item.DISTANCE)||Util.getNull(item.NAME)){
            return false
          }else{
            return true
          }
        }
      },
      road_description:function(){
        return function(item){
          var flag = new RegExp(/[\r\n]/g)
          if(flag.test(item)){
            return  item.replace(/[\r\n]/g,"<br/>");
          }else{
            return item;
          }
        }
      }
    },
    created() {
      this.options = this.$route.query
      //渲染
      this.pageData()
    },
    methods:{
      //行程天数
      onDayAll(){
         this.$store.state.index.road_edit.day_alls = this.day_alls
      },
      //选择图片
      onImagePreview(item,index){
        console.log(item,index)
        var that = this;
        var list = item.map((ite,index) =>{
          return that.domainUrl + '/' + item[index]
        })
        ImagePreview({
          images: list,
          startPosition: index,
        });
      },
      // 元素高度
      onTextDiv(){
        // this.height_title = this.$refs.title.offsetHeight;//标题高度
        // this.height_content = this.$refs.content.offsetHeight;//描述高度
        // this.height_announcements = this.$refs.announcements.offsetHeight;//描述高度
        // this.height_traffic = this.$refs.traffic.offsetHeight;//交通信息
        this.height_title = 0;//标题高度
        this.height_content = 0;//描述高度
        this.height_announcements = 0;//描述高度
        this.height_traffic = 0;//交通信息
      },
      //我的行程
      onNavigateList(){
        this.$router.push({
          path: '/release_journey_list',
        })
      },
      //页面数据
      pageData(){

        var that = this;
        var data = {
          id:that.options.id,qr:1
        }
        var type = this.$store.state.index.road_edit_type
        that.$dopost('/sysapi/line/detail/',data,function (res) {
          console.log('线路详情',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            var edit = res.data.data
            if(type==1){
              var edit = res.data.data
              var data = {}
              var list = []
              // 处理路线数组
              edit.details.map((item,index) => {
                data = {
                  DAY_NUM:edit.details[index].DAY_NUM,//第几天
                  DAY_TIME:edit.details[index].DAY_TIME,//几点
                  NAME :edit.details[index].NAME,//标题
                  DESCRIPTION:edit.details[index].DESCRIPTION,//行程描述
                  DISTANCE :edit.details[index].DISTANCE,//距离上一站多远
                  PIC1:edit.details[index].PIC1,//图片
                  PIC2:edit.details[index].PIC2,//图片
                  PIC3:edit.details[index].PIC3,//图片
                  PIC4:edit.details[index].PIC4,//图片
                  PIC5:edit.details[index].PIC5,//图片
                  PIC6:edit.details[index].PIC6,//图片
                  PIC7:edit.details[index].PIC7,//图片
                  PIC8:edit.details[index].PIC8,//图片
                  PIC9:edit.details[index].PIC9,//图片
                  SCENIC_ID:edit.details[index].SCENIC.ID,//目的地主键
                  addressName:edit.details[index].SCENIC.NAME,//目的地
                  imgList:[],
                  fileList:[],
                  ID:edit.details[index].ID
                }

                list[index] = data
                var imgList = [edit.details[index].PIC1,edit.details[index].PIC2,edit.details[index].PIC3,edit.details[index].PIC4,edit.details[index].PIC5,edit.details[index].PIC6,edit.details[index].PIC7,edit.details[index].PIC8,edit.details[index].PIC9]
                var imgList2 = []
                imgList.map((items,indexs) => {
                  if(items != ''){
                    imgList2.push(items)
                  }
                })
                data.imgList = imgList2
                var fileList = [edit.details[index].PIC1,edit.details[index].PIC2,edit.details[index].PIC3,edit.details[index].PIC4,edit.details[index].PIC5,edit.details[index].PIC6,edit.details[index].PIC7,edit.details[index].PIC8,edit.details[index].PIC9]
                var fileList2 = []
                fileList.map((items,indexs) => {
                  if(items != ''){
                    var k = {
                      url:that.domainUrl+'/'+items
                    }
                    fileList2.push(k)
                    data.fileList = fileList2
                  }
                })
              })
              // 处理页面数据
              this.fileList = edit.data.PIC==''||edit.data.PIC==undefined?[]:[{url:that.domainUrl+'/'+edit.data.PIC}]
              var road_city = [edit.data.PROVINCE,edit.data.CITY,edit.data.AREA]
              var road_city2 = []
              road_city.map((item,index) =>{
                item = Number(item)
                if(index==0){
                  var city = {
                    code:item,
                    name:that.cityList.province_list[item]
                  }
                }
                if(index==1){
                  var city = {
                    code:item,
                    name:that.cityList.city_list[item]
                  }
                }
                if(index==2){
                  var city = {
                    code:item,
                    name:that.cityList.county_list[item]
                  }
                }
                road_city2.push(city)
              })
              var rote = {
                ID:edit.data.ID,
                road_title:edit.data.NAME,
                road_description:edit.data.DESCRIPTION,
                road_traffic:edit.data.TRAFFIC,
                // road_location:road_city2,
                road_announcements:edit.data.NOTE,//事项
                label:[edit.data.TAG1,edit.data.TAG2,edit.data.TAG3,edit.data.TAG4,edit.data.TAG5],
                tag:[edit.data.TYPE1,edit.data.TYPE2,edit.data.TYPE3,edit.data.TYPE4,edit.data.TYPE5],
                road_city:road_city2[0].name==undefined&&road_city2[1].name==undefined?[]:road_city2,
                file:[],
                picImg:edit.data.PIC,
                road_all:list,
                day_alls:edit.data.DAY_ALL,

                BODY_INDEX :Number(edit.data.BODY_INDEX),//体力消耗指数
                TRAFFIC_INDEX :Number(edit.data.TRAFFIC_INDEX),//道路状况
                SAFE_INDEX :Number(edit.data.SAFE_INDEX),//安全指数
                PERSON_INDEX :Number(edit.data.PERSON_INDEX),//游客数量
              }
              this.$store.state.index.road_edit = rote
              this.road_data = rote
              this.play_list = list
              this.day_alls = edit.data.DAY_ALL
              console.log(99999,this.$store.state.index.road_edit)
            }else{
              console.log(8888,this.$store.state.index.road_edit.road_all)
              this.fileList = this.$store.state.index.road_edit.picImg==''||this.$store.state.index.road_edit.picImg==undefined?[]:[{url:this.domainUrl+'/'+this.$store.state.index.road_edit.picImg}]
              this.road_data = this.$store.state.index.road_edit
              this.play_list = this.$store.state.index.road_edit.road_all
              this.day_alls = this.$store.state.index.road_edit.day_alls
            }

            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = '橡果互动编辑页'
              this.$store.state.index.currentPage.page = window.location.href
              this.$store.state.index.currentPage.image = ''
            }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));


      },

      //发布编辑线路
      onSubmitRoad(index){
        var that = this
        var index = Number(index)
        var store = this.$store.state.index.road_edit
        var detail = {}
        var list = []
        store.road_all.map((item,index) => {
          detail = {
            ID:store.road_all[index].ID==undefined?'':store.road_all[index].ID,
            DAY_NUM:store.road_all[index].DAY_NUM==undefined?'':store.road_all[index].DAY_NUM,//第几天
            DAY_TIME:store.road_all[index].DAY_TIME==undefined?'':store.road_all[index].DAY_TIME,//几点
            NAME :store.road_all[index].NAME==undefined?'':store.road_all[index].NAME,//标题
            DESCRIPTION:store.road_all[index].DESCRIPTION==undefined?'':store.road_all[index].DESCRIPTION,//行程描述
            DISTANCE :store.road_all[index].DISTANCE==undefined?'':store.road_all[index].DISTANCE,//距离上一站多远
            PIC1:store.road_all[index].PIC1==undefined?'':store.road_all[index].PIC1,//图片
            PIC2:store.road_all[index].PIC2==undefined?'':store.road_all[index].PIC2,//图片
            PIC3:store.road_all[index].PIC3==undefined?'':store.road_all[index].PIC3,//图片
            PIC4:store.road_all[index].PIC4==undefined?'':store.road_all[index].PIC4,//图片
            PIC5:store.road_all[index].PIC5==undefined?'':store.road_all[index].PIC5,//图片
            PIC6:store.road_all[index].PIC6==undefined?'':store.road_all[index].PIC6,//图片
            PIC7:store.road_all[index].PIC7==undefined?'':store.road_all[index].PIC7,//图片
            PIC8:store.road_all[index].PIC8==undefined?'':store.road_all[index].PIC8,//图片
            PIC9:store.road_all[index].PIC9==undefined?'':store.road_all[index].PIC9,//图片
            SCENIC_ID:store.road_all[index].SCENIC_ID==undefined?'':store.road_all[index].SCENIC_ID,//目的地主键
          }
          list.push(detail)
        })
        var tag = []
        this.road_data.tag.map(item => {
          if(item!=0&&item!=''){
            tag.push(item)
          }
        })
        this.road_data.tag = tag
        var label = []
        this.road_data.label.map(item => {
          if(item!=0&&item!=''){
            label.push(item)
          }
        })
        this.road_data.label = label
        var city = []
        this.road_data.road_city.map(item => {
            city.push(item.code)
        })
        var listJson = JSON.stringify(list)
        var data = {
          DRAFT: index,
          ID:this.road_data.ID,
          DESCRIPTION:this.road_data.road_description,//描述
          NAME :this.road_data.road_title,// 标题
          NOTE :this.road_data.road_announcements,// 注意事项
          TRAFFIC :this.road_data.road_traffic,//交通情况
          TAG1 : String(this.road_data.label),//5个逗号分隔的tag数字，比如：123,456,789
          TYPE1 : String(this.road_data.tag),//5个逗号分隔的主题类型数字，比如：123,456,789
          sheng_shi_qu :String(city),// 省id,市id,区id
          DAY_ALL :this.$store.state.index.road_edit.day_alls,//行程天数
          BODY_INDEX :store.BODY_INDEX,//体力消耗指数
          TRAFFIC_INDEX :store.TRAFFIC_INDEX,//道路状况
          SAFE_INDEX :store.SAFE_INDEX,//安全指数
          PERSON_INDEX :store.PERSON_INDEX,//游客数量
          PIC:this.road_data.picImg,//主图
          DETAIL:list.length==0?'':listJson,
        }
        console.log(1111111111,data)
        var that = this;
        that.$dopost('/sysapi/line/edit/', data,function (res) {
          console.log('修改线路',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.$toast(String(res.data.mess));
            // setTimeout(function() {
            //   // that.$router.go(-1)
            //   that.$router.push({
            //   	path: '/release_journey_list',
            //   })
            // }, 1500);
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this),true);

      },

      //主题类型
      tagAll(){
        var allTag = this.allTag
        var item = allTag.filter(n=>n.PARENT_ID==122);
        var label = allTag.filter(n=>n.PARENT_ID==121);
        this.tagList = item
        this.labelList = label

      },
      //选择主题类型
      onSeleteTag(item){
        var road_data = this.$store.state.index.road_edit
        var index = road_data.tag.indexOf(item.ID)

        if(index!=-1){
          road_data.tag.splice(index,1);
        }else{
          if(road_data.tag.length>=5){
            road_data.tag.splice(0,1);
            road_data.tag.push(item.ID)
          }else{
            road_data.tag.push(item.ID)
          }
        }
      },
      //选择主题标签
      onSeleteLabel(item){
        var road_data = this.$store.state.index.road_edit
        var index = road_data.label.indexOf(item.ID)
        if(index!=-1){
          road_data.label.splice(index,1);
        }else{
          if(road_data.label.length>=5){
            road_data.label.splice(0,1);
            road_data.label.push(item.ID)
          }else{
            road_data.label.push(item.ID)
          }
        }
      },
      //编写行程标题
      onRoadTitle(){
        this.$router.push({
        	path: '/title_edit',
           query: {
             type:2
        	}
        })
      },
      //编写行程描述
      onRoadDescription(){
        this.$router.push({
        	path: '/description_edit',
           query: {
             type:2
        	}
        })
      },
      // 编写注意事项
      onRoadAnnouncements(){
        this.$router.push({
        	path: '/edit_announcements',
           query: {
             type:2
        	}
        })
      },
      //编写交通信息
      onRoadTraffic(){
        this.$router.push({
        	path: '/traffic_edit',
           query: {
             type:2
        	}
        })
      },
      //添加位置信息
      onRoadLocation(){

      },
      //点击城市确认
      cityConfirm(e){
        this.cityShow = false
        this.road_data.road_city = e
        this.$store.state.index.road_edit.road_city = e
        this.$store.state.index.road_edit_type = 2
      },
      //上传
      onUploadImg(e){
        var road_edit= this.$store.state.index.road_edit
        var formData = new FormData();
        formData.append('Filedata', e.file);
        this.$store.state.index.road_edit_type = 2
        var that = this;
        this.$fly.post(`${this.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
          var srcType = res.data.substring(0,7)
          if(srcType=='upload/'){
            that.$store.state.index.road_edit.picImg = res.data
            road_edit.file = this.fileList
          }else{
            that.$toast('上传失败:'+res.data)
          }
        }).catch(err => {
          this.$toast('上传失败！')
        })
      },
      //删除图片
      onPhotoDelete(e,item){
        var road_edit= this.$store.state.index.road_edit
        road_edit.picImg.splice(item.index, 1)
      },
      //完善路线
      onRoadAll(e){
        var index = Number(e)
        this.$router.push({
        	path: '/day_journey_edit',
           query: {
        	   index: index,
        	}
        })
      },
      //增加行程
      onRoadAdd(){
        var list = {}
        this.play_list.push(list)
        console.log(111,this.play_list)
        this.$store.state.index.road_edit.road_all = this.play_list

      },

      //删除路线
      onDeleteRoad(index){
        console.log(index)
        var index = Number(index)
        this.$dialog.alert({
          title:'是否删除第'+(index+1)+'天的路线',
          showCancelButton:true,
          confirmButtonText:'取消',
          cancelButtonText:'确定',
          confirmButtonColor:'#646464',
          cancelButtonColor:'#646464',
        }).then(res => {
          console.log('取消',res)
        }).catch(res => {
          console.log('确定',res)
          this.play_list.splice(index,1);
          this.$store.state.index.road_edit.road_all = this.play_list
        })
      },
      //返回
      onBack() {
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
        // Toast('返回');
      },
      //勾选协议
      onAgreementClick(){
        this.agreementBoolean = !this.agreementBoolean
      },



    },

  }


</script>

<style scoped="scoped" src="../../css/release_journey.css">
  /* @import url("../../css/release_journey.css"); */
  ::-webkit-scrollbar {
    width: 0;
  }
  #app /deep/ .van-dialog{
    border-radius: 0 !important;
  }
</style>
