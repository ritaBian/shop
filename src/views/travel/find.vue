<template>
  <div>
    <div class="m-top">
      <van-col span="2" style="text-align: center;">
        <span class="fh"><i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i></span>
      </van-col>
      <van-col span="6">
        <van-search class="wz" left-icon="van-icon van-icon-location-o" placeholder="青岛站" /></van-col>
      <van-col span="14">
        <van-search class="ss" style="padding-left:1px;" placeholder="搜索景点，商家或目的地" /></van-col>
      <van-col span="2" style="text-align: center;">
        <span class="kf"><i class="van-icon van-icon-service"></i></span>
      </van-col>
    </div>

    <div class="m-sx">
      <van-dropdown-menu active-color="#01a862">
        <van-dropdown-item :value="value1" :options="option1" title="区域" />
        <van-dropdown-item :value="value2" :options="option2" title="主题类型" />
        <van-dropdown-item :value="value3" :options="option3" title="天数" />
        <van-dropdown-item :value="value4" :options="option4" title="推荐值" />
      </van-dropdown-menu>
    </div>

    <ul class="m-slide-box">
      <li class="active">包车游</li>
      <li>可定明日</li>
      <li>自营</li>
      <li>包游</li>
      <li>包车游</li>
    </ul>

    <div class="m-list">
      <div class="m-list-item">
        <img class="m-list-item-img" src="../../../static/p.jpg" width="100%" />
        <div class="m-list-item-con">
          <p>美功铁道市场（Maeklong Railway Market）是一个传统菜市场，附近的居民会来这里购物...</p>
          <p class="m-fc-666">安心游 | 无购物 | 成团保障 | 精致小团</p>
          <p class="m-list-item-tag">
            <span>无购物</span>
            <span>安心游</span>
            <span>无购物</span>
          </p>
        </div>
        <div class="m-list-item-bottom">
          <span class="m-pf">5.0分</span> 12人点评
          <span class="m-jq"><b>¥158</b>起</span>
        </div>
      </div>
      
      <div class="m-list-item">
        <img class="m-list-item-img" src="../../../static/p.jpg" width="100%" />
        <div class="m-list-item-con">
          <p>美功铁道市场（Maeklong Railway Market）是一个传统菜市场，附近的居民会来这里购物...</p>
          <p class="m-fc-666">安心游 | 无购物 | 成团保障 | 精致小团</p>
          <p class="m-list-item-tag">
            <span>无购物</span>
            <span>安心游</span>
            <span>无购物</span>
          </p>
        </div>
        <div class="m-list-item-bottom">
          <span class="m-pf">5.0分</span> 12人点评
          <span class="m-jq"><b>¥158</b>起</span>
        </div>
      </div>
      <div class="m-list-item">
        <img class="m-list-item-img" src="../../../static/p.jpg" width="100%" />
        <div class="m-list-item-con">
          <p>美功铁道市场（Maeklong Railway Market）是一个传统菜市场，附近的居民会来这里购物...</p>
          <p class="m-fc-666">安心游 | 无购物 | 成团保障 | 精致小团</p>
          <p class="m-list-item-tag">
            <span>无购物</span>
            <span>安心游</span>
            <span>无购物</span>
          </p>
        </div>
        <div class="m-list-item-bottom">
          <span class="m-pf">5.0分</span> 12人点评
          <span class="m-jq"><b>¥158</b>起</span>
        </div>
      </div>
      <div class="m-list-item">
        <img class="m-list-item-img" src="../../../static/p.jpg" width="100%" />
        <div class="m-list-item-con">
          <p>美功铁道市场（Maeklong Railway Market）是一个传统菜市场，附近的居民会来这里购物...</p>
          <p class="m-fc-666">安心游 | 无购物 | 成团保障 | 精致小团</p>
          <p class="m-list-item-tag">
            <span>无购物</span>
            <span>安心游</span>
            <span>无购物</span>
          </p>
        </div>
        <div class="m-list-item-bottom">
          <span class="m-pf">5.0分</span> 12人点评
          <span class="m-jq"><b>¥158</b>起</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        option1: [{
            text: '全部商品',
            value: 0
          },
          {
            text: '新款商品',
            value: 1
          },
          {
            text: '活动商品',
            value: 2
          }
        ],
        option2: [{
            text: '主题类型',
            value: 0
          },
          {
            text: '新款商品',
            value: 1
          },
          {
            text: '活动商品',
            value: 2
          }
        ],
        option3: [{
            text: '全部',
            value: 0
          },
          {
            text: '新款商品',
            value: 1
          },
          {
            text: '活动商品',
            value: 2
          }
        ],
        option4: [{
            text: '1111',
            value: 0
          },
          {
            text: '新款商品',
            value: 1
          },
          {
            text: '活动商品',
            value: 2
          }
        ]
      }
    }
  }
</script>

<style>

</style>