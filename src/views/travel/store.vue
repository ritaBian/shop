<template>
  <div class="body">
    <van-nav-bar title="店铺详情" left-arrow  @click-left="onBack" />
      <div class="page_body">
        <van-image class="storeLogo"  :src="data.pic" fit="cover" @click="onImagePreview(data.pic)" />
        <div class="storeName">{{data.name}}</div>
        <div class="storeService" @click="onClickIm">
          <van-icon name="chat-o" color="#01A862" size="1.1rem" />
          <div class="storeService_text">客服</div>
        </div>

        <div class="division_line"></div>


        <div class="find_title">
          <div class="find_title_icon">
            <van-icon name="bag" color="#FFFFFF" />
          </div>
          <div>全部商品</div>
        </div>


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



      </div>
  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  import { ImagePreview } from 'vant';
  export default {

    name:'store',
    data() {
      return {
        domainUrl:this.$conf.domain,
        pageDetail:'',
        allTag:this.$store.state.index.allTag,
        data:'',

        value: '',
        options:'',

        loading: false,
        finished: false,
        offset:100,
        page_index:1,
        pageList:[],

      }
    },
    created() {
      this.options = this.$route.query
      console.log(this.options)

      this.pageList = []
      this.page_index = 1
      //商家数据
      this.shopData();
      //获取数据
      this.onShows();
    },
    updated() {
      this.allTag = this.$store.state.index.allTag
    },
    mounted(){

    },
    activated(){
      this.shopData_data()
    },
    methods: {
      //图片
      onImagePreview(item){
        console.log(item)
        var that = this;
        ImagePreview({
          images: [item],
        });
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
           user_id:that.options.id,
        }
        that.$dopost('/sysapi/travel/list/', data,function (res) {
          console.log('列表',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            if(res.data.data.data.length == 0){
              that.finished = true
            }
            this.pageDetail = res.data.data
            that.loading = false;
            that.page_index = that.page_index + 1
            that.pageList = that.pageList.concat(res.data.data.data);

        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      //商家详情
      shopData(){
        var that = this;
        var data = {
          id:that.options.id
        }
        that.$dopost('/sysapi/travel/user/', data,function (res) {
          console.log('商家数据11',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            this.data = res.data.data.user
            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = '橡果互动店铺详情页'
              this.$store.state.index.currentPage.page = window.location.href
              this.$store.state.index.currentPage.image = this.data.pic==''?this.$conf.defaultPicture:this.data.pic
            }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      //商家详情..
      shopData_data(){
        var that = this;
        var data = {
          id:that.options.id
        }
        that.$dopost('/sysapi/travel/user/', data,function (res) {
          console.log('商家数据22',res)
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
            //获取当前页面信息
            if(this.$store.state.index.currentPage.page!=window.location.href){
              this.$store.state.index.currentPage.name = '橡果互动店铺详情页'
              this.$store.state.index.currentPage.page = window.location.href
              this.$store.state.index.currentPage.image = this.data.pic==''?this.$conf.defaultPicture:this.data.pic
            }
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));
      },
      // 客服
      onClickIm(){
        this.$router.push({
        	path: '/im',
           query: {
        	   id: String(this.options.id),
        	}
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
      onBack(){
         if (window.history.length <= 1) {
             this.$router.push({path:'/'})
             return false
         } else {
             this.$router.go(-1)
         }
      }

    },

  }


</script>

<style scoped="scoped">
  /* @import url("../../css/circuit_search.css"); */
  ::-webkit-scrollbar {
    width: 0;
  }
  .body{
  }
  .page_body{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 4rem;
  }
  .body /deep/ .van-nav-bar .van-icon{
    color: #0A0A0A !important;
  }
  .body /deep/ .van-nav-bar__arrow{
    font-size:1.09rem;
    font-weight: bold;
  }
  .body /deep/ .van-nav-bar__title{
    color: #585858;
    font-size: 1.06rem;
  }
  .storeLogo{
    width: 4.6rem;
    height: 4.6rem;
    margin-top: 1rem;
    border-radius: 0.3rem;
    overflow: hidden;
  }
  .storeName{
    width: 90%;
    display: flex;
    font-size: 1.24rem;
    color: #333333;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin-top: 0.3rem;
  }
  .storeService{
    padding: 0.3rem 1rem;
    border: 0.06rem solid #01A862;
    border-radius: 0.2rem;
    font-size: 0.86rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.9rem;
    color: #01A862;
  }
  .storeService_text{
    margin-left: 0.3rem;
  }
  .division_line{
    width: 100%;
    height: 0.8rem;
    background-color: #F5F5F5;
    margin-top: 3rem;
  }
  .find_title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.06rem;
    color: #01A862;
    margin-top: 0.7rem;
  }
  .find_title_icon{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: #01A862;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0.08rem;
    box-sizing: border-box;
    margin-right: 0.6rem;
    font-size: 0.94rem;
  }

  .list_once_border{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.6rem;
  }
  .list_once{
    width: 93.4%;
    background-color: #FFFFFF;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.2rem 0.14rem rgba(0,0,0,0.06);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.4rem 0;
  }
  .list_once_img{
    width: 100%;
    height: 12.38rem;
  }
  .list_title{
    width: 94.44%;
    font-size: 1rem;
    margin-top: 0.84rem;
    font-weight:400;
    color:#242424;
    line-height:1.5rem;
  }
  .list_tag{
    width: 94.44%;
    display: flex;
    font-size: 0.69rem;
    align-items: center;
    margin-top: 0.48rem;
    color: #585858;
  }
  .list_tag_line{
    width: 0.06rem;
    height: 0.69rem;
    background-color: #585858;
    margin: 0 0.3rem;
  }
  .list_label{
    width: 95.4%;
    display: flex;
    font-size: 0.69rem;
    color: #00A0E9;
    align-items: center;

  }
  .list_label_once{
    margin-right: 0.26rem;
    margin-top: 0.48rem;
  }
  .list_label /deep/ .van-tag{
    padding: .1em .3em;
  }
  .list_bottom_border{
    width: 94%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 0.3rem;
    margin-bottom: 0.9rem;
  }
  .list_bottom_left{
    display: flex;
    align-items: center;
    font-size: 0.69rem;
    color: #585858;
  }
  .list_bottom_right{
    display: flex;
    align-items: flex-end;
  }
  .list_money{
    font-size: 0.63rem;
    color: #FF6600;
  }
  .list_money2{
    font-size: 1.13rem;
    color: #FF6600;
    font-weight: bold;
    margin-right: 0.28rem;
    margin-bottom: -0.25rem;
  }
  .list_money3{
    font-size: 0.69rem;
    color: #666666;
    margin-right: 0.08rem;
    margin-bottom: -0.08rem;
  }



</style>
