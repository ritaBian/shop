<!--
 * @Descripttion: 
 * @Author: bjp
-->
<template>
  <div class="shopping_car">
    <van-nav-bar
      title="购物车"
      left-text=""
      right-text="编辑"
      @click-left="$router.go(-1)"
    />
    <div class="pro" v-if="count && carList">
      <div class="item">
        <div class="title">
          <div class="left">
            <van-checkbox name="1" icon-size="18px" @click="checkAll" v-model="isAll"
              >商城自营仓</van-checkbox
            >
          </div>
          <div class="num">共{{ count }}件</div>
        </div>
        <van-checkbox-group
          v-model="result"
          ref="checkboxGroup"
          @change="change"
          icon-size="18px"
        >
          <div v-for="(k, index) in carList" :key="index">
            <van-swipe-cell
              :ref="'swipeCell' + index"
              :before-close="beforeClose2"
            >
              <div class="every">
                <div class="radio">
                  <van-checkbox :name="index"></van-checkbox>
                </div>
                <div class="goBuy">
                  <img :src="k.imgPath" alt="" />
                  <div class="desc">
                    <div class="title2">{{ k.title }}</div>
                    <div class="add">
                      <div class="price">￥{{ (k.type.PRICE * k.count).toFixed(2) }}</div>
                      <van-stepper v-model="k.count" />
                    </div>
                  </div>
                </div>
              </div>
              <template #right>
                <van-button
                  @click="cut(index)"
                  square
                  class="simp"
                  type="danger"
                  text="删除"
                />
                <van-button
                  @click="get(index)"
                  square
                  class="get"
                  type="primary"
                  text="收藏"
                />
                <van-button square class="red" type="primary" text="收藏" />
              </template>
            </van-swipe-cell>
          </div>
        </van-checkbox-group>
      </div>
    </div>

    <!-- 过期 -->
    <div class="outTime">
      <div class="topBtn">
        <p>移入收藏</p>
        <p>快速清理</p>
      </div>
      <div class="item" v-for="(item, index) in 3" :key="index">
        <div class="tag">失效</div>
        <img src="@/assets/shop/car/none.png" alt="" />
        <div class="item_none">
          <p class="dd">
            鲁昭洋青岛特产崂山淡干金钩海米甜晒虾米金钩海米甜晒虾米
          </p>
          <div class="none">
            <div class="price">
              <p>￥639</p>
              <p>商品暂时缺货</p>
            </div>
            <div class="noneBtn">找相似</div>
          </div>
        </div>
      </div>
    </div>
    <van-divider
      :style="{ color: '#444', borderColor: '#bbb', padding: '0 100px' }"
      >你可能会喜欢</van-divider
    >

    <div class="other">
      <div class="item" v-for="(item, index) in 4" :key="index">
        <div class="img">
          <img src="@/assets/shop/details/morePro.png" alt="" />
          <span class="green">新品</span>
        </div>
        <div class="desc">
          青岛特产只是下次吧想三只小熊在想虚啥地方说的说的发生大幅地方知道
        </div>
        <section>
          <div class="price">
            <div class="new"><span>￥</span>59</div>
            <div class="old"><span>￥</span>108</div>
          </div>
          <div class="grade">96%好评</div>
        </section>
      </div>
    </div>
    <div class="nonew">已经到底了</div>

    <div class="footer">
      <van-checkbox v-model="checked" icon-size="18px" @click="checkAll2">全选</van-checkbox>
      <section>
        <div class="total">
          <div class="price">
            总计:
            <span>￥{{ allpay }}</span>
          </div>
          <div class="sale">商品再购<span>63.00</span>元享包邮</div>
        </div>
        <div class="buy" @click="$router.push('/shop/buy')">结算({{selectCount}})</div>
      </section>
    </div>
    <!-- 底部栏 -->
    <v-footer2></v-footer2>
  </div>
</template>
<script>
import "@/css/shop/car.scss";
import Footer2 from "@/common/travel/_footer2.vue";
import Util from '../../util/common'
export default {
  components: {
    "v-footer2": Footer2,
  },
  data() {
    return {
      value: "",
      radio: "",
      result: [],
      isAll: false,
      checked: "",
    };
  },
  computed: {
    carList() {
      return this.$store.state.detail.carList;
    },
    count() {
      return this.$store.state.detail.count;
    },
    selectCount(){
      return this.$store.getters.selectedList.length;
    },
    //勾选的商品的价格总和
    allpay(){
      let all = 0;
      // 如果有勾选商品,计算总价格
      if(this.$store.getters.selectedList) {

        for (let i = 0; i < this.$store.getters.selectedList.length; i++) {
          let tmp=this.$store.getters.selectedList[i];
          console.log(tmp.type.PRICE,tmp.count,tmp.promotion_price)
          all += Util.Jia(Util.Cheng(tmp.type.PRICE,tmp.count),tmp.promotion_price);
        }

      }
      // 没有勾选 即为0
      return all.toFixed(2);

    },
  },
  created() {
    // 初始化先获取购物车商品列表 否则 页面刷新出Bug
    if (this.$store.state.detail.carList == "") {
      this.$store.commit("RESET_CARLIST");
    }
  },
  mounted(){
    this.carList.forEach((item,index) =>{
      if(item.choseBool) this.result.push(index)
    })
  },
  beforeMount() {
     this.SetPromotion();
  },
  methods: {
    checkAll() {
      if (this.result.length < this.carList.length) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    checkAll2(val){
      this.isAll = this.checked
      this.checkAll()
    },
    change(val) {
      if (val.length >= this.carList.length) {
        this.isAll = true;
        this.checked = true
      }
      if (this.isAll && val.length < this.carList.length) {
        this.isAll = false;
        this.checked = false
      }
      
      this.carList.forEach((element,index) => {
        let flag = val.some(item => { return item == index})
        if(!flag) element.choseBool = false
        else element.choseBool = true
      });
      this.toggle()
    },
    get(index) {
      this.$refs["swipeCell" + index][0].open();
      console.log("66666");
    },
    // 删除
    cut(i) {
      this.$dialog.alert({
        title: "提示",
        message: "是否要删除此商品？",
        showCancelButton:true,
        confirmButtonText:'确定',
        cancelButtonText:'取消',
      }).then(() => {
        this.$refs["swipeCell" + i][0].open();
        // 点击垃圾桶，删除当前商品，这里用splice和filter都会bug,只能重置数组
        let newCarList = [];
        for (let k = 0; k < this.carList.length; k++) {
          if (k !== i) {
            newCarList.push(this.carList[k]);
          }
        }
        //点击垃圾桶 把商品数量count-1
        this.$store.dispatch("cutCarList", newCarList);
        this.$store.dispatch("setLocalCount", false);
      }).catch(() =>{
        this.$toast('已取消');
      })
    },
    // 删除前回调
    beforeClose2({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          // console.log('6')
          // Dialog.confirm({
          //   message: '确定删除吗？',
          // }).then(() => {
          //   instance.close();
          // });
          break;
      }
    },
    // 价格
    SetPromotion(){
        if (this.$store.state.detail.carList != "" && this.$store.state.detail.carList.length>0)
        {
            for (let k = 0; k < this.$store.state.detail.carList.length; k++)
            {
                this.$store.state.detail.carList[k]['promotion_id']=0;
                this.$store.state.detail.carList[k]['promotion_price']=0;
                let LastPrice=0;
                for (let o = 0; o < this.$store.state.detail.carList[k].promotion.length; o++)
                {
                    if(Util.Cheng(this.$store.state.detail.carList[k]['price'],this.$store.state.detail.carList[k]['count'])>=Number(this.$store.state.detail.carList[k].promotion[o]['V2']))
                    {
                        if(Math.abs(this.$store.state.detail.carList[k].promotion[o]['V'])>LastPrice)
                        {
                            LastPrice=Math.abs(this.$store.state.detail.carList[k].promotion[o]['V']);
                            this.$store.state.detail.carList[k]['promotion_id']=this.$store.state.detail.carList[k].promotion[o]['ID'];
                            this.$store.state.detail.carList[k]['promotion_price']=Number(this.$store.state.detail.carList[k].promotion[o]['V']);
                        }
                    }

                }
                this.$set(this.$store.state.detail.carList,k,this.$store.state.detail.carList[k]);
                //console.log(this.$store.state.detail.carList[k]);
            }
        }
    },
    // 商品取消选中
    toggle() {
      setTimeout(() => {
          // 每点击一下都会改变choseBool的布尔值,所以要重置数组
          this.$store.dispatch('cutCarList',this.carList)
      }, 0);
    }
  },
};
</script>