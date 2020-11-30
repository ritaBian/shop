import Util from '../../util/common'

const state = {
  id:null,
  page:0,
  CurrChatArea:'',//当前聊天窗口地区
  CurrChatAreas:{},//聊天窗口地区
  MessLogPageSize:10,//聊天记录页大小
  CurrChatID:"",//当前聊天窗口主键
  CurrChatType:"",//当前聊天窗口类型
  FindFriendList:[],//查找接口返回的列表
  notification:[],//系统消息
  NotDealNotifyCount:0,
  isloading:false,
  isfinished:{},
  SetFinishedTime:0,
  friend:[],
  mess_new_friend:[],//最新来消息的朋友列表
  group:{},
  viewed:[],//chat_list 已加载的mid
  user:{},
  send:{},//要发送的消息
  sendOther:[],//要发送的除消息外的包
  recive:{},
  recive_chat:[],
  unRead:[],
  count:0,//未读消息数
  lastInitTime:0,
  lastSendAuthTime:0,
  lastSendPingTime:0,
  appState:'',//app状态
  lastPlayTime:0,
  chat_list:{
    last_send_time:0,
    last_recive_mid:''
  },
  pingCount:0,
  socket: {
    isConnected: false,
    lastLoginTime:0,
    isLogined:false,
    session_id:'',
    reconnectError: false,
  },
  
}

const mutations = {
  ['SOCKET_ONOPEN'] (state, event) {
    //state.socket.isConnected = true;
    //this._vm.$set(state.socket,'isConnected',true);
  },
  ['SOCKET_ONMESSAGE'] (state,message) {
  },
  ['SOCKET_ONCLOSE'] (state, event) {
    console.log('SOCKET_ONCLOSE');
    /**
	state.socket.isConnected=false;
    state.socket.isLogined=false;
    state.socket.session_id='';
    state.socket.lastLoginTime=Date.parse(new Date());

    state.isloading=false;
    state.isfinished=false;
    
    
    this._vm.$connect();
**/
  },
  ['SOCKET_ONERROR'] (state, event)  {
    console.error(state, event)
  },
};

const actions = {
  xxxxxxxxx({commit})
  {

  }
}

export default {
  state,
  mutations,
  actions
}
