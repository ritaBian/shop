<template>
  <div class="shopCar">
    <div class="top">
      <img
        src="@/assets/shop/back.png"
        alt=""
        class="back"
        @click="$router.go(-1)"
      />
      <div class="top_input">
        <img src="@/assets/shop/search.png" alt="" class="img" />
        <input
          type="text"
          placeholder="搜索特产、工艺品等伴手礼"
          v-model="name"
        />
      </div>
      <div class="message">
        <img src="@/assets/shop/message.png" alt="" class="message-img" />
        <span>1</span>
      </div>
    </div>
    <div class="select_border_position">
      <van-dropdown-menu active-color="#01a862">
        <van-dropdown-item v-model="value1" :options="option1" title="包邮" />
        <van-dropdown-item v-model="value2" :options="option2" title="包邮" />
        <van-dropdown-item v-model="value1" :options="option1" title="包邮" />
        <van-dropdown-item v-model="value2" :options="option2" title="包邮" />
      </van-dropdown-menu>
    </div>
    <div class="bar">
      <div class="left">
        <van-sidebar v-model="activeKey" @change="sideChange">
          <van-sidebar-item
            v-for="(item, index) in allData ? allData[0].list : []"
            :key="index"
            :title="item.NAME"
          />
        </van-sidebar>
      </div>
      <div class="right">
        <!-- 选项 -->
        <div class="wrapper" ref="wrapper">
          <ul class="wrapper_cont" ref="cont">
            <li
              :class="[
                'cont_once',
                Sortid == item.ID ? 'option_once2' : 'option_once1',
              ]"
              @click="onOptionClick(item)"
              v-for="(item, index) of allData[0].list[activeKey].list"
              :key="index"
            >
              {{ item.NAME }}
            </li>
          </ul>
        </div>
        <div class="banner">
          <img src="@/assets/shop/banner.png" alt="" class="right-banner" />
        </div>
        <!-- 列表 -->
        <div class="list" style="padding-bottom: 80px;">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              class="item"
              v-for="(k, index) in list"
              :key="index"
              @click="goDetails(k)"
            >
              <img v-lazy="checkPic(k.PIC)" alt="" class="item-img" />
              <div class="pro">
                <div class="title">{{ k.NAME }}</div>
                <div class="price">
                  <div class="new">￥{{ k.PRICE }}</div>
                  <div class="old">
                    ￥{{ parseInt(k.PRICE * Number(3 + "." + (index + 1))) }}
                  </div>
                </div>
                <!-- <div class="change">
                  <p>99选3</p>
                  <p>新品</p>
                </div> -->
                <div class="added">
                  <div class="grade">{{ random() }}好评</div>
                  <section>
                    <div
                      class="left"
                      v-if="$store.state.detail.carListIndex[k.ID.toString()]"
                    >
                      <img
                        @click.self.stop="DelCart(k.ID, k)"
                        style="
                          width: 19px;
                          height: 19px;
                          vertical-align: middle;
                          cursor: pointer;
                        "
                        :src="require('../../../static/sub_red_empty.png')"
                      />
                      <div
                        style="
                          text-align: center;
                          width: 20px;
                          padding-left: 5px;
                          padding-right: 5px;
                        "
                      >
                        {{ $store.state.detail.carListIndex[k.ID.toString()] }}
                      </div>
                    </div>
                    <img
                      @click.self.stop="AddIntoCart(k.ID, k)"
                      style="
                        width: 19px;
                        height: 19px;
                        vertical-align: middle;
                        cursor: pointer;
                      "
                      :src="require('../../../static/add_red.png')"
                    />
                  </section>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
    <!-- 底部栏 -->
    <v-footer2></v-footer2>
  </div>
</template>
<script>
import "@/css/shop/main.scss";
import Footer2 from "@/common/travel/_footer2.vue";
import Util from "../../util/common";
export default {
  components: {
    "v-footer2": Footer2,
  },
  data() {
    return {
      name: "",
      value1: "",
      value2: "",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" },
      ],
      activeKey: 0,
      active: 2,
      // tag
      optionValue: {
        id: "",
      },
      optionList: [
        { id: 1, name: "鱼类" },
        { id: 2, name: "贝类" },
        { id: 3, name: "海产干货" },
        { id: 4, name: "海参" },
        { id: 5, name: "鱼类" },
        { id: 6, name: "贝类" },
      ],
      list: [],
      loading: false,
      finished: false,
      pageNum: 0,
      // 左边
      allData: [{ list: [{ list: [] }] }],
      Sortid: 0,
    };
  },
  created() {
    // this.getLeft();
    this.activeKey = this.$store.state.category.tabIndex;
  },
  watch: {
    "$store.state.category.tabIndex"(val, old) {
      if (val != old) {
        this.$store.state.detail.lastpara =
          this.allData[0].list[this.$store.state.category.tabIndex].ID || 0;
        this.list = [];
        this.pageNum = 0;
        this.Sortid = 0;
        this.finished = false;
        this.$forceUpdate();
        //this.onLoad();
      }
    },
    Sortid(val, old) {
      if (val != old) {
        this.list = [];
        this.pageNum = 0;
        this.finished = false;
        this.$forceUpdate();
      }
    },
  },
  methods: {
    onSubmit() {},
    //点击选项
    onOptionClick(item) {
      this.finished = false;
      if (this.optionValue.id == item.id) {
        this.optionValue = "";
      } else {
        this.optionValue = item;
      }
      this.Sortid = item.ID;
      // this.optionValue = item
      // this.page_index = 1;
      // this.pageList = [];
      // this.onShows();
    },
    checkPic: function (picurl) {
      return this.$conf.domain + "/" + picurl;
    },
    random() {
      return parseInt(Math.random() * (100 - 90 + 1) + 90, 10) + "%";
    },
    // 左边导航栏切换
    sideChange(i) {
      this.$store.commit("CHANGE_TABINDEX", i);
    },
    getLeft() {
      this.$dopost(
        "/sysapi/pro/sort/",
        null,
        function (res) {
          if (
            res.data &&
            typeof res.data.error != "undefined" &&
            res.data.error === 0
          ) {
            this.allData = res.data.data;
          } else {
            Toast(res.data && res.data.mess ? res.data.mess : "接口错误");
          }
        }.bind(this)
      );
    },
    onLoad() {
      // 获取左边滑动
      this.$dopost(
        "/sysapi/pro/sort/",
        null,
        function (res) {
          if (
            res.data &&
            typeof res.data.error != "undefined" &&
            res.data.error === 0
          ) {
            this.allData = res.data.data;
            // 获取右侧列表
            this.getList()
          } else {
            Toast(res.data && res.data.mess ? res.data.mess : "接口错误");
          }
        }.bind(this)
      );
    },
    getList(){
      //this.loading=true;
      this.$dopost(
        "/sysapi/pro/list/",
        {
          get_detail: 1,
          viewloading: 0,
          page: this.pageNum + 1,
          sort_id:
            this.Sortid > 0
              ? this.Sortid
              : this.allData[0].list[this.$store.state.category.tabIndex].ID ||
                0,
        },
        function (res) {
          if (
            res.data &&
            typeof res.data.error != "undefined" &&
            res.data.error === 0
          ) {
            if (
              this.$store.state.index.currentPage.page != window.location.href
            ) {
              this.$store.state.index.currentPage.name = "菜谱";
              this.$store.state.index.currentPage.desc =
                res.data.data.mallsort.NAME;
              this.$store.state.index.currentPage.page = window.location.href;
              this.$store.state.index.currentPage.image = Util.getNull(
                res.data.data.PRO
              )
                ? this.$conf.domain + "/" + res.data.data.PRO[0].PIC
                : "";
            }

            for (let i = 0; i < res.data.data.PRO.length; i++) {
              this.list.push(res.data.data.PRO[i]);
            }
            this.pageNum = parseInt(res.data.data.page);
            if (
              parseInt(res.data.data.page) >= parseInt(res.data.data.allpage)
            ) {
              this.finished = true;
            }
            this.loading = false;
          } else {
            Toast(res.data && res.data.mess ? res.data.mess : "接口错误");
          }
        }.bind(this)
      );
    },
    goDetails(k) {
      this.$store.commit("GET_PRODETAILS", k);
      this.$router.push({ path: "/shop/details", query: { id: k.ID } });
    },
    AddIntoCart: function (proid, pro) {
      console.log(pro);
      this.$store.commit("SET_DATAS2", pro);
      if (pro.DETAIL.GUIGE.hasOwnProperty("GUI_GE_1")) {
        this.$store.state.detail2.ShowSelectType = true;
      } else {
        Util.IntoCarGlobal(this);
      }
      //console.log(proid);console.log(detail);
    },
    DelCart: function (proid, pro) {
      Util.SetCartItemCount(this, pro);
    },
  },
};
</script>