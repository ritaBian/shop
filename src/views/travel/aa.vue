<template>
  <div class=''>
    <!-- <div class='tabs-wrapper' ref='tabsWrapper'>
      <ul class="border" ref='tab'>
        <li v-for='(item, index) in tabs' :key='index'>
          <div class='tab-item'>
            <div class='expand-block'>
              {{item.name||'无'}}
            </div>
          </div>
        </li>
        <div>123123</div>
      </ul>
    </div> -->

    <!-- <appWaterfall module='' ></appWaterfall> -->
    <!-- <vshare :vshareConfig="vshareConfig"></vshare> -->

      <button @click="call()">通用分享</button>
      <button @click="call('wechatFriend')">微信好友</button>
      <button @click="call('wechatTimeline')">朋友圈</button>
      <button @click="call('qqFriend')">QQ</button>
      <button @click="call('qZone')">QQ空间</button>
      <button @click="call('weibo')">微博</button>
      
      
  </div>
</template>

<script>
  import NativeShare from '../../../NativeShare.js'
  var nativeShare = new NativeShare()
  var shareData = {
      title: 'NativeShare',
      desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
      // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
      link: 'https://github.com/fa-ge/NativeShare',
      icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
      // 不要过于依赖以下两个回调，很多浏览器是不支持的
      success: function() {
          alert('success')
      },
      fail: function() {
          alert('fail')
      }
  }
  var wxConfig = {
    wechatConfig: {
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: '',
        },
  }
  export default {
    props: {
      data: Array,
    },
    data() {
      return {
        vshareConfig: {
          shareList: [
            'qzone',
            'sqq',
            'weixin',
            'copy'

          ],
          common:{
            bdText:'哈喽',
            bdUrl:'aaaa',
            bdPic:'https://img.yzcdn.cn/vant/cat.jpeg'
          },
          share : [{
            //此处放置分享按钮设置
            bdSize	:32
            }
          ],
          slide : false,
          image : {
            //此处放置图片分享设置
            // {
              viewType:'list',
              viewList:['weixin','qzone','sqq','copy'],
              viewColor:'black',
            // },

          },
          selectShare : [
            //此处放置划词分享设置
          ]
        },
      }
    },
    created() {
      // 你也可以在setConfig方法中设置配置参数
      nativeShare.setConfig(wxConfig)
      nativeShare.setShareData(shareData)
    },
    mounted() {
      this.$nextTick(() => {
        // this.tabs = this.data
        // this._initMenu()
      })
    },
    methods: {
      call(command) {
          try {
              nativeShare.call(command)
          } catch (err) {
              // 如果不支持，你可以在这里做降级处理
              alert(err.message)
          }
      },
      setTitle(title) {
          nativeShare.setShareData({
              title: title,
          })
      },
      _initMenu() {
        const tabsWidth = this.tabWidth
        const width = this.tabs.length * tabsWidth
        this.$refs.tab.style.width = `${width}px`
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.tabsWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical',
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
    },
  }
</script>

<style scoped>
  .move-tabs {
    position: relative;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .tabs-wrapper {
    height: 120px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
  }
  .tab-item {
    float: left;
    width: 280px;
    height: 120px;
    padding: 10px;
    margin-right: 20px;
    background: #f5f5;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  .expand-block {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
  }
</style>
