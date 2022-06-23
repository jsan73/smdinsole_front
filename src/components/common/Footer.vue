<template>
  <footer id="footer">
  <div class="fixed-bottom" style="background-color: #2CBBB6; z-index: 2000; min-height: 72px;">
    <ul class="d-flex ps-0 mb-0 justify-content-evenly">
      <li class="col text-center pt-2">
        <a @click="move('/shoes/range')">
          <img src="/static/images/radius-pin.svg" alt="">
          <p class="pt-1 text-white mb-2" >활동범위</p>
        </a>
      </li>
      <li class="col text-center pt-2">
        <a @click="reqCurrentLocation">
          <img src="/static/images/refresh.svg" alt="">
          <p class="pt-1 text-white mb-2" >현재위치</p>
        </a>
      </li>
      <li class="col text-center pt-2">
        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
          <img src="/static/images/notifications.svg" alt="">
          <p class="pt-1 text-white mb-2">알림설정</p>
        </a>
      </li>
      <li class="col text-center pt-2">
        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2" aria-controls="offcanvasBottom2">
          <img src="/static/images/clock.svg" alt="">
          <p class="pt-1 text-white mb-2">위치기록</p>
        </a>
      </li>
    </ul>
  </div>

  <AlramLayer></AlramLayer>

  <div class="offcanvas offcanvas-bottom" data-bs-backdrop="false" tabindex="-1" id="offcanvasBottom2" aria-labelledby="offcanvasBottomLabel2">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel2">위치기록 보기</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <!--
                  <ul class="offcanvas_List">
                      <li class="">오늘</li>
                      <li class="">1일전</li>
                      <li class="">2일전</li>
                      <li class="">3일전</li>
                      <li class="">4일전</li>
                      <li class="">5일전</li>
                  </ul>
      -->
      <div class="form-check offcanvas_List" v-for="(n, i) in 6 ">
        <input class="form-check-input" v-model="locationDay" type="radio" name="locatonHistory" :id="'locatonHistory'+(i+1)" :value="i">
        <label class="form-check-label" :for="'locatonHistory'+(i+1)">
          <div v-if="i==0">오늘</div>
          <div v-else>{{i}}일전</div>
        </label>
      </div>

    </div>
  </div>
  </footer>
</template>

<script>
import {mapState} from "vuex";
import api from "@/api/api";
import AlramLayer from "@/components/common/AlramLayer";

export default {
  name: "Footer",
  components: {AlramLayer},
  data() {
    return {
      locationDay:0,
    }
  },
  methods: {
    move(url) {
      let path = window.location.pathname;
      if(path === "/main") {
        this.$router.push(url);
      } else {
        //this.$router.replace(url);
        this.$router.push(url);
      }
    },
    reqCurrentLocation() {
      this.openPopup("현재 위치를 요청하였습니다.", true, false, this.hideAlert);
    },
  },
  watch:{
    locationDay() {
      this.$router.push("/shoes/location?locationDay=" + this.locationDay);
    },
    alramOption() {
      let params ={code:'A01'}
      api.setAlram(params, this.choiceDevice.shoesNo );
    }
  },
  computed:{

    ...mapState("guardStore", ['choiceDevice'] ),

  },
}
</script>

<style scoped>

</style>