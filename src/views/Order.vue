
<template lang="html">
  <div>
<van-nav-bar
  title="订单列表"
  left-text=""
  left-arrow
  @click-left="$router.go(-1)"
/>
<Tabs @click="TabChanged" v-model="active">
  <Tab v-for="i in tabName" :title="i[0]" :key="i[0]">
  </Tab>
</Tabs>

    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <v-orderpro :order="list"></v-orderpro>
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
import { List,NavBar,Tab, Tabs,Toast } from 'vant';
import 'vant/lib/index.css';
import orderpro from '@/components/order/orderpro.vue'

import Footer2 from '../common/travel/_footer2.vue'

  export default {
  components:{
    [NavBar.name]:NavBar,
    Tab,
    Tabs,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-footer2': Footer2,
    'v-orderpro': orderpro,
    [List.name]: List
    
  },
    data() {
      return {
      list: [],
      active:0,
      tabName:[['全部订单','-1'],['待付款','0'],['已付款','1']],//,'退换修'
      loading: false,
      finished: false,
      pageNum:0
      };
    },
created(){
  //this.$store.state.detail.lastpara=this.$route.query.sortid || 0;
},
watch: {
  active:function (){
    this.list=[];
    this.pageNum=0;
    this.finished=false;
    this.onLoad();
  }
},

    methods: {
      onLoad() {
        //this.loading=true;
        this.$dopost('/sysapi/order/list/', {'viewloading':0,'page':this.pageNum+1,'state_pay':this.tabName[this.active][1]},
        function (res) {
          if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
          {
            for (let i = 0; i <res.data.data.ORDER.length; i++) {
              this.list.push(res.data.data.ORDER[i]);
            }
            this.pageNum=parseInt(res.data.data.page);
            if(parseInt(res.data.data.page)>=parseInt(res.data.data.allpage))
            {
              this.finished=true;
            }
            this.loading=false;
          }
          else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
        }.bind(this),true);
      },
    TabChanged(index, title) {
      this.active=index;
    }
},


  };
</script>

<style>


    
</style>