<template lang="html">
  <div  id="im_main" style="min-height:100%,height:100%">
<van-nav-bar
  :title="UserName"
  left-text=""
  left-arrow
  @click-left="$router.go(-1)"
/>
<!-- @touchend='onScroll'  @scroll="onScroll" -->
<div class="im" id="im_mess" ref="im_mess"  @scroll="onScroll">
  <ul style="display:flex;flex-direction:column-reverse;-webkit-flex-direction:column-reverse;">
    <li v-if="$store.state.im.recive_chat.length==0 ">暂无通讯消息。。。</li>
    
  <template v-for="(k,i) in $store.state.im.recive_chat" >
    <li :class="[k.from==$store.state.im.id?'':'chatmine']" :id="k.mid">
      <div class="msg_top left">
        <van-image width="40" height="40" round :src="$store.state.im.user[k.from+'']['pic']" error-icon="http://www.chuanhaisoft.com/images/default_top.jpg" />
        
      </div>
      <div class="msg_text">
        <div class="username">
          <span v-if="$store.state.im.user[k.from+'']">{{$store.state.im.user[k.from+'']['name']}}</span>
          <span>{{k.content['time']}}</span>
          <span v-if="$store.state.im.send[k.mid]"><van-loading type="spinner" color="green" size="15px" /></span>
          </div>
        <div class="msg_text_text" v-html="ImTxt(k.content.text || '')"></div>
      </div>
    </li>
  </template>
  </ul>
</div>


<div class="msginput" id="msginput">
<van-cell-group>
  <van-field
    center
    v-model="message"
    @keyup.13 = "SendMess"
    placeholder="请输入消息内容"
  >
    <van-button slot="button" size="small" style="height:40px;" type="primary" @click="SendMess">发送</van-button>
  </van-field>
</van-cell-group>
</div>


  </div>
</template>

<script>
import { Button,Field,CellGroup,NavBar,Toast,Loading,Image as VanImage} from 'vant';
import 'vant/lib/index.css';
import Im from '@/util/im'

export default {
  components:{
    [Button.name]:Button,
    [VanImage.name]:VanImage,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [NavBar.name]:NavBar,
    [Loading.name]:Loading,
  },
  data(){
    return {
      UserID:'',UserIdSign:'',
      MessType:'friend',
      UserName:'',

      message:'',
      page:0,
      isloading:false,
      clientHeight: '100px',
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
    }
  },
  updated:function(){
    if(this.$store.state.im.page==1)
    {
      this.ToEnd();
    }
    else
    {
      if(this.$store.state.im.chat_list.last_recive_mid)
      {
        document.getElementById(this.$store.state.im.chat_list.last_recive_mid).scrollIntoView();
        this.$store.state.im.chat_list.last_recive_mid='';
      }
    }
  },
  watch:{
    '$store.state.im.user':function () {
      if(this.$store.state.im.user[this.UserID])
      {
        this.UserName=this.$store.state.im.user[this.UserID]['name'];
      }
    },
    clientHeight(){
      this.ToEnd();
    },
    '$store.state.im.socket.isLogined':function(){
      if(this.$store.state.im.page==0 && this.$store.state.im.socket.isConnected)
      {
        this.LoadMore();
        this.ToEnd();
      }
    }
  },
  beforeCreate () {
  
  this.$router.push({
        	path: '/imlist'
        })
  
    this.$store.state.im.recive_chat=[];
    //ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //this.List=ds.cloneWithRows(store.state.im.recive);
  },
  beforeMount(){
    this.UserID=this.$route.query.id || this.$conf.ChuanHai_ServieID;
    if(this.UserID.indexOf(".")==-1)
    {
      this.UserID=this.UserID+this.$conf.ChuanHai_DomainID;
    }

    this.UserIdSign=this.UserID;
    
    if(this.MessType=='group')
    {
      this.UserIdSign=this.UserID+'_g';
    }

    if(this.UserID.substr(-2, 2)==".2")
    {
      Im.SendKeFuSelect(this.UserID);
    }

    this.$store.state.im.CurrChatID=this.UserID;
    this.$store.state.im.CurrChatType=this.MessType;

    Im.CheckRevice(this.UserIdSign);

    if(this.MessType=='friend')
    {
      if(this.$store.state.im.user[this.UserID])
      {
        this.UserName=this.$store.state.im.user[this.UserID]['name'];
      }
      if(this.$store.state.im.recive[this.UserID].length>0)
      {
        for(let i=0;i<this.$store.state.im.recive[this.UserID].length;i++)
        {
          this.$store.state.im.recive_chat.push(this.$store.state.im.recive[this.UserID][i]);
        }
      }
      else
      {
        this.LoadMore();
      }
    }


  },
  mounted()
  {
    Im.SendReciveQos(this.UserIdSign);
    /** 
    window.onResize = ()=>{alert('--');
        return(()=>{
            //this.showHeight = document.body.clientHeight;
            //document.getElementById("im_main").style.height = this.showHeight+'px';
            alert(document.getElementById("im_main").style.height);
            

        })()
    }
*/
    if(this.isWeixinCient())
    {
      document.body.addEventListener('focusin', this.KeyIn);
      document.body.addEventListener('focusout', this.KeyOut);
    }
    
    document.getElementById("im_main").style.height = 'auto';//this.showHeight+'px';
    //alert(document.getElementById("im_main").style.height);

    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const that = this;
    window.onresize = function temp() {
        that.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };
    if(this.$store.state.im.page==0 && this.$store.state.im.socket.isConnected)
    {
      ////Im.SendChatList(this.UserID.toString(),this.MessType,this.$store.state.im.page+1);
    }
    this.ToEnd();
    //window.addEventListener('scroll', this.handleScroll)
    //发送已读qos
    ////Im.SendReciveQos(this);
  },
  beforeDestroy(){
    if(this.isWeixinCient())
    {
      document.body.removeEventListener('focusin', this.KeyIn);
      document.body.removeEventListener('focusout', this.KeyOut);
    }

  },
  destroyed () {
    //window.removeEventListener('scroll', this.handleScroll)
  },
  methods:{
    LoadMore(){
      Im.SendChatList(this.UserID.toString(),this.MessType,this.$store.state.im.page+1);
    },
    isWeixinCient(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    ImTxt(a){
      return Im.ImTxt(a);
    },
    ToEnd(){
      this.$nextTick(function(){
      var div = document.getElementById('im_mess');
      div.scrollTop = div.scrollHeight;
      })
    },
    KeyIn(){
      document.getElementById("msginput").style['padding-bottom']='100px';
      var div = document.body;
      div.scrollTop = div.scrollHeight;
      this.ToEnd();
      //console.log('focusin');
    },
    KeyOut(){
      document.getElementById("msginput").style['padding-bottom']='0px';
       var div = document.body;
      div.scrollTop = 0;
    },
    onScroll (ev) {
      //if((parseInt(Date.parse(new Date()))-parseInt(this.$store.state.im.chat_list.last_send_time))/1000<=1){return;}
      let scrollTop=this.$refs.im_mess.scrollTop;
      if(scrollTop<300 && !this.$store.state.im.isloading && !this.$store.state.im.isfinished)
      {
        this.$store.state.im.isloading=true;
        this.$store.state.im.chat_list.last_send_time=Date.parse(new Date());
        this.LoadMore();
      }
      //console.log(scrollTop)
      //this
    },
    SendMess(){
      if(this.message)
      {
        Im.SendMess(this.message,this.UserID,this.MessType);
        this.message='';
        this.ToEnd();
      }
      else{Toast('请输入消息内容！')}
      
    }
  }
}

</script>

<style lang="less" scoped>
.im {
  font-size: 16px;
  height:calc(~"100vh - 46px - 70px");
  height:-webkit-calc(~"100vh - 46px - 70px"); 
  height:-moz-calc(~"100vh - 46px - 70px"); 
  overflow-y:auto;
  //background-color:rgba(117, 107, 107, 0.199);
  padding-top: 0vh;padding-left:1vw;padding-right:1vw;
  padding-bottom: 10px;
  //bottom:10vh;
  li{
    display: flex;
    justify-content: flex-start;
    padding-top:15px;
    }
}
.username
{
  line-height: 24px;
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  text-align: left;
  font-style: normal; 
}
.im_pic{width:55px;height:55px;border-radius:100%;}
.msg_top{width:60px;height:100%;}
.msginput{
  //position: fixed;
  bottom:0px;height:60px;overflow:hidden;
}
.msg_text_text
{    
  position: relative;
  min-height: 22px;
  line-height: 22px;
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #eee;
  border-radius: 3px;
  color: #333;
  word-break: break-all;
 }
.msg_text_text2
{    
  position: relative;
  min-height: 22px;
  line-height: 22px;
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #5FB878;
  border-radius: 3px;
  color: #333;
  word-break: break-all;
 }
.msg_text{padding-left:1vw;}
.left{float: left;}
span{display:-moz-inline-box;display:inline-block;}
.chatmine
{
  //position:absolute;
  .msg_text_text{background-color:#5FB878;}
}
</style>
