<template>
  <div class="body">
      <van-nav-bar title="发表评论" left-arrow  @click-left="onBack" />
      <div class="page_body">
        <div class="page_division"></div>
        <!-- 评分 -->
        <div class="content_border">
          <div class="content_grade">
            <div style="margin-right: 2.53rem;">评分</div>
            <van-rate  v-model="value" void-color="#757575" gutter="0.78rem" size="1rem" @change="onRate" color="#FFC900"/>
            <div class="content_click_text">点击来评分</div>
          </div>
          <!-- <div class="talk_title">这里值得去吗？有什么亮点？大家那么期待你的点评~</div> -->

          <textarea class="textarea_border" maxlength="500" v-model="textareaInput" placeholder="这里值得去吗？有什么亮点？大家那么期待你的点评~" @blur="onTextarea"></textarea>

          <div class="textarea_hint">还可以发布<span style="color: #01A862;">{{500-textareaInput.length}}</span>个字</div>
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
          <div class="upload_title"><span class="upload_title_once">评论图片</span>最多上传5张</div>

          <!-- <div class="upload_content_border">
            <div class="upload_once" @click="changeImage()">
              <img class="upload_once_icon" :src="require('../../../static/icon/add_img.png')" >
              <input class="upload_input_file" type="file" accept="image/*" ref="avatarInput" style="opacity: 0;" multiple @change="changeImage()" >
            </div>
          </div> -->

          <div class="upload_content_border">
            <van-uploader v-model="fileList" :multiple="true" :max-count="5" :after-read="onUploadImg"  @delete="onPhotoDelete">
              <div class="upload_once">
                <img class="upload_once_icon" :src="require('../../../static/icon/add_img.png')" >
              </div>
            </van-uploader>
          </div>

          <div class="agreement_border" >
            <img class="agreement_img" v-if="!agreementBoolean" :src="require('../../../static/icon/select.png')" @click.stop="onAgreementClick">
            <img class="agreement_img" v-if="agreementBoolean" :src="require('../../../static/icon/select2.png')" @click.stop="onAgreementClick">
            <div class="agreement_text" @click.stop="onAgreementClick">我理解并接受<span class="agreement_text_color" @click.stop="showPopup=true">用户协议</span></div>
          </div>

          <div class="submitButton" @click="onSubmit">到此一游</div>

        </div>
      </div>


    <!-- 弹出层 -->
    <van-popup v-model="showPopup" closeable class="popup_view">
      <div class="popup_title">用户协议</div>
      <div class="popup_conment" v-html="agreement"></div>
    </van-popup>

    <!-- 蒙层 -->
    <!-- <div class="mask" v-if="maskBoolean" @click="onMask"></div>

    <loading :show="loading" /> -->

  </div>
</template>


<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  import wxsdk from '../../util/wxsdk.js'
  import wx from 'weixin-js-sdk'
  export default {
    data() {
      return {
        domainUrl:this.$conf.domain,
        token : this.$store.state.login.token,
        options:'',

        value: 3,
        textareaInput:'',
        fileList:[],
        agreementBoolean:true,
        showPopup:false,
        agreement:'',
        imageList:[],

        addressTitle:'',//标记地址
      }
    },
    created() {
      //获取当前页面信息
      // if(this.$store.state.index.currentPage.page!=window.location.href){
        this.$store.state.index.currentPage.name = '橡果互动到此一游页'
        this.$store.state.index.currentPage.page = window.location.href
        this.$store.state.index.currentPage.image = '';
      // }
      this.$wx.wxConfig()
      this.initData()
      this.options = this.$route.query
    },
    mounted(){
        // this.onOffsetDiv();
        this.data = this.originData;
        var store = this.$store.state.index
        this.value = store.track_rate!=''?store.track_rate:3
        this.textareaInput = store.track_text!=''?store.track_text:''
        this.addressTitle = store.track_address_name!=undefined&&store.track_address_name!=''?store.track_address_name:'标记位置让更多人知道~'
        this.imageList = store.track_imageList!=''?store.track_imageList:[],
        this.fileList = store.track_fileList!=''?store.track_fileList:[]

    },
    methods: {
       // changeImage(){
       //   console.log(123,)
       //   this.$wx.chooseImage({
       //     count: 9, // 默认9
       //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       //     success: function (res) {
       //       console.log(111,res)
       //     var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
       //     }
       //   });
       //   console.log(this.$refs.avatarInput.files)
       // },
      //数据
      initData(){
        this.$dopost('sysapi/travel/protocol',null,function (res) {
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.agreement = res.data.data.UserProtocol

          }else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      //评分
      onRate(){
       var store = this.$store.state.index
       store.track_rate = this.value
      },
      //写评论
      onTextarea(){
        var store = this.$store.state.index
         store.track_text = this.textareaInput
      },
      //上传
      onUploadImg(e){
        var that = this;
        var formData = new FormData();
        var store = this.$store.state.index
        if(Array.isArray(e)){
          e.map((item,index) => {
            formData.append('Filedata', e[index].file);
            that.$fly.post(`${that.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
            var srcType = res.data.substring(0,7)
              if(srcType=='upload/'){
                that.imageList.push(res.data)
                store.track_fileList = that.fileList
                store.track_imageList = that.imageList
              }else{
                that.$toast('上传失败')
                that.fileList.splice(index,1);
                store.track_fileList = that.fileList
                // that.fileList.pop()
              }
            }).catch(err => {
              that.$toast('上传失败')
              that.fileList.splice(index,1);
              store.track_fileList = that.fileList
            })
          })
        }else{
          formData.append('Filedata', e.file);
          that.$fly.post(`${that.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
          var srcType = res.data.substring(0,7)
            if(srcType=='upload/'){
              that.imageList.push(res.data)
              store.track_fileList = that.fileList
              store.track_imageList = that.imageList
            }else{
              that.$toast('上传失败')
              that.fileList.pop()
            }
          }).catch(err => {
            that.$toast('上传失败')
            that.fileList.pop()
          })
        }
      },
      //删除图片
      onPhotoDelete(e,item){
        this.imageList.splice(item.index, 1)
      },
      //点击位置
      onNavigateAddress(){
        this.$router.push({
        	path: '/circuit_search',
          query: {
            index:this.options.index,
            type:8,
          }
        })
      },
      //提交
      onSubmit(){
        var that = this;
        var store = this.$store.state.index
        if(!this.agreementBoolean){
          this.$toast('请先勾选用户协议');
          return
        }
        if(store.track_address_id==''){
          this.$toast('请先选择位置信息');
          return
        }
        var data = {
         to_id:'',
         module:'',
         pic1:this.imageList[0]==undefined?'':this.imageList[0],
         pic2:this.imageList[1]==undefined?'':this.imageList[1],
         pic3:this.imageList[2]==undefined?'':this.imageList[2],
         pic4:this.imageList[3]==undefined?'':this.imageList[3],
         pic5:this.imageList[4]==undefined?'':this.imageList[4],
         mess:this.textareaInput,
         point:this.value,
        }
        console.log(this.options)
        // if(this.options.type==2){
        //   data.module = 100
        //   data.to_id = this.options.id
        // }else{
          data.module = 3
          data.to_id = store.track_address_id
        // }
        if(this.token!=1){
          this.$toast('请先登录');
        }else{
          this.$dopost('/sysapi/comment/send/',data,function (res) {
            console.log('评论',res)
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.$toast('发表成功');
              store.track_rate = 3
              store.track_text = ''
              store.track_address_name = ''
              store.track_address_id = ''
              store.track_imageList = []
              store.track_fileList = []
              setTimeout(function() {
                that.$router.go(-1)
              }, 1500);
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },
      //勾选协议
      onAgreementClick(){
        this.agreementBoolean = !this.agreementBoolean
      },
      onBack() {
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

<style scoped="scoped" src="../../css/comment.css">
  /* @import url("../../css/comment.css"); */

</style>
