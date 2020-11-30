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
            <van-checkbox name="1" @click="checkAll" v-model="isAll"
              >商城自营仓</van-checkbox
            >
          </div>
          <div class="num">共{{ count }}件</div>
        </div>
        <van-checkbox-group
          v-model="result"
          ref="checkboxGroup"
          @change="change"
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
                      <div class="price">￥{{ k.type.PRICE * k.count }}</div>
                      <van-stepper v-model="value" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- <van-cell :border="false" title="单元格" value="内容" /> -->
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
      <van-checkbox v-model="checked">全选</van-checkbox>
      <section>
        <div class="total">
          <div class="price">
            总计:
            <span>￥568.00</span>
          </div>
          <div class="sale">商品再购<span>63.00</span>元享包邮</div>
        </div>
        <div class="buy" @click="$router.push('/shop/buy')">结算(5)</div>
      </section>
    </div>
    <!-- 底部栏 -->
    <v-footer2></v-footer2>
  </div>
</template>
<script>
import "@/css/shop/car.scss";
import Footer2 from "@/common/travel/_footer2.vue";
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
  },
  created() {
    // 初始化先获取购物车商品列表 否则 页面刷新出Bug
    if (this.$store.state.detail.carList == "") {
      this.$store.commit("RESET_CARLIST");
    }
  },
  methods: {
    checkAll() {
      if (this.result.length < 3) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    change(val) {
      if (val.length >= 3) {
        this.isAll = true;
      }
      if (this.isAll && val.length < 3) {
        this.isAll = false;
      }
    },
    sjpw(e) {
      console.log(e);
    },
    get(index) {
      this.$refs["swipeCell" + index][0].open();
      console.log("66666");
    },
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
  },
};
</script>