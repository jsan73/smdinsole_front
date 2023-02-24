<template>
  <!-- main -->
  <main class="main">

    <div class="pwModi" >
      <div class="mb-4">
        <label for="NameInput" class="form-label kksColorPrimary fw-bold">사용자명</label>
        <input type="text" v-model="guard.guardName" class="form-control" id="NameInput" name="PhoneInput" placeholder="사용자명" >
      </div>
      <div class="mb-4">
        <label for="PhoneInput" class="form-label kksColorPrimary fw-bold">휴대전화번호</label>
        <input type="number" pattern="\d*" v-model="guard.guardPhone" class="form-control" id="PhoneInput" name="PhoneInput" placeholder="휴대전화번호 입력" >
      </div>

      <div  class="btn_wrap">
        <div class="row">
          <div class="col">
            <button @click="gotoBack" class="btn btn-style-1 btn-style-1-gray">취소</button>
          </div>
          <div class="col">
            <button @click="save" class="btn btn-style-1 ">저장</button>
          </div>

        </div>
      </div>

    </div>


  </main>
</template>

<script>
import {mapState} from "vuex";
import api from "@/api/api";
import utils from "@/utils/utils";

export default {
  name: "GuardianAdd",
  data() {
    return {
      guard: {
        guardName: '',
        guardPhone: '',
        masterGuardNo: 0,
        maketingAgreeYn: 'Y'
      }
    }
  },
  methods: {

    save() {
      this.openPopup(this.guard.guardName + '에게<br>앱설치 링크를 보내시겠습니까?', true, true, this.doSave);
    },
    async doSave(){
      const res = await api.insGuardian(this.guard, this.choiceDevice.deviceNo);
      if(res.data.status === "SUCCESS") {
        this.hideAlert();
        this.gotoBack();
      }else{
        this.openPopup('오류가 발생 했습니다', true, false, this.hideAlert());
      }

    },

  },
  computed:{
    ...mapState("guardStore", ['choiceDevice', "guardInfo"] ),

  },
  created(){
    let userInfo = utils.getGuard(this.guardInfo.token);

    this.guard.masterGuardNo =  userInfo.guardNo;
  }
}
</script>

<style scoped>

</style>