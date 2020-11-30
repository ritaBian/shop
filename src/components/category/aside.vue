<template lang="html">
  <aside class="aside" v-if="datas" z-index="100">
    <ul>
      <li v-for="(k,i) in datas" @click='changeTabIndex(i)' >
        <router-link :to="{path:'/category/'+k.ID}" :class='{active:i==tabIndex}' >{{k.NAME}}</router-link>
      </li>

    </ul>

  </aside>
</template>

<script>
import Util from '../../util/common'
  export default {
    props:['datas'],

    computed:{
      tabIndex(){
        return this.$store.state.category.tabIndex
      }
    },
    created() {
      let path=Util.GetRequestJing();
      if(path && path.substring(1,10)=="category/")
      {
        let SortID=path.substring(10);
        if(!isNaN(SortID))
        {
          for(let i=0;i<this.datas.length;i++)
          {
            if(this.datas[i].ID==SortID)
            {
              this.$store.state.category.tabIndex=i;
            }
          }
        }
      }
    },
    methods:{
      changeTabIndex(i) {//console.log('changed:'+i);
         this.$store.commit('CHANGE_TABINDEX',i)
      }
    }
  }
</script>

<style lang="less" scoped>
  .aside {
    //flex: 2.2;
    height: 100%;
    width:80px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: gold;
    &::-webkit-scrollbar {display:none}
    > ul {
      height: 100%;
      width: 100%;
      li {
        text-align: center;height: 40px;
        a {
          display: block;
          //padding: 4vw 0;
          line-height: 40px;
          margin: 0 auto;
          position: relative;
          font-size: 16px;
        }
        .active {
          position: relative;
          background-color:#15754F;height: 40px;
          font-size: 16px;
          color:#ffffff;
          &::before {
            width: 3px;
            height: 28px;
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -14px;
            background-color:#FDD537;
          }
        }
      }
    }
  }
</style>
