<template lang="html">
  <div class="wrap">
    <van-popup v-model="showPay" position="top" :overlay="false" style="height:100vh;width:100vw">  
    <v-Money ref="moneyPage" :pay="pay" :order="topayorder" @SetState="onSetState(false)"></v-Money>
    </van-popup>
    <v-gologin v-if="!$store.state.login.token"></v-gologin>
    <van-popup v-model="showPic" >
        <img v-if="item.IF_TICKET_OUT==1" style="max-width:400px;max-height:600px" :src="Util.FixPic(item.TICKET_PIC)" />
        <img v-if="item.IF_TICKET_OUT!=1" style="max-width:400px;max-height:600px" :src="Util.FixPic('/sysapi/travel/Ticketpic/?'+Util.paraAddKey({'id':item.ID,'sys_data_from':2},null,null,true))" />
        
        </van-popup>
    <ul class="something" v-if='order'>
        <template v-for="(o,p) in order">
            <div class="OrderCell">
                <span>{{OrderState(o.STATE)}},</span>
                <span>{{o.ADD_TIME}},</span>
                <span>{{o.MONEY_ALL}}元</span>
                <span v-if="o.ALL_HUI_DIAN>0">,可抵:{{o.ALL_HUI_DIAN}}</span>
                <span v-if="o.STATE_PAY_BUTTON=='1'" style="float:right;padding-right:3px" @click="ToPay(o)">去支付</span>
            </div>
            <li v-for="(k,i) in o.LIST">
                <div class="something-middle">
                    <img :src="$conf.domain + '/' + k.PRO_PIC">
                </div>
                <div class="something-right">
                    <p>订单号:{{k.ID}}</p>
                    <p>{{k.PRO_NAME}}</p>
                    <p style="color:rgb(199, 108, 28)">{{k.PRO_TYPE_NAME}} </p>
                    <p>
                    <span v-if="k.HUI_DIAN_USED>0">余额:{{k.USED_YU_E}}元</span>
                    <span v-if="k.HUI_DIAN_USED>0">积分:{{k.HUI_DIAN_USED}}个</span>
                    <span v-if="k.USED_BANK>0">充值:{{k.USED_BANK}}元</span>
                    <span v-if="k.PRO_SORT=='1494' && k.STATE2!=-1 && k.IF_TICKET_OUT==1 && k.TICKET_PIC && k.TICKET_PIC!=''"  @click="ShowTicketPic(k)">查看票二码</span>
                    <span v-if="k.PRO_SORT=='1494' && k.STATE2!=-1 && (k.IF_TICKET_OUT==2 || k.IF_TICKET_OUT==3) && k.TICKET_NUM"  @click="ShowTicketPic(k)">查看票二维码</span>
                    <span v-if="k.STATE2==4">已退款</span>
                    <span v-if="k.PRO_SORT=='1510' && k.STATE2==1">商家已确认</span>
                    <span v-if="k.PRO_SORT=='1510' && k.STATE2==0">待商家确认</span>
                    </p>
                    <p v-if="k.PRO_SORT=='1493' && k.KUAI_DI_DAN_HAO">{{k.KUAI_DI_GONG_SI_NAME}},单号:{{k.KUAI_DI_DAN_HAO}}</p>
                    <div v-if="k.PRO_SORT=='1493' && k.STATE_FA_HUO_BUTTON=='1'" class="something-right-bottom" @click="cut(k)">

                    <span>收货</span>
                    </div>
                    <div v-if="k.TUI_STATUS=='1'" class="something-right-bottom" @click="tui(k)">
                    <span>退货</span>
                    </div>
                </div>
            </li>
        </template>


    </ul>
  </div>
</template>

<script>
// 提示登录组件
import Gologin from '@/components/car/gologin.vue'
import MoneyVue from '@/components/car/pay/money.vue'
import Util from '../../util/common'
import { Popup,Dialog,Toast } from 'vant';
import 'vant/lib/index.css';

export default {
  props:['order'],
  data(){
      return {
        showPay:true,
        pay:{Money:0,Point:0,OnLine:0},
        topayorder:{id:-1,rmb:0,point:0},
        showPic:false,
        item:'',
        Util:Util
      }
  },
  components: {
    'v-gologin': Gologin,
    [Popup.name]: Popup,
    'v-Money': MoneyVue
  },
  computed: {


  },

  mounted() {
      this.showPay=false;

  },
  methods: {
    ShowTicketPic(k){
        this.showPic=true;
        this.item=k;
    },
    ToPay(o){
        //.ID,o.PAY_MONEY,o.PAY_HUI_DIAN,o.PAY_CHONG_MONEY
        //this.orderid=o.id;
        this.showPay=true;
        this.$refs.moneyPage.getUserInfo();
        this.topayorder.id=o.ID;
        this.topayorder.rmb=o.MONEY_ALL;
        this.topayorder.point=o.ALL_HUI_DIAN;
        
        this.pay.Money=o.PAY_MONEY;
        this.pay.Point=o.PAY_HUI_DIAN;
        this.pay.OnLine=o.PAY_CHONG_MONEY;
        
        this.$refs.moneyPage.CheckInput();
    },
    tui(o){
      Dialog.confirm({
        title: '',
        message: '确定退货么？'
      }).then(() => {
        let obj= {'id':o['ID']};
        obj['id']=o.ID;
        this.$dopost('/sysapi/order/tui/', obj,
        function (res) {
        if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
        {
            o.STATE2='4';
            Toast((res.data && res.data.mess)?res.data.mess:'操作成功');
        }
        else{Toast((res.data && res.data.mess)?res.data.mess:'出错了！');}
        }.bind(this),true);
      }).catch(() => {
        // on cancel
      });

    },
   cut(o){
      Dialog.confirm({
        title: '',
        message: '确定收货么？'
      }).then(() => {
        let obj= {'api_user':this.$store.state.login.username};
        obj['id']=o.ID;
        this.$dopost('/sysapi/order/shou_huo/', obj,
        function (res) {
        if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
        {
            if(res.data.data.state && res.data.data.state=='ok')
            {
                Toast('收货成功！');
            }
            else
            {Toast('收货失败！');}
        }
        else{Toast((res.data && res.data.mess)?res.data.mess:'出错了！');}
        }.bind(this),true);
      }).catch(() => {
        // on cancel
      });

    },
    onSetState(stat){
        this.showPay=stat;
    },
    OrderState(state)
    {
      let r='';
      if(state==1){r='已支付';}
      if(state==0){r='未支付';}
      if(state==0.1){r='未支付';}
      if(state==-1 || state==-1.1){r='已取消';}
      return r;
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.OrderCell
{
    font-size:13px;padding-left:2px;padding-top:3vh;
}
.wrap {
    width: 100%;
    .something {
        width: 100%;
        > li {
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 4vw 2vw;
            position: relative;
            height: 26vw;
            .bd();
            .something-left {
                -ms-flex: 2;
                -webkit-box-flex: 2;
                flex: 2;

                label {
                    float: left;
                    background: url("../../assets/car/images/t.svg") no-repeat center center/50% 50%;
                    input {
                        height: 14vw;
                        width: 14vw;
                        opacity: 0;
                        filter: alpha(opacity=0);
                    }
                }
                .false {
                    background: url("../../assets/car/images/f.svg") no-repeat center center /50% 50%!important;
                }

            }
            .something-middle {
                -ms-flex: 3;
                -webkit-box-flex: 3;
                flex: 3;
                height: 26vw;
                padding-left: 2vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                img {
                    display: block;
                    
                    width: 100%;
                    border-radius:5px;
                    //height: 100%;
                }
            }
            .something-right {
                -ms-flex: 6;
                -webkit-box-flex: 6;
                flex: 6;
                height: 100%;
                display: -ms-flex;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-flow: column wrap;
                flex-flow: column wrap;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                padding-left: 6vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    .fz(font-size,26);

                    max-width:40vw;overflow:hidden;white-space: nowrap;
                }
                p:last-of-type{
                    .fz(font-size,22);
                    color: rgb(168, 168, 168);
                }
                p:nth-last-of-type(2){
                    .fz(font-size,22);
                    color: rgb(168, 168, 168);
                }
                .something-right-bottom {

                    > div {
                        display: -ms-flex;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        input {
                            width: 6vw;
                            text-align: center;
                        }

                        span {
                            height: 7vw;
                            line-height: 7vw;
                            width: 8vw;
                            display: inline-block;
                            border: 0.2vw solid #f1f1f1;
                            border-radius: 1vw;
                            text-align: center;
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                    > span {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 13vw;
                        height: 13vw;
                        //background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
                    }
                }
            }
        }
    }
    label,
    span {
        &:active {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
}
</style>
