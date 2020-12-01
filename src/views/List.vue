
<template lang="html">
  <div>
<van-nav-bar
  title="商品列表"
  left-text=""
  left-arrow
  @click-left="$router.go(-1)"
/>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <v-prolist :pro="list"></v-prolist>
    </van-list>

    <v-baseline></v-baseline>
    <!-- <v-footer></v-footer> -->
    <v-footer2></v-footer2>
  </div>

</template>


<script type="text/babel">
import Header from '@/common/_header.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { Toast } from 'mint-ui'
import { List,NavBar } from 'vant';
import 'vant/lib/index.css';
import prolist from '@/components/pro/prolist.vue'

import Footer2 from '../common/travel/_footer2.vue'

  export default {
    name:'list',
  components:{
    [NavBar.name]:NavBar,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-footer2': Footer2,
    'v-prolist': prolist,
    [List.name]: List
    
  },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        pageNum:0
      };
    },
created(){
  this.$store.state.detail.lastpara=this.$route.query.sortid || 0;
},
watch: {
            '$route' (to, from) {
                  if(to.path=='/list')
                  {
                    if(this.$store.state.detail.lastpara!=to.query.sortid)
                    {
                      this.$store.state.detail.lastpara=to.query.sortid || 0;
                      this.list=[];
                      this.pageNum=0;
                      this.finished=false;
                      this.$forceUpdate();
                    }
                  }
            }
        },

    methods: {
      onLoad() {
        //this.loading=true;
        this.$dopost('/sysapi/pro/list/', {'get_detail':1,'viewloading':0,'page':this.pageNum+1,'sort_id':this.$route.query.sortid||0},
        function (res) {
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
          {
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
      }
  
},


  };
</script>

<style>


    
</style>