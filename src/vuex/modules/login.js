import Util from '../../util/common'
import * as types from '../types'

const state = {
  token:0,
  username:'',
  password:'',
  CurrPage:'',//tab当前page
  fenxiao:{},
  timeDiff:0,//时间差
}

const mutations = {
  [types.CHANGE_USER] (state,para) {
    state.token = para[0];
    state.username = para[1];
    state.password = para[2];
    Util.setLocal([state.username,state.password],'loginedUser');
  },
  [types.TIME_DIFF](state,_time) 
  {
    if(global.IsNum(_time))
    {
      state.timeDiff=_time-parseInt(Date.parse(new Date())/1000);
    }
  }
  
}


export default {
  state,
  mutations
}
