<template lang="html">

  <div class="wrap">
    <v-gologin v-if="!$store.state.login.token"></v-gologin>
    <ul class="something" v-if='carList'>
      <li v-for="(k,i) in carList">
          <div class="something-left" @click="toggle">
            <label class="true" :class="{false:!k.choseBool}">
              <input type="checkbox" v-model="k.choseBool">
            </label>
          </div>
          <div class="something-middle">
            <img :src="k.imgPath">
          </div>
          <div class="something-right">
            <p >{{k.title}}</p>
            <p style="color:rgb(199, 108, 28)"> {{k.type.NAME}} </p>
            <p>{{k.type.PRICE}} x {{k.count}} = {{k.type.PRICE * k.count}} 元</p>
            <p v-if="k.promotion && k.promotion.length>0">
                <select v-model="k.promotion_id" >
                <option v-for="option in k.promotion" v-bind:value="option['ID']">
                    {{ option['NAME'] }}
                </option>
                <option value="0" selected>不使用优惠</option>
                </select>
            </p>
            <p>可积分抵扣 {{k.type.HUI_DIAN * k.count }} 元</p>
            <p>运费:{{k.yunfei['NAME']}}</p>

            <div class="something-right-bottom" @click="cut(i)">

              <span></span>
            </div>
          </div>
      </li>

    </ul>
  </div>
</template>

<script>
// 提示登录组件
import Gologin from '@/components/car/gologin.vue'
import Util from '../../util/common'
export default {
  data() {
    return {
      Promotion_select: {},
    }
  },
  components: {
    'v-gologin': Gologin
  },
  computed: {

    carList() {
      return this.$store.state.index.shopList;
    },

  },
  created() {
    // 初始化先获取购物车商品列表 否则 页面刷新出Bug
    if (this.$store.state.index.shopList == "") {
      this.$store.commit('RESET_CARLIST');
     };
  },
  beforeMount() {
     this.SetPromotion();
  },
  methods: {
    SetPromotion(){
        if (this.$store.state.index.shopList != "" && this.$store.state.index.shopList.length>0)
        {
            for (let k = 0; k < this.$store.state.index.shopList.length; k++)
            {
                this.$store.state.index.shopList[k]['promotion_id']=0;this.$store.state.index.shopList[k]['promotion_price']=0;
                let LastPrice=0;
                for (let o = 0; o < this.$store.state.index.shopList[k].promotion.length; o++)
                {
                    if(Util.Cheng(this.$store.state.index.shopList[k]['price'],this.$store.state.index.shopList[k]['count'])>=Number(this.$store.state.index.shopList[k].promotion[o]['V2']))
                    {
                        if(Math.abs(this.$store.state.index.shopList[k].promotion[o]['V'])>LastPrice)
                        {
                            LastPrice=Math.abs(this.$store.state.index.shopList[k].promotion[o]['V']);
                            this.$store.state.index.shopList[k]['promotion_id']=this.$store.state.index.shopList[k].promotion[o]['ID'];
                            this.$store.state.index.shopList[k]['promotion_price']=Number(this.$store.state.index.shopList[k].promotion[o]['V']);
                        }
                    }

                }
                //console.log(this.$store.state.index.shopList[k]);
            }
        }
    },
    cut(i){
    // 点击垃圾桶，删除当前商品，这里用splice和filter都会bug,只能重置数组
      let newCarList= [];

      for (let k = 0; k < this.carList.length; k++) {
          if(k!==i) {
            newCarList.push(this.carList[k])
          }
      }


      //点击垃圾桶 把商品数量count-1
         this.$store.dispatch('cutCarList',newCarList);
         this.$store.dispatch('setLocalCount',false);

    },
    toggle() {

      setTimeout(() => {
          // 每点击一下都会改变choseBool的布尔值,所以要重置数组
          this.$store.dispatch('cutCarList',this.carList)

      }, 0);


    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
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
                        background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
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
