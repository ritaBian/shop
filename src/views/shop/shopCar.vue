<!--
 * @Descripttion: 购物车
 * @Author: bjp
-->
<template>
  <div class="shopCar">
    <div class="top">
      <img src="@/assets/shop/back.png" alt="" class="back" @click="$router.go(-1)"/>
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
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="@伴手礼" />
          <van-sidebar-item title="乡浓土产" />
          <van-sidebar-item title="干鲜水产" />
          <van-sidebar-item title="畜牧家禽" />
          <van-sidebar-item title="饮品调味" />
          <van-sidebar-item title="健康保健" />
          <van-sidebar-item title="工匠手艺" />
          <van-sidebar-item title="旅游用品" />
        </van-sidebar>
      </div>
      <div class="right">
        <!-- 选项 -->
        <div class="wrapper" ref="wrapper">
          <ul class="wrapper_cont" ref="cont">
            <li
              :class="[
                'cont_once',
                optionValue.id == item.id ? 'option_once2' : 'option_once1',
              ]"
              @click="onOptionClick(item)"
              v-for="(item, index) of optionList"
              :key="index"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="banner">
          <img src="@/assets/shop/banner.png" alt="" class="right-banner" />
        </div>
        <!-- 列表 -->
        <div class="list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
          >
          <!-- @load="onLoad" -->
            <div class="item" v-for="(item,index) in 6" :key="index" @click="$router.push('/shop/details')">
              <img src="@/assets/shop/item.png" alt="" class="item-img">
              <div class="pro">
                <div class="title">全麦无糖粗粮馒头王哥庄铁锅大馒头手工馒头山东青全麦无糖粗粮馒头王哥庄铁锅大馒头手工馒头山东青</div>
                <div class="price">
                  <div class="new">￥108</div>
                  <div class="old">￥101</div>
                </div>
                <div class="change">
                  <p>99选3</p>
                  <p>新品</p>
                </div>
                <div class="grade">96%好评</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/shop/main.scss";
export default {
  data() {
    return {
      name: "",
      value1: "",
      value2: "",
      loading: false,
      finished:false,
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
    };
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
      // this.optionValue = item
      // this.page_index = 1;
      // this.pageList = [];
      // this.onShows();
    },
  },
};
</script>