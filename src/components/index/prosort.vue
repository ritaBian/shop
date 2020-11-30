<template lang="html">
  <section class="prosort" v-if='prosort'>
    <h1 class="prosort-title">
        {{prosort.name}}
        <router-link :to="{path:'/list',query:{sortid:prosort.id}}">
          <i class="icon-right"></i>
        </router-link>
    </h1>
    <ul class="prosort-list">
      <li v-for="k in prosort.list">
        <router-link :to="{path:'/detail',query:{id:k.ID}}" :key="k.ID">
          <img v-lazy="checkPic(k.PIC)" alt="">
          <div class="title" style="text-overflow:ellipsis;white-space: nowrap;overflow:hidden;">{{k.NAME}}</div>
          <div class="price" style="text-overflow:ellipsis;white-space: nowrap;overflow:hidden;">{{k.PRICE}}</div>
        </router-link>
      </li>
    </ul>
  <router-link :to="{ name: '详情页'}"  class="prosort-banner">
  </router-link>
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';

  export default {
    props:['prosort'],
    methods:{
			checkPic:function(picurl){return this.$conf.domain + '/' + picurl;}
		  }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .prosort {
    //.pt();
    .prosort-title {
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

    .prosort-list {
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
        width: 48vw;
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

    .prosort-banner {
      display: block;
      width: 100vw;
      img {
        width: 100%;
        height: 24vw;
      }
    }


  }
</style>
