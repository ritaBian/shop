<template>
  <div class="body">
      <van-nav-bar title="行程编辑" left-arrow  @click-left="onBack" />
      <div class="page_body">
        <div class="page_division"></div>
        <!-- 评分 -->
        <div class="content_border">
          <div class="content_day">
            <div class="content_day_left">
              <div>第</div>
              <input class="content_day_input" type="number" @input="onInput" v-model="dayValue" >
              <div>天</div>
            </div>
            <!-- @click="onClickTime" -->
            <div class="content_time_border" @click="dateShow=true">
              <div class="content_time_text">{{dateValue}}</div>
              <img class="content_time_icon" :src="require('../../../static/icon/date.png')">
            </div>
          </div>
        </div>
        <div class="page_division"></div>
        <div class="content_border">
          <input class="journey_title" type="text" placeholder="填写行程标题" v-model="road_title" @input="onInputTitle">
          <textarea class="textarea_border" maxlength="500" v-model="road_description" placeholder="填写行程描述" @input="onInputDescription" v-html="road_description"></textarea>
          <div class="textarea_hint">还可以发布<span style="color: #01A862;" v-if="road_description!=undefined">{{500-road_description.length}}</span>个字</div>
          <div class="distance_border" v-if="options.index!=0">
            <div class="address_once">
              <img class="distance_img" :src="require('../../../static/icon/address_distance.png')">
              <div class="address_title">距离上一站多远</div>
            </div>
            <div class="distance_once ">
              <!-- <div>公里</div> -->
              <input class="distance_once_input" type="text" placeholder="公里" v-model="road_km" @input="onInputKm">
              <!-- <img class="distance_down_img" src="../../../static/icon/drop_down.png"> -->
            </div>
          </div>

          <div class="address_border">
            <div class="address_once">
              <van-icon name="location-o" size="1.03rem" color="#333333" />
              <div class="address_title">添加位置信息</div>
            </div>
            <div class="address_once">
              <div class="address_once_sign_border app_line" @click="onNavigateAddress">
                <img class="address_once_sign_img" :src="require('../../../static/icon/address_biaoji.png')">
                <div class="address_once_sign_text app_line">{{addressTitle}}</div>
              </div>
              <van-icon style="margin-left: 0.31rem;" name="arrow" size="0.75rem" color="#BFBFBF" />
            </div>
          </div>
          <!-- 上传图片 -->
          <div class="upload_title"><span class="upload_title_once">行程图片</span>最多上传9张</div>
          <div class="upload_content_border">
            <van-uploader v-model="fileList" :max-count="9"  :multiple="true"  :after-read="onUploadImg" @delete="onPhotoDelete">
              <div class="upload_once">
                <img class="upload_once_icon" :src="require('../../../static/icon/add_img.png')">
              </div>
            </van-uploader>
          </div>
          <!-- <div class="agreement_border" @click.stop="onAgreementClick">
            <img class="agreement_img" v-if="!agreementBoolean" src="../../../static/icon/select.png">
            <img class="agreement_img" v-if="agreementBoolean" src="../../../static/icon/select2.png">
            <div class="agreement_text">我理解并接受<span class="agreement_text_color">用户协议</span>及<span class="agreement_text_color">图片使用规则</span></div>
          </div> -->

          <div class="submitButton" @click="onSubmit">保存</div>

        </div>
      </div>




    <!-- 选择日期 -->
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker
        v-model="timeValue"
        type="time"
        title="选择时间"
        :min-hour="0"
        :max-hour="24"
        @cancel="dateShow=false"
        @confirm="onTimeConfirm"

      />
    </van-popup>

    <!-- <appAddress v-if="addressPopup" @onAddressClose="onAddressClose"></appAddress> -->

    <!-- <van-calendar v-model="dateShow" @confirm="onConfirm" color="#01A862" /> -->
    <!-- 蒙层 -->
    <!-- <div class="mask" v-if="maskBoolean" @click="onMask"></div>

    <loading :show="loading" /> -->

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {
        domainUrl:this.$conf.domain,
        options:'',
        store : '',

        value: 3,
        fileList:[],
        imgList:[],


        agreementBoolean:true,
        timeValue:'',
        dateShow:false,

        dayValue:1,//天数
        dateValue:'08:30',
        road_title:'',//行程标题
        road_description:'',//行程描述
        road_km:'',//距离上一站多远
        addressTitle:'',//标记地址
        // addressPopup:false,


      }
    },
    created() {
      //获取当前页面信息
      if(this.$store.state.index.currentPage.page!=window.location.href){
        this.$store.state.index.currentPage.name = '橡果互动修改行程页'
        this.$store.state.index.currentPage.page = window.location.href
        this.$store.state.index.currentPage.image = '';
      }
    },
    mounted(){
      console.log('传来的数据',this.$route.query)
      if(this.$store.state.index.road_edit.road_all[this.$route.query.index]==undefined){
        this.$store.state.index.road_edit.road_all[this.$route.query.index] = {}
      }
      this.options = this.$route.query
      var index = Number(this.$route.query.index)
      var store = this.$store.state.index.road_edit.road_all[index]
        // this.onOffsetDiv();
        this.dayValue = store!=undefined&&store!=''?(store.DAY_NUM!=undefined&&store.DAY_NUM!=''?store.DAY_NUM:1):1;
        this.dateValue = store!=undefined&&store!=''?(store.DAY_TIME!=undefined&&store.DAY_TIME!=''?store.DAY_TIME:'08:30'):'08:30'
        this.timeValue = store!=undefined&&store!=''?(store.DAY_TIME!=undefined&&store.DAY_TIME!=''?store.DAY_TIME:'08:30'):'08:30'
        
        this.road_title = store!=undefined&&store!=''?(store.NAME!=undefined&&store.NAME!=''?store.NAME:''):''
        this.road_description = store!=undefined&&store!=''?(store.DESCRIPTION!=undefined&&store.DESCRIPTION!=''?store.DESCRIPTION:''):''
        this.road_km = store!=undefined&&store!=''?(store.DISTANCE!=undefined&&store.DISTANCE!=''?store.DISTANCE:''):''
        this.fileList = store!=undefined&&store!=''?(store.fileList!=undefined&&store.fileList.length!=0?store.fileList:[]):[]

        this.imgList = store!=undefined&&store!=''?(store.imgList!=undefined&&store.imgList.length!=0?store.imgList:[]):[]
        // this.addressTitle = store!=undefined&&store!=''?(store.road_address!=undefined&&store!=''?).name:'标记位置让更多人知道~'
        this.addressTitle = store!=undefined&&store!=''?(store.addressName!=undefined&&store.addressName!=''?store.addressName:'标记位置让更多人知道~'):'标记位置让更多人知道~'
    },
    updated() {
      this.store  = this.$store.state.index.road_edit.road_all[this.options.index]
    },
    methods: {
      onBack(){
        this.$store.state.index.road_edit_type = 2
        if (window.history.length <= 1) {
            this.$router.push({path:'/'})
            return false
        } else {
            this.$router.go(-1)
        }
      },
      //输入第几天
      onInput(e){
        this.store.DAY_NUM = this.dayValue
      },
      // 选择日期
      onTimeConfirm(date) {
        this.dateShow = false;
        console.log(date)
        this.dateValue = date;
        this.store.DAY_TIME = date
      },
      //输入行程标题
      onInputTitle(){
        this.store.NAME = this.road_title
      },
      //输入行程描述
      onInputDescription(){
        this.store.DESCRIPTION = this.road_description
      },
      //输入距离上一站多远
      onInputKm(){
        this.store.DISTANCE = this.road_km
      },
      //关闭位置弹窗
      onAddressClose(e){
        // this.addressPopup = false
      },

      //上传
      onUploadImg(e){
        var that = this;
        console.log(e,Array.isArray(e))
        var formData = new FormData();
        if(Array.isArray(e)){
          e.map((item,index) => {
            formData.append('Filedata', e[index].file);
            this.$fly.post(`${this.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
            var srcType = res.data.substring(0,7)
              if(srcType=='upload/'){
                that.imgList.push(res.data)
                that.store.fileList = that.fileList
                that.store.imgList = that.imgList
              }else{
                this.$toast('上传失败')
                that.fileList.splice(index,1);
                that.store.fileList = that.fileList
                // that.fileList.pop()
              }
            }).catch(err => {
              this.$toast('上传失败')
              that.fileList.splice(index,1);
              that.store.fileList = that.fileList
            })
          })
        }else{
          formData.append('Filedata', e.file);
          this.$fly.post(`${this.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
          var srcType = res.data.substring(0,7)
            if(srcType=='upload/'){
              that.imgList.push(res.data)
              that.store.fileList = that.fileList
              that.store.imgList = that.imgList
            }else{
              this.$toast('上传失败')
              that.fileList.pop()
            }
          }).catch(err => {
            this.$toast('上传失败')
            that.fileList.pop()
          })
        }
      },
      //删除图片
      onPhotoDelete(e,item){
         var that = this;
         that.imgList.splice(item.index, 1)
         that.store.imgList.splice(item.index, 1)
      },
      //保存
      onSubmit(){
        var index = this.options.index
        var store = this.$store.state.index.road_edit.road_all[this.options.index]
        var list = {
          ID:this.store.ID,
          DAY_NUM:this.dayValue,//第几天
          DAY_TIME:this.dateValue,//几点
          NAME :this.road_title,//标题
          DESCRIPTION:this.road_description,//行程描述
          DISTANCE :this.road_km,//距离上一站多远
          PIC1:Util.getNull(this.imgList[0])?this.imgList[0]:'',//图片
          PIC2:Util.getNull(this.imgList[1])?this.imgList[1]:'',//图片
          PIC3:Util.getNull(this.imgList[2])?this.imgList[2]:'',//图片
          PIC4:Util.getNull(this.imgList[3])?this.imgList[3]:'',//图片
          PIC5:Util.getNull(this.imgList[4])?this.imgList[4]:'',//图片
          PIC6:Util.getNull(this.imgList[5])?this.imgList[5]:'',//图片
          PIC7:Util.getNull(this.imgList[6])?this.imgList[6]:'',//图片
          PIC8:Util.getNull(this.imgList[7])?this.imgList[7]:'',//图片
          PIC9:Util.getNull(this.imgList[8])?this.imgList[8]:'',//图片
          // SCENIC_ID:Util.getNull(store)?(Util.getNull(store.addressID)?store.addressID:''):'',//目的地主键
          SCENIC_ID:Util.getNull(store.SCENIC_ID)?store.SCENIC_ID:'',//目的地主键
          addressName:Util.getNull(store.addressName)?store.addressName:'',//目的地
          imgList:this.imgList,
          fileList:this.fileList,
        }
        this.$store.state.index.road_edit.road_all[index] = list
        this.$store.state.index.road_edit_type = 2
        this.$router.go(-1)
      },
      //点击位置
      onNavigateAddress(){
        this.$router.push({
        	path: '/circuit_search',
          query: {
            index:this.options.index,
            type:2,
          }
        })
      },
      //勾选协议
      onAgreementClick(){
        this.agreementBoolean = !this.agreementBoolean
      },

    },

  }


</script>

<style scoped="scoped" src="../../css/day_journey.css">
  /* @import url("../../css/day_journey.css"); */
  ::-webkit-scrollbar {
    width: 0;
  }
</style>
