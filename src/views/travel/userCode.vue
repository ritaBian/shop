<template>
  <div class="body">
      <van-nav-bar title="智能验票" left-arrow  @click-left="onBack" />

      <div class="page_body">
        <div class="body_title">拍照验票</div>

        <div class="upload_content_border">
          <van-uploader class="upload_content " :capture="capture" v-model="fileList"  :max-count="1"  :after-read="onUploadImg" @delete="onPhotoDelete">
            <div class="upload_once ">
              <img class="upload_once_icon" :src="require('../../../static/icon/add_img.png')">
            </div>
          </van-uploader>
        </div>

        <div class="content_text">{{codeText}}</div>

        <div class="submitButton" @click="onSubmit">确定验票</div>

      </div>




  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {
        options:'',
        token : this.$store.state.login.token,
        domainUrl:this.$conf.domain,

        fileList:[],
        imgList:'',
        codeText:'',
        capture:'camera',
        

      }
    },
    created() {
      this.options = this.$route.query
      //获取当前页面信息
      if(this.$store.state.index.currentPage.page!=window.location.href){
        this.$store.state.index.currentPage.name = '橡果互动只能验票页'
        this.$store.state.index.currentPage.page = window.location.href
        this.$store.state.index.currentPage.image = '';
      }
    },
    updated() {
      this.token =  this.$store.state.login.token
    },
    mounted(){

    },
    methods: {
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
      },
      //上传
      onUploadImg(e){
        // console.log(e)
        // var that = this;
        // var formData = new FormData();
        // formData.append('Filedata', e.file);
        // console.log(formData)
        // this.$fly.post(`${this.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
        // var srcType = res.data.substring(0,7)
        //   if(srcType=='upload/'){
        //     that.imgList = res.data
        //   }else{
        //     this.$toast('上传失败')
        //     that.fileList.pop()
        //   }
        // }).catch(err => {
        //   this.$toast('上传失败')
        //   that.fileList.pop()
        // })
      },
      //删除图片
      onPhotoDelete(e,item){
         // var that = this;
         // that.imgList = ''
      },
      onSubmit(){
        if(this.fileList.length==0){
          this.$toast('请先选择图片')
          return
        }
        var data = {}
        data = Util.paraAddKey(data,this.$store.state.login.username,this.$store.state.login.password);
        var formData = new FormData();
        formData.append('Filedata', this.fileList[0].file);
        formData.append('api_time_sys', data.api_time_sys);
        formData.append('api_user', data.api_user);
        formData.append('key', data.key);
        if(this.token!=1){
          this.$toast('请先登录');
        }else{
          this.$fly.post(`${this.domainUrl}/sysapi/travel/ticketcheck/`,formData).then(res => {
            this.codeText = res.data.mess
            this.fileList = []
            console.log(res)
          // var srcType = res.data.substring(0,7)
            // if(srcType=='upload/'){
            //   that.imgList = res.data
            // }else{
            //   this.$toast('上传失败')
            //   that.fileList.pop()
            // }
          }).catch(err => {
            this.$toast('上传失败')
            // that.fileList.pop()
          })

        }

      },
    },

  }


</script>

<style scoped="scoped" src="../../css/userCode.css">
  /* @import url("../../css/description_edit.css"); */
</style>
