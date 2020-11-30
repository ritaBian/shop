// import axios from 'axios'
import store from '@/vuex/store.js'

// const api = axios.create();

function getComment(){
  var data = {
   page:1,
  }
  this.$dopost('/sysapi/travel/ip/', data,function (res) {
    if(res.data && typeof(res.data.error) != "undefined" && res.data.error===0){
        var city = {
          id:res.data.data.id,
          name:res.data.data.name
        };
        this.$store.state.index.city = city
        this.$store.state.index.areaList = res.data.data.children
    }else{
      Toast((res.data && res.data.mess)?res.data.mess:'接口错误');
    }
  }.bind(this));
}


export default  {
	getComment,//登录

}
