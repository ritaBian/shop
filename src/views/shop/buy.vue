<template>
  <div class="buy_details">
    <div class="">
      <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)" />
      <!-- <img src="@/assets/shop/buy/arrow.png" alt="" @click="$router.go(-1)" />
      <span>确认订单</span> -->
    </div>
    <div class="address" @click="showList = true">
      <section>
        <div class="title">
          <span class="name">{{
            currentContact.name || "请选择订单地址"
          }}</span>
          <span class="tel">{{ currentContact.tel || "" }}</span>
          <span class="tag" v-if="currentContact.isDefault == 1">默认</span>
        </div>
        <div class="house">{{ currentContact.address }}</div>
      </section>
      <img src="@/assets/shop/buy/change.png" alt="" />
    </div>
    <div class="list" v-if="!confirm">
      <div class="item" v-for="(k, index) in carList" :key="index">
        <img :src="k.imgPath" alt="" />
        <div class="detail">
          <div class="title">{{ k.title }}</div>
          <section>
            <div class="style">
              <p>{{ k.type.NAME }}</p>
              <p class="pp">￥{{ k.type.PRICE }}</p>
            </div>
            <div class="num">x{{ k.count }}</div>
          </section>
        </div>
      </div>
      <div class="input">
        <input type="text" placeholder="有什么对我们说的可以在这里留言哦~" />
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
          <div>￥{{ allpay }}</div>
        </li>
        <li>
          <div>运费</div>
          <div>￥0.00</div>
        </li>
        <li>
          <div>总折扣</div>
          <!-- {{user_point}} -->
          <div>
            ￥{{ totalSale }}
            <!-- <span>(含运费税￥1.56)</span> -->
          </div>
        </li>
      </ul>
    </div>

    <div class="bottomBuy">
      <div class="total">
        <p>共{{ this.carList.length }}件商品</p>
        <p class="price">
          总计： ￥{{ (Number(allpay) - Number(totalSale)).toFixed(2) }}
        </p>
      </div>
      <div class="btn" @click="payConfirm">提交订单</div>
    </div>

    <addressed :show="showList" @getMessage="changeShow" @getaddressId="getaddressId"></addressed>
    <!-- <van-contact-card
      :type="cardType"
      :name="currentContact.name || ''"
      :tel="currentContact.tel || ''"
      @click="showList = true"
    /> -->

    <van-popup v-model="showPay" position="top" style="height: 100vh">
      <van-nav-bar
        title="支付明细"
        left-text=""
        left-arrow
        @click-left="showPay = false"
      />
      <van-cell-group>
        <van-cell
          title="用户余额:"
          :value="$store.state.detail.user.rmb + ' 元'"
        />
        <van-cell
          title="用户积分:"
          :value="$store.state.detail.user.point + ' 个'"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="pay.Money" label="余额支付:" required />
        <van-field
          v-model="pay.Point"
          label="积分支付:"
          required
          v-if="pay.Point"
        />
        <van-field
          v-model="pay.OnLine"
          label="充值支付:"
          required
          v-if="pay.OnLine"
        />
        <footer class="pay-footer" ontouchstrat="" @click="ToPay">
          <span>支 付</span>
        </footer>
      </van-cell-group>
    </van-popup>

    
  </div>
</template>
<script>
import "@/css/shop/buy.scss";
import { areaList } from "@/util/area.js";
import { Toast } from "vant";
import { MessageBox } from "mint-ui";
import Util from "../../util/common";
import addressed from "./address.vue"
export default {
  components:{
    addressed
  },
  data() {
    return {
      value: "",
      radio: "",
      result: [],
      isAll: false,
      checked: "",

      // 新增
      confirm: "",
      user_price: 0,
      user_point: 0,

      showList: false,
      showEdit: false,

      showPay: false,
      pay: { Money: 0, Point: 0, OnLine: 0 },

      orderApi: null,
      isEdit: false,
      addressInfo: {},
      editIndex: null,
      searchResult: [],
      chosenAddressId: null,
      list: [],
      areaList: this.areaList,
      totalSale: 0,
      // 要购买的商品
      carList: [],
    };
  },
  computed: {
    currentContact() {
      const id = this.chosenAddressId;
      return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
    },
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },
    //已勾选的所有商品列表
    selectCarList() {
      return this.$store.state.detail.selectedList;
    },
    // 商品价格总和
    allpay() {
      let allpay = 0;
      if (this.carList) {
        for (let i = 0; i < this.carList.length; i++) {
          allpay = this.$Jia(
            allpay,
            this.$Cheng(this.carList[i].price, this.carList[i].count)
          );
          //allpay += this.carList[i].price*this.carList[i].count;
          allpay = this.$Jia(
            allpay,
            this.proYunFei(
              this.carList[i].yunfei,
              this.chosenAddressId,
              this.carList[i].count
            )
          );
          //allpay=allpay+this.proYunFei(this.carList[i].yunfei,this.chosenAddressId,this.carList[i].count);
          allpay = this.$Jia(allpay, this.carList[i].promotion_price);
        }
      }

      return allpay.toFixed(2);
    },
  },
  // 收货地址
  beforeCreate() {
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
            this.list.push({
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
  mounted() {
    if (this.$store.state.login.token != 1) {
      this.$router.push({ path: "/login" });
    }
    // 防止页面刷新后数据丢失
    if (this.$store.state.detail.selectedList == "") {
      this.$store.commit("SET_SELECTEDLIST");
    }
    this.$dopost(
      "/sysapi/user/userinfo/",
      {},
      function (response) {
        if (
          response.data &&
          typeof response.data.error != "undefined" &&
          response.data.error === 0
        ) {
          this.confirm = false;
          this.$store.commit("SET_LOADING", true);
          this.$store.state.detail.user = response.data.data;
          this.user_price = response.data.data.rmb;
          this.user_point = response.data.data.point;
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
    if (this.$route.query.type == 2) {
      //立即购买
      this.carList = this.$store.state.detail.goBuy;
    } else {
      this.carList = this.selectCarList;
    }
    this.SetPromotion(this.carList);
    this.carList.forEach((item) => {
      this.totalSale += this.proYunFei(item.yunfei, this.chosenAddressId);
    });
  },
  watch: {
    orderApi: function (val) {
      this.pay.Money = Util.Jia(this.orderApi.order.rmb, 0);
      this.pay.Point = Util.Jia(this.orderApi.order.point, 0);

      if (
        Util.Jia(this.$store.state.detail.user.point, 0) <=
        Util.Jia(this.orderApi.order.point, 0)
      ) {
        this.pay.Point = Util.Jia(this.$store.state.detail.user.point, 0);
      } else {
        this.pay.Point = Util.Jia(this.orderApi.order.point, 0);
      }
      //如果余额+积分 低于 支付金额
      if (
        Util.Jia(this.$store.state.detail.user.rmb, this.pay.Point) <
        Util.Jia(this.orderApi.order.rmb, 0)
      ) {
        this.pay.Money = Util.Jia(this.$store.state.detail.user.rmb, 0);
      } else {
        this.pay.Money = Util.Jia(this.orderApi.order.rmb, 0);
      }

      if (
        Util.Jia(this.pay.Money, this.pay.Point) <
        Util.Jia(this.orderApi.order.rmb, 0)
      ) {
        this.pay.OnLine = Util.Jian(
          Util.Jian(this.orderApi.order.rmb, this.pay.Point),
          this.pay.Money
        );
      }
    },
  },
  methods: {
    changeShow(val){
      this.showList = val
    },
    getaddressId(id){
      this.chosenAddressId = id
    },
    proYunFei(fei, chosenAddressId, count) {
      count = parseInt(count);
      let v = fei[0];
      let area_id = this.list.filter((item) => item.id === chosenAddressId)[0];
      if (area_id) {
        area_id = area_id["area_id"].substr(0, 2) + "0000";
        if (fei[area_id] && typeof fei[area_id] != "undefined") {
          v = fei[area_id];
        }
      }
      let price = this.$Cheng(v["PRICE"], 1);
      if (
        count > parseInt(v["PRICE_COUNT"]) &&
        this.$Cheng(v["PRICE_NEXT"], 1) > 0
      ) {
        let chaCount = Math.ceil(
          this.$Chu(count - parseInt(v["PRICE_COUNT"]), v["NEXT_COUNT"])
        );
        chaCount = this.$Cheng(v["chaCount"], v["PRICE_NEXT"]);
        price = this.$Jia(price, v["PRICE_NEXT"]);
      }
      if (count >= parseInt(v["BAO_YOU_COUNT"])) {
        price = 0;
      }
      return price;
    },
    // 设置优惠价格
    SetPromotion(list) {
      if (list != "" && list.length > 0) {
        for (let k = 0; k < list.length; k++) {
          list[k]["promotion_id"] = 0;
          list[k]["promotion_price"] = 0;
          let LastPrice = 0;
          for (let o = 0; o < list[k].promotion.length; o++) {
            if (
              Util.Cheng(list[k]["price"], list[k]["count"]) >=
              Number(list[k].promotion[o]["V2"])
            ) {
              if (Math.abs(list[k].promotion[o]["V"]) > LastPrice) {
                LastPrice = Math.abs(list[k].promotion[o]["V"]);
                list[k]["promotion_id"] = list[k].promotion[o]["ID"];
                list[k]["promotion_price"] = Number(list[k].promotion[o]["V"]);
              }
            }
          }
          this.$set(list, k, list[k]);
          //console.log(this.$store.state.detail.carList[k]);
        }
      }
    },
    ToPay(val) {
      let obj = {
        user_id: this.$store.state.login.username,
        api_user: this.$store.state.login.username,
      };
      obj["id"] = this.orderApi.order.id;
      obj["PAY_HUI_DIAN"] = this.pay.Point || 0;
      obj["PAY_MONEY"] = this.pay.Money;
      obj["PAY_CHONG_MONEY"] = this.pay.OnLine || 0;
      this.$dopost(
        "/sysapi/order/pay/",
        obj,
        function (res) {
          if (
            res.data &&
            typeof res.data.error != "undefined" &&
            res.data.error === 0
          ) {
            if (res.data.data && res.data.data["state"]) {
              if (res.data.data["state"] == "ok") {
                this.showPay = false;
                Toast("订单支付成功！");
                this.$router.push({ path: "/order" });
              }
              if (res.data.data["state"] == "ChongZhi") {
                this.showPay = false;
                Toast("充值！");

                obj = {
                  user_id: this.$store.state.login.username,
                  api_user: this.$store.state.login.username,
                };
                obj["order_id"] = this.orderApi.order.id;
                this.$dopost(
                  "/pay/order/",
                  obj,
                  function (res) {
                    if (
                      res.data &&
                      typeof res.data.error != "undefined" &&
                      res.data.error === 0
                    ) {
                      window.location.href =
                        "/pay/js/id/" + res.data.data.id + "";
                    } else {
                      Toast(
                        res.data && res.data.mess ? res.data.mess : "出错了！"
                      );
                    }
                  }.bind(this),
                  true
                );
              }
            } else {
              Toast("失败。。。");
            }
          } else {
            Toast(res.data && res.data.mess ? res.data.mess : "出错了！");
          }
        }.bind(this),
        true
      );
    },
    payConfirm() {
      if (this.carList) {
        //还未提交了订单,数据还未清空
        //console.log(this.chosenAddressId);
        if (
          this.chosenAddressId == null ||
          parseInt(this.chosenAddressId) <= 0
        ) {
          Toast("请选择收货地址！");
          return;
        }
        MessageBox.confirm(`确定支付${this.allpay}元`).then(
          (action) => {
            //点击成功执行这里的函数
            let obj = {
              user_id: this.$store.state.login.username,
              api_user: this.$store.state.login.username,
            };
            obj["address_id"] = this.chosenAddressId;

            for (let k = 0; k < this.carList.length; k++) {
              let tmp = this.carList[k];
              obj["data[" + k + "][id]"] = tmp["id"];
              obj["data[" + k + "][count]"] = tmp["count"];
              obj["data[" + k + "][typeid]"] = tmp["type"]["ID"];
              obj["data[" + k + "][promotion_id]"] = tmp["promotion_id"];
              //obj['data['+k+']']={'id':tmp['id'],'count':tmp['count'],'typeid':tmp['type']['ID']};
            }
            //分销para
            if (
              Util.GetCookie("recommend_id") &&
              Util.GetCookie("recommend_date") &&
              Util.GetCookie("recommend_sign")
            ) {
              obj["recommend_id"] = Util.GetCookie("recommend_id");
              obj["recommend_date"] = Util.GetCookie("recommend_date");
              obj["recommend_sign"] = Util.GetCookie("recommend_sign");
            }

            this.$dopost(
              "/sysapi/order/add/",
              obj,
              function (response) {
                if (
                  response.data &&
                  typeof response.data.error != "undefined" &&
                  response.data.error === 0
                ) {
                  this.confirm = false;
                  this.$store.commit("SET_LOADING", true);
                  if (
                    response.data.data &&
                    response.data.data["order_id"] &&
                    response.data.data["order"]
                  ) {
                    this.showPay = true;
                    this.orderApi = response.data.data;

                    this.$store.dispatch("resetCarList");
                    this.$store.dispatch("resetCount");
                    setTimeout(() => {
                      this.$store.commit("SET_LOADING", false); //关闭loading
                      this.confirm = true; //支付完成后切换视图
                    }, 300);
                  }
                  //Toast('下单成功！单号：'+response.data.data['order_id']);
                } else {
                  this.confirm = false;
                  Toast(
                    response.data && response.data.mess
                      ? response.data.mess
                      : "出错了！"
                  );
                }
              }.bind(this),
              true,
              true
            );
            /**
            this.confirm = false;
            this.$store.commit('SET_LOADING', true);
            this.$store.dispatch('resetCarList'); //重置购物车（用unSelectedList替换）
            this.$store.dispatch('resetCount'); //重置购物车数量
            setTimeout(() => {
              this.$store.commit('SET_LOADING', false); //关闭loading
              this.confirm = true; //支付完成后切换视图
            }, 300)
*/
          },
          function (err) {
            //点击取消执行这里的函数
          }
        );
      } else {
        //提交了订单,数据清空
        alert("请勿重复提交订单");
      }
    },
  },
};
</script>