<template>
  <div class="">
    <!-- <img class="house_swiper_delete " v-if="houseBoolean" src="../../../static/shop_detail/delete.png"> -->
    <!-- 评价列表 -->

    <!-- 分享蒙层 -->
    <van-popup class="share_mask" v-model="shareShow" position="bottom" @close="onMask" :style="{ height: '34.03%' }">
      <div class="share_mask_title ">分享至</div>
      <div class="share_mask_content">
        <div class="share_mask_content_once " @click="call('wechatFriend')">
          <img class="share_mask_content_once_img" :src="shareList[0].img" >
          <div class="share_mask_content_once_name">{{shareList[0].name}}</div>
        </div>
        <div class="share_mask_content_once " @click="call('wechatTimeline')">
          <img class="share_mask_content_once_img" :src="shareList[1].img" >
          <div class="share_mask_content_once_name">{{shareList[1].name}}</div>
        </div>
        <div class="share_mask_content_once " @click="call('qqFriend')">
          <img class="share_mask_content_once_img" :src="shareList[2].img" >
          <div class="share_mask_content_once_name">{{shareList[2].name}}</div>
        </div>
        <div class="share_mask_content_once " @click="call('qZone')">
          <img class="share_mask_content_once_img" :src="shareList[3].img" >
          <div class="share_mask_content_once_name">{{shareList[3].name}}</div>
        </div>
        <div class="share_mask_content_once "  @click="onCopy">
          <img class="share_mask_content_once_img" :src="shareList[4].img" >
          <div class="share_mask_content_once_name">{{shareList[4].name}}</div>
        </div>
      </div>
      <div class="share_mask_delete" @click="onMask">取消</div>
    </van-popup>


  </div>
</template>
<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  // import NativeShare from '../../../NativeShare.js'
  // // import NativeShare from '../../NativeShare.js'
  // var nativeShare = new NativeShare()
  // var shareData = {
  //     title: '123',
  //     desc: '内容',
  //     // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
  //     link: 'https://github.com/fa-ge/NativeShare',
  //     icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
  //     // 不要过于依赖以下两个回调，很多浏览器是不支持的
  //     success: function() {
  //         alert('success')
  //     },
  //     fail: function() {
  //         alert('fail')
  //     }
  // }

  export default {
    name: "app_share",
    //属性
    props: {


    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        shareShow:true,
        shareList:[
          {
            img:require('../../../static/share/1.png'),
            name:'微信好友',
          },
          {
            img:require('../../../static/share/2.png'),
            name:'微信朋友圈',
          },
          {
            img:require('../../../static/share/3.png'),
            name:'QQ',
          },
          {
            img:require('../../../static/share/4.png'),
            name:'QQ空间',
          },
          {
            img:require('../../../static/share/5.png'),
            name:'复制',
          }
        ],
        shareData : {
            title: this.$store.state.index.currentPage.name,
            desc: this.$store.state.index.currentPage.desc,
            // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
            // link:'http://xgxs.huiup.com',
            link: window.location.href+'&u='+this.$store.state.login.username,
            icon: this.$store.state.index.currentPage.image,
         }

      }
    },  
    created() {
      // var that = this;
      // var url = window.location.href
      // var index = url.indexOf('?')
      // url = index==-1?url+'?u='+this.$store.state.login.username:url+'&u='+this.$store.state.login.username
      //  this.$dopost('/sysapi/travel/jsshare/',{url:url},function (res) {
      //  	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
      //       console.log('分享参数',res)
      //       var data = res.data.data
      //       var wxConfig = {
      //         wechatConfig: {
      //               appId: data.appId,
      //               timestamp: data.timestamp,
      //               nonceStr: data.nonceStr,
      //               signature: data.signature,
      //           },
      //       }
      //       nativeShare.setConfig(wxConfig)
      //       nativeShare.setShareData(this.shareData)

      //  	}else{
      //      Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
      //    }
      //  }.bind(this));



    },
    methods: {
      call(command) {
        console.log('最开始的。。')
          try {
            console.log('最开始的正确的11。。')
              nativeShare.call(command)
          } catch (err) {
            console.log('最开始的错误的。。')
              // 如果不支持，你可以在这里做降级处理
              alert(err.message)
          }
      },
      onCopy(){
        let message = '拷贝的文本';
        this.$copyText(message).then(res => {
          this.onMask()
          this.$toast('内容已复制到剪切板！')
        }).catch(err => {
          this.onMask()
          this.$toast('复制失败，稍后再试')
        })
      },
      onError(){
        this.$message.success("内容已复制到剪切板！")
      },
      onMask(){
        // this.shareShow = false
        this.$emit('onMask',false)
      }
    },

  }


</script>

<style scoped="scoped">
  .share_mask{
    background-color: #F7F7F7;
    color: #595959;
  }
  .share_mask_title{
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 0.94rem;
    margin-top: 1.22rem;
  }
  .share_mask_content{
    width: 96%;
    margin: 0 auto;
    margin-top: 1.97rem;
    display: flex;
    justify-content: space-between;
  }
  .share_mask_content_once{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .share_mask_content_once_img{
    width: 2.63rem;
    height: 2.63rem;
  }
  .share_mask_content_once_name{
    font-size: 0.7rem;
    margin-top: 0.6rem;
  }
  .share_mask_delete{
    width: 100%;
    height: 3.03rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
