<template lang="html">
  <div  id="im_main" style="min-height:100%,height:100%">
<van-nav-bar
  title="通讯"
  left-text=""
  left-arrow
  @click-left="$router.go(-1)"
/>
<div class="im" >
  <ul >
    <li v-if="$store.state.im.mess_new_friend.length==0 ">暂无经常联系人。。。</li>
  <template v-for="(k,i) in $store.state.im.mess_new_friend" >
    <li @click="$router.push({path:'/im',params:{id:k.id.toString()}})"  style="cursor:pointer">
      <div class="msg_top left">
        <van-image width="40" height="40" round :src="k.avatar || 'http://www.chuanhaisoft.com/images/default_top.jpg'" error-icon="http://www.chuanhaisoft.com/images/default_top.jpg" />
      </div>
      <div style="margin: auto 0;padding-left:0px;">
        {{k.username || '无名氏'}}
        <span class="badge" v-if="$store.state.im.count>0 && $store.state.im.unRead.hasOwnProperty((k.hasOwnProperty('type') && k.type=='group')?k.id.toString()+'_g':k.id.toString()) && $store.state.im.unRead[(k.hasOwnProperty('type') && k.type=='group')?k.id.toString()+'_g':k.id.toString()].length>0">
          {{$store.state.im.unRead[(k.hasOwnProperty('type') && k.type=='group')?k.id.toString()+'_g':k.id.toString()].length.toString()}}
        </span>
        
      </div>
    </li>
  </template>
  </ul>
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
     
      page:0,
      isloading:false,
      clientHeight: '100px',
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
    }
  },
  updated:function(){
    
  },
  watch:{
    '$store.state.im.user':function () {
      if(this.$store.state.im.user[this.UserID])
      {

      }
    }
  },
  beforeCreate () {

  },
  beforeMount(){
    
  },
  mounted()
  {
    //console.log(this.$store.state.im.mess_new_friend);

  },
  destroyed () {
    //window.removeEventListener('scroll', this.handleScroll)
  },
  methods:{
   
  }
}

</script>

<style lang="less" scoped>
.badge {
  display: inline-block;
  min-width: 6px;
  height: 9px;
  padding: 4px 5px;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: red;
  border-radius: 10px;
}
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
.msg_top{width:50px;height:100%;text-align:center}
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
