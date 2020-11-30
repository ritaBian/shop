<template lang="html">

  <div class="pay">
<van-nav-bar
  title="提交订单"
  left-text=""
  left-arrow
  @click-left="$router.go(-1)"
/>
<!-- <van-contact-card
  :type="cardType"
  :name="currentContact.name||''"
  :tel="currentContact.tel||''"
  @click="showList = true"
/> -->

<van-popup v-model="showPay" position="top" style="height:100vh;">
  <!-- <van-nav-bar
    title="支付明细"
    left-text=""
    left-arrow
    @click-left="showPay=false"
  /> -->
  <van-cell-group>
    <van-cell title="用户余额:" :value="$store.state.detail.user.rmb+' 元'" />
    <van-cell title="用户积分:" :value="$store.state.detail.user.point+' 个'"  />
</van-cell-group>
  <van-cell-group>
    <van-field v-model="pay.Money" label="余额支付:" required />
    <van-field v-model="pay.Point" label="积分支付:" required v-if="pay.Point" />
    <van-field v-model="pay.OnLine" label="充值支付:" required v-if="pay.OnLine" />
    <footer class="pay-footer" ontouchstrat="" @click="ToPay">
      <span>支 付</span>
    </footer>
  </van-cell-group>
</van-popup>

<!-- 联系人列表 -->
<!-- <van-popup v-model="showList" position="bottom">
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelect"
  />
</van-popup>
 -->

<!-- 联系人编辑 -->
<!-- <van-popup v-model="showEdit" position="top" style="height:100vh;">
<van-nav-bar fixed
  title="收货信息"
  left-text="返回"
  left-arrow
  @click-left="showEdit=false"
/>
<van-address-edit style="padding-top:50px"
  :area-list="areaList"
  :address-info="addressInfo"
  @delete="onDelete"
  show-set-default
  @save="onSave"
>
<div slot="default">
  <div style="padding-left:18px">地图标注:</div>
  <iframe id="baidumapiframe" :src="'/mobile/map.html?lng='+(addressInfo.lng||0)+'&lat='+(addressInfo.lat||0)" style="width:100%;height:300px;border:0px;" allowtransparency="true"></iframe>
</div>
</van-address-edit> -->

</van-popup>

    <div class="pay-product">
      <ul v-if="!confirm">
        <li v-for="k in carList">
          <a>
            <img :src="k.imgPath" alt="">
            <div>
              <h2>{{k.title}}</h2>
              <h2><span style="color:#ee7150"> {{k.type.NAME}} </span></h2>
              <p>{{k.type.PRICE}} <span v-if="timeList.length>1">x {{timeList.length}}天</span> x {{k.count}} = {{k.type.PRICE * k.count * timeList.length}} 元</p>
              <p>可积分抵扣 {{k.type.HUI_DIAN * k.count }} 元</p>
              <p>运费:{{proYunFei(k.yunfei,chosenAddressId)}} 元</p>
              <p>预定时间:{{String(timeList)}}</p>

              <p v-if="k.promotion && k.promotion.length>0">
                  <select v-model="k.promotion_id" @change="SetSelectedPromotion">
                  <option v-for="option in k.promotion" v-bind:value="option['ID']" >
                      {{ option['NAME'] }}
                  </option>
                  <option value="0" selected>不使用优惠</option>
                  </select>
              </p>

              <van-stepper style="margin-top: 0.6rem;" v-if="options.type!=2" v-model="k.count" theme="round" button-size="1.8rem" />


            </div>
          </a>
        </li>
      </ul>

      <!-- 支付成功后的提示 -->
      <div class="pay-confirm" v-else>
        操作完成
      </div>
    </div>




    <h2 class="pay-allpay">共需支付: <i>￥</i><span>{{allpay}}</span></h2>
    <h2 class="pay-allpay">用户余额: <i>￥{{user_price}}</i><span> 用户积分:{{user_point}}</span></h2>

    <div style="height:15vh;"></div>
    <footer class="pay-footer" ontouchstrat="" @click="payConfirm">
      <span>提交订单</span>
    </footer>

<!-- const product = [{
        title:this.productDatasView.NAME,
        price:this.productDatasView.PRICE,
        id:this.productDatasView.ID,
        count:1,
        promotion:this.$store.state.detail.proData.PROMOTION,
        yunfei:this.$store.state.detail.proData.YUN_FEI,
        type:JSON.parse(JSON.stringify(typeId)),
        imgPath:this.$conf.domain + '/' + this.$store.state.detail.proData.PRO.PIC,
        choseBool:true
      }]; -->

<!-- <v-prolist ></v-prolist> -->
  </div>
</template>

<script>
import Util from '../../util/common'
import { Toast } from 'vant'
import Header from '@/common/_header.vue'
import { Cell, CellGroup,ContactCard, ContactList,Popup,AddressList,AddressEdit,Field,NavBar,Button } from 'vant';

import 'vant/lib/index.css';
import {MessageBox} from 'mint-ui';

import prolist from '@/components/car/prolist2.vue'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ContactCard.name]: ContactCard,
    [ContactList.name]: ContactList,
    [AddressEdit.name]:AddressEdit,
    [Popup.name]:Popup,
    [AddressList.name]:AddressList,
    [Field.name]:Field,
    [NavBar.name]:NavBar,
    [Button.name]:Button,
    'v-prolist':prolist,

  },
  watch:{
    orderApi:function (val)
    {
      this.pay.Money=Util.Jia(this.orderApi.order.rmb,0);
      this.pay.Point=Util.Jia(this.orderApi.order.point,0);

      if(Util.Jia(this.$store.state.detail.user.point,0)<=Util.Jia(this.orderApi.order.point,0))
      {
        this.pay.Point=Util.Jia(this.$store.state.detail.user.point,0);
      }
      else
      {
        this.pay.Point=Util.Jia(this.orderApi.order.point,0);
      }
      //如果余额+积分 低于 支付金额
      if(Util.Jia(this.$store.state.detail.user.rmb,this.pay.Point)<Util.Jia(this.orderApi.order.rmb,0))
      {
        this.pay.Money=Util.Jia(this.$store.state.detail.user.rmb,0);
      }
      else
      {
        this.pay.Money=Util.Jia(this.orderApi.order.rmb,0);
      }

      if(Util.Jia(this.pay.Money,this.pay.Point)<Util.Jia(this.orderApi.order.rmb,0))
      {
        this.pay.OnLine=Util.Jian(Util.Jian(this.orderApi.order.rmb,this.pay.Point),this.pay.Money);
      }

    }
  },
  data() {
    return {
      options:'',
      confirm: '',
      user_price:0,
      user_point:0,

      showList: false,
      showEdit: false,

      showPay:false,
      pay:{Money:0,Point:0,OnLine:0},

      orderApi:null,
      isEdit: false,
      addressInfo:{},
      editIndex:null,

      searchResult: [],
      chosenAddressId: null,
      list: []
    }
  },
  created() {
    this.options = this.$route.query
  },
  mounted() {
        if(this.$store.state.login.token!=1)
        {
          this.$router.push({path:'/login'});
        }
// 防止页面刷新后数据丢失
    if (this.$store.state.index.shopList == '') {
      this.$store.commit('SET_SELECTEDLIST')
    }
            this.$dopost('/sysapi/user/userinfo/', {},
          function (response) {
            if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
            {
              this.confirm = false;
              this.$store.commit('SET_LOADING', true);
              this.$store.state.detail.user=response.data.data;
              this.user_price=response.data.data.rmb;
              this.user_point=response.data.data.point;
            }
            else{this.confirm = false;Toast((response.data && response.data.mess)?response.data.mess:'出错了！');}
           }.bind(this),true);
  },
  computed: {
    //所有商品列表
    carList() {
      return this.$store.state.index.shopList
    },
    timeList(){
      return this.$store.state.index.shopTime
    },

    // 商品价格总和
    allpay() {
      let allpay = 0;
      if(this.$store.state.index.shopList)
      {
        for (let i = 0; i < this.carList.length; i++) {
          allpay=this.$Jia(allpay,this.$Cheng(this.$store.state.index.shopList[i].price*this.timeList.length,this.$store.state.index.shopList[i].count));
          //allpay += this.$store.state.index.shopList[i].price*this.$store.state.index.shopList[i].count;
          allpay=this.$Jia(allpay,this.proYunFei(this.$store.state.index.shopList[i].yunfei,this.chosenAddressId,this.$store.state.index.shopList[i].count));
          //allpay=allpay+this.proYunFei(this.$store.state.index.shopList[i].yunfei,this.chosenAddressId,this.$store.state.index.shopList[i].count);
          allpay=this.$Jia(allpay,this.$store.state.index.shopList[i].promotion_price);
        }
      }

      return allpay.toFixed(2);
    },
    currentContact() {
      const id = this.chosenAddressId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    }
  },
beforeCreate(){
  this.$dopost('/sysapi/address/list/', {},
  function (response) {
  if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
  {
    for (let k = 0; k < response.data.data.length; k++)
    {
      let t=response.data.data[k];
      this.list.push({id:t['ID'],name:t['USER_NAME'],isDefault:t['ISDEFAULT'],area_id:t['QU'],tel:t['USER_TEL'],address:t['ADDRESS'],lng:t['LNG'],lat:t['LAT']});//t['SHENG_NAME']+t['SHI_NAME']+t['QU_NAME']+
      if(t['ISDEFAULT']=="1")this.chosenAddressId=t['ID'];//this.list.length-1;
      //console.log(this.list);
    }

  }
  else{this.confirm = false;Toast((response.data && response.data.mess)?response.data.mess:'出错了！');}
  }.bind(this),true);
  //获取当前页面信息
  if(this.$store.state.index.currentPage.page!=window.location.href){
    this.$store.state.index.currentPage.name = '橡果互动支付页'
    this.$store.state.index.currentPage.page = window.location.href
    this.$store.state.index.currentPage.image = '';
  }
},
  methods: {
    SetSelectedPromotion(){
        if (this.$store.state.index.shopList != "" && this.$store.state.index.shopList.length>0)
        {
            for (let k = 0; k < this.$store.state.index.shopList.length; k++)
            {
              if(this.$store.state.index.shopList[k]['promotion_id']!="0")
              {
                for (let o = 0; o < this.$store.state.index.shopList[k].promotion.length; o++)
                {
                  if(this.$store.state.index.shopList[k]['promotion_id']==this.$store.state.index.shopList[k].promotion[o]['ID'])
                  {
                    this.$store.state.index.shopList[k]['promotion_price']=Number(this.$store.state.index.shopList[k].promotion[o]['V']);
                  }
                }
              }
              else
              {
                this.$store.state.index.shopList[k]['promotion_price']=0;
              }
              this.$set(this.$store.state.index.shopList,k,this.$store.state.index.shopList[k]);
            }
        }
         //this.$store.dispatch('setSelectedList');
    },





proYunFei(fei,chosenAddressId,count){
  // return
  count=parseInt(count);
  let v=fei;
  // let v=fei[0];
  let area_id=this.list.filter(item => item.id === chosenAddressId)[0];
  if(area_id)
  {
    area_id=area_id['area_id'].substr(0,2)+'0000';
    if(fei[area_id] && typeof(fei[area_id]) != "undefined")
    {
      v=fei[area_id];
    }
  }
  let price=this.$Cheng(v['PRICE'],1);
  if(count > parseInt(v['PRICE_COUNT']) && this.$Cheng(v['PRICE_NEXT'],1)>0)
  {
    let chaCount=Math.ceil(this.$Chu(count-parseInt(v['PRICE_COUNT']),v['NEXT_COUNT']));
    chaCount=this.$Cheng(v['chaCount'],v['PRICE_NEXT']);
    price=this.$Jia(price,v['PRICE_NEXT']);
  }
  if(count >= parseInt(v['BAO_YOU_COUNT']))
  {
    price=0;
  }
  return price;
},
onAdd() {
  this.addressInfo={};
  this.editIndex=null;
  this.showEdit=true;
      //Toast('新增收货地址');
    },
onSelect(item,index){
  //console.log(item);console.log(index);
  this.chosenAddressId=item['id'];
  this.$forceUpdate();
  this.showList = false;
},
onEdit(info, index) {console.log(info);
  this.editIndex=index;
  this.addressInfo={'id':info.id,'lng':info.lng,'lat':info.lat,'addressDetail':info.address,'name':info.name,'tel':info.tel,'areaCode':info.area_id,'isDefault':(parseInt(info.isDefault)==1?true:false)};
  this.showEdit=true;
  //this.$forceUpdate();
  //Toast('编辑收货地址:' + index);
},

    // 保存联系人
    // onSave(info) {//alert(window.frames['baidumapiframe'].contentWindow.lng+','+window.frames['baidumapiframe'].contentWindow.lat);
    //   console.log(this.addressInfo);
    //   var obj={'id':info.id||0,'address':info.addressDetail||'','name':info.name||'','tel':info.tel||'','area_id':info.areaCode||'','Isdefault':info.isDefault?1:0};

    //   if(!obj["name"] || !obj["tel"]){Toast("请输入完整收货信息");console.log(obj);return;}
    //   obj["lng"]=window.frames['baidumapiframe'].contentWindow.lng;
    //   obj["lat"]=window.frames['baidumapiframe'].contentWindow.lat;
    //   if(obj["lng"]==0){Toast("请定位收货地址的位置");return;}
    //   this.$dopost('/sysapi/address/add/', obj,
    //   function (res) {
    //   if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
    //   {
    //     if(this.editIndex ==null)
    //     {
    //       this.list.push({id:res.data.data.id,name:info.name,tel:info.tel,area_id:info.areaCode,isDefault:info.isDefault?1:0,address:info.addressDetail});//info.province+info.city+info.county+
    //     }
    //     else
    //     {
    //       this.list[this.editIndex]['name']=info.name;
    //       this.list[this.editIndex]['tel']=info.tel;
    //       this.list[this.editIndex]['area_id']=info.areaCode;
    //       this.list[this.editIndex]['isDefault']=info.isDefault?1:0;
    //       this.list[this.editIndex]['address']=info.addressDetail;//info.province+info.city+info.county+
    //     }

    //     this.chosenAddressId=res.data.data.id;
    //     this.showList=false;
    //     this.showEdit=false;
    //   }
    //   else{Toast((res.data && res.data.mess)?res.data.mess:'出错了！');}
    //   }.bind(this),true);
    //   //
    // },
        // 删除联系人
    // onDelete(info) {
    //   var obj={'id':info.id};
    //   this.$dopost('/sysapi/address/delete/', obj,
    //   function (res) {
    //   if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0 && res.data.data.state=="1")
    //   {
    //     var arr=[];
    //     for (let k = 0; k < this.list.length; k++)
    //     {
    //       let item=this.list[k];
    //       if(item['id']!=info.id)arr.push(item);
    //     }
    //     this.list=arr;
    //     this.showEdit=false;
    //   }
    //   else{Toast((res.data && res.data.mess)?res.data.mess:'出错了！');}
    //   }.bind(this),true);
    // },
    ToPay(val) {
      let obj= {'user_id':this.$store.state.login.username,'api_user':this.$store.state.login.username};
      obj['id']=this.orderApi.order.id;
      obj['PAY_HUI_DIAN']=this.pay.Point || 0;
      obj['PAY_MONEY']=this.pay.Money;
      obj['PAY_CHONG_MONEY']=this.pay.OnLine || 0;

      this.$dopost('/sysapi/order/pay/', obj,function (res) {
      if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
      {
        if(res.data.data && res.data.data['state'])
        {
          if(res.data.data['state']=='ok')
          {
            this.showPay=false;
            Toast('订单支付成功！');
            this.$router.push({path:'/order'});
          }
          if(res.data.data['state']=='ChongZhi')
          {
            this.showPay=false;
            Toast('充值！');

            obj= {'user_id':this.$store.state.login.username,'api_user':this.$store.state.login.username};
            obj['order_id']=this.orderApi.order.id;
            this.$dopost('/pay/order/', obj,
            function (res) {
            if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
            {
              window.location.href= '/pay/js/id/'+res.data.data.id+'';
            }
            else{Toast((res.data && res.data.mess)?res.data.mess:'出错了！');}
            }.bind(this),true);

          }

        }
        else
        {
          Toast('失败。。。');
        }

      }
      else{Toast((res.data && res.data.mess)?res.data.mess:'出错了！');}
      }.bind(this),true);
    },
    payConfirm() {
      console.log(this.carList ,this)
      if (this.carList) { //还未提交了订单,数据还未清空
      //console.log(this.chosenAddressId);
      // if(this.chosenAddressId==null || parseInt(this.chosenAddressId)<=0){
      //   Toast('请选择收货地址！');
      //   return;
      // }
        MessageBox.confirm(`确定支付${this.allpay}元`).then(action => { //点击成功执行这里的函数
            let obj= {'user_id':this.$store.state.login.username,'api_user':this.$store.state.login.username};
            // obj['address_id']=this.chosenAddressId;
            obj['address_id']='';

            console.log(1111,this.carList)
            for (let k = 0; k < this.carList.length; k++) {
              let tmp=this.carList[k];
              obj['data['+k+'][id]']=tmp['id'];
              obj['data['+k+'][count]']=tmp['count'];
              obj['data['+k+'][typeid]']=tmp['type']['ID'];
              obj['data['+k+'][promotion_id]']=tmp['promotion_id'];
              obj['data['+k+'][use_time]']=String(this.timeList);
              //obj['data['+k+']']={'id':tmp['id'],'count':tmp['count'],'typeid':tmp['type']['ID']};
            }
            //分销para
            if(Util.GetCookie('recommend_id') && Util.GetCookie('recommend_date') && Util.GetCookie('recommend_sign')){
              obj['recommend_id']=Util.GetCookie('recommend_id');
              obj['recommend_date']=Util.GetCookie('recommend_date');
              obj['recommend_sign']=Util.GetCookie('recommend_sign');
            }
            // obj['use_time']=String(this.timeList);
            console.log(888,obj)
            this.$dopost('/sysapi/order/add/', obj, function (response) {
            if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
            {
              this.confirm = false;
              this.$store.commit('SET_LOADING', true);
              if(response.data.data && response.data.data['order_id'] && response.data.data['order'])
              {
                this.showPay=true;
                this.orderApi=response.data.data;

                this.$store.dispatch('resetCarList');
                this.$store.dispatch('resetCount');
                setTimeout(() => {
                  this.$store.commit('SET_LOADING', false); //关闭loading
                  this.confirm = true; //支付完成后切换视图
                }, 300)
              }
              //Toast('下单成功！单号：'+response.data.data['order_id']);

            }
            else{this.confirm = false;Toast((response.data && response.data.mess)?response.data.mess:'出错了！');}
           }.bind(this),true,true);
/**
            this.confirm = false;
            this.$store.commit('SET_LOADING', true);
            this.$store.dispatch('resetCarList'); //重置购物车（用unSelectedList替换）
            this.$store.dispatch('resetCount'); //重置购物车数量
            setTimeout(() => {
              this.$store.commit('SET_LOADING', false); //关闭loading
              this.confirm = true; //支付完成后切换视图
            }, 300)
*/
          }, function(err) {
            //点击取消执行这里的函数
          });
      } else { //提交了订单,数据清空
        alert('请勿重复提交订单')
      }

    }
  }

}
</script>
<!-- lang="less" -->
<style lang="less">
@import '../../css/fz.less';
.van-radio__input, .van-radio__label {
    display: inline-block;
    vertical-align: middle;
}
.baidumap{
  width: 100%;
  height: 300px;
}
.pay {
    width: 100%;
    background-color: #F7F7F7;


    .pay-product {
        background-color: #fff;
        height: 60vw;
        overflow: auto;

        li {
            a {
                display: -webkit-flex;
                display: -ms-flex;
                display: flex;
                box-sizing: border-box;
                padding: 20*10vw/75 30*10vw/75;
                color: #4D4D4D;
                .fz(font-size,30px);
                border-bottom: 1*10vw/75 solid #DEDEDE;

                > img {
                    display: block;
                    width: 2.5*10vw;
                    height: 2.5*10vw;
                }

                > div {
                    box-sizing: border-box;
                    padding-left: 50*10vw/75;
                    width: 70%;
                    h2 {
                        padding-top: 0.09*10vw;
                        overflow: hidden;
                        word-break: keep-all;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    p {
                        //text-align: right;
                        .fz(font-size,24px);
                        //padding-top: 1.4*10vw;
                    }
                }
            }
        }
    }

    .pay-allpay {
        text-align: right;
        margin-top: 6vw;
        padding: 4vw 5vw;
        .fz(font-size,32px);
        color: #999999;
        background-color: #fff;
        i,
        span {
            color: @cl;
        }
    }

    .pay-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-bottom: 4vw;
        span {
            display: block;
            width: 85%;
            background-color: #f44;
            border-radius: 1.3vw;
            color: #fff;
            font-size: 17px;
            padding: 4vw;
            margin: 0 auto;
            text-align: center;
            &:active {
                background-color: @cl;
            }
        }

    }

    .pay-confirm {
        padding: 20px 0;
        background-color: @cl;
        text-align: center;
        color: #fff;
        line-height: 30px;
        .fz(font-size,40);
    }
}
</style>
