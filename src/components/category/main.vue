<template lang="html">
  <div class="main" v-if="datas">
    <h2 style="display:none">{{datas[tabIndex].NAME}}</h2>
    <ul>
      <li v-for="k in datas[tabIndex].list" v-if="datas[tabIndex].list && datas[tabIndex].list.length>0" >
        <router-link :to="{path:'/category/'+k.ID}" :class='{active:k.ID==Sortid}'>
          <span @click="()=>{Sortid=k.ID}" style="line-height:30px;padding-left:20px;padding-right:20px;">{{k.NAME}}</span>
        </router-link>
      </li>
    </ul>

    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <v-prolist :pro="list"></v-prolist>
    </van-list>


  </div>
</template>

<script>
import { Lazyload } from 'mint-ui';
import prolist from '@/components/pro/prolist.vue'
import Baseline from '@/common/_baseline.vue'
import { List } from 'vant';
import Util from '@/util/common'
import { Toast } from 'mint-ui'
export default {
components:{
    'v-baseline': Baseline,
    'v-prolist': prolist,
    [List.name]: List
    
  },
    data() {
      return {
        list: [],
      loading: false,
      finished: false,
      pageNum:0,
      Sortid:0,
      };
    },
created(){
  if(this.datas)
  {
    this.$store.state.detail.lastpara= this.datas[this.$store.state.category.tabIndex].ID ||0;
  }
},
watch: {
            '$store.state.category.tabIndex' (val, old) {
                  if(val!=old)
                  {
                    this.$store.state.detail.lastpara=this.datas[this.$store.state.category.tabIndex].ID ||0;
                      this.list=[];
                      this.pageNum=0;
                      this.Sortid=0;
                      this.finished=false;
                      this.$forceUpdate();
                      //this.onLoad();
                  }
            },
            'Sortid' (val, old) {
                  if(val!=old)
                  {
                      this.list=[];
                      this.pageNum=0;
                      this.finished=false;
                      this.$forceUpdate();
                  }
            }
        },
  props:['datas'],
  methods:{
      checkPic:function(picurl){return this.$conf.domain + '/' + picurl;},
     onLoad() {
        //this.loading=true;
        this.$dopost('/sysapi/pro/list/', {'get_detail':1,'viewloading':0,'page':this.pageNum+1,'sort_id':this.Sortid>0?this.Sortid:(this.datas[this.$store.state.category.tabIndex].ID||0)},
        function (res) {
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
          {

            if(this.$store.state.index.currentPage.page!=window.location.href)
            {
              this.$store.state.index.currentPage.name = '菜谱';
              this.$store.state.index.currentPage.desc = res.data.data.mallsort.NAME
              this.$store.state.index.currentPage.page = window.location.href
              this.$store.state.index.currentPage.image = Util.getNull(res.data.data.PRO)?this.$conf.domain + '/' +res.data.data.PRO[0].PIC:'';
              
            }



            for (let i = 0; i <res.data.data.PRO.length; i++) {
              this.list.push(res.data.data.PRO[i]);
            }
            this.pageNum=parseInt(res.data.data.page);
            if(parseInt(res.data.data.page)>=parseInt(res.data.data.allpage))
            {
              this.finished=true;
            }
            this.loading=false;
          }
          else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
        }.bind(this));
      },
      changeSort(i) {
         //this.$store.commit('CHANGE_TABINDEX',i)
      }
		  },
  computed:{
    // 获取当前aside栏选择的是第几个
    tabIndex(){
      return this.$store.state.category.tabIndex
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 9.8;
  height: 100%;
  &::-webkit-scrollbar {display:none}
          .active {

          color: red;

        }
  >h2 {
    font-size: 24px;
    padding: 2vw 4vw;
    color:#333;
    letter-spacing: 2px;
    background-color: rgb(247, 247, 247);
  }
  >ul {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    //justify-content: space-around;
    flex-wrap: wrap;
    //background-color: rgb(247, 247, 247);
    li {
      //background-color: rgb(247, 247, 247);
      //width: 33%;
      text-align: center;
      a {
        color: #666;
        display: block;
        img {
          display: block;
          width: 60%;
          margin: 4vw auto;
        }
        span {
          text-align: center;
        }
      }
    }
  }

}
</style>
