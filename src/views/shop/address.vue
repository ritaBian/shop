<template>
  <div>
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
import { areaList } from "@/util/area.js";
export default {
  props:['show'],
  data() {
    return {
      chosenAddressId: null,
      showList: false,
      showEdit: false,
      areaList: this.areaList,
      addressInfo: {},
      list: [],
    };
  },
  watch:{
    'show'(val){
      this.showList = val
    },
    'showList'(val){
      this.$emit('getMessage',val)
    }
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
  },
};
</script>
<style lang="scss">
.van-overlay{
  background-color: rgba(0,0,0,.3);
}
</style>
