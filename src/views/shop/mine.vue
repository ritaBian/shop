<template>
  <div class="mine">
    <article>
      <div class="set">
        <img :src="require('@/assets/shop/mine/set.png')" alt="" @click="logout"  />
        <img :src="require('@/assets/shop/mine/message.png')" alt="" />
      </div>
      <div class="head">
        <img :src="decodeURI($store.state.detail.user.pic)" alt="" />
        <div>
          <p class="name">{{$store.state.detail.user.name || '匿名用户'}}</p>
          <p>{{ $store.state.detail.user.login_name}}</p>
        </div>
      </div>
      <div class="tab">
        <ul>
          <li @click="$router.push('/shop/car')">
            <div>{{$store.state.detail.countAll>0?$store.state.detail.countAll:0}}</div>
            <div>购物车</div>
          </li>
          <li>
            <div>12</div>
            <div>收藏</div>
          </li>
          <li>
            <div>8</div>
            <div>浏览记录</div>
          </li>
          <li>
            <div>23</div>
            <div>优惠券</div>
          </li>
        </ul>
      </div>
      <div class="order">
        <div class="top">
          <div class="title">我的订单</div>
          <div class="all" @click="$router.push({path:'/order'})">
            <span>全部订单 </span>
            <img :src="require('@/assets/shop/mine/arrow.png')" alt="" />
          </div>
        </div>
        <ul>
          <li @click="$router.push({path:'/order'})">
            <img
              :src="require('@/assets/shop/mine/1.png')"
              style="width: 22px; height: 22px"
              alt=""
            />
            <div>待付款</div>
          </li>
          <li @click="$router.push({path:'/order'})">
            <img
              :src="require('@/assets/shop/mine/2.png')"
              style="width: 24px; height: 20px"
              alt=""
            />
            <div>待收货</div>
          </li>
          <li>
            <img
              :src="require('@/assets/shop/mine/3.png')"
              style="width: 22px; height: 21px"
              alt=""
            />
            <div>评价</div>
          </li>
          <li>
            <img
              :src="require('@/assets/shop/mine/4.png')"
              style="width: 20px; height: 22px"
              alt=""
            />
            <div>退款/售后</div>
          </li>
        </ul>
      </div>
    </article>
    <div class="info">
      <div class="title">物流信息</div>
      <van-swipe
        class="my-swipe"
        indicator-color="white"
        @change="onChange"
        style="height: 50px"
        vertical
        :show-indicators="false"
        :autoplay="3000"
      >
        <van-swipe-item class="swipe_item">
          <img :src="require('../../../static/shop_new/little.png')" alt="" class="bg" />
          <section>
            <div class="driver">
              <p>
                <span>顺丰快递</span>
                <span class="num">3920102506903</span>
              </p>
              <p>[青岛市南区上杭路分部] 进行派件扫描；</p>
            </div>
            <div class="time">09-28</div>
          </section>
        </van-swipe-item>
        <van-swipe-item class="swipe_item">
          <img :src="require('../../../static/shop_new/little.png')" alt="" class="bg" />
          <section>
            <div class="driver">
              <p>
                <span>顺丰快递</span>
                <span class="num">3920102506903</span>
              </p>
              <p>[青岛市南区上杭路分部] 进行派件扫描；</p>
            </div>
            <div class="time">09-28</div>
          </section>
        </van-swipe-item>
        <van-swipe-item class="swipe_item">
          <img :src="require('../../../static/shop_new/little.png')" alt="" class="bg" />
          <section>
            <div class="driver">
              <p>
                <span>顺丰快递</span>
                <span class="num">3920102506903</span>
              </p>
              <p>[青岛市南区上杭路分部] 进行派件扫描；</p>
            </div>
            <div class="time">09-28</div>
          </section>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="service2">
      <div class="title">我的账户</div>
      <ul>
        <li @click="showList = true">
          <img
            :src="require('@/assets/shop/mine/account1.png')"
            style="width: 25px; height: 25px"
            alt=""
          />
          <div>账号余额： <span>{{'￥'+$store.state.detail.user.rmb}}</span></div>
        </li>
        <li>
          <img
            :src="require('@/assets/shop/mine/account2.png')"
            style="width: 25px; height: 25px"
            alt=""
          />
          <div>剩余积分： <span>{{$store.state.detail.user.point+' 个'}}</span></div>
        </li>
      </ul>
    </div>

    <div class="service1">
      <div class="title">发布管理</div>
      <ul>
        <li @click="$router.push('/release_journey_list')">
          <img
            :src="require('@/assets/shop/mine/sub1.png')"
            style="width: 26px; height: 19px"
            alt=""
          />
          <div>线路</div>
        </li>
        <li>
          <img
            :src="require('@/assets/shop/mine/sub2.png')"
            style="width: 25px; height: 25px"
            alt=""
          />
          <div>评论</div>
        </li>
      </ul>
    </div>

    <div class="service">
      <div class="title">更多服务</div>
      <ul>
        <li @click="showList = true">
          <img
            :src="require('@/assets/shop/mine/service1.png')"
            style="width: 19px; height: 23px"
            alt=""
          />
          <div>地址管理</div>
        </li>
        <li>
          <img
            :src="require('@/assets/shop/mine/service2.png')"
            style="width: 23px; height: 19px"
            alt=""
          />
          <div>优惠券</div>
        </li>
        <li>
          <img
            :src="require('@/assets/shop/mine/service3.png')"
            style="width: 20px; height: 23px"
            alt=""
          />
          <div>分享APP</div>
        </li>
        <li>
          <img
            :src="require('@/assets/shop/mine/service4.png')"
            style="width: 23px; height: 23px"
            alt=""
          />
          <div>客户服务</div>
        </li>
        <li>
          <img
            :src="require('@/assets/shop/mine/service5.png')"
            style="width: 23px; height: 23px"
            alt=""
          />
          <div>我的收藏</div>
        </li>
      </ul>
    </div>
    

    <addressed :show="showList" @getMessage="changeShow"></addressed>
    <!-- 底部栏 -->
    <v-footer2></v-footer2>
  </div>
</template>
<script>
import "@/css/shop/mine.scss";
import Footer2 from "@/common/travel/_footer2.vue";
import addressed from "./address.vue"
export default {
  components: {
    "v-footer2": Footer2,
    addressed
  },
  data() {
    return {
      index: "",
      showList:false,
    };
  },
  methods: {
    // swiper切换
    onChange(index) {
      this.index = index;
    },
    changeShow(val){
      this.showList = val
    },
    logout(){
      this.$dialog.confirm({
        title: '',
        message: '确定退出么？'
      }).then(() => {
        this.$store.commit('CHANGE_USER',0,'','');
        this.$router.replace({path: '/login'});
      }).catch(() => {
        // on cancel
      });

      },
  },
};
</script>