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
        <div class="house">{{currentContact.address}}</div>
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

    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="top" style="height: 100vh">
      <van-nav-bar
        fixed
        title="收货信息"
        left-text="返回"
        left-arrow
        @click-left="showEdit = false"
      />
      <van-address-edit
        style="padding-top: 50px"
        :area-list="areaList"
        :address-info="addressInfo"
        @delete="onDelete"
        show-set-default
        @save="onSave"
      >
        <div slot="default">
          <div style="padding-left: 18px">地图标注:</div>
          <iframe
            id="baidumapiframe"
            :src="
              '/mobile/map.html?lng=' +
              (addressInfo.lng || 0) +
              '&lat=' +
              (addressInfo.lat || 0)
            "
            style="width: 100%; height: 300px; border: 0px"
            allowtransparency="true"
          ></iframe>
        </div>
      </van-address-edit>
    </van-popup>
  </div>
</template>
<script>
import "@/css/shop/buy.scss";
import { areaList } from "@/util/area.js";
import { Toast } from 'vant'
import {MessageBox} from 'mint-ui';
export default {
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
    //所有商品列表
    carList() {
      return this.$store.state.detail.selectedList;
    },
    // 商品价格总和
    allpay() {
      let allpay = 0;
      if (this.$store.state.detail.selectedList) {
        for (let i = 0; i < this.carList.length; i++) {
          allpay = this.$Jia(
            allpay,
            this.$Cheng(
              this.$store.state.detail.selectedList[i].price,
              this.$store.state.detail.selectedList[i].count
            )
          );
          //allpay += this.$store.state.detail.selectedList[i].price*this.$store.state.detail.selectedList[i].count;
          allpay = this.$Jia(
            allpay,
            this.proYunFei(
              this.$store.state.detail.selectedList[i].yunfei,
              this.chosenAddressId,
              this.$store.state.detail.selectedList[i].count
            )
          );
          //allpay=allpay+this.proYunFei(this.$store.state.detail.selectedList[i].yunfei,this.chosenAddressId,this.$store.state.detail.selectedList[i].count);
          allpay = this.$Jia(
            allpay,
            this.$store.state.detail.selectedList[i].promotion_price
          );
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
    this.carList.forEach((item) => {
      this.totalSale += this.proYunFei(item.yunfei, this.chosenAddressId);
    });
  },
  methods: {
    onAdd() {
      this.addressInfo = {};
      this.editIndex = null;
      this.showEdit = true;
      //Toast('新增收货地址');
    },
    onSelect(item, index) {
      //console.log(item);console.log(index);
      this.chosenAddressId = item["id"];
      this.$forceUpdate();
      this.showList = false;
    },
    onEdit(info, index) {
      console.log(info);
      this.editIndex = index;
      this.addressInfo = {
        id: info.id,
        lng: info.lng,
        lat: info.lat,
        addressDetail: info.address,
        name: info.name,
        tel: info.tel,
        areaCode: info.area_id,
        isDefault: parseInt(info.isDefault) == 1 ? true : false,
      };
      this.showEdit = true;
      //this.$forceUpdate();
      //Toast('编辑收货地址:' + index);
    },
    // 删除联系人
    onDelete(info) {
      var obj = { id: info.id };
      this.$dopost(
        "/sysapi/address/delete/",
        obj,
        function (res) {
          if (
            res.data &&
            typeof res.data.error != "undefined" &&
            res.data.error === 0 &&
            res.data.data.state == "1"
          ) {
            var arr = [];
            for (let k = 0; k < this.list.length; k++) {
              let item = this.list[k];
              if (item["id"] != info.id) arr.push(item);
            }
            this.list = arr;
            this.showEdit = false;
          } else {
            Toast(res.data && res.data.mess ? res.data.mess : "出错了！");
          }
        }.bind(this),
        true
      );
    },
    // 保存联系人
    onSave(info) {
      //alert(window.frames['baidumapiframe'].contentWindow.lng+','+window.frames['baidumapiframe'].contentWindow.lat);
      console.log(this.addressInfo);
      var obj = {
        id: info.id || 0,
        address: info.addressDetail || "",
        name: info.name || "",
        tel: info.tel || "",
        area_id: info.areaCode || "",
        Isdefault: info.isDefault ? 1 : 0,
      };

      if (!obj["name"] || !obj["tel"]) {
        Toast("请输入完整收货信息");
        console.log(obj);
        return;
      }
      obj["lng"] = window.frames["baidumapiframe"].contentWindow.lng;
      obj["lat"] = window.frames["baidumapiframe"].contentWindow.lat;
      if (obj["lng"] == 0) {
        Toast("请定位收货地址的位置");
        return;
      }
      this.$dopost(
        "/sysapi/address/add/",
        obj,
        function (res) {
          if (
            res.data &&
            typeof res.data.error != "undefined" &&
            res.data.error === 0
          ) {
            if (this.editIndex == null) {
              this.list.push({
                id: res.data.data.id,
                name: info.name,
                tel: info.tel,
                area_id: info.areaCode,
                isDefault: info.isDefault ? 1 : 0,
                address: info.addressDetail,
              }); //info.province+info.city+info.county+
            } else {
              this.list[this.editIndex]["name"] = info.name;
              this.list[this.editIndex]["tel"] = info.tel;
              this.list[this.editIndex]["area_id"] = info.areaCode;
              this.list[this.editIndex]["isDefault"] = info.isDefault ? 1 : 0;
              this.list[this.editIndex]["address"] = info.addressDetail; //info.province+info.city+info.county+
            }

            this.chosenAddressId = res.data.data.id;
            this.showList = false;
            this.showEdit = false;
          } else {
            Toast(res.data && res.data.mess ? res.data.mess : "出错了！");
          }
        }.bind(this),
        true
      );
      //
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