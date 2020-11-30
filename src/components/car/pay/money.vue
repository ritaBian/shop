<template lang="html">
<div>
    <van-nav-bar
      title="支付明细"
      left-text=""
      left-arrow
      @click-left="$emit('SetState')"
    />
    <van-cell-group>
      <van-cell title="用户余额:" :value="$store.state.detail.user.rmb+' 元'" />
      <van-cell title="用户积分:" :value="$store.state.detail.user.point+' 个'"  />
  </van-cell-group>
    <van-cell-group>
      <van-field v-model="pay.Money" label="余额支付:" required />
      <van-field v-model="pay.Point" label="积分支付:" required v-if="pay.Point" />
      <van-field v-model="pay.OnLine" label="充值支付:" required v-if="pay.OnLine" />

       <Button size="normal" type="danger" style="width:90vw;margin-left:5vw;" @click="ToPay">支 付</Button>
      
    </van-cell-group>
  </div>

</template>


<script>
import Util from '../../../util/common';
import { Cell, CellGroup,Popup,Field,Button,NavBar } from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant'


export default {
  props:['pay','order'],
  data(){
    return {}
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]:Popup,
    [Field.name]:Field,
    [NavBar.name]:NavBar,
    Button
  },
  beforeCreate() {

  },
  watch:{
    order:function (val)
    {
      this.CheckInput();
    },
    '$store.state.detail.user':function (val)
    {
      this.CheckInput();
    }
  },
  methods:{
    getUserInfo()
    {
      this.$dopost('/sysapi/user/userinfo/', {},
      function (response) {
      if(response.data && typeof(response.data.error) != "undefined" && response.data.error===0)
      {
        this.$store.state.detail.user=response.data.data;
      }
      else{Toast((response.data && response.data.mess)?response.data.mess:'出错了！');$emit('SetState');}
      }.bind(this),true);
    },
    CheckInput()
    {
      this.pay.Money=Util.Jia(this.order.rmb,0);
      this.pay.Point=Util.Jia(this.order.point,0);
      
      if(Util.Jia(this.$store.state.detail.user.point,0)<=Util.Jia(this.order.point,0))
      {
        this.pay.Point=Util.Jia(this.$store.state.detail.user.point,0);
      }
      else
      {
        this.pay.Point=Util.Jia(this.order.point,0);
      }
      //如果余额+积分 低于 支付金额
      if(Util.Jia(this.$store.state.detail.user.rmb,this.pay.Point)<Util.Jia(this.order.rmb,0))
      {
        this.pay.Money=Util.Jia(this.$store.state.detail.user.rmb,0);
      }
      else
      {
        this.pay.Money=Util.Jian(this.order.rmb,this.pay.Point);
      }

      if(Util.Jia(this.pay.Money,this.pay.Point)<Util.Jia(this.order.rmb,0))
      {
        this.pay.OnLine=Util.Jian(Util.Jian(this.order.rmb,this.pay.Point),this.pay.Money);
      }

    },
ToPay(val) {
      let obj= {'user_id':this.$store.state.login.username,'api_user':this.$store.state.login.username};
      obj['id']=this.order.id;
      obj['PAY_HUI_DIAN']=this.pay.Point || 0;
      obj['PAY_MONEY']=this.pay.Money;
      obj['PAY_CHONG_MONEY']=this.pay.OnLine || 0;
      this.$dopost('/sysapi/order/pay/', obj,
      function (res) {
      if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
      {
        if(res.data.data && res.data.data['state'])
        {
          if(res.data.data['state']=='ok')
          {
            ////this.showPay=false;
            Toast('订单支付成功！');
            this.$router.push({path:'/order'});
          }
          if(res.data.data['state']=='ChongZhi')
          {
            ////this.showPay=false;
            Toast('充值！');
            
            obj= {'user_id':this.$store.state.login.username,'api_user':this.$store.state.login.username};
            obj['order_id']=this.order.id;
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
    }
  }

}
</script>

