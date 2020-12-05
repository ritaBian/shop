import Util from '../../util/common'
import * as types from '../types'
import Vue from 'vue'

// 容器
const state = {
  proData:{'PRO':{'MESS':'','NAME':'','PRICE':''},'GUIGE':{}},  //detail父组件请求的当前页面商品数据
  user:{},
  lastpara:0,
  colSelected:0,   //0是index,表示第一个
  sizeSelected:0,  //0是index,表示第一个
  selectType:{},
  count:0,    //购物车里的商品个数
  countAll:0,  //商品个数*数量
  carList:[],      //购物车的商品列表
  carListIndex:{},//产品id索引
  fetchLoading:false,     //全局加载状态的Loading
  selectedList:'',         //已选择的购物车商品列表
  unSelectedList:'',      //未选择的购物车商品列表,提交订单后用它替换carList
  proDetails:{},//点击详情的时候该产品的详情
  goBuy:[]
}

//更改 store 中的状态的唯一方法:提交 mutation
/*
  购物车逻辑:
      unSelectedList：未打钩的购物车商品列表
      SelectedList：已勾选的购物车商品列表
      carList:购物车商品列表
      当支付成功之后,购物车列表需要减掉SelectedList，留下unSelectedList
      直接用unSelectedList替换当前carList即可
*/
const mutations = {


//异步请求的数据
  [types.SET_DATAS](state,res) {
    state.proData = res;
    //Vue.set(state.proData.PRO, 'PICS', res.PRO.PICS);
    //state.proData.PRO.PICS=res.PRO.PICS;
  },

  //详情页商品颜色的选择
  [types.CHANGE_COL_SELECTED](state,res) {
      //state.colSelected = res;
      state.selectType[res[0]+'']=res[1]+'';
      //console.log(state.selectType);
  },

  //详情页商品尺寸的选择

  [types.CHANGE_SIZE_SELECTED] (state,res) {
      state.sizeSelected = res;
  },

  // 向购物车商品列表添加商品
  [types.ADD_PRODUCT] (state) {
    state.carList = Util.getLocal('carList');
    this.commit('RESET_COUNT');
  },

  //获取当前购物车商品数量
  [types.CHANGE_COUNT] (state) {
    //state.count = state.carList?state.carList.length: '';
    this.commit('RESET_COUNT');
  },

// 重置购物车
  [types.RESET_CARLIST] (state) {
    let DbCat=Util.getLocal('carList');
    state.carList = DbCat?DbCat:[];
    this.commit('RESET_COUNT');
  },

// 重置购物车数量
  [types.RESET_COUNT] (state) {
    //let tmpcarList=Util.getLocal('carList');
    ////state.count = tmpcarList?tmpcarList.length: '';

    let DbCart=state.carList;
    let tmpCount=0;let tmpCartIndex={};

      for(let i=0;i<DbCart.length;i++)
      {
        tmpCount=tmpCount+DbCart[i].count;
        if(!tmpCartIndex.hasOwnProperty(DbCart[i].id.toString()))//=true;//tmpCartIndex[DbCart[i].id.toString()]
        {
          tmpCartIndex[DbCart[i].id.toString()]=DbCart[i].count;
        }
        else
        {
          tmpCartIndex[DbCart[i].id.toString()]=tmpCartIndex[DbCart[i].id.toString()]+DbCart[i].count;
        }
    }
    state.count=tmpCount;
    state.countAll=tmpCount;
    state.carListIndex=tmpCartIndex;//console.log(state.carListIndex);
  },

// loading开关
  [types.SET_LOADING] (state,res) {
    state.fetchLoading = res
  },
// 购物车里打钩的商品
  ['SET_SELECTEDLIST'] (state,res) {
    state.selectedList = Util.getLocal('selectedList')
  },

//购物车里没打钩的商品

  ['SET_UNSELECTEDLIST'] (state) {
    state.unSelectedList = Util.getLocal('unSelectedList')
  },

  // 点击详情该商品的详情
  ['GET_PRODETAILS'] (state,res){
    state.proDetails = res
  },

  // 当前商品直接购买，不添加购物车
  ['BUY_SOME'](state,res){
    console.log(res)
    state.goBuy = res
  }
}

let vm = new Vue({});

// action提交mutations，不直接更改状态（通过store.dispatch触发）
const actions = {

// 父组件发送异步请求
  setDatas({commit},para) {
    vm.$dopost('/sysapi/pro/detail/', {id:para['id']},
		function (res) {
			if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0)
			{
        commit('SET_DATAS',res.data.data);
			}
			else{Toast((res.data && res.data.mess)?res.data.mess:'接口错误');}
    }.bind(this));
/** 
    vm.$api({
        method:'post',
        url:"/detail"
      }).then(response=>{
        commit('SET_DATAS',response.data);
      })
**/
  },

// 购物车数量增减,true是加,false是减
  setLocalCount({commit},bool = true) {
    let count = state.carList.length || 0;
    //Util.setLocal(count,'count');
    commit(types.CHANGE_COUNT);
  },

  //网购物车列表添加数据
  addCarList({commit},res) {
    console.log(res,'res')
    let IsDeal=false;
    for(let i in state.carList)
    {
      if(state.carList[i]['id']==res[0]['id'] && state.carList[i]['type']['ID']==res[0]['type']['ID'])
      {
        state.carList[i]['count']=state.carList[i]['count']+1;
        IsDeal=true;
      }
    }
    if(!IsDeal)
    {//console.log(state.carList);
      state.carList.push(res);
    }
    //console.log(state.carList);
    //Util.saveLocal(state.carList.concat(),'carList');
    Util.setLocal(res,'carList',true);
    commit(types.ADD_PRODUCT);
    //console.log(Util.getLocal('carList'));
  },

  //网购物车列表添加数据
  addCarList2({commit},res) {
    let IsDeal=false;
    for(let i in state.carList)
    {
      if(state.carList[i]['id']==res[0]['id'] && state.carList[i]['type']['ID']==res[0]['type']['ID'])
      {
        state.carList[i]['count']=res[0]['count'];
        IsDeal=true;
      }
    }
    if(!IsDeal)
    {//console.log(state.carList);
      state.carList.push(res);
    }
    //console.log(state.carList);
    //Util.saveLocal(state.carList.concat(),'carList');
    Util.setLocal(res,'carList',true);
    commit(types.ADD_PRODUCT);
    //console.log(Util.getLocal('carList'));
  },

  //重新设置购物车商品列表,把打钩并提交的商品去掉,即保留unSelectedList

  resetCarList({commit,getters}) {
    const unSelectedList = Util.getLocal('unSelectedList');
    Util.setLocal(unSelectedList,'carList');
    commit(types.RESET_CARLIST)
  },
// 重置购物车数量Count,即没打钩的商品的数量
  resetCount({commit,getters}) {
    const count = Util.getLocal('unSelectedList').length;
    //Util.setLocal(count,'count');
    commit(types.RESET_COUNT);
  },

// 删除购物车列表的某一项 （用新的数组直接替换）
  cutCarList({commit},res) {
    Util.setLocal(res,'carList');
    commit(types.RESET_CARLIST);
  },

// 分别保存打钩的商品和为打钩的商品
  setSelectedList({commit,getters}) {
    Util.setLocal(getters.selectedList,'selectedList');
    commit('SET_SELECTEDLIST');
    Util.setLocal(getters.unSelectedList,'unSelectedList');
    commit('SET_UNSELECTEDLIST');

  }

}

// 如同计算属性,处理state的某个状态
const getters = {

    selectedList(state) {
        // choseBool为真的商品 即打钩的商品
       if(state.carList && state.carList!=='') {
         let arr = state.carList.filter((ele)=>{
           return ele.choseBool == true
         });
         return arr
       }
    },

    unSelectedList(state) {
      if(state.carList !=='') {
        let arr = state.carList.filter((ele)=>{
          return ele.choseBool == false
        });
        return arr
      }
    }

}




export default {
  state,
  actions,
  getters,
  mutations
}
