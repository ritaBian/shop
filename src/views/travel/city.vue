<template>
  <div class="body">
      <van-nav-bar title="城市选择"  left-arrow  @click-left="onClickLeft" />
      <div class="page_city">
        <div class="page_title ">当前定位城市</div>
        <div class="page_content_border">
          <div :class="['page_content','app_line',cityId==cityNow.id?'page_content_select':'page_content_no_select']" @click="onCity(cityNow)" >
            <van-icon name="location-o" style="margin-right: 0.2rem;" :color="cityId==cityNow.id?'#60A0F0':'#666666'" size="0.85rem"/>
            {{cityNow.name}}
          </div>
        </div>

        <div class="page_title ">城市选择</div>
        <div class="page_content_border">
          <div :class="['page_content','app_line',cityId==item.id?'page_content_select':'page_content_no_select'] " v-for="(item,index) of cityList" :key="index" @click="onCity(item)">{{item.name}}</div>
        </div>


       <!-- <van-index-bar :index-list="indexList" class="indexList_border border">
          <div v-for="(item,index) of indexList" :key="index">
            <van-index-anchor :index="item" />
            <van-cell-group class="indexList_group">
              <van-cell v-for="(items,indexs) of cityIndex[item]" :key="indexs" :title="items.name" ></van-cell>
            </van-cell-group>
          </div>
        </van-index-bar> -->
      </div>


      <van-index-bar :index-list="indexList" class="indexList_border " highlight-color="#60A0F0">
        <div v-for="(item,index) of indexList" :key="index">
          <van-index-anchor :index="item" />
          <!-- <van-cell-group class="indexList_group"> -->
          <van-cell class="indexList_group" v-for="(items,indexs) of cityIndex[item]" :key="indexs" :title="items.name" @click="onCity(items)"></van-cell>
          <!-- </van-cell-group> -->
        </div>
      </van-index-bar>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    name:'city',
    data() {
      return {
        cityList:[
          {
            id:370200,
            name:'青岛市'
          },
          {
            id:310100,
            name:'上海市',
          },
          {
            id:110100,
            name:'北京市',
          },

        ],
        cityLists:[],
        cityNow:'',
        cityId:null,

        indexList: ['A', 'B', 'C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
        cityIndex:{
          A:[],
          B:[],
          C:[],
          D:[],
          E:[],
          F:[],
          G:[],
          H:[],
          // I:[],
          J:[],
          K:[],
          L:[],
          M:[],
          N:[],
          // O:[],
          P:[],
          Q:[],
          R:[],
          S:[],
          T:[],
          // U:[],
          W:[],
          X:[],
          Y:[],
          Z:[],
        },

      }
    },
    computed:{
      checkCh(){
        return function(item){
          console.log(item)
          var aa = Util.checkCh(value)
          // console.log(111,aa)
        }
      }
    },
    updated() {
      this.cityId = this.$store.state.index.city.id

    },
    created() {
      var that = this;
      this.createdIndex()

      this.onShows()
      // 首页跳转
      var index = this.$route.query.type==undefined?'':Number(this.$route.query.type)
      switch(index){
        case 1:
          this.$store.state.index.circuitPageNum = 2
        break;
        case 2:
          this.$store.state.index.indexPageNum = 2
        break;
        case 3:
          this.$store.state.index.trackPageNum = 2
        break;
      }
    },
    methods: {
      onShows(){
        var that = this;
        var data = {
         page:1,
        }
        this.$dopost('/sysapi/travel/ip/', data,function (res) {
        	if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
              this.cityNow = {
                id:res.data.data.id,
                name:res.data.data.name
              };
              // this.cityList = res.data.data.children
              //获取当前页面信息
              if(this.$store.state.index.currentPage.page!=window.location.href){
                this.$store.state.index.currentPage.name = '橡果互动城市选择'
                this.$store.state.index.currentPage.page = window.location.href
                this.$store.state.index.currentPage.image = '';
              }

        	}else{
            Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
          }
        }.bind(this));

      },
      onClickLeft(){
        this.$router.go(-1);
      },
      onCity(item){
        var that = this;
        var cityList = this.$store.state.index.cityList
        console.log(item)
        if(item.id == 0){
          this.$toast('暂不可选');
        }else{
          this.cityId = item.id
          this.$store.state.index.areaList = []
          Util.getCity(item.name)
          
          this.$store.state.index.circuitPageNum = 2
          this.$store.state.index.indexPageNum = 2
          this.$store.state.index.trackPageNum = 2

          this.onClickLeft()
        }

      },
      createdIndex(){
        var that = this;
        var list = this.$store.state.index.cityList.city_list
        for(var i in list){//遍历json对象的每个key/value对,p为key
          var data = {
            id:i,
            name:list[i]
          }
          that.cityLists.push(data)
        }

        that.cityLists.map((item,index) => {
          if(Util.checkCh(item.name)=='A'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.A.push(bb)
          }
          if(Util.checkCh(item.name)=='B'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.B.push(bb)
          }
          if(Util.checkCh(item.name)=='C'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.C.push(bb)
          }
          if(Util.checkCh(item.name)=='D'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.D.push(bb)
          }
          if(Util.checkCh(item.name)=='E'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.E.push(bb)
          }
          if(Util.checkCh(item.name)=='F'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.F.push(bb)
          }
          if(Util.checkCh(item.name)=='G'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.G.push(bb)
          }
          if(Util.checkCh(item.name)=='H'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.H.push(bb)
          }
          // if(Util.checkCh(item.name)=='I'){
          //   var bb = {
          //     id:item.id,
          //     name:item.name
          //   }
          //   that.cityIndex.I.push(bb)
          // }
          if(Util.checkCh(item.name)=='J'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.J.push(bb)
          }
          if(Util.checkCh(item.name)=='K'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.K.push(bb)
          }
          if(Util.checkCh(item.name)=='L'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.L.push(bb)
          }
          if(Util.checkCh(item.name)=='M'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.M.push(bb)
          }
          if(Util.checkCh(item.name)=='N'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.N.push(bb)
          }
          // if(Util.checkCh(item.name)=='O'){
          //   var bb = {
          //     id:item.id,
          //     name:item.name
          //   }
          //   that.cityIndex.O.push(bb)
          // }
          if(Util.checkCh(item.name)=='P'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.P.push(bb)
          }
          if(Util.checkCh(item.name)=='Q'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.Q.push(bb)
          }
          if(Util.checkCh(item.name)=='R'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.R.push(bb)
          }
          if(Util.checkCh(item.name)=='S'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.S.push(bb)
          }
          if(Util.checkCh(item.name)=='T'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.T.push(bb)
          }
          // if(Util.checkCh(item.name)=='U'){
          //   var bb = {
          //     id:item.id,
          //     name:item.name
          //   }
          //   that.cityIndex.U.push(bb)
          // }
          // if(Util.checkCh(item.name)=='V'){
          //   var bb = {
          //     id:item.id,
          //     name:item.name
          //   }
          //   that.cityIndex.V.push(bb)
          // }
          if(Util.checkCh(item.name)=='W'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.W.push(bb)
          }
          if(Util.checkCh(item.name)=='X'&&item.name!='县'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.X.push(bb)
          }
          if(Util.checkCh(item.name)=='Y'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.Y.push(bb)
          }
          if(Util.checkCh(item.name)=='Z'){
            var bb = {
              id:item.id,
              name:item.name
            }
            that.cityIndex.Z.push(bb)
          }
          if(that.cityLists.length-1 == index){
            console.log(that.cityIndex)
          }
        })
      }


    },

  }


</script>

<style scoped="scoped" src="../../css/city.css">
  /* @import url("../../css/city.css"); */
</style>
