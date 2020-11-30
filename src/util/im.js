import Base64 from 'js-base64';

import conf from '../conf';
//import {AppState,Keyboard,NativeModules} from 'react-native';
////import Sound from 'react-native-sound';
////import PushUtil from '~/util/PushUtil';
////import Media from '~/util/media';
import md5 from 'js-md5';
////import Upload from 'react-native-background-upload'
//var logError = 'react-native';

export default 
{
  Login()
  {
    if(global.ChuanHai_This.$store.state.login.token===0)
    {
        //global.ChuanHai_This.$store.commit('RESET_USER_STATE');
    }
    global.ChuanHai_This.$store.state.im.id=global.ChuanHai_This.$store.state.login.username+'.'+conf.ChuanHai_DomainID;
    //console.log("global.ChuanHai_This.$store.state.im.id:"+global.ChuanHai_This.$store.state.im.id);
    if(global.ChuanHai_WS==null )//|| global.ChuanHai_WS.readyState==3
    {
        try{
            global.ChuanHai_This.$connect();
            //global.ChuanHai_WS=new WebSocket(conf.ChuanHai_Url);
            global.ChuanHai_This.$options.sockets.onmessage = (data) => {try{this.Mess(data.data)}catch(e){}};
            global.ChuanHai_This.$options.sockets.onopen = (data) => {global.ChuanHai_WS=global.ChuanHai_This.$socket;global.ChuanHai_This.$store.state.im.socket.isConnected=true;console.log("isConnected");this.SendAuth()};
            global.ChuanHai_This.$options.sockets.onerror = (e) => {this.Close(true);console.log('onerror:'+e.message);};
            global.ChuanHai_This.$options.sockets.onclose = (e) => {this.Close();console.log(e.code, 'onclose:'+e.reason);};
            //this.SendPing();
        }catch (err) {}
    }
  },
  Close(reDoLogin=false)
  {
    global.ChuanHai_This.$store.state.im.pingCount=0;
    global.ChuanHai_This.$store.state.im.socket.isLogined=false;
    global.ChuanHai_This.$store.state.im.socket.isConnected=false;
    global.ChuanHai_This.$store.state.im.socket.session_id='';
    try{
        global.ChuanHai_WS.close();
        global.ChuanHai_WS=null;
    }catch (err) {}

    if(reDoLogin)
    {
        setTimeout(()=>
        {
            this.Login();
        },3*1000);
    }
  },
  Send(data)
  {//console.log('send:');console.log(data);
    if(global.ChuanHai_This.$store.state.im.socket.isConnected==true)
    {
        try{
            data.session_id=global.ChuanHai_This.$store.state.im.socket.session_id;
            global.ChuanHai_WS.send(JSON.stringify(data));
        }catch (err) {}
    }
  },
  IsCurrentPage(id=null,type=null)//AppState.currentState
  {
      let r=  global.ChuanHai_This && global.ChuanHai_This.$store.state.login.CurrPage=="/im" && global.ChuanHai_This.$store.state.im.CurrChatID!="";// && 
      if(id!=null || type!=null)
      {
        r = r && global.ChuanHai_This.$store.state.im.CurrChatID==id && global.ChuanHai_This.$store.state.im.CurrChatType==type;
      }
      return r;
  },
  Mess(mess) 
  {
    if(!mess){return;}

    try{mess=JSON.parse(mess);}catch(e){return;}
    //if(mess['type']!="ping" && mess['type']!="cmd" ){console.log(aaaaaaaaaaa);}
    let from=global.ChuanHai_This.$store.state.im.id;
    ////--console.log("type:"+mess['type']+'--'+mess['type']);
    if(mess['type'])
    {
        switch(mess['type'])
        {
            case 'auth':
                if(mess['session_id'])
                {
                    //this._vm.$set(state.socket,'isConnected',true);
                    global.ChuanHai_This.$store.state.im.socket.isLogined=true;
                    global.ChuanHai_This.$store.state.im.socket.session_id=mess['session_id'];
                    //if(global.ChuanHai_This.$store.state.im.recive.length==0)
                    //{
                    //    this.SendChatList(conf.ChuanHai_ServieID,'friend',global.ChuanHai_This.$store.state.im.page+1);
                    //}
                    this.SendCmd(120,{});
                    this.SendCmd(101,{'ids':from+','+conf.ChuanHai_ServieID});
                    if(global.IsNum(mess.mid))
                    {
                        global.ChuanHai_This.$store.commit('TIME_DIFF',mess.mid);
                    }
                    //保存手机信息以来推送
                    ////PushUtil.SetUserMobileInfo();
                }
                else
                {
                    global.ChuanHai_This.$store.state.im.socket.isLogined=false;
                    this.SendAuth();
                }
                break;
            case 'user_mess':
                let k=mess.content['data'];//console.log('Recive:');console.log(mess);
                for(let key in k)
                {
                    this.VueSet(global.ChuanHai_This.$store.state.im.user, key.toString(), {'name':k[key]['name'],'pic':k[key]['avatar']});

                }
                break;
            case 'find_friend':
                d=mess.content;
                if(d.err==0)
                {
                    if(d.list.length>0)
                    {
                        ////if(global.ChuanHai_This){Keyboard.dismiss();}
                        global.ChuanHai_This.$store.state.im.FindFriendList=d.list;
                    }
                    else
                    {
                        this.toast("没有查到联系人");
                    }
                }
                else
                {
                    this.toast(d.msg);
                }
                break;
            case 'friend_apply_add':
                if(mess.content.error===0)
                {
                    this.toast('添加成功,请等待对方审核');
                }
                else
                {
                    this.toast(mess.content.mess);
                }
                break;
            case 'cmd':
                //console.log(mess);
                switch(mess.content.type)
                {
                    case 'zu_edit':
                        this.toast(mess.content.msg);
                        if(mess.content.error==0)
                        {
                            this.SendCmd(120,{});
                        }
                        break;
                    case 'zu_add':
                        this.toast(mess.content.msg);
                        if(mess.content.error==0)
                        {
                            this.SendCmd(120,{});
                        }
                        break;
                    case 'friend_del':
                        this.toast(mess.content.msg);
                        if(mess.content.error==0)
                        {
                            this.SendCmd(120,{});
                        }
                        break;
                    case 'friend_change_zu':
                        this.toast(mess.content.msg);
                        if(mess.content.error==0)
                        {
                            this.SendCmd(120,{});
                        }
                        break;
                    case 'zu_del':
                        this.toast(mess.content.msg);
                        if(mess.content.error==0)
                        {
                            this.SendCmd(120,{});
                        }
                        break;
                }
                break;
            case 'notification':
                //console.log(mess);
                if(mess.content.hasOwnProperty('mid') && mess.content.mid)
                {
                    let IsHaved=global.ChuanHai_This.$store.state.im.notification.findIndex((value,index,arr) => {
                        return value.hasOwnProperty('mid') && value.mid==mess.content.mid;
                    });
                    if(IsHaved>=0){break;}
                }
                //for(let noti in global.ChuanHai_This.$store.state.im.notification)
                if(mess.content.hasOwnProperty('type'))
                {
                    switch(mess.content.type)
                    {
                        case 'friend_request':
                            mess['dealed']=false;
                            let findarr=global.ChuanHai_This.$store.state.im.notification.filter(item => item.mid===mess.mid )
                            if(!findarr || findarr.length==0)
                            {
                                global.ChuanHai_This.$store.state.im.notification=[mess].concat(global.ChuanHai_This.$store.state.im.notification);
                                this.toast(mess.content.msg);
                            }
                            break;
                        case 'friend_agree':

                            if(mess.to==global.ChuanHai_This.$store.state.im.id)
                            {this.toast(mess.content.msg);}
                            this.SendCmd(120,{});
                            break;
                        case 'friend_refused':
                            if(mess.to==global.ChuanHai_This.$store.state.im.id)
                            {this.toast(mess.content.msg);}

                            break;
                        default :
                            console.log(mess);
                            break;

                    }
                }
                
                let count=0;
                for(let noti in global.ChuanHai_This.$store.state.im.notification)
                {
                    if(!global.ChuanHai_This.$store.state.im.notification[noti].dealed){count++;}
                }
                global.ChuanHai_This.$store.state.im.NotDealNotifyCount=count;
                break;
            case 'friends_list':
                let d=mess.content.content;
                global.ChuanHai_This.$store.state.im.friend=d.friend;//console.log(global.ChuanHai_This.$store.state.im.friend);
                global.ChuanHai_This.$store.state.im.group={};//console.log(global.ChuanHai_This.$store.state.im.group);
                let key1=null;let key2=null;let v2=null;
                for(key1 in d.friend)
                {
                    for(key2 in d.friend[key1]['list'])
                    {
                        v2=d.friend[key1]['list'][key2];
                        this.VueSet(global.ChuanHai_This.$store.state.im.user, v2['id'].toString(), {'name':v2['username'],'pic':v2['avatar']});
                    }
                }
                for(key1 in d.group)
                {
                    v2=d.group[key1];
                    this.VueSet(global.ChuanHai_This.$store.state.im.group, v2['id'].toString(), {'id':v2['id'],'name':v2['groupname'],'pic':v2['avatar'],'is_master':v2['is_master']});
                }
                this.VueSet(global.ChuanHai_This.$store.state.im.user, d.mine['id'].toString(), {'name':d.mine['username'],'pic':d.mine['avatar']});
                break;
            case 'groupchat':
                //console.log("!!!!!!!!!!===groupchat:"+mess['from']);
                id=mess['mid'];
                
                let GroupSing=mess.content['group_id'].toString()+'_g';
                mess.position=mess.from==global.ChuanHai_This.$store.state.im.id?'right':'left';
                
                ////global.ChuanHai_This.$store.state.im.recive.push(mess);
                //if(global.ChuanHai_This.$store.state.im.viewed.indexOf(mess.mid.toString()) > -1){return;}
                if(global.ChuanHai_This.$store.state.im.viewed.hasOwnProperty(mess.mid.toString())){return;}
                global.ChuanHai_This.$store.state.im.viewed[mess.mid.toString()]='';
                this.CheckRevice(GroupSing);
                global.ChuanHai_This.$store.state.im.recive[GroupSing]=[mess].concat(global.ChuanHai_This.$store.state.im.recive[GroupSing]);
                //this.VueSet(global.ChuanHai_This.$store.state.im.recive,mess.from.toString(),global.ChuanHai_This.$store.state.im.recive[mess.from.toString()]);
                global.ChuanHai_This.$store.state.im.recive_chat=[mess].concat(global.ChuanHai_This.$store.state.im.recive_chat);
                
                if(this.IsCurrentPage(mess.content['group_id'].toString(),'group'))
                {
                    this.SendQos(4,id,mess.from.toString());
                    this.SendReciveQos();
                    this.playMusic();
                }
                else
                {
                    global.ChuanHai_This.$store.state.im.unRead[GroupSing].push(mess);
                    this.UpdateUnReadCount();
                    //global.ChuanHai_This.$store.state.im.count=global.ChuanHai_This.$store.state.im.unRead.length;
                    //console.log('----'+global.ChuanHai_This.$store.state.im.unRead.length);
                    this.SendQos(3,id,mess.from.toString());
                    this.playMusic();
                    
                }
                //检测头像
                if(!global.ChuanHai_This.$store.state.im.user[mess['from'].toString()])
                {
                    this.SendCmd(101,{'ids':mess['from'].toString()});
                }

                this.AddToNewMessFriend(mess.content['group_id'].toString(),null,null,'group');

                break;
            case 'chat_list':
                var item=mess.content.list;
                let UserSign=mess.content.toId.toString()+(mess.content.chat_type=='friend'?'':'_g');
                if(!item || item.length<global.ChuanHai_This.$store.state.im.MessLogPageSize)
                {
                    global.ChuanHai_This.$store.state.im.isfinished[UserSign]=true;
                    global.ChuanHai_This.$store.state.im.SetFinishedTime=Date.parse(new Date());
                }
                let ChatCount=item.length;let SetMided=false;
                if(mess.content.hasOwnProperty('position') && mess.content.position)
                {
                    global.ChuanHai_This.$store.state.im.CurrChatArea="("+mess.content.position+")";
                    global.ChuanHai_This.$store.state.im.CurrChatAreas[UserSign]="("+mess.content.position+")";
                }
                
                //if(parseInt(mess.content.page)>global.ChuanHai_This.$store.state.im.page){global.ChuanHai_This.$store.state.im.page=parseInt(mess.content.page);}

                for(let i=0;i<ChatCount;i++)
                {
                    var t=item[i];//console.log(t);
                    if(!global.ChuanHai_This.$store.state.im.viewed.hasOwnProperty(t.mid.toString()))
                    {
                        var mess2={from: t.from_user_id, to: t.id, type: "chat", content: {type:t.type, text: t.content,mid:t.mid,time:t.timestamp}, mid:t.mid.toString()};
                        if(!global.ChuanHai_This.$store.state.im.user[t.from_user_id.toString()])
                        {
                            global.ChuanHai_This.$store.state.im.user[t.from_user_id.toString()]={name:t.username,pic:t.avatar};
                        }
                        ////global.ChuanHai_This.$store.state.im.recive.unshift(mess2);
                        mess2.position=mess2.from==global.ChuanHai_This.$store.state.im.id?'right':'left';
                        this.CheckRevice(UserSign);
                        global.ChuanHai_This.$store.state.im.recive[UserSign]=global.ChuanHai_This.$store.state.im.recive[UserSign].concat(mess2);
                        global.ChuanHai_This.$store.state.im.recive_chat=global.ChuanHai_This.$store.state.im.recive_chat.concat(mess2);
                        if(!t.hasOwnProperty('state') || t.state==4)
                            global.ChuanHai_This.$store.state.im.viewed[t.mid.toString()]='';
                        //第一条可用记录的mid
                        if(!SetMided){global.ChuanHai_This.$store.state.im.chat_list.last_recive_mid=t.mid.toString();SetMided=true;}
                    }

                }
                console.log("recive_chat:");console.log(global.ChuanHai_This.$store.state.im.recive_chat);
                global.ChuanHai_This.$store.state.im.isloading=false;
                //console.log(global.ChuanHai_This.$store.state.im.recive);
                break;
            case 'chat':
                if(mess.content.type && mess.content.type=='rtc'){this.DealChatRtc(mess);return;}
                //console.log("------chat:"+mess['from']);
                let id=mess['mid'];
                
                mess.position=mess.from==global.ChuanHai_This.$store.state.im.id?'right':'left';
                ////global.ChuanHai_This.$store.state.im.recive.push(mess);
                //if(global.ChuanHai_This.$store.state.im.viewed.indexOf(mess.mid.toString()) > -1){return;}
                if(global.ChuanHai_This.$store.state.im.viewed.hasOwnProperty(mess.mid.toString())){return;}
                global.ChuanHai_This.$store.state.im.viewed[mess.mid.toString()]='';
                this.CheckRevice(mess.from.toString());
                global.ChuanHai_This.$store.state.im.recive[mess.from.toString()]=[mess].concat(global.ChuanHai_This.$store.state.im.recive[mess.from.toString()]);
                //this.VueSet(global.ChuanHai_This.$store.state.im.recive,mess.from.toString(),global.ChuanHai_This.$store.state.im.recive[mess.from.toString()]);
                global.ChuanHai_This.$store.state.im.recive_chat=[mess].concat(global.ChuanHai_This.$store.state.im.recive_chat);
                if(this.IsCurrentPage(mess.from.toString(),'friend'))
                {
                    this.SendQos(4,id,mess.from.toString());
                    this.SendReciveQos();
                    this.playMusic();
                }
                else
                {
                    global.ChuanHai_This.$store.state.im.unRead[mess.from.toString()].push(mess);
                    this.UpdateUnReadCount();
                    //global.ChuanHai_This.$store.state.im.count=global.ChuanHai_This.$store.state.im.unRead.length;
                    //console.log('----'+global.ChuanHai_This.$store.state.im.unRead.length);
                    this.SendQos(3,id,mess.from.toString());
                    this.playMusic();
                    
                }
                //检测头像
                if(!global.ChuanHai_This.$store.state.im.user[mess['from'].toString()])
                {
                    this.SendCmd(101,{'ids':mess['from'].toString()});
                }

                this.AddToNewMessFriend(mess['from'].toString());
                break;


            case 'rtc':
 
            break;


            case 'ping':
                if(global.IsNum(mess.mid))
                {
                    global.ChuanHai_This.$store.commit('TIME_DIFF',mess.mid);
                }
                this.DoSendPing();
                break;
            case 'kefu':
                console.log(mess);
                //mess.from="1.2";
                if(mess.content.type==200)
                {
                    let mess_kefu={"time":Date.parse(new Date()),"from":mess.from.toString(),"to":mess.to.toString(),"type":"chat","content":{"type":"kefu_type_select","text":this.KeFuDataToDiv(mess)}}//,"mid":"c15dae83-e51c-4d70-a813-76727427611a","session_id":"aa038c7bc29c90a96fbed148c6b03b0a"
                    id=mess['mid'];
                    mess_kefu.position=mess.from==global.ChuanHai_This.$store.state.im.id?'right':'left';
                    this.CheckRevice(mess.from.toString());
                    global.ChuanHai_This.$store.state.im.recive_chat=[mess_kefu].concat(global.ChuanHai_This.$store.state.im.recive_chat);
                    this.playMusic();
                    //检测头像
                    if(!global.ChuanHai_This.$store.state.im.user[mess['from'].toString()])
                    {
                        this.SendCmd(101,{'ids':mess['from'].toString()});
                    }
    
                    this.AddToNewMessFriend(mess['from'].toString());
                }
                if(mess.content.type==201)
                {
                    let mess_kefu={"time":Date.parse(new Date()),"from":mess.from.toString(),"to":mess.to.toString(),"type":"chat","content":{"type":"text","text":mess.content.data}}
                    id=mess['mid'];
                    mess_kefu.position=mess.from==global.ChuanHai_This.$store.state.im.id?'right':'left';
                    this.CheckRevice(mess.from.toString());
                    global.ChuanHai_This.$store.state.im.recive_chat=[mess_kefu].concat(global.ChuanHai_This.$store.state.im.recive_chat);
                    this.playMusic();
                    //检测头像
                    if(!global.ChuanHai_This.$store.state.im.user[mess['from'].toString()])
                    {
                        this.SendCmd(101,{'ids':mess['from'].toString()});
                    }
    
                    this.AddToNewMessFriend(mess['from'].toString());
                }
  
                
                break;
            case 'qos':
                //console.log(mess);
                let i=mess.content;
                if(i.type=='refresh_friend_list')
                {
                    this.SendCmd(120,{});
                    break;
                }
                if(i.type=='notify_dealed')
                {
                    if(i.deal_type=='friend_agree')
                    {
                        this.SendCmd(120,{});
                    }
                    let count=0;
                    for(let noti in global.ChuanHai_This.$store.state.im.notification)
                    {
                        if(global.ChuanHai_This.$store.state.im.notification[noti].mid==i.mid)
                        {
                            global.ChuanHai_This.$store.state.im.notification[noti].dealed=true;
                            //global.ChuanHai_This.$store.state.im.LastDealNotify=Date.parse(new Date());
                        }
                        if(!global.ChuanHai_This.$store.state.im.notification[noti].dealed){count++;}
                    }
                    global.ChuanHai_This.$store.state.im.NotDealNotifyCount=count;

                    
                    break;
                }
                if(i.type=='rtc')
                {
                    if(i.type_id=="64" && mess.from!=global.ChuanHai_This.$store.state.im.id)
                    {
                        ////global.ChuanHai_This.$store.commit('CHANGE_USER_STATE',mess);
                        //global.ChuanHai_This.$store.state.media.UserState=mess.from.toString();
                    }
                }
                if(i.mid && i.hasOwnProperty('chat_type') && (i["chat_type"]=="chat" || i["chat_type"]=="groupchat") && i.type)
                {
                    if(global.ChuanHai_This.$store.state.im.send.hasOwnProperty(mess.content.mid.toString()))
                    {
                        this.VueDelete(global.ChuanHai_This.$store.state.im.send,mess.content.mid.toString() );
                    }
                    break;
                }
                
                if(i.mid && i.hasOwnProperty('chat_type') && i["chat_type"]=="qos_ok" && i.hasOwnProperty('type_id') && i.type_id=="4")
                {
                    i=null;
                    for(i in global.ChuanHai_This.$store.state.im.unRead) {
                        for(let j = global.ChuanHai_This.$store.state.im.unRead[i].length-1; j >=0; j--) 
                        {
                            if(global.ChuanHai_This.$store.state.im.unRead[i][j]['mid']==mess.content.mid.toString())
                            {
                                this.VueDelete(global.ChuanHai_This.$store.state.im.unRead[i],j );
                            }
                        }
                    }
                    this.UpdateUnReadCount();
                    break;
                }
                break;
        }
    }
    return;
    //{from: "0", to: "71.1", type: "auth", content: {account:"",password:""}, mid: ""}
  },
  DealChatRtc(mess)
  {
    let did=false;
    let rtcTime=(mess.content && mess.content.time && global.IsNum(mess.content.time))?mess.content.time:0;
/** 
    if(!global.ChuanHai_This.$store.state.media.inComeingMess &&  Math.abs((parseInt(Date.parse(new Date())/1000)+global.ChuanHai_This.$store.state.login.timeDiff)-rtcTime)<50 )
    {
        global.ChuanHai_This.$store.state.media.inComeingMess=mess;
        global.ChuanHai_This.$store.state.media.Users=mess.content.text.users;
        global.ChuanHai_This.$store.state.media.type=mess.content.text.type=="video"?"video":"voice";
        console.log('-----------------------------');
        console.log(mess);
        console.log(mess.content.text.users);
        did=true;
        global.ToPage('Rtc',{type:'b'});
        
    }
*/
    //普通chat流程
    let id=mess['mid'];
    
    mess.position=mess.from==global.ChuanHai_This.$store.state.im.id?'right':'left';
    ////global.ChuanHai_This.$store.state.im.recive.push(mess);
    //if(global.ChuanHai_This.$store.state.im.viewed.indexOf(mess.mid.toString()) > -1){return;}
    if(global.ChuanHai_This.$store.state.im.viewed.hasOwnProperty(mess.mid.toString())){return;}
    global.ChuanHai_This.$store.state.im.viewed[mess.mid.toString()]='';
    this.CheckRevice(mess.from.toString());
    global.ChuanHai_This.$store.state.im.recive[mess.from.toString()]=[mess].concat(global.ChuanHai_This.$store.state.im.recive[mess.from.toString()]);
    //this.VueSet(global.ChuanHai_This.$store.state.im.recive,mess.from.toString(),global.ChuanHai_This.$store.state.im.recive[mess.from.toString()]);
    global.ChuanHai_This.$store.state.im.recive_chat=[mess].concat(global.ChuanHai_This.$store.state.im.recive_chat);
    if(did)//this.IsCurrentPage(mess.from.toString(),'friend')
    {
        this.SendQos(4,id,mess.from.toString());
        this.SendReciveQos();
        //this.playMusic();
    }
    else
    {
        global.ChuanHai_This.$store.state.im.unRead[mess.from.toString()].push(mess);
        this.UpdateUnReadCount();
        //global.ChuanHai_This.$store.state.im.count=global.ChuanHai_This.$store.state.im.unRead.length;
        //console.log('----'+global.ChuanHai_This.$store.state.im.unRead.length);
        this.SendQos(3,id,mess.from.toString());
        //this.playMusic();
        
    }
    //检测头像
    if(!global.ChuanHai_This.$store.state.im.user[mess['from'].toString()])
    {
        this.SendCmd(101,{'ids':mess['from'].toString()});
    }

    this.AddToNewMessFriend(mess['from'].toString());
  },
  SendQos(type,mid,to) 
  {
    let from=global.ChuanHai_This.$store.state.im.id;
    this.Send({"session_id":global.ChuanHai_This.$store.state.im.socket.session_id,"from":from,"to":to.toString(),"mid":"","type":"qos","content":{"type":type.toString(),"mid":mid.toString()}});
  },
  SendPing() 
  {
    var that=this;
    setInterval(function()
    {this.DoSendPing()}.bind(that), conf.ImPingTime*1000);
  },
  DoSendPing() 
  {
    
        //如果未登录或者切换了用户则关闭
        if(!global.ChuanHai_This.$store.state.login.username && global.ChuanHai_This.$store.state.im.socket.isConnected)
        {
            this.Close();
        }
        //检测登录状态
        if(global.ChuanHai_This.$store.state.login.token && !global.ChuanHai_This.$store.state.im.socket.isConnected )//&& ((Date.parse(new Date())-global.ChuanHai_This.$store.state.im.socket.lastLoginTime)/1000 >10)
        {
            this.Init();
            //that.Login();
        }
        //未授权
        if(global.ChuanHai_This.$store.state.im.socket.isConnected && (!global.ChuanHai_This.$store.state.im.socket.session_id || global.ChuanHai_This.$store.state.im.socket.session_id==''))
        {
            this.SendAuth();
        }
        //ping
        let from=global.ChuanHai_This.$store.state.im.id;
        var PingShiCha=(Date.parse(new Date())-global.ChuanHai_This.$store.state.im.lastSendPingTime)/1000 ;
        if(global.ChuanHai_This.$store.state.im.socket.isConnected && global.ChuanHai_This.$store.state.im.socket.session_id && PingShiCha>=conf.ImPingTime)
        {
            if(global.ChuanHai_This.$store.state.login.token==0){this.Close();return;}
            global.ChuanHai_This.$store.state.im.lastSendPingTime=Date.parse(new Date());
            let cont=(global.ChuanHai_This.$store.state.im.pingCount==0 || global.ChuanHai_This.$store.state.im.pingCount%10==0 )?{'is_pull':1}:'';
            global.ChuanHai_This.$store.state.im.pingCount++;if(global.ChuanHai_This.$store.state.im.pingCount>90000){global.ChuanHai_This.$store.state.im.pingCount=0;}
            this.Send({"session_id":global.ChuanHai_This.$store.state.im.socket.session_id,"from":from,"to":"0","mid":"","type":"ping","content":cont});
        }
        this.ReSend();
    
  },
  NetChange()
  {
      console.log('NetChange');
      if(global.ChuanHai_This){global.ChuanHai_This.im.Init();}
  },
  Init(vm=null) {//console.log("init:");console.log((parseInt(Date.parse(new Date())) - global.ChuanHai_This.$store.state.im.lastInitTime)/1000);
    
    
    if(vm!=null)
    {
      global.ChuanHai_WS=null;global.ChuanHai_This=vm;global.LastPlay=0;
    }
    if(( parseInt(Date.parse(new Date())) - global.ChuanHai_This.$store.state.im.lastInitTime )/1000 <3){console.log("<3");return;}
    vm.$store.state.im.lastInitTime=parseInt(Date.parse(new Date()));
    ////global.ChuanHai_This.$store.state.im.unRead=[];
    ////global.ChuanHai_This.$store.state.im.recive={};
    global.ChuanHai_This.$store.state.im.page=0;
    global.ChuanHai_This.$store.state.im.isfinished={};
    global.ChuanHai_This.$store.state.im.isloading=false;
    ////global.ChuanHai_This.$store.state.im.viewed=[];
    this.UpdateUnReadCount();
    //global.ChuanHai_This.$store.state.im.count=global.ChuanHai_This.$store.state.im.unRead.length;
    //console.log('--------------------init-----------------------');
    this.Login();
    
  },
  InitInVue(vm=null) {
    this.Init(vm);
  },
  InitService() {//console.log("init:");console.log((parseInt(Date.parse(new Date())) - global.ChuanHai_This.$store.state.im.lastInitTime)/1000);
    if(( parseInt(Date.parse(new Date())) - global.ChuanHai_This.$store.state.im.lastInitTime )/1000 <3){console.log("<3");return;}
    global.ChuanHai_This.$store.state.im.lastInitTime=parseInt(Date.parse(new Date()));
    if(!global.ChuanHai_This)
    {
    global.ChuanHai_WS=null;global.LastPlay=0;
    }
    ////global.ChuanHai_This.$store.state.im.unRead=[];
    ////global.ChuanHai_This.$store.state.im.recive={};
    global.ChuanHai_This.$store.state.im.page=0;
    global.ChuanHai_This.$store.state.im.isfinished={};
    global.ChuanHai_This.$store.state.im.isloading=false;
    ////global.ChuanHai_This.$store.state.im.viewed=[];
    this.UpdateUnReadCount();
    //global.ChuanHai_This.$store.state.im.count=global.ChuanHai_This.$store.state.im.unRead.length;
    //console.log('--------------------init-----------------------');
    this.Login();
    
  },
  SendReciveQos(userid=null) {
     
    //for(var j in global.ChuanHai_This.$store.state.im.unRead)
    let j=(userid==null)?global.ChuanHai_This.$store.state.im.CurrChatID.toString()+(global.ChuanHai_This.$store.state.im.CurrChatType=='group'?'_g':''):userid.toString();
    if(j && global.ChuanHai_This.$store.state.im.unRead.hasOwnProperty(j))
    {
        for(let i=0;i<global.ChuanHai_This.$store.state.im.unRead[j].length;i++)
        {
            this.SendQos(4,global.ChuanHai_This.$store.state.im.unRead[j][i]['mid'],global.ChuanHai_This.$store.state.im.unRead[j][i]['from'].toString());
        }
        ////this.UpdateUnReadCount();//global.ChuanHai_This.$store.state.im.count=global.ChuanHai_This.$store.state.im.unRead.length;
    }
  },
  SendReciveQosByState() {
    if(this.IsCurrentPage())
    {
        this.SendReciveQos();
    }
  },
  UpdateUnReadCount(){
    let c=0;
    for(var i in global.ChuanHai_This.$store.state.im.unRead) 
    {
        c+= global.ChuanHai_This.$store.state.im.unRead[i].length;
    }
    global.ChuanHai_This.$store.state.im.count=c;
  },
  CheckRevice(id) {
    if(!global.ChuanHai_This.$store.state.im.recive.hasOwnProperty(id.toString()))
    {
        global.ChuanHai_This.$store.state.im.recive[id.toString()]=[];
    }
    if(!global.ChuanHai_This.$store.state.im.unRead.hasOwnProperty(id.toString()))
    {
        global.ChuanHai_This.$store.state.im.unRead[id.toString()]=[];
    }
    if(!global.ChuanHai_This.$store.state.im.isfinished.hasOwnProperty(id.toString()))
    {
        global.ChuanHai_This.$store.state.im.isfinished[id.toString()]=false;
    }

                        //检测头像
                        if(!global.ChuanHai_This.$store.state.im.user[id.toString()])
                        {
                            this.SendCmd(101,{'ids':id.toString()});
                        }
    
  },
  ReSend() {
    if(global.ChuanHai_This.$store.state.im.socket.isConnected && global.ChuanHai_This.$store.state.im.socket.session_id && Object.keys(global.ChuanHai_This.$store.state.im.send).length>0)
    {
        for(let i in global.ChuanHai_This.$store.state.im.send)
        {
            this.Send(global.ChuanHai_This.$store.state.im.send[i]);
        }
    }
  },
  SendAuth()
  {
    global.ChuanHai_This.$store.state.im.id=global.ChuanHai_This.$store.state.login.username+'.'+conf.ChuanHai_DomainID;
    
    if(( parseInt(Date.parse(new Date())) - global.ChuanHai_This.$store.state.im.lastSendAuthTime )/1000 <3){console.log('SendAuth<3');return;}
    global.ChuanHai_This.$store.state.im.lastSendAuthTime=parseInt(Date.parse(new Date()));
    console.log(!global.ChuanHai_This.$store.state.im.socket.isLogined);console.log(global.ChuanHai_This.$store.state.login.token);
    if(!global.ChuanHai_This.$store.state.im.socket.isLogined && global.ChuanHai_This.$store.state.login.token==1)
    {
        let from=global.ChuanHai_This.$store.state.im.id;
        let str={userid:from,password:global.ChuanHai_This.$store.state.login.password};
        str=Base64.Base64.encode(JSON.stringify(str));
        this.Send({from:from,to:"0",type:"auth",content:{account:str,password:"123"}});
    }
  },
  SendMess(message,toid,type='friend',messType='text',_mid=null) 
  {
    if(global.ChuanHai_This.$store.state.login.token!=1)
    {
        this.toast("请登录会员后,发送消息");
        return;
    }
    if(typeof(message)=='object')
    {
        //message=JSON.stringify(message);
    }
    else
    {
        if(!message.toString() || message.toString()=='')
        {
            this.toast('请输入消息内容！');
            return;
        }
        message=message.toString();
    }

    let IdSign=toid.toString()+(type=='group'?'_g':'');
    this.CheckRevice(IdSign);

    let from=global.ChuanHai_This.$store.state.im.id;
    let mid = _mid?_mid:this.MakeMid();


    let sendContent={"type":messType,"text":message,"mid":mid.toString()};
    if(type=='group')
    {
        sendContent['group_id']=toid.toString();
    }

    let json={"session_id":global.ChuanHai_This.$store.state.im.socket.session_id,"from":from,"to":(type=='group'?"all":toid.toString()),"mid":mid,"type":(type=='group'?"groupchat":"chat"),"content":sendContent};
    this.Send(json);
    if(!global.ChuanHai_This.$store.state.im.viewed.hasOwnProperty(json.mid.toString()))
    {
        ////global.ChuanHai_This.$store.state.im.recive.push(json);
        json.position='right';

        global.ChuanHai_This.$store.state.im.recive[IdSign]=[json].concat(global.ChuanHai_This.$store.state.im.recive[IdSign]);
        global.ChuanHai_This.$store.state.im.recive_chat=[json].concat(global.ChuanHai_This.$store.state.im.recive_chat);

        global.ChuanHai_This.$store.state.im.viewed[json.mid.toString()]='';
        global.ChuanHai_This.$store.state.im.send[json.mid.toString()]=json;
    }
    
  },
  SendChatList(userid,type) {
    if(global.ChuanHai_This.$store.state.login.token!=1){return;}
    global.ChuanHai_This.$store.state.im.isloading=true;
    let from=global.ChuanHai_This.$store.state.im.id;
    this.CheckRevice(userid.toString()+(type=='group'?'_g':''));
    let tmp=global.ChuanHai_This.$store.state.im.recive[userid.toString()+(type=='group'?'_g':'')];
    let LastIndex=tmp.length>0?tmp[tmp.length-1]['mid']:'0';
    let json={"session_id":global.ChuanHai_This.$store.state.im.socket.session_id,"from":from,"to":0,"mid":"","type":"cmd","content":{"type":100,"mid":LastIndex.toString(),"chat_type":type.toString(),"toid":userid.toString()}};
    this.Send(json);
  },
  MakeMid()
  {
      return global.ChuanHai_This.$store.state.im.id.toString() + Date.parse(new Date()).toString();
  },
  SendKeFuSelect(toid)
  {
    this.SendCmd(200,null,toid);
  },
  SendFriendDel(friendid)
  {
    this.SendCmd(127,{'friendid':friendid});
  },
  SendFriendChangeZu(friendid,zuid)
  {
    this.SendCmd(128,{'friendid':friendid,'zuid':zuid});
  },
  SendFindFriend(k)
  {
    this.SendCmd(121,{'key':k.toString()});
  },
  SendDealFindApplyAdd(s,mid)
  {
    this.SendCmd(s?123:124,{'mid':mid.toString()});
  },
  SendFindApplyAdd(id)
  {
    this.SendCmd(122,{'toid':id.toString()});
  },
  SendFindApplyDeal(id,Do=true)
  {
    this.SendCmd(Do?123:124,{'toid':id.toString()});
  },
  SendZuAdd(name)
  {
    this.SendCmd(151,{'name':name});
  },
  SendZuEdit(id,name)
  {
    this.SendCmd(152,{'groupid':id.toString(),'name':name});
  },
  SendZuDel(id)
  {
    this.SendCmd(154,{'groupid':id});
  },
  AddToNewMessFriend(id,name=null,pic=null,type='friend')//group
  {
    id=id.toString();
    if(type=='friend')
    {
        if(global.ChuanHai_This.$store.state.im.user.hasOwnProperty(id))
        {
            let IsHave=global.ChuanHai_This.$store.state.im.mess_new_friend.filter(i => i.id===id )
            if(!IsHave || IsHave.length==0)
            {
                global.ChuanHai_This.$store.state.im.mess_new_friend=[{"id":id,"type":type,"username":global.ChuanHai_This.$store.state.im.user[id].name,"avatar":global.ChuanHai_This.$store.state.im.user[id].pic}].concat(global.ChuanHai_This.$store.state.im.mess_new_friend);
                //global.ChuanHai_This.$store.state.im.mess_new_friend.push()
            }
        }
        else
        {
            let IsHave=global.ChuanHai_This.$store.state.im.mess_new_friend.filter(i => i.id===id )
            if(!IsHave || IsHave.length==0)
            {
                global.ChuanHai_This.$store.state.im.mess_new_friend=[{"id":id,"type":type,"username":null,"avatar":null}].concat(global.ChuanHai_This.$store.state.im.mess_new_friend);
            }
        }
    }
    else
    {
        if(global.ChuanHai_This.$store.state.im.group.hasOwnProperty(id))
        {
            let IsHave=global.ChuanHai_This.$store.state.im.mess_new_friend.filter(i => i.id===id )
            if(!IsHave || IsHave.length==0)
            {
                global.ChuanHai_This.$store.state.im.mess_new_friend=[{"id":id,"type":type,"username":global.ChuanHai_This.$store.state.im.group[id].name,"avatar":global.ChuanHai_This.$store.state.im.group[id].pic}].concat(global.ChuanHai_This.$store.state.im.mess_new_friend);
            }
        }
        else
        {
            let IsHave=global.ChuanHai_This.$store.state.im.mess_new_friend.filter(i => i.id===id )
            if(!IsHave || IsHave.length==0)
            {
                global.ChuanHai_This.$store.state.im.mess_new_friend=[{"id":id,"type":type,"username":null,"avatar":null}].concat(global.ChuanHai_This.$store.state.im.mess_new_friend);
            }
        }
    }
  },
  SendCmd(CmdType,para=null,to=0) {
    if(global.ChuanHai_This.$store.state.login.token!=1){return;}
    let from=global.ChuanHai_This.$store.state.im.id;
    let json={"session_id":global.ChuanHai_This.$store.state.im.socket.session_id,"from":from,"to":to,"mid":"","type":"cmd","content":{"type":CmdType.toString()}};
    if(para)
    {
        for(let i in para) 
        {
            json['content'][i.toString()]=para[i.toString()].toString();
        }
    }
    this.Send(json);
  },
  html(end){//支持的html标签
    return new RegExp('\\n*\\['+ (end||'') +'(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
  },
  TxtFace(face){
    var alt = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"], arr = {};
    alt.forEach(function( item,index){
      //arr[item] = './static/' + 'face/'+ index + '.gif';
      arr[item] = conf.domain +'/images/im/' + 'face/'+ index + '.gif';
    });
    return arr[face];
  },
  ImTxt(content){var that=this;
    if(typeof(str)!='string'){return content;}
    content = (content||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') //XSS
    .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@
    .replace(/\s{2}/g, '&nbsp') //转义空格
    .replace(/img\[http(s*)\:\/\/([^\s]+?)\.(jpg|png|gif|jpeg)\]/gi, function(img){  //转义图片
      return '<a href="' + img.replace(/(^img\[)|(\]$)/gi, '') + '"><img class="layui-chuanhaiim-photos" src="' + img.replace(/(^img\[)|(\]$)/gi, '') + '"></a>';
    })
    .replace(/face\[([^\s\[\]]+?)\]/g, function(face){  //转义表情
      var alt = face.replace(/^face/g, '');
      return '<img alt="'+ alt +'" title="'+ alt +'" src="' + that.TxtFace(alt) + '">';
    }.bind(that)).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){ //转义链接
      var href = (str.match(/a\(([\s\S]+?)\)\[/)||[])[1];
      var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
      if(!href) return str;
      return '<a href="'+ href +'" target="_blank">'+ (text||href) +'</a>';
    }.bind(that)).replace(this.html(), '\<$1 $2\>').replace(this.html('/'), '\</$1\>') //转移代码
    .replace(/\n/g, '<br>') //转义换行 
    return content;
  },
  playMusic(){
    let IsPlay=true;
    let LastTime=global.ChuanHai_This.$store.state.im.lastPlayTime;
    if(LastTime &&  (parseInt(Date.parse(new Date()))-parseInt(LastTime))/1000<=3  )
    {
        IsPlay=true;
    }
    if(IsPlay)
    {
        global.ChuanHai_This.$store.state.im.lastPlayTime=Date.parse(new Date());
        var au = document.createElement("audio");
        au.preload="auto";
        au.src = "./static/sound/msg.mp3";
        au.play();
        au.remove();
    }
  },
  setLocal (res, key) {
    global.LastPlay=res;
  },
  getLocal (key) {
    return global.LastPlay;
  },
  VueSet(t,k,v){
      if(global.ChuanHai_This)
      {
        global.ChuanHai_This.$set(t,k,v);
      }
      else
      {
        t[k]=v;
      }
  },
  VueDelete(obj,k){
    if(global.ChuanHai_This)
    {
        global.ChuanHai_This.$delete(obj,k)
    }
    else
    {
        delete obj[k];
    }
  },
  toast(mess){
      if(global.ChuanHai_This)
      {
        global.toast(mess);
      }
  },
  KeFuDataToDiv(mess){
    let str='<div>请选择咨询问题类型</div>';
    let l=0;
    for(k in mess.content.data)
    {
        l++;
        str += "<div style='padding-top:10px;padding-bottom:10px'>"+l.toString()+".<a kefu='"+mess.from.toString()+"' href='"+mess.content.data[k]['ID']+"'>" + mess.content.data[k]['NAME'] + "</a></div>"
    }
    str += "";
    return str;
  },
  Upload(path,fn,picname="")//,name
  {
    global.toast("Uploading");
    let formData = new FormData();
    if(path.indexOf("://")==-1)
    {
        path='file://'+path;
    }
    picname=picname?picname:path;
    console.log("--im:path--");console.log((path+"-;-"+picname));
    let UploadTime=Date.parse(new Date()).toString();
    formData.append('file',{uri:path,name:picname?picname:path,type:'application/octet-stream'});//,name:name 'image.png'
    formData.append('user_id', global.ChuanHai_This.$store.state.im.id);
    formData.append('now', UploadTime);
    formData.append('type', 'app');
    formData.append('key', md5(global.ChuanHai_This.$store.state.im.id+global.ChuanHai_This.$store.state.login.password+UploadTime));

    fetch(conf.ChuanHai_UploadUrl, {
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
      }).then(response => {console.log("fetch-response--:");console.log(response);
        if (response.ok) {
          return response.json();
        } else {global.toast('上传失败.');
          return Promise.reject('something went wrong!')
        }
      }).then(fn).catch(err => {
        console.log('err', err);
        global.toast('上传失败..');
      })
  },
  UploadStream(path,fn,picname)
  {
    global.toast("Uploading");
        path=path.replace("file://","");
    let UploadTime=Date.parse(new Date()).toString();
    let Para={name:picname,user_id:global.ChuanHai_This.$store.state.im.id,now:UploadTime,type:'app',key:md5(global.ChuanHai_This.$store.state.im.id+global.ChuanHai_This.$store.state.login.password+UploadTime)};
    const options = {
        url: conf.ChuanHai_UploadStreamUrl,
        path: path,
        method: 'POST',
        //field: 'file',
        //type: 'multipart',
        maxRetries: 10, // set retry count (Android only). Default 2
        headers: {
          'content-type': 'application/octet-stream', // Customize content-type
          'UPLOADPARA': JSON.stringify(Para)
        },
        // Below are options only supported on Android
        notification: {
          enabled: false
        },
        useUtf8Charset: true
      }
/** 
      Upload.startUpload(options).then((uploadId) => {

        console.log('---Upload started')
        Upload.addListener('progress', uploadId, (data) => {
          console.log(`---Progress: ${data.progress}%`)
        })
        Upload.addListener('error', uploadId, (data) => {
          global.toast(`---Error: ${data.error}%`)
        })
        Upload.addListener('cancelled', uploadId, (data) => {
          console.log(`Cancelled!`)
        })
        Upload.addListener('completed', uploadId, (data) => {
          // data includes responseCode: number and responseBody: Object
          console.log('---Completed!');
          //data=JSON.parse(data);
          if(fn && data.responseBody)
          {
            let body=JSON.parse(data.responseBody);
            fn(body);
          }
        })
      }).catch((err) => {
        console.log('---Upload error!', err)
      })
*/

  },
  SelectedType(path){
    let str='';
    path=path?path:'';
    if(path.indexOf(".mp4")>0 || path.indexOf(".mov")>0)
    {
        str='video';
    }
    else
    {
        if(path.indexOf(".jpg")>0 || path.indexOf(".jpeg")>0 || path.indexOf(".png")>0  || path.indexOf(".gif")>0)
        {
            str='image';
        }
    }
    return str;
  }




}
