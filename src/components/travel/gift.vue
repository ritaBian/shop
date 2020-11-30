<template>
  <div class="">

    <!-- 分享蒙层 -->
    <!-- :style="{ height: '34.03%' }" -->
    <van-popup class="share_mask" v-model="giftShow" position="bottom" @close="onMask" >
      <div class="gift_border ">
        <!-- giftValue -->
        <div :class="['gift_once',giftValue.id==item.id?'gift_once_border2':'gift_once_border1']" v-for="(item,index) of giftList" :key="index" @click="onClickGift(item)">
          <van-icon v-if="giftValue.id==item.id" class="gift_click" name="checked" color="#1AAC1B" />
          <van-image class="gift_img"  :src="domainUrl+'/'+item.pic"/>
          <div class="gift_title">{{item.name}}</div>
          <div class="gift_num">{{item.like}}赞</div>
        </div>
      </div>
      <div class="gift_payfor" @click="onSubmit">微信支付</div>


    </van-popup>


  </div>
</template>
<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    name: "app_gift",
    //属性
    props: {
      bounty:{
      	type: null,//属性类型
      	value: ""
      },
      module:{
      	type: null,//属性类型
      	value: ""
      },
      userid:{
      	type: null,//属性类型
      	value: ""
      },

    },
    data() {
      return {
        domainUrl:this.$conf.domain,
        giftShow:true,
        giftList:[],
        giftValue:'',

      }
    },

    created() {
      // this.onShows()
      this.onInitData()
    },
    methods: {
      onClickGift(item){
        this.giftValue = item
      },
      onMask(){
        var that = this;
        that.$emit('onMask','1')
      },
      onInitData(){
        var that = this;
        that.giftList = []
        var list = that.bounty
        for(var i in list){
          that.giftList.push(list[i])
        }
      },
      onSubmit(){
        var that = this;
        if(that.giftValue==''){
          this.$toast('请先选择礼物')
          return
        }
        var data = {
         id:that.userid,
         module:that.module,
         type:that.giftValue.id
        }
        this.$dopost('/sysapi/pay/bounty/', data,function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              window.location.href = '/pay/js/id/'+res.data.data.id+''
        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this),true);
      },

    },

  }


</script>

<style scoped="scoped">
  .share_mask{
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .gift_border{
    width: 94%;
    display: flex;
    flex-wrap: wrap;
    /* margin-top: 1rem; */
  }
  .gift_once{
    width: 31.3%;
    margin: 0.2rem 1%;
    /* height: 7rem; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #303030;
    padding: 0.8rem 0 0.7rem;
    border-radius: 0.06rem;
    position: relative;
  }
  .gift_once_border1{
    border: 0.06rem solid #d9d9d9;
  }
  .gift_once_border2{
    border: 0.06rem solid #1AAC1B;
  }
  .gift_click{
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 1.3rem;
  }
  .gift_img{
    width: 2.7rem;
    height: 2.7rem;
  }
  .gift_title{
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
  .gift_num{
    font-size: 0.7rem;
    color: #BC6C7A;
    margin-top: 0.06rem;
  }
  .gift_payfor{
    width: 80%;
    padding: 0.7rem 0;
    color: #FFFFFF;
    background-color: #1AAC1B;
    font-size: 1rem;
    margin-top: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3rem;
  }

</style>
