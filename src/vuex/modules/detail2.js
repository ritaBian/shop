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
  ShowSelectType:false //是否显示选择type
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

  ['SET_DATAS2'](state,pro) {
    //state.proData = res;
	
	let rs={'PRO':pro};
	rs['TYPE']=pro.DETAIL.TYPE;
	rs['YUN_FEI']=pro.DETAIL.YUN_FEI;
	rs['GUIGE']=pro.DETAIL.GUIGE;
	rs['PROMOTION']=pro.DETAIL.PROMOTION;
  state.proData=rs;

  state.ShowSelectType=false;
  state.selectType={};
	//console.log(state.proData);
    //Vue.set(state.proData.PRO, 'PICS', res.PRO.PICS);
    //state.proData.PRO.PICS=res.PRO.PICS;
	
  },
  ['CHANGE_COL_SELECTED2'](state,res) {
    //state.colSelected = res;
    state.selectType[res[0]+'']=res[1]+'';
    //console.log(state.selectType);
},

}

let vm = new Vue({});

const actions = {

// 父组件发送异步请求
  setDatas2({commit},pro) {
    //commit('SET_DATAS',res);
	let rs={'PRO':pro};
	//rs['']
	//state.proData=['PRO':res];
  }

}

// 如同计算属性,处理state的某个状态
const getters = {


}




export default {
  state,
  actions,
  getters,
  mutations
}
