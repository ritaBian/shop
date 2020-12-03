<template lang="html">
  <section class="chose" v-if="view">
    <div class="chose-view" v-if="viewBoolean">
      <h1 class="chose-view-title">
        {{view.NAME}}
      </h1>
      <div v-if="view.NAME2">&nbsp;&nbsp;<div style="font-size:14px;float:right;">{{view.NAME2}}</div></div>
      <div style="clear:both;">
      <span style="color:#f23030;">￥{{view.PRICE}}元 </span>
      <span style="text-decoration:line-through;font-size:12px;color:#666" v-if="view.SHI_CHANG_PRICE>0">市场价:￥{{view.SHI_CHANG_PRICE}}</span>

      <div v-if="view.HUI_DIAN" style="font-size:13px;">可积分抵扣:￥{{view.HUI_DIAN}}</div>
      </div>
      <div style="font-size:14px;">购买此产品可获得 {{view.POINT}} 积分</div>

      <div style="font-size:14px;" v-for="item in promotion">
          优惠: <span style="color:#f23030;">{{item['NAME']}}</span>
      </div>


      <div style="font-size:14px;" v-if="yunfei">运费: {{yunfei[0]['NAME']}}</div>


    </div>
  <!-- 添加空函数 解决Safari浏览器 :active无效 -->
    <div class="chose-mychosed" ontouchstart="">
        <template lang="html" v-for="(v,j) in guige">
            <div class="changeType">
                <div>{{v.NAME}}:</div><br/>
                <span
                v-for="(k,i) in v.SUB"
                :class="{active:$isEmpty(selectType,v.ID+'',0)==k.ID}"
                @click="changeType(v.ID,k.ID,i)"
                >{{k.NAME}}</span>
            </div>
        </template>

    </div>



  </section>


</template>

<script>
import {
  MessageBox
} from 'mint-ui';
import {
  mapState
} from 'vuex'

export default {
  //属性
  props: {
    viewBoolean: {
    	type: null,//属性类型
    	value: "",
      default: true
    },
  },
  computed: mapState({

    view: state => state.detail.proData.PRO,
    yunfei: state => state.detail.proData.YUN_FEI,
    promotion:state => state.detail.proData.PROMOTION,
    guige:state => state.detail.proData.GUIGE,
    selectType:state => state.detail.selectType

  }),
    data(){
    return {
    }
  },
  boforeCreate()
  {

  },
  methods: {
    changeType(typeID,ID,index) {
      this.$store.state.index.shopType = Number(index)+1
      this.$store.commit('CHANGE_COL_SELECTED', [typeID,ID]);
      this.$parent.$emit("addToCart",true);
      this.$forceUpdate();
    },
    getTypeSelected(typeID) {
      //console.log(this.selectType);
      return this.$isEmpty(this.selectType,typeID+'',0);
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.chose {
    padding: 3vw;

    .chose-view {
        > h1 {
            .fz(font-size,36);
            color: #2c3e50;
            > span {
                color: rgb(238, 113, 80);
            }
        }
        > span {
            line-height: 10vw;
            color: @cl;
            .fz(font-size,34);
            font-weight: 600;
        }

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
                .fz(font-size,26);
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

    .footer {
        width: 100%;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        height: 14vw;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #ffffff;
        -moz-user-select: none;
        -webkit-user-select: none;
        .bt();
        .footer-addcar,
        .footer-gocar,
        .footer-index {
            text-align: center;
        }

        .footer-index {
            -webkit-flex: 3;
            -ms-flex: 3;
            flex: 3;
            line-height: 14vw;
            height: 14vw;
            padding-top: 1.5vw;
            border-right-color: #f7f7f7;
            border-right-style: solid;
            .fz(border-right-width,1);

            i {
                .fz(font-size,45);
            }
            &:active {
                background-color: #f1f1f1;
            }
        }

        .footer-gocar {
            position: relative;
            -webkit-flex: 3;
            -ms-flex: 3;
            flex: 3;
            height: 14vw;
            line-height: 14vw;
            padding-top: 1.6vw;
            span {
                height: 5.5vw;
                width: 5.5vw;
                line-height: 5.5vw;
                position: absolute;
                top: 0.5vw;
                right: 5.5vw;
                background-color: @cl;
                border-radius: 50%;
                color: #fff;
                .fz(font-size,24);
            }
            &:active {
                background-color: #f1f1f1;
            }
            i {
                .fz(font-size,48);
            }
        }

        .footer-addcar {
            -webkit-flex: 6;
            -ms-flex: 6;
            flex: 6;
            line-height: 14vw;
            height: 14vw;

            color: #fff;
            background-color: @cl;
            letter-spacing: 0.2vw;
            &:active {
                background-color: #ff7d00;
            }
        }
    }
}
</style>
