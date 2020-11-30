<template lang="html">
  <footer class="footer">
    <router-link :to="{path:'/'}" class="footer-index">
      <i class="icon-index"></i>
    </router-link>
    <router-link  :to="{path:'/car'}" class="footer-gocar">
      <i class="icon-car"></i>
      <span v-if="count">{{count}}</span>
    </router-link>
    <span class="footer-addcar" @click="addIntoCar">
      加入购物车
    </span>
  </footer>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
   computed:{

     count(){
       //页面刷新后 数据会消失,解决:加判断
       if(this.$store.state.detail.count=='') {
          this.$store.commit('CHANGE_COUNT');
       }
       return this.$store.state.detail.count
     },
     productDatasView(){
       return this.$store.state.detail.proData.PRO
     },
     colSelected(){
       return this.$store.state.detail.colSelected
     },
     sizeSelected(){
       return this.$store.state.detail.sizeSelected
     }
   },
mounted () {
      this.$parent.$on("addToCart", function(onlyChangePrice){
          this.$store.state.detail.proData.PRO.PRICE='';
          this.$store.state.detail.proData.PRO.HUI_DIAN='';
          this.$store.state.detail.proData.PRO.POINT='';
          this.addIntoCar('', onlyChangePrice);
      }.bind(this));
 
    },
   methods:{
     addIntoCar(){
       var onlyChangePrice = arguments[1] ? arguments[1] : false;
       var proParaCheck=true;
       Object.keys(this.$store.state.detail.selectType).forEach(function(key){
         if(!this.$store.state.detail.selectType[key] || parseInt(this.$store.state.detail.selectType[key])<=0){
           if(!onlyChangePrice)Toast({message:'请选择完整的产品属性'});
           proParaCheck=false;
         }
       }.bind(this));
       var typeId=0;
       var typeIdBool=true;
       //console.log(this.$isEmptyObject(this.$store.state.detail.proData.GUIGE));
       if(proParaCheck && this.$isEmptyObject(this.$store.state.detail.proData.GUIGE)==false){
          Object.keys(this.$store.state.detail.proData.TYPE).forEach(function(key)
          {
            let jiekou=this.$store.state.detail.proData.TYPE[key]['GUI_GE_JSON'];
            jiekou=JSON.parse(jiekou);

            typeIdBool=true;//console.log('----type:'+this.$store.state.detail.proData.TYPE[key]['GUI_GE_JSON']);
            //console.log(this.$store.state.detail.selectType);
            for(let k in jiekou)
            {
              typeIdBool = typeIdBool && (jiekou[k]==this.$store.state.detail.selectType[k]);
            }
            if(typeIdBool==true)typeId=this.$store.state.detail.proData.TYPE[key];
            //console.log(typeId);
          }.bind(this));

          if(typeId==0)
          {
            if(!onlyChangePrice)Toast({message:'该产品属性无价格设置'});
            return;
          }
         
       }
       if(this.$store.state.detail.proData.GUIGE.length==0)typeId=this.$store.state.detail.proData.TYPE[0];
       if(onlyChangePrice)
       {
         this.$store.state.detail.proData.PRO.PRICE=typeId['PRICE'];
         this.$store.state.detail.proData.PRO.HUI_DIAN=typeId['HUI_DIAN'];
         this.$store.state.detail.proData.PRO.POINT=typeId['POINT'];
         return;
       }
      //  mint-ui的弹出式提示框
      const product = [{
        title:this.productDatasView.NAME,
        price:this.productDatasView.PRICE,
        id:this.productDatasView.ID,
        count:1,
        promotion:this.$store.state.detail.proData.PROMOTION,
        yunfei:this.$store.state.detail.proData.YUN_FEI,
        type:JSON.parse(JSON.stringify(typeId)),
        imgPath:this.$conf.domain + '/' + this.$store.state.detail.proData.PRO.PIC,
        choseBool:true
      }];
      if(proParaCheck){
       if(typeId.length==0){
              Toast({
                message:'产品属性错误',
                duration:2000
              });
       }else{
          this.$store.dispatch('addCarList',product);
          this.$store.dispatch('setLocalCount',true);
          //this.$forceUpdate();
              Toast({
                message:'添加成功',
                duration:2000
              });
       }

      }

/**
       MessageBox
         .confirm
           (
             `商品名称:${product[0].title}</br>`+
             `价格:${product[0].price}</br>`+
             `规格:${product[0].size}</br>`+
             `颜色:${product[0].col}</br>`+
             `商品ID:${product[0].id}</br>`
           )
         .then(action => {      //点击成功执行这里的函数
           this.$store.dispatch('setLocalCount',true);
           this.$store.dispatch('addCarList',product);

            Toast({
              message:'添加成功',
              duration:1000
            });
         },function(err){
       });
**/
     }
   }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/index/style.css';

.footer {
  width: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  height: 14vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  -moz-user-select:none;-webkit-user-select:none;
  .bt();
  .footer-index,
  .footer-gocar,
  .footer-addcar{
    text-align: center;
  }

  .footer-index {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    line-height: 14vw;
    height: 14vw;
    padding-top: 1.5vw;
    border-right-color: #f7f7f7;
    border-right-style: solid;
    .fz(border-right-width,1);

    i {
      .fz(font-size,45);
    }
    &:active {
      background-color: #f1f1f1;
    }
  }


  .footer-gocar {
    position: relative;
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    height: 14vw;
    line-height: 14vw;
    padding-top: 1.6vw;
    span {
      height: 5.5vw;
      width: 5.5vw;
      line-height: 5.5vw;
      position: absolute;
      top: .5vw;
      right: 5.5vw;
      background-color: @cl;
      border-radius: 50%;
      color: #fff;
      .fz(font-size,24);
    }

    &:active {
      background-color: #f1f1f1;
    }
    i {
      .fz(font-size,48);
    }
  }

  .footer-addcar {
    -webkit-flex: 6;
    -ms-flex: 6;
    flex: 6;
    line-height: 14vw;      height: 14vw;

    color:#fff;
    background-color: @cl;
    letter-spacing: .2vw;
    &:active {
      background-color: #ff7d00;
    }
  }
}
</style>
