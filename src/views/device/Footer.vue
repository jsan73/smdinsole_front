<template>
  <footer id="footer">
  <div class="fixed-bottom" style="background-color: #2CBBB6; z-index: 2000; min-height: 8vh;">
    <ul class="d-flex ps-0 mb-0 justify-content-evenly">
      <il class="col text-center pt-2">
        <a @click="move('/device/range')">
          <img src="/static/images/radius-pin.svg" alt="">
          <p class="pt-1 text-white mb-2" >안심존</p>
        </a>
      </il>
      <il class="col text-center pt-2">
        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom3" aria-controls="offcanvasBottom3">
          <img src="/static/images/refresh.svg" alt="">
          <p class="pt-1 text-white mb-2" >현재위치</p>
        </a>
      </il>
      <il class="col text-center pt-2">
        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" @click="openNotice">

<!--          <img src="/static/images/notifications.svg" alt="">-->
          <img :src="noticeIcon" alt="">
          <p class="pt-1 text-white mb-2">알림설정</p>
        </a>
      </il>
      <il class="col text-center pt-2">
        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2" aria-controls="offcanvasBottom2">
          <img src="/static/images/clock.svg" alt="">
          <p class="pt-1 text-white mb-2">위치기록</p>
        </a>
      </il>

    </ul>
  </div>

  <NoticeLayer :visible.sync="toggleNotice" @noticeStatus="changeNoticeIco" ></NoticeLayer>

  <div class="offcanvas offcanvas-bottom" data-bs-backdrop="false" tabindex="-1" id="offcanvasBottom2" aria-labelledby="offcanvasBottomLabel2">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel2">위치기록 보기</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="form-check offcanvas_List" v-for="(n, i) in 6 ">
        <input class="form-check-input" v-model="locationDay" type="radio" name="locatonHistory" :id="'locatonHistory'+(i+1)" :value="i" data-bs-dismiss="offcanvas" aria-label="Close">
        <label class="form-check-label" :for="'locatonHistory'+(i+1)">
          <div v-if="i==0">오늘</div>
          <div v-else>{{i}}일전</div>
        </label>
      </div>

    </div>
  </div>

    <div class="offcanvas offcanvas-bottom" data-bs-backdrop="false" tabindex="-1" id="offcanvasBottom3" aria-labelledby="offcanvasBottomLabel3">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">현재위치</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="p-5">
          <p class="pb-3 text-center">현재 위치를 요청하겠습니까?</p>

          <div class="pt-3">
            <div class="row">
              <div class="col">
                <button type="submit" class="btn btn-style-1 btn-style-1-gray" @click="reqCurrentLocationCancel">취소</button>
              </div>
              <div class="col">
                <button type="submit" class="btn btn-style-1 " @click="reqCurrentLocation">확인</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </footer>
</template>

<script>
import {mapState} from "vuex";
import api from "@/api/api";
import NoticeLayer from "@/views/device/NoticeLayer.vue";

export default {
  name: "Footer",
  components: {NoticeLayer},
  data() {
    return {
      locationDay:-1,
      toggleNotice:false,
      noticeIcon:'/static/images/notifications.svg'
    }
  },
  methods: {
    changeNoticeIco(val) {
      this.noticeIcon = '/static/images/notifications' + val + '.svg'
    },
    move(url) {
      $('.offcanvas').offcanvas('hide');
      this.$router.push(url);
    },
    reqCurrentLocationCancel() {
      $('.offcanvas').offcanvas('hide');

      this.$emit("reload")
    },
    async reqCurrentLocation() {
      $('.offcanvas').offcanvas('hide');

      // const res = await api.reqCurrentLocation(this.choiceDevice.deviceIMEI);
      // if(res.data.status === "SUCCESS") {
      //   if (res.data.data > 0)
      //     this.openPopup("현재 위치를 요청 하였습니다.", true, false, this.hideAlert);
      //   else
      //     this.openPopup("현재 위치 정보가 없습니다.<br>잠시 후에 다시 요청해주세요.", true, false, this.hideAlert);
      // }
      this.$emit("reqloc")
    },
    openNotice(){
      this.toggleNotice = !this.toggleNotice;
    },

  },
  watch:{
    locationDay() {

      this.$router.push("/device/location?locationDay=" + this.locationDay);
    },
  },
  computed:{

    ...mapState("guardStore", ['choiceDevice'] ),

  },
}
</script>

<style scoped>

</style>