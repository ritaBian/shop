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
      <div class="swipeChange">{{ index * 1 + 1 }}/{{ swiper.length }}</div>
      <div class="icon">
        <img
          :src="require('@/assets/shop/details/1.png')"
          alt=""
          class="left"
          @click="$router.go(-1)"
        />
        <div class="right">
          <img :src="require('@/assets/shop/details/2.png')" alt="" />
          <img :src="require('@/assets/shop/details/3.png')" alt="" />
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
            <div class="new_price"><span>￥</span>{{ view.PRICE }}</div>
            <div class="old_price" v-if="view.SHI_CHANG_PRICE > 0">
              价格<span>￥{{ view.SHI_CHANG_PRICE }}</span>
            </div>
            <p>新品</p>
            <p>特价</p>
          </div>
          <div class="allow">
            <img :src="require('@/assets/shop/details/no_allow.png')" alt="" />
            <!-- <img :src="require('@/assets/shop/details/allowed.png')" alt=""> -->
            <span>收藏</span>
          </div>
        </div>
        <div class="center">{{ view.NAME }}</div>
        <div class="bottom" ref="content">
          <div
            class="content_description_content_position"
            :style="{ marginBottom: height_content == 1 ? '1.5rem' : '' }"
          >
            <div
              :class="[
                height_content >= 40
                  ? 'content_description_text'
                  : 'content_description_expansionText',
              ]"
              ref="content"
              v-html="htmlList(view.NAME2)"
            ></div>
            <!-- <div
              class="content_description_white"
              style="right: 0"
              v-if="height_content >= 40"
              @click.stop="height_content = 1"
            ></div> -->
            <div
              class="content_description_blue"
              style="right: 0"
              v-if="height_content >= 40"
              @click.stop="height_content = 1"
            >
              <!-- 展开更多 -->
              <img
                :src="require('@/assets/shop/details/arrow.png')"
                class="openmore"
                alt=""
              />
              <!-- <van-icon name="arrow-down" color="#3A99E5" size="0.9rem" /> -->
            </div>
            <div
              class="content_detail_white"
              v-if="height_content == 1"
              @click.stop="height_content = 92"
            >
              <div>收起全文</div>
              <img
                :src="require('@/assets/shop/details/arrow.png')"
                class="content_detail_white_img"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <div class="area">
        <section>
          <div class="item">
            <span>优惠</span>
            <div class="discount1">优惠券</div>
            <div class="discount2">
              <img :src="require('@/assets/shop/details/discount_bg.png')" alt="" />
              <!-- 购买此产品可获得 {{view.POINT}} 积分 -->
              <span>满98减10</span>
            </div>
          </div>
          <img :src="require('@/assets/shop/details/arrow.png')" class="more" alt="" />
        </section>
        <section>
          <div class="item">
            <span>发货</span>
            <div class="text">青岛直邮 -<span> 预计7-15工作日送达</span></div>
          </div>
          <img :src="require('@/assets/shop/details/arrow.png')" class="more" alt="" />
        </section>
        <section @click="showList = true">
          <div class="item">
            <span>送至</span>
            <img
              :src="require('@/assets/shop/details/location.png')"
              class="location"
              alt=""
            />
            <div class="text">{{currentContact?currentContact.address : '请选择地址'}}</div>
          </div>
          <img :src="require('@/assets/shop/details/arrow.png')" class="more" alt="" />
        </section>
        <section>
          <div class="item">
            <span>运费</span>
            <div class="text">{{ yunfei[0]["NAME"] }}</div>
          </div>
          <img :src="require('@/assets/shop/details/arrow.png')" class="more" alt="" />
        </section>
      </div>
      <!-- 3 -->
      <div class="grade">
        <div class="title">
          <div class="name">商品评价(28)</div>
          <div class="moreall">
            <span>查看全部</span>
            <img :src="require('@/assets/shop/details/arrow.png')" class="more" alt="" />
          </div>
        </div>
        <div class="evl" v-for="(item, index) in 2" :key="index">
          <div class="head">
            <img :src="require('@/assets/shop/details/head.png')" alt="" />
            <div class="name">简***泽</div>
          </div>
          <div class="contents">
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
        v-for="(i, index) in swiper"
        :key="index"
        :src="checkPic(i)"
        alt=""
        class="showImg"
      />
      <!-- :src="require('@/assets/shop/details/img' + (index * 1 + 1) + '.png')" -->
    </div>
    <van-divider
      :style="{ color: '#444', borderColor: '#bbb', padding: '0 130px' }"
      >看了又看
    </van-divider>

    <div class="other">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经到底了"
        @load="onLoad"
      >
        <div class="item" v-for="(k, index) in list" :key="index">
          <div class="img">
            <img v-lazy="checkPic(k.PIC)" alt="" />
            <span>新品</span>
          </div>
          <div class="desc">{{ k.NAME }}</div>
          <section>
            <div class="price">
              <div class="new"><span>￥</span>{{ k.PRICE }}</div>
              <div class="old"><span>￥</span>{{parseInt(k.PRICE * Number(3+'.'+(index+1)))}}</div>
            </div>
            <div class="grade">96%好评</div>
          </section>
        </div>
      </van-list>
    </div>

    <!-- <div class="none">已经到底了</div> -->

    <!-- 底部固定栏 -->
    <div class="footer">
      <div class="left">
        <div class="tab">
          <img :src="require('@/assets/shop/details/service.png')" alt="" />
          <span>客服</span>
        </div>
        <van-badge :content="5" class="badge">
          <div class="tab">
            <img :src="require('@/assets/shop/details/allow.png')" alt="" />
            <span>收藏</span>
          </div>
        </van-badge>
        <van-badge :content="count" class="badge">
          <div class="tab" @click="$router.push('/shop/car')">
            <img :src="require('@/assets/shop/details/bag.png')" alt="" />
            <span>购物车</span>
          </div>
        </van-badge>
      </div>
      <div class="right">
        <p @click="goBuy">加入购物车</p>
        <p @click="goBuy">立即购买</p>
      </div>
    </div>

    <!-- 购买 -->
    <div class="shopDetais">
      <van-popup
        v-model="ShowSelectType"
        v-if="$store.state.detail2.proData.PRO"
        z-index="10"
        custom-style="height:80vh,width:100%"
        position="bottom"
      >
        <div class="buy_content" v-for="(v, j) in guige" :key="j">
          <div class="pro">
            <img :src="checkPic($store.state.detail2.proData.PRO.PIC)" alt="" />
            <div class="desc">
              <div class="title">
                {{ $store.state.detail2.proData.PRO.NAME }}
              </div>
              <div class="price">
                ￥{{ $store.state.detail2.proData.PRO.PRICE }}
              </div>
            </div>
          </div>
          <div class="style">
            <div class="title">选择{{ v.NAME }}</div>
            <ul>
              <li
                v-for="(k, i) in v.SUB"
                :key="i"
                :class="{ choice: $isEmpty(selectType, v.ID + '', 0) == k.ID }"
                @click="changeType(v.ID, k.ID, i)"
              >
                {{ k.NAME }}
              </li>
            </ul>
          </div>
          <div class="num">
            <div class="title">选择数量</div>
            <van-stepper v-model="value" />
          </div>
          <div class="footers">
            <p @click="AddToCard">加入购物车</p>
            <p @click="goPay">立即购买</p>
          </div>
        </div>
      </van-popup>
    </div>
    <addressed :show="showList" @getMessage="changeShow" @getaddressId="getaddressId"></addressed>
  </div>
</template>
<script>
import "@/css/shop/details.scss";
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
import Util from "../../util/common";
import { Toast } from "mint-ui";
import addressed from "./address.vue"
export default {
  //属性
  props: {
    viewBoolean: {
      type: null, //属性类型
      value: "",
      default: true,
    },
  },
  components: {
    addressed
  },
  data() {
    return {
      activeNames: [],
      index: 0,
      scrollTop: 0,
      isShowBack: false,
      show: false,
      value: "",
      height_content: "",
      ShowSelectType: false,
      list: [],
      listAddress:[],//地址
      loading: false,
      finished: false,
      pageNum: 0,
      showList:false,
      chosenAddressId:'',
    };
  },
  mounted() {
    this.getdetailsList()
    this.addressList();
    window.addEventListener("scroll", this.handleScroll, true);
    this.height_content =
      this.$refs.content == undefined ? "" : this.$refs.content.offsetHeight; //详情
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
    detailsInfo: (state) => state.detail.proDetails,
    guige: (state) => state.detail2.proData.GUIGE,
    selectType: (state) => state.detail2.selectType,
    swiper() {
      //alert( this.$store.state.detail.proData.PRO.PICS);
      return this.$isEmpty(this.$store.state.detail.proData, "PICS", []);
    },
    htmlList: function () {
      return function (html) {
        var richtext = html;
        const regex = new RegExp(`<img src="`, "gi");
        // console.log(222,html)
        // console.log(1111,html.indexOf(`<img src="`))
        if (html != "" && html != undefined) {
          if (html.indexOf(`<img src="`) != -1) {
            richtext = richtext.replace(regex, `<img style="width:100%" src="`);
            return richtext;
          } else {
            return richtext;
          }
        } else {
          return "";
        }
      };
    },
    count() {
      return this.$store.state.detail.count;
    },
    currentContact() {
      const id = this.chosenAddressId;
      return id !== null ? this.listAddress.filter((item) => item.id === id)[0] : {};
    },
  }),
  methods: {
    // swiper切换
    onChange(index) {
      this.index = index;
    },
    checkPic: function (picurl) {
      return this.$conf.domain + "/" + picurl;
    },
    changeShow(val){
      this.showList = val
    },
    random() {
      return parseInt(Math.random() * (100 - 90 + 1) + 90, 10) + "%";
    },
    getaddressId(id) {
      this.chosenAddressId = id;
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
    // 加入购物车
    goBuy() {
      this.$store.commit("SET_DATAS2", this.detailsInfo);
      if (this.detailsInfo.DETAIL.GUIGE.hasOwnProperty("GUI_GE_1")) {
        this.ShowSelectType = true;
        this.value = this.$store.state.detail.carListIndex[this.detailsInfo.ID];
      } else {
        Util.IntoCarGlobal(this);
      }
    },
    changeType(typeID, ID, index) {
      this.$store.state.index.shopType = Number(index) + 1;
      this.$store.commit("CHANGE_COL_SELECTED2", [typeID, ID]);
      Util.IntoCarGlobal(this, true);
      this.$forceUpdate();
    },
    checkPic: function (picurl) {
      return this.$conf.domain + "/" + picurl;
    },
    // 详情
    getdetailsList() {
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
              this.$store.state.index.currentPage.desc =
                res.data.data.PRO.NAME2;
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
    // 地址列表
    addressList() {
      this.$dopost(
        "/sysapi/address/list/",
        {},
        function (response) {
          if (
            response.data &&
            typeof response.data.error != "undefined" &&
            response.data.error === 0
          ) {
            for (let k = 0; k < response.data.data.length; k++) {
              let t = response.data.data[k];
              this.listAddress.push({
                id: t["ID"],
                name: t["USER_NAME"],
                isDefault: t["ISDEFAULT"],
                area_id: t["QU"],
                tel: t["USER_TEL"],
                address: t["ADDRESS"],
                lng: t["LNG"],
                lat: t["LAT"],
                address: t["ADDRESS"],
              }); //t['SHENG_NAME']+t['SHI_NAME']+t['QU_NAME']+
              if (t["ISDEFAULT"] == "1") this.chosenAddressId = t["ID"]; //this.list.length-1;
              // console.log(this.list);
            }
          } else {
            this.confirm = false;
            Toast(
              response.data && response.data.mess
                ? response.data.mess
                : "出错了！"
            );
          }
        }.bind(this),
        true
      );
    },
    // 其他产品展示
    onLoad() {
      //this.loading=true;
      this.$dopost(
        "/sysapi/pro/list/",
        {
          get_detail: 1,
          viewloading: 0,
          page: this.pageNum + 1,
          sort_id: this.$route.query.sortid || 0,
        },
        function (res) {
          if (
            res.data &&
            typeof res.data.error != "undefined" &&
            res.data.error === 0
          ) {
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
    // 弹框加入购物车
    AddToCard() {
      Util.IntoCarGlobal(this, false, this.value);
    },
    // 立即购买
    //点击跳转到支付页
    goPay() {
      this.addIntoCar("", false);
      // if (this.$store.state.login.token != 1) {
      //   this.$toast("请先登录会员！");
      //   return;
      //   //this.$router.push({path:'/login'})
      // }
      // // 如果有选择商品才能跳转
      // if (this.$store.getters.selectedList.length) {
      //   // 保存+缓存选择的商品 ,在支付页能用到
      //   this.$store.dispatch("setSelectedList");
      //   this.$router.push({ path: "/shop/buy" });
      // } else {
      //   alert("你还没选择商品");
      // }
    },

    addIntoCar() {
      var onlyChangePrice = arguments[1] ? arguments[1] : false;
      var proParaCheck = true;
      Object.keys(this.$store.state.detail2.selectType).forEach(
        function (key) {
          if (
            !this.$store.state.detail2.selectType[key] ||
            parseInt(this.$store.state.detail2.selectType[key]) <= 0
          ) {
            if (!onlyChangePrice) Toast({ message: "请选择完整的产品属性" });
            proParaCheck = false;
          }
        }.bind(this)
      );
      var typeId = 0;
      var typeIdBool = true;
      // console.log(proParaCheck,this.$isEmptyObject(this.$store.state.detail.proData.GUIGE));
      if (
        proParaCheck &&
        this.$isEmptyObject(this.$store.state.detail.proData.GUIGE) == false
      ) {
        Object.keys(this.$store.state.detail.proData.TYPE).forEach(
          function (key) {
            let jiekou = this.$store.state.detail.proData.TYPE[key][
              "GUI_GE_JSON"
            ];
            jiekou = JSON.parse(jiekou);

            typeIdBool = true; //console.log('----type:'+this.$store.state.detail.proData.TYPE[key]['GUI_GE_JSON']);
            for (let k in jiekou) {
              typeIdBool =
                typeIdBool &&
                jiekou[k] == this.$store.state.detail2.selectType[k];
              console.log(jiekou[k], this.$store.state.detail2.selectType[k]);
            }
            if (typeIdBool == true)
              typeId = this.$store.state.detail.proData.TYPE[key];
            //console.log(typeId);
          }.bind(this)
        );

        if (typeId == 0) {
          if (!onlyChangePrice) Toast({ message: "该产品属性无价格设置" });
          return;
        }
      }
      if (this.$store.state.detail.proData.GUIGE.length == 0)
        typeId = this.$store.state.detail.proData.TYPE[0];
      if (onlyChangePrice) {
        this.$store.state.detail.proData.PRO.PRICE = typeId["PRICE"];
        this.$store.state.detail.proData.PRO.HUI_DIAN = typeId["HUI_DIAN"];
        this.$store.state.detail.proData.PRO.POINT = typeId["POINT"];
        return;
      }
      //  mint-ui的弹出式提示框
      const product = [
        {
          title: this.view.NAME,
          price: this.view.PRICE,
          id: this.view.ID,
          count: this.value || 1,
          promotion: this.$store.state.detail.proData.PROMOTION,
          yunfei: this.$store.state.detail.proData.YUN_FEI,
          type: JSON.parse(JSON.stringify(typeId)),
          imgPath:
            this.$conf.domain + "/" + this.$store.state.detail.proData.PRO.PIC,
          choseBool: true,
        },
      ];
      // console.log(product)
      if (proParaCheck) {
        if (typeId.length == 0) {
          Toast({
            message: "产品属性错误",
            duration: 2000,
          });
        } else {
          this.$store.commit("BUY_SOME", product);
          this.$router.push({ path: "/shop/buy", query: { type: 2 } });
          // this.$store.dispatch("addCarList", product);
          // this.$store.dispatch("setLocalCount", true);
          // Toast({
          //   message: "添加成功",
          //   duration: 2000,
          // });
        }
      }
    },
  },
};
</script>