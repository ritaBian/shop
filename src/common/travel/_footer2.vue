<template lang="html">
<div class="page_body">
  <van-tabbar v-model="active">
    <van-tabbar-item class="tabbar-item" icon="exchange" to="/circuit">
      <span>线路</span>
      <template #icon="props">
        <img :src="props.active ? require('../../../static/icon/xianlu2.png') : require('../../../static/icon/xianlu.png')" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item class="tabbar-item" icon="browsing-history-o" to="/index">
      <span>发现</span>
      <template #icon="props">
        <img :src="props.active ? require('../../../static/icon/faxian2.png') : require('../../../static/icon/faxian.png')" />
      </template>
    </van-tabbar-item>

    <!-- <van-tabbar-item class="tabbar-item tabbar-radius1" icon="shopping-cart-o" to="/car" :badge="carCount">购物车</van-tabbar-item> -->
    <van-tabbar-item  class="tabbar-item tabbar-radius1" icon="shopping-cart-o" to="/shop/car" :badge="carCount">购物车</van-tabbar-item>
    <!-- <van-tabbar-item class="tabbar-item tabbar-radius1" icon="shopping-cart-o" to="/car" >
      <span>购物车</span>
      <template #icon="props">

      </template>
    </van-tabbar-item> -->
  <!-- <van-tabbar-item class="tabbar-item-active" to="/category/all">
      <div class="tabbar-active-border ">
        <div class="item_active">
        </div>
        <div class="item_active2">
        </div>
        <div class="tabbar-active">
          <div>商品</div>
        </div>
      </div>
  </van-tabbar-item> -->
  <van-tabbar-item class="tabbar-item-active" to="/shopCar">
      <div class="tabbar-active-border ">
        <div class="item_active">
        </div>
        <div class="item_active2">
        </div>
        <div class="tabbar-active">
          <div>商品</div>
        </div>
      </div>
  </van-tabbar-item>
    <!-- <van-tabbar-item class="tabbar-item2 tabbar-radius2" icon="contact" to="/user">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? require('../../../static/icon/wode2.png') : require('../../../static/icon/wode.png')" />
      </template>
    </van-tabbar-item> -->
  <van-tabbar-item class="tabbar-item2 tabbar-radius2" icon="contact" to="/shop/mine">
    <span>我的</span>
    <template #icon="props">
      <img :src="props.active ? require('../../../static/icon/wode2.png') : require('../../../static/icon/wode.png')" />
    </template>
  </van-tabbar-item>



  </van-tabbar>
  <!-- <van-popup v-model="$store.state.detail2.ShowSelectType" v-if="$store.state.detail2.proData.PRO" z-index="10" custom-style="height:80vh,width:100%" position="bottom">
      请选择规格<span v-if="$store.state.detail2.proData.PRO.PRICE">,价格:{{$store.state.detail2.proData.PRO.PRICE}}</span>
      <div class="chose-mychosed" ontouchstart="">
        <template lang="html" v-for="(v,j) in guige">
            <div class="changeType">
                <div>{{v.NAME}}:</div><br/>
                <span
                v-for="(k,i) in v.SUB"
                :class="{active:$isEmpty(selectType,v.ID+'',0)==k.ID}"
                @click="changeType(v.ID,k.ID)"
                >{{k.NAME}}</span>
            </div>

        </template>
        <div style="width:100%">
          <div class="footer-addcar" style="color:#fff" @click="AddToCard" >加入购物车</div>
        </div>
    </div>
  </van-popup> -->
  <div class="shopDetais">
    <van-popup v-model="$store.state.detail2.ShowSelectType" v-if="$store.state.detail2.proData.PRO" z-index="10" custom-style="height:80vh,width:100%" position="bottom">
      <!-- <van-action-sheet v-model="show" title="商品选择" :round="false"> -->
        <div class="buy_content" v-for="(v,j) in guige">
          <div class="pro">
            <img src="@/assets/shop/details/img1.png" alt="">
            <div class="desc">
              <div class="title">{{$store.state.detail2.proData.PRO.NAME}}</div>
              <div class="price">￥{{$store.state.detail2.proData.PRO.PRICE}}</div>
            </div>
          </div>
          <div class="style">
            <div class="title">选择{{v.NAME}}</div>
            <ul>
              <li v-for="(k,i) in v.SUB" 
                :class="{'choice':$isEmpty(selectType,v.ID+'',0)==k.ID}" 
                @click="changeType(v,v.ID,k.ID)"
                >{{k.NAME}}</li>
              <!-- <li class="choice">6+饽花2斤全麦(4两)</li>
              <li class="other">6全麦(4两)6+年糕3块</li> -->
            </ul>
          </div>
          <div class="num">
            <div class="title">选择数量</div>
            <van-stepper v-model="value" />
          </div>
          <div class="footers">
            <p @click="AddToCard">加入购物车</p>
            <p>立即购买</p>
          </div>
        </div>
      <!-- </van-action-sheet> -->
    </van-popup>
  </div>
  </div>
</template>

<script>//<van-tabbar-item icon="chat-o" to="/im" :info="isNewChat">客服</van-tabbar-item>
import { Tabbar, TabbarItem,Toast,Popup} from 'vant';
import {mapState} from 'vuex'
import Util from '../../util/common'
import 'vant/lib/index.css';
import "@/css/shop/details.scss";

export default {
  computed: mapState({
    view: state => state.detail2.proData.PRO,
    yunfei: state => state.detail2.proData.YUN_FEI,
    promotion:state => state.detail2.proData.PROMOTION,
    guige:state => state.detail2.proData.GUIGE,
    selectType:state => state.detail2.selectType
  }),
  components:{
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
    [Popup.name]:Popup,
  },
  props: {
    id: {
    	type: null,//属性类型
    	value: ""
    },
  },
    methods: {
      gotoRouter() {
        this.$router.push({
          name: this.selected
        })
      },
      changeType(v,typeID,ID) {
        console.log(v,typeID,ID)
        this.$store.commit('CHANGE_COL_SELECTED2', [typeID,ID]);
        //this.$parent.$emit("addToCart",true);
        Util.IntoCarGlobal(this,true);
        this.$forceUpdate();
      },
      AddToCard() {
        Util.IntoCarGlobal(this,false,this.value);

      },
      getTypeSelected(typeID) {
        //console.log(this.selectType);
        return this.$isEmpty(this.selectType,typeID+'',0);
      }
    },
    data() {
      return {
        active: -1,
        isNewChat:'',
        carCount:'',
        value:'',
      }
    },
watch:{
    '$route':function(to,from){
        //this.routeName = to.name;
        this.$parent.$emit("changeTab");
    },
    '$store.state.im.count':function(){
        this.isNewChat=this.$store.state.im.count>0?(this.$store.state.im.count>99?'99+':this.$store.state.im.count):null;
    },
    '$store.state.detail.countAll':function(){
        this.carCount=this.$store.state.detail.countAll>0?this.$store.state.detail.countAll:null;
    }
},
    mounted() {
      this.isNewChat=this.$store.state.im.count>0?(this.$store.state.im.count>99?'99+':this.$store.state.im.count):null;
      this.carCount=this.$store.state.detail.count>0?this.$store.state.detail.count:null;
      this.$parent.$on("changeTab", function()
      {
          //获取当前路由名称，根据该名称给当前footer添加is-selected
          let Rname = this.$route.path;
          if(Rname.substring(1,11)=="category/"){Rname="/category/all"}
          if(this.$route.name=='分类'){this.active = 1;}
          switch (Rname) {
            case '/circuit':
              this.active = 0;
              break;
            case '/':
              this.active = 0;
              break;
            case '/index':
              this.active = 1;
              break;
            case '/shop/car':
              this.active = 2;
              break;
            case '/shopCar':
              this.active = 3;
              break;
            case '/shop/mine':
              this.active = 4;
              break;
          }
      }.bind(this));

      this.$parent.$emit("changeTab");
      //this.$store.commit('RESET_COUNT');
    }

  }
</script>

<style lang="less" scoped="scoped">
  @import '../../assets/fz.less';
body{
 color:#fff;
}
.page_body /deep/ [class*=van-hairline]::after{
  border: none !important;
}
.page_body /deep/ .van-tabbar{
  background-color:transparent;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.tabbar-item{
  background-color: #FFFFFF;
  box-shadow: 0.16rem -0.1rem 0.16rem 0.06rem rgba(0,0,0,0.08);
  // border-top: 0.06rem solid rgba(153, 153, 153,0.3);
}
.tabbar-item2{
  background-color: #FFFFFF;
  box-shadow: -0.16rem -0.1rem 0.16rem 0.06rem rgba(0,0,0,0.08);
}
.tabbar-radius1{
  border-top-right-radius: 0.4rem !important;
  // border-top-left-radius: 0.1rem;
}
.tabbar-item-active{
  flex:0.1 !important;

}
.tabbar-radius2 {
  border-top-left-radius: 0.4rem !important;

}
.item_active{
   overflow: hidden;
   position: absolute;
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   z-index: 1;
}
 .item_active:after {
  position: absolute;
  padding: 2.1rem;
  border-radius: 50%;
  box-shadow: 0 0 0 300px rgba(255,255,255, 1);
  content: '';
  left: 50%;
  margin-left: -2.1rem;
  bottom: 1.5rem;

}
.item_active2{
   overflow: hidden;
   position: absolute;
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   z-index: 2;
}
 .item_active2:after {
  position: absolute;
  padding: 2.1rem;
  border-radius: 50%;
  content: '';
  left: 50%;
  margin-left: -2.1rem;
  bottom: 1.5rem;
  box-shadow: 0 -0.1rem 0.12rem 0.1rem rgba(0,0,0,0.08) inset;
}


.tabbar-active-border{
  width: 4.2rem;
  height: 55px;
  position: relative;
}
.tabbar-active{
  width: 3.44rem;
  height: 3.44rem;
  border-radius: 50%;
  background-color: #01A862;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-size: 0.75rem;
  line-height: 0.9rem;
  position: absolute;
  bottom: 1.9rem;
  left: 50%;
  margin-left: -1.7rem;
  z-index: 9999999;
  // border: 0.2rem solid #FFFFFF;

}
.van-tabbar-item--active {
    color: #01A862;
}
.van-tabbar-item{cursor: pointer;}
.van-tabbar{
  height: 55px;
}
.van-icon__info{
  padding-top:0.1em;
}

.chose-mychosed {
        background-color: #fff;
        > div {
            padding-top: 20px;
            //display: -ms-flex;
            //display: -webkit-box;
            //display: -ms-flexbox;
            //display: block;

            span {
                padding: 6px 10px;
                border-radius:5px;
                border: 1px solid rgb(111, 111,111);
                margin-right: 3vw;
                color: rgb(111, 111, 111);
                &.active,
                &:active {
                    color: @cl;
                    border-color: @cl;
                    //-webkit-transform: scale(1.1);
                    //transform: scale(1.1);
                }

            }
        }
    }
  .footer-addcar {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    line-height: 14vw;height: 14vw;
    width:100vw;
    color:#fff;
    text-align: center;
    background-color: @cl;
    letter-spacing: .2vw;
    &:active {
      background-color: #ff7d00;
    }
  }
</style>
