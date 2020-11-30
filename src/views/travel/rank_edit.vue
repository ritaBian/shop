<template>
  <div class="body">
      <van-nav-bar title="排序" left-arrow  @click-left="onClickLeft" />

      <div class="page_body">
        <div class="page_once">
          <div class="page_once_no">NO.1</div>
          <div class="page_white">
            <div class="page_white_left ">
              <div>第1天</div>
              <div class="app_line page_white_content" >上清w达瓦达瓦大屋顶达瓦达瓦伟大伟大达瓦德瓦达达娃达娃大宫</div>
            </div>
            <div class="page_white_right">
              <div class="page_white_right_once">
                <div class="page_white_icon_border">
                  <div class="page_white_icon_top"></div>
                  <div class="page_white_icon_bottom"></div>
                </div>
                <div style="margin-left: 0.09rem;">上移</div>
              </div>
              <div class="page_white_right_once" style="margin-left: 0.31rem;">
                <div class="page_white_icon_border">
                  <div class="page_white_icon_top2"></div>
                  <div class="page_white_icon_bottom2"></div>
                </div>
                <div style="margin-left: 0.09rem;">下移</div>
              </div>
            </div>
          </div>
        </div>


        <div class="submitButton">修改</div>


      </div>

  </div>
</template>

<script>
  import Util from '@/util/common';
  import {Toast} from 'vant';
  export default {
    data() {
      return {


      }
    },
    mounted(){

    },
    methods: {
      onClickLeft(){

      },
    },

  }


</script>

<style scoped="scoped" src="../../css/rank_edit.css">
  /* @import url("../../css/rank_edit.css"); */
  ::-webkit-scrollbar {
    width: 0;
  }
</style>
