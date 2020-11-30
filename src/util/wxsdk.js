// import axios from 'axios'
import store from '@/vuex/store.js'
import wx from 'weixin-js-sdk'
import {Toast} from 'vant';

export default  {


	wxConfig (){
    wx.config({
      debug: false,
      appId: store.state.index.appId, // 必填，公众号的唯一标识
      timestamp: store.state.index.timestamp, // 必填，生成签名的时间戳，精确到秒
      nonceStr: store.state.index.nonceStr, // 必填，生成签名的随机串
      signature: store.state.index.signature, // 必填，签名
      jsApiList: ['updateAppMessageShareData','updateTimelineShareData']
    })

    wx.ready(function(){
      // config信息验证后会执行ready方法
      var url = store.state.index.currentPage.page
      var index = url.indexOf('?')
      // var aa = url.replace('#/', '&u='+store.state.login.username)
      url = index==-1?url+'?u='+store.state.login.username:url+'&u='+store.state.login.username
      var desc = store.state.index.currentPage.desc==''||store.state.index.currentPage.desc==undefined?store.state.index.currentPage.name:store.state.index.currentPage.desc
      var image = store.state.index.currentPage.image==''||store.state.index.currentPage.image==undefined?'http://m.huiup.com/upload/logo.png':store.state.index.currentPage.image
      // Toast(desc);
      wx.updateAppMessageShareData({
          title: store.state.index.currentPage.name, // 分享标题
          desc: desc, // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: image, // 分享图标
          success: function (ress) {
            console.log('设置成功',ress)
            // 设置成功
          },
          fail:function(err){
          }
      })
      wx.updateTimelineShareData({
          title: store.state.index.currentPage.name, // 分享标题
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: image, // 分享图标
          success: function (ress) {
            console.log('设置成功',ress)
            // 设置成功
          },
          fail:function(err){
          }
        })

      // wx.chooseImage({
      //   count: 9, // 默认9
      //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function (res) {
      //   var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //   }
      // });

    });
    wx.error(function(res){
      console.log('微信授权失败',res)
    });


	},


}
