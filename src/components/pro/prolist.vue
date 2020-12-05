<template lang="html">
  <section class="pro" v-if='pro'>
    <ul class="pro-list">
      <li v-for="k in pro">
        
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td style="width:21vw;height:20vw;">
      <router-link :to="{path:'/detail',query:{id:k.ID}}" :key="k.ID">
        <img v-lazy="checkPic(k.PIC)" style="width:20vw;height:20vw;">
      </router-link>
    </td>
    <td valign="top" style="width:79vw;height:20vw;">
      <div style="position:relative;height:20vw;width:100%">
          <div class="title" >{{k.NAME}}</div>
          <div class="price" style="position:absolute; bottom:0;width:100%">
              {{k.PRICE}}
            <div style="float:right;vertical-align:middle;">
              
              <div style="float:left" v-if="$store.state.detail.carListIndex[k.ID.toString()]">
                <img @click="DelCart(k.ID,k)" style="float:left;width:21px;height:21px;vertical-align:middle;cursor:pointer;" src="static/sub_red_empty.png">
                <div style="float:right;text-align:center;width:20px;padding-left:5px;padding-right:5px;">{{$store.state.detail.carListIndex[k.ID.toString()]}}</div>
              </div>
              <img @click="AddIntoCart(k.ID,k)" style="float:right;width:21px;height:21px;vertical-align:middle;cursor:pointer;" src="static/add_red.png">
              
            </div>
          </div>
      </div>
    </td>
  </tr>
</table>
<div style="height:1px;border-bottom:1px solid rgb(241, 228, 228);padding-top:10px"></div>

        
      </li>
    </ul>
  


  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';
import { Popup} from 'vant';
import {mapState} from 'vuex'
import Util from '../../util/common'
import Baseline from '@/common/_baseline.vue'

  export default {
  components:{

    'baseline': Baseline,
  },
  data(){
    return {
      
    }
  },
    props:['pro'],
    methods:
    {
      checkPic:function(picurl){return this.$conf.domain + '/' + picurl;},
      AddIntoCart:function(proid,pro)
      {
        console.log(pro)
        this.$store.commit('SET_DATAS2',pro);
        if(pro.DETAIL.GUIGE.hasOwnProperty("GUI_GE_1"))
        {
          this.$store.state.detail2.ShowSelectType=true;
        }
        else
        {
          Util.IntoCarGlobal(this);
        }
        //console.log(proid);console.log(detail);
      },
      DelCart:function(proid,pro)
      {
        Util.SetCartItemCount(this,pro);
      }
    },
    mounted()
    {
     
    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .pro {
    //.pt();
    .pro-title {
      .bt();
      background-color: #ffffff;
      text-align: center;
      padding: 4vw 0;
      .fz(font-size, 40);
      color: #333;
      position: relative;

      i {
        position: absolute;
        right: 6vw;
        top: 50%;
        .fz(font-size, 36);
        .fz(margin-top,-16);

        &::before {
          color: rgb(159, 159, 159);
        }
      }
    }



    .pro-list {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-pack: distribute;
      //justify-content: space-around;
      padding:0 2vw 4vw 2vw;
      li {
        
        padding:1vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        
        img {
          width: 100%;
          height:48vw;
          border-radius:5px;
          display: block;
        }
      }
    }
    .title
    {
      font-size: 13px;
      padding-top: 3px;
    }
    .price
    {
      color: #f23030;
      font-size: 16px;
    }


  }
</style>
