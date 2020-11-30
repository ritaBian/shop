<template lang="html">
<div>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="records" to="/category/all">商品</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/car" :info="carCount">购物车</van-tabbar-item>

    <van-tabbar-item icon="contact" to="/user">我的</van-tabbar-item>
	<van-tabbar-item icon="chat-o" to="/imlist" :info="isNewChat">客服</van-tabbar-item>

    
  </van-tabbar>
  <van-popup v-model="$store.state.detail2.ShowSelectType" v-if="$store.state.detail2.proData.PRO" z-index="10" custom-style="height:80vh,width:100%" position="bottom">
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
  </van-popup> 
  </div>
</template>

<script>//<van-tabbar-item icon="chat-o" to="/im" :info="isNewChat">客服</van-tabbar-item>
import { Tabbar, TabbarItem,Toast,Popup} from 'vant';
import {mapState} from 'vuex'
import Util from '../util/common'
import 'vant/lib/index.css';

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
    methods: {
      gotoRouter() {
        this.$router.push({
          name: this.selected
        })
      },
      changeType(typeID,ID) {
        this.$store.commit('CHANGE_COL_SELECTED2', [typeID,ID]);
        //this.$parent.$emit("addToCart",true);
        Util.IntoCarGlobal(this,true);
        this.$forceUpdate();
      },
      AddToCard() {
        Util.IntoCarGlobal(this);
        
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
            case '/':
              this.active = 0;
              break;
            case '/category/all':
              this.active = 1;
              break;
            case '/car':
              this.active = 2;
              break;
            case '/user':
              this.active = 3;
              break;
            case '/imlist':
              this.active = 4;
              break;
          }
      }.bind(this));

      this.$parent.$emit("changeTab");
      //this.$store.commit('RESET_COUNT');
    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
body{
 color:#fff; 
}
.van-tabbar-item--active {
    color: #f23030;
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
