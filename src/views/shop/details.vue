<!--
 * @Descripttion: 
 * @Author: bjp
-->
<template>
  <div class="shopDetais">
    <div class="banner">
      <van-swipe class="my-swipe" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="(i, index) in swiper" :key="index">
          <img :src="checkPic(i)" alt="" class="bg" />
        </van-swipe-item>
      </van-swipe>
      <div class="swipeChange">{{ index * 1 + 1 }}/{{swiper.length}}</div>
      <div class="icon">
        <img
          src="@/assets/shop/details/1.png"
          alt=""
          class="left"
          @click="$router.go(-1)"
        />
        <div class="right">
          <img src="@/assets/shop/details/2.png" alt="" />
          <img src="@/assets/shop/details/3.png" alt="" />
        </div>
      </div>
    </div>
    <div class="backTop" v-if="isShowBack" @click="backTop">
      <van-icon name="back-top" class="backTop_icon" />
    </div>
    <div class="proDesc">
      <div class="desc">
        <div class="top">
          <div class="price">
            <div class="new_price"><span>￥</span>{{view.PRICE}}</div>
            <div class="old_price" v-if="view.SHI_CHANG_PRICE>0">价格<span>￥{{view.SHI_CHANG_PRICE}}</span></div>
            <p>新品</p>
            <p>特价</p>
          </div>
          <div class="allow">
            <img src="@/assets/shop/details/no_allow.png" alt="" />
            <!-- <img src="@/assets/shop/details/allowed.png" alt=""> -->
            <span>收藏</span>
          </div>
        </div>
        <div class="center">{{ view.NAME }}</div>
        <div class="bottom" ref="content">
          <!-- <van-collapse v-model="activeNames" :border="false">
            <van-collapse-item :title="title" name="1">{{
              title
            }}</van-collapse-item>
          </van-collapse> -->
          <div class="content_description_blue">534f34e364xr3we4xwer36xt4ext46erxt4监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件监听切换事件}</div>
        </div>
      </div>
      <!-- 2 -->
      <div class="area">
        <section>
          <div class="item">
            <span>优惠</span>
            <div class="discount1">优惠券</div>
            <div class="discount2">
              <img src="@/assets/shop/details/discount_bg.png" alt="" />
              <span>满98减10</span>
            </div>
          </div>
          <img src="@/assets/shop/details/arrow.png" class="more" alt="" />
        </section>
        <section>
          <div class="item">
            <span>发货</span>
            <div class="text">香港直邮 -<span> 预计7-15工作日送达</span></div>
          </div>
          <img src="@/assets/shop/details/arrow.png" class="more" alt="" />
        </section>
        <section>
          <div class="item">
            <span>送至</span>
            <img
              src="@/assets/shop/details/location.png"
              class="location"
              alt=""
            />
            <div class="text">山东 青岛市 崂山区 金家岭街道</div>
          </div>
          <img src="@/assets/shop/details/arrow.png" class="more" alt="" />
        </section>
        <section>
          <div class="item">
            <span>运费</span>
            <div class="text">满99元免运费</div>
          </div>
          <img src="@/assets/shop/details/arrow.png" class="more" alt="" />
        </section>
      </div>
      <!-- 3 -->
      <div class="grade">
        <div class="title">
          <div class="name">商品评价(28)</div>
          <div class="moreall">
            <span>查看全部</span>
            <img src="@/assets/shop/details/arrow.png" class="more" alt="" />
          </div>
        </div>
        <div class="evl" v-for="(item, index) in 2" :key="index">
          <div class="head">
            <img src="@/assets/shop/details/head.png" alt="" />
            <div class="name">简***泽</div>
          </div>
          <div class="content">
            馒头质量很好，就是价格高一点，2200克45.90元，赶上糕点的价格了。物流特别快！
            馒头质量很好，就是价格高一点，2200克45.90元，赶上糕点的价格了。物流特别快！
          </div>
        </div>
      </div>
      <van-divider
        :style="{ color: '#444', borderColor: '#bbb', padding: '0 130px' }"
        >图文详情</van-divider
      >
      <div class="promise">
        <div class="content">
          <div>商城承诺</div>
          <div>所售商品均为正品，请放心选购！</div>
        </div>
      </div>
    </div>
    <!-- 图片 -->
    <div class="proImg">
      <img
        v-for="(item, index) in 3"
        :key="index"
        :src="require('@/assets/shop/details/img' + (index * 1 + 1) + '.png')"
        alt=""
        class="showImg"
      />
    </div>
    <van-divider
      :style="{ color: '#444', borderColor: '#bbb', padding: '0 130px' }"
      >看了又看
    </van-divider>

    <div class="other">
      <div class="item" v-for="(item, index) in 4" :key="index">
        <div class="img">
          <img src="@/assets/shop/details/morePro.png" alt="" />
          <span>新品</span>
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

    <div class="none">已经到底了</div>

    <!-- 底部固定栏 -->
    <div class="footer">
      <div class="left">
        <div class="tab">
          <img src="@/assets/shop/details/service.png" alt="" />
          <span>客服</span>
        </div>
        <van-badge :content="5" class="badge">
          <div class="tab">
            <img src="@/assets/shop/details/allow.png" alt="" />
            <span>收藏</span>
          </div>
        </van-badge>
        <van-badge :content="5" class="badge">
          <div class="tab">
            <img src="@/assets/shop/details/bag.png" alt="" />
            <span>购物车</span>
          </div>
        </van-badge>
      </div>
      <div class="right">
        <p @click="goBuy">加入购物车</p>
        <p @click="goBuy">立即购买</p>
      </div>
      <!-- <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
        <van-goods-action-button color="#393939" type="warning" text="加入购物车" />
        <van-goods-action-button color="#01a862" type="danger" text="立即购买" />
      </van-goods-action> -->
    </div>

    <!-- 购买 -->
  </div>
</template>
<script>
import "@/css/shop/details.scss";
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
export default {
  //属性
  props: {
    viewBoolean: {
      type: null, //属性类型
      value: "",
      default: true,
      height_content:'',
    },
  },
  data() {
    return {
      activeNames: [],
      title:
        "开发出了鲜嫩松软、口感甜美、造型新颖的“福、禄、寿、喜”系列产品，王哥庄花样馒头已申报青岛市非物质文化遗产",
      index: 0,
      scrollTop: 0,
      isShowBack: false,
      show: false,
      value: "",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.height_content = this.$refs.content==undefined?'':this.$refs.content.offsetHeight;//详情
  },
  watch: {
    scrollTop(val) {
      if (val > 375) {
        this.isShowBack = true;
      } else {
        this.isShowBack = false;
      }
    },
  },
  computed: mapState({
    view: (state) => state.detail.proData.PRO,
    yunfei: (state) => state.detail.proData.YUN_FEI,
    promotion: (state) => state.detail.proData.PROMOTION,
    guige: (state) => state.detail.proData.GUIGE,
    selectType: (state) => state.detail.selectType,
    swiper() {
      //alert( this.$store.state.detail.proData.PRO.PICS);
      return this.$isEmpty(this.$store.state.detail.proData, "PICS", []);
    },
  }),
  beforeCreate() {
    this.$dopost(
      "/sysapi/pro/detail/",
      { id: this.$route.query.id },
      function (res) {
        if (
          res.data &&
          typeof res.data.error != "undefined" &&
          res.data.error === 0
        ) {
          //console.log(res.data.data);
          this.$store.state.detail.selectType = {};
          this.$store.commit("SET_DATAS", res.data.data);

          if (
            this.$store.state.index.currentPage.page != window.location.href
          ) {
            this.$store.state.index.currentPage.name = res.data.data.PRO.NAME;
            this.$store.state.index.currentPage.desc = res.data.data.PRO.NAME2;
            this.$store.state.index.currentPage.page = window.location.href;
            this.$store.state.index.currentPage.image = Util.getNull(
              res.data.data.PICS
            )
              ? this.$conf.domain + "/" + res.data.data.PICS[0]
              : "";
          }
          //this.$forceUpdate();
          //this.$set(this.$store.state.detail.proData.PRO, 'PICS', res.data.data.PRO.PICS);
        } else {
          Toast(res.data && res.data.mess ? res.data.mess : "接口错误");
        }
      }.bind(this)
    );
    //this.$store.dispatch('setDatas',{id:this.$route.query.id});
  },
  methods: {
    // swiper切换
    onChange(index) {
      this.index = index;
    },
    checkPic: function (picurl) {
      return this.$conf.domain + "/" + picurl;
    },
    // 监听滚动
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    // 返回顶部
    backTop() {
      window.scrollTo(0, 0);
    },
    goBuy() {
      this.show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
  .content_description_blue{
  /* width: 3.7rem; */
  // height: 1.6rem;
  // position: absolute;
  // bottom: 0;
  // right: 0.6rem;
  // z-index: 10;
  // background-color: #FFFFFF;
  // color: #3A99E5;
  // font-size: 15px;
  // display: flex;
  // justify-content: flex-end;
  // align-items: center;
}
</style>