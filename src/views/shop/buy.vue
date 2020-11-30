<template>
  <div class="buy_details">
    <div class="bar">
      <img src="@/assets/shop/buy/arrow.png" alt="" />
      <span>确认订单</span>
    </div>
    <div class="address">
      <section>
        <div class="title">
          <span class="name">木子李</span>
          <span class="tel">18553296666</span>
          <span class="tag">默认</span>
        </div>
        <div class="house">山东青岛市崂山区深圳路888号6号楼1单元101室</div>
      </section>
      <img src="@/assets/shop/buy/change.png" alt="" />
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in 3" :key="index">
        <img src="@/assets/shop/buy/pro.png" alt="" />
        <div class="detail">
          <div class="title">全麦无糖粗粮馒头王哥庄铁锅大馒头手工馒头山东全麦无糖粗粮馒头王哥庄铁锅大馒头手工馒头山东</div>
          <section>
            <div class="style">
              <p v-if="index < 2">口味：全麦（4两）6+原味</p>
              <p>￥639</p>
            </div>
            <div class="num">x1</div>
          </section>
        </div>
      </div>
      <div class="input">
        <input type="text" placeholder="有什么对我们说的可以在这里留言哦~">
      </div>
    </div>

    <div class="sale">
      <div class="sales">优惠券</div>
      <div>
        <span>无可用</span>
        <img src="@/assets/shop/buy/change.png" alt="" />
      </div>
    </div>

    <div class="discount">
      <ul>
        <li>
          <div>商品合计</div>
          <div>￥1265.00</div>
        </li>
        <li>
          <div>运费</div>
          <div>￥0.00</div>
        </li>
        <li>
          <div>总折扣</div>
          <div>￥18.56<span>(含运费税￥1.56)</span></div>
        </li>
      </ul>
    </div>

    <div class="bottomBuy">
      <div class="total">
        <p>共3件商品</p>
        <p class="price">总计： ￥1189.90</p>
      </div>
      <div class="btn">提交订单</div>
    </div>
  </div>
</template>
<script>
import "@/css/shop/buy.scss";
export default {
  data() {
    return {
      value: "",
      radio: "",
      result: [],
      isAll: false,
      checked: "",
    };
  },
  methods: {},
};
</script>