<template>
  <div class="offcanvas offcanvas-bottom" data-bs-backdrop="false" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">알림 설정</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <!--
      <ul class="offcanvas_List form-check">
      <li><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
      <label class="form-check-label" for="flexRadioDefault1">내일 아침 9시까지 알림 해제</label></li>
      <li>3시간 알림 해제</li>
      <li>6시간 알림 해제</li>
      <li>12시간 알림 해제</li>
      <li>다음 설정시까지 알림 해제</li>
      </ul>
      -->

      <div class="offcanvas-body">
        <p class="m-4 text-center">내일 오전 9시까지 <br>알람이 해제됩니다.</p>
        <div class="m-4 text-center">
          <button type="button" class="btn btn-style-1 btn-sm w-50">지금 알림 설정하기</button>
        </div>
      </div>

      <div class="form-check offcanvas_List" v-for="alram in alramList">
        <input class="form-check-input" v-model="alramOption" type="radio" name="exampleRadios" :id="alram.codeCd" :value="alram.codeValue">
        <label class="form-check-label" :for="alram.codeCd">
          {{ alram.codeNm }}
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/api/api";
import {mapState} from "vuex";

export default {
  name: "AlramLayer",
  data() {
    return {
      alramList:[],
      alramOption:0
    }
  },
  watch:{
    alramOption() {
      let params ={code:'A01'}
      api.setAlram(params, this.choiceDevice.shoesNo );
    }
  },
  methods: {
    async getAlramStatus() {

    },
    async selCodeList() {
      let res = await api.selCodeList("NOTI");
      if(res.data.status === "SUCCESS") {
        this.alramList = res.data.data;
      }
    }
  },
  created() {
    this.selCodeList();
  },
  computed:{

    ...mapState("guardStore", ['choiceDevice'] ),

  },
}
</script>

<style scoped>

</style>