<template>
  <div class="evaluate_view">
    <!-- <img class="house_swiper_delete " v-if="houseBoolean" src="../../../static/shop_detail/delete.png"> -->
    <!-- 评价列表 -->
    <div class="whiteList_title" style="margin-top: 0.25rem;">评价列表</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadDown"
      class="vant_list_view"
      :offset="offset"
      :immediate-check="false"
      >
      <div class="whiteList2 ">
        <div class="evaluate" v-for="(item,index) of evaluateList" :key="index">
          <van-image class="evaluate_face" fit="cover" :src="user_face(item.USER_ID_PIC)" />
          <div class="evaluate_right ">
            <div class="evaluate_nickname">{{item.USER_ID_NAME}}</div>
            <div class="evaluate_rate">
              <!-- rateModule[index] -->
              <van-rate v-model="rateModule[index]" v-if="item.POINT!=0" readonly gutter="0.15rem" size="1.2rem" color="#FFC900" />
              <div class="evaluate_rate_text" v-if="item.POINT!=0">{{Number(item.POINT)}}分</div>
            </div>
            <!-- | {{item.target.name}} -->
            <div class="evaluate_time">{{item.ADD_TIME}}发表  </div>
            <div :class="['evaluate_content',height_evaluate[index]>134?'content_detail_line':'']" ref="evaluate">{{item.CONTENT}}</div>
            <div class="evaluate_expansion" v-if="height_evaluate[index]>134" @click="onHeightEvaluate(index)">
              <div style="margin-right: 0.38rem;">展开</div>
              <van-icon  name="arrow-down" color="#3A99E5" size="0.59rem" />
            </div>
            <div class="evaluate_smallimg_border" v-if="item.PIC2!=''">
              <van-image class="evaluate_smallimg" v-if="item.PIC1!=''" fit="cover" :src="domainUrl+'/'+item.PIC1" @click="onImagePreview2(item.PIC1)"/>
              <van-image class="evaluate_smallimg" v-if="item.PIC2!=''" fit="cover" :src="domainUrl+'/'+item.PIC2" @click="onImagePreview2(item.PIC2)"/>
              <van-image class="evaluate_smallimg" v-if="item.PIC3!=''" fit="cover" :src="domainUrl+'/'+item.PIC3" @click="onImagePreview2(item.PIC3)"/>
              <van-image class="evaluate_smallimg" v-if="item.PIC4!=''" fit="cover" :src="domainUrl+'/'+item.PIC4" @click="onImagePreview2(item.PIC4)"/>
              <van-image class="evaluate_smallimg" v-if="item.PIC5!=''" fit="cover" :src="domainUrl+'/'+item.PIC5" @click="onImagePreview2(item.PIC5)"/>
            </div>
            <van-image class="evaluate_img" v-if="item.PIC2==''&&item.PIC1!=''" fit="cover" :src="domainUrl+'/'+item.PIC1" @click="onImagePreview2(item.PIC1)"/>

            <div class="evaluate_shopMaster " v-for="(reply,indexs) of item.REPLY" :key="indexs">
              <div class="evaluate_shopMaster_icon"></div>

              <van-image class="evaluate_user_img"  fit="cover" :src="user_face(reply.USER_ID_PIC)" />

              <span style="font-weight: bold;">{{reply.USER_ID_NAME}} 回复：</span>{{reply.CONTENT}}
              <div class="reply_view_rate">
                <div class="reply_view_rate_border" v-if="reply.POINT!=0">
                  <van-icon name="star" size="0.9rem" style="margin-right: 0.1rem;" v-for="(item,index) of Number(reply.POINT)" :key="index" color="#FFC900"/>
                  <van-icon name="star-o" size="0.9rem" style="margin-right: 0.1rem;" v-for="(item,index) of 5-Number(reply.POINT)" :key="index" color="#999999"/>
                </div>
                <!-- <van-rate :v-model="reply.POINT" size="0.9rem" color="#FFC900" /> -->
                <div style="margin-left: 0.3rem" v-if="reply.POINT!=0">{{Number(reply.POINT)}}分</div>
              </div>
              <div class="reply_view ">
                <van-image class="reply_view_img" v-if="reply.PIC1!=''" fit="cover" :src="domainUrl+'/'+reply.PIC1" @click="onImagePreview2(reply.PIC1)"/>
                <van-image class="reply_view_img" v-if="reply.PIC2!=''" fit="cover" :src="domainUrl+'/'+reply.PIC2" @click="onImagePreview2(reply.PIC2)"/>
                <van-image class="reply_view_img" v-if="reply.PIC3!=''" fit="cover" :src="domainUrl+'/'+reply.PIC3" @click="onImagePreview2(reply.PIC3)"/>
                <van-image class="reply_view_img" v-if="reply.PIC4!=''" fit="cover" :src="domainUrl+'/'+reply.PIC4" @click="onImagePreview2(reply.PIC4)"/>
                <van-image class="reply_view_img" v-if="reply.PIC5!=''" fit="cover" :src="domainUrl+'/'+reply.PIC5" @click="onImagePreview2(reply.PIC5)"/>
              </div>
            </div>

            <!-- 点赞 -->
            <div class="evaluate_like " >
              <div class="evaluate_replay" @click="onReplyShow(item,index)">
                <van-icon name="chat-o" size="1.2rem" color="#01A862" />
                <div style="margin-left: 0.2rem;">回复</div>
              </div>
              <div class="evaluate_like_img_border" v-if="item.LIKED==0" @click="onLike(item,1,index)">
                <img class="evaluate_like_img" :src="require('../../../static/icon/like.png')">
                <div v-if="item.LIKED_COUNT!=0">{{item.LIKED_COUNT}}</div>
              </div>
              <div class="evaluate_like_img_border2" v-if="item.LIKED==1" @click="onLike(item,2,index)">
                <img class="evaluate_like_img" :src="require('../../../static/icon/like3.png')">
                <div>{{item.LIKED_COUNT}}</div>
              </div>
            </div>
            <!-- <div class="evaluate_like2" v-if="item.LIKED==1" @click="onLike(item,2,index)">
              <img class="evaluate_like_img" src="../../../static/icon/like3.png">
              <div>{{item.LIKED_COUNT}}</div>
            </div> -->
          </div>
        </div>
      </div>
    </van-list>

    <div class="evaluate_push" v-if="commentShow">
      <div class="evaluate_push_button" @click="onEvaluatePush">发表评论</div>
    </div>

    <!-- 评论弹窗 -->
    <van-popup class="reply_white" v-model="evaluatePushShow" position="center" closeable>
      <div class="reply_text_border">
        <textarea class="reply_textarea " v-model="replyValue" placeholder="请输入评论"></textarea>
        <div class="reply_num ">500/500字</div>
      </div>
      <div class="reply_uploader_rate">
        <div style="margin-right: 3.2rem;">评分</div>
        <van-rate v-model="reply_rate" size="1rem" color="#FFC900" />
        <div style="margin-left: 0.6rem;">{{reply_rate}}星</div>
      </div>

      <div class="reply_uploader_title">上传图片</div>
      <van-uploader class="reply_uploader" v-model="fileList" :multiple="true"  max-count="5"  :after-read="replyUpload"  @delete="onPhotoDelete"/>

      <div class="reply_button" @click="onPushCommon">发表</div>
    </van-popup>


    <!-- 回复弹窗 -->
    <van-popup class="reply_white" v-model="evaluateShow" position="center" closeable>
      <div class="reply_text_border">
        <textarea class="reply_textarea " v-model="replyValue" placeholder="请输入评论"></textarea>
        <div class="reply_num ">500/500字</div>
      </div>
      <div class="reply_uploader_rate">
        <div style="margin-right: 2.6rem;">回复评分</div>
        <van-rate v-model="reply_rate" size="1rem" color="#FFC900" />
        <div style="margin-left: 0.6rem;">{{reply_rate}}星</div>
      </div>

      <div class="reply_uploader_title">上传图片</div>
      <van-uploader class="reply_uploader" v-model="fileList" :multiple="true" max-count="5"  :after-read="replyUpload" @delete="onPhotoDelete"/>

      <div class="reply_button" @click="onReplyCommon">回复</div>
    </van-popup>


  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  import { ImagePreview } from 'vant';
  export default {
    name: "evaluate_list",
    //属性
    props: {
      module: {
      	type: null,//属性类型
      	value: "",
        default: '',
      },
      pageid:{
        type: null,//属性类型
        value: "",
        default: '',
      },
      commentShow:{
        type: null,//属性类型
        value: '',
        default: true
      }

    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        mapUrl:'',

        height_evaluate:[],
        evaluateRate:'',

        tabbarLikeBoolean:false,
        tabbarLike:0,

        loading:false,
        finished:false,
        offset:100,
        evaluateList:[],
        page_index:1,

        evaluateShow:false,
        fileList:[],
        imageList:[],
        replyValue:'',
        replyId:'',
        reply_rate:3,
        replay_index:0,
        evaluatePushShow:false,

      }
    },
    computed:{
      rateModule:function(){
        var that = this;
        var list = []
          this.evaluateList.map((item,index) => {
            list.push(Number(item.POINT))
          })
          return list
      },
      user_face:function(){
         return function(url){
            var index = url.indexOf("://")
            if(index==-1){
               return this.domainUrl + '/' + url
            }else{
               return url
            }
         }
      }
    },
    created() {
      this.evaluateList = []
      this.page_index = 1
      // 评价列表
      this.talkData(this.pageid);

    },
    mounted(){
      var that = this;
      this.$nextTick(()=>{ // 页面渲染完成后的回调
        setTimeout(function() {
          //文章高度
          that.onTextDiv()
        }, 500);
      })
    },
    methods: {
      //选择图片
      onImagePreview2(item){
        var that = this;
        var pic =  that.domainUrl + '/' + item
        ImagePreview({
          images: [pic],
        });
      },
      onTextDiv(){
        var that = this;
        this.evaluateList.map((item,index) => {
          that.height_evaluate[index] = JSON.parse(JSON.stringify(that.$refs.evaluate[index].offsetHeight));
          if(index == this.evaluateList.length-1){
            that.height_evaluate = JSON.parse(JSON.stringify(that.height_evaluate));
          }
        })
      },
      // 上传图片
      replyUpload(e){
        var that = this;
        var formData = new FormData();
        if(Array.isArray(e)){
          e.map((item,index) => {
            formData.append('Filedata', e[index].file);
            this.$fly.post(`${this.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
            var srcType = res.data.substring(0,7)
              if(srcType=='upload/'){
                this.imageList.push(res.data)
              }else{
                this.$toast('上传失败')
                that.fileList.splice(index,1);
              }
            }).catch(err => {
              this.$toast('上传失败')
              that.fileList.splice(index,1);
            })
          })
        }else{
          formData.append('Filedata', e.file);
          this.$fly.post(`${this.domainUrl}/system/upload/file?pic_type=999999999`,formData).then(res => {
          var srcType = res.data.substring(0,7)
            if(srcType=='upload/'){
              this.imageList.push(res.data)
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
        this.imageList.splice(item.index, 1)
      },
      //点击回复
      onReplyShow(item,index){
        this.fileList = []
        this.imageList = []
        this.replyValue = '',
        this.evaluateShow = true
        console.log(item)
        this.replyId = item.ID
        this.replay_index = index

      },
      // 回复
      onReplyCommon(){
        var that = this;
        var token = this.$store.state.login.token
        if(token!=1){
          this.$toast('请先登录');
        }else{
          var data = {
           to_id:this.replyId,
           module:100,
           pic1:this.imageList[0]==undefined?'':this.imageList[0],
           pic2:this.imageList[1]==undefined?'':this.imageList[1],
           pic3:this.imageList[2]==undefined?'':this.imageList[2],
           pic4:this.imageList[3]==undefined?'':this.imageList[3],
           pic5:this.imageList[4]==undefined?'':this.imageList[4],
           mess:this.replyValue,
           point:this.reply_rate,
          }
          this.$dopost('/sysapi/comment/send/',data,function (res) {
            console.log(that.$store.state.detail.user)
            console.log('评论回复',res,Util.getNull(that.$store.state.detail.user.name))
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.$toast('回复成功');
              var list = {
                ID:res.data.data.id,
                USER_ID_NAME:Util.getNull(that.$store.state.detail.user.name)?that.$store.state.detail.user.name:'',
                USER_ID_PIC:Util.getNull(that.$store.state.detail.user.pic)?that.$store.state.detail.user.pic:'',
                POINT:this.reply_rate,
                ADD_TIME:Util.getTime(),
                CONTENT:this.replyValue,
                PIC1:this.imageList[0]==undefined?'':this.imageList[0],
                PIC2:this.imageList[1]==undefined?'':this.imageList[1],
                PIC3:this.imageList[2]==undefined?'':this.imageList[2],
                PIC4:this.imageList[3]==undefined?'':this.imageList[3],
                PIC5:this.imageList[4]==undefined?'':this.imageList[4],
              }

              this.evaluateList[this.replay_index].REPLY.unshift(list)
              this.evaluateShow = false
              // this.page_index = 1
              // this.talkData()
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },
      //发表评论
      onEvaluatePush(){
        this.fileList = []
        this.imageList = []
        this.replyValue = '',
        this.evaluatePushShow = true
      },
      // 发表评论
      onPushCommon(){
        var that = this;
        var token = this.$store.state.login.token
        if(token!=1){
          this.$toast('请先登录');
        }else{
          var data = {
           to_id:this.pageid,
           module:this.module,
           pic1:this.imageList[0]==undefined?'':this.imageList[0],
           pic2:this.imageList[1]==undefined?'':this.imageList[1],
           pic3:this.imageList[2]==undefined?'':this.imageList[2],
           pic4:this.imageList[3]==undefined?'':this.imageList[3],
           pic5:this.imageList[4]==undefined?'':this.imageList[4],
           mess:this.replyValue,
           point:this.reply_rate,
          }
          // console.log(that.$store.state.detail.user)
          // return
          this.$dopost('/sysapi/comment/send/',data,function (res) {
            console.log('发表评论',res,)
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.$toast('发表成功');
              var list = {
                ID:res.data.data.id,
                USER_ID_NAME:Util.getNull(that.$store.state.detail.user.name)?that.$store.state.detail.user.name:'',
                USER_ID_PIC:Util.getNull(that.$store.state.detail.user.pic)?that.$store.state.detail.user.pic:'',
                POINT:this.reply_rate,
                ADD_TIME:Util.getTime(),
                CONTENT:this.replyValue,
                PIC1:this.imageList[0]==undefined?'':this.imageList[0],
                PIC2:this.imageList[1]==undefined?'':this.imageList[1],
                PIC3:this.imageList[2]==undefined?'':this.imageList[2],
                PIC4:this.imageList[3]==undefined?'':this.imageList[3],
                PIC5:this.imageList[4]==undefined?'':this.imageList[4],
                REPLY:[],
                LIKED:0,
                LIKED_COUNT:0,
              }

              this.evaluateList.unshift(list)
              this.evaluatePushShow = false

            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },
      //滑倒底部
      onLoadDown(){
        console.log('滑倒底部',22222222222)
        this.talkData()
      },

      //评价列表
      talkData(){
        var token = this.$store.state.login.token
        var data = {
         page:this.page_index,
         to_id:25828,//25828 this.pageid
         module:this.module,
        }
        if(token!=1){
          // this.$toast('请先登录');
          this.$dopost('/sysapi/comment/list/',data,function (res) {
            console.log('评论列表',res,)
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.loading = false
              if(res.data.data.length==0){
                this.finished = true
              }
              this.evaluateList = this.evaluateList.concat(res.data.data)
              this.page_index = this.page_index + 1
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this));
        }else{
          this.$dopost('/sysapi/comment/list/',data,function (res) {
            console.log('评论列表',res,)
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.loading = false
              if(res.data.data.length==0){
                this.finished = true
              }
              this.evaluateList = this.evaluateList.concat(res.data.data)
              this.page_index = this.page_index + 1
            }else{
              Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
            }
          }.bind(this),true);
        }
      },
      //点赞
      onLike(item,type,index){
        console.log(item,type,index)
        var id = Number(id)
        var data = {
          id:item.ID,
          type:type
        }
        var token = this.$store.state.login.token
        if(token!=1){
          this.$toast('请先登录');
        }else{
          if(type == 1){
            this.$dopost('/sysapi/comment/like/',data,function (res) {
              console.log('点赞',res)
              if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
                // this.evaluateList[index]
                console.log(this.evaluateList[index])
                this.evaluateList[index].LIKED = 1
                this.evaluateList[index].LIKED_COUNT = Number(this.evaluateList[index].LIKED_COUNT) + 1
              }else{
                Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
              }
            }.bind(this),true);
          }else{
            this.$dopost('/sysapi/comment/like/',data,function (res) {
              console.log('取消点赞',res)
              if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
                // this.evaluateList[index]
                console.log(this.evaluateList[index])
                this.evaluateList[index].LIKED = 0
                this.evaluateList[index].LIKED_COUNT = Number(this.evaluateList[index].LIKED_COUNT) - 1
              }else{
                Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
              }
            }.bind(this),true);
          }
        }

      },
      onHeightEvaluate(index){
        console.log(this.height_evaluate)
        this.height_evaluate[index] = 0;
        this.height_evaluate = JSON.parse(JSON.stringify(this.height_evaluate));
      },



    },

  }


</script>

<style scoped="scoped" src='../../css/evaluate.css'>
  /* @import url("../../css/evaluate.css"); */

</style>
