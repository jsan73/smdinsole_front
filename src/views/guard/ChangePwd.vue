<template>
  <!-- main -->
  <main class="main">

    <div class="pwModi" >
      <div class="mb-4">
        <label for="PhoneInput" class="form-label fw-bold">휴대전화번호</label>
        <input type="text" v-model="guardPhone" class="form-control" id="PhoneInput" name="PhoneInput" placeholder="휴대전화번호 입력" >
      </div>
      <div class="mb-4">
        <label for="PwdInput" class="form-label fw-bold">현재 비밀번호</label>
        <input type="password" v-model="guardPwd" class="form-control" id="PwdInput" placeholder="****" >
      </div>

      <div class="mb-4">
        <label for="RePwdInput" class="form-label kksColorPrimary fw-bold">변경 비밀번호</label>
        <input type="password" v-model="newGuardPwd" class="form-control" id="RePwdInput" placeholder="**** ">
      </div>
      <div class="mb-4">
        <label for="RePwdInputOk" class="form-label kksColorPrimary fw-bold">변경 비밀번호 확인</label>
        <input type="password" v-model="newGuardPwdok" class="form-control" id="RePwdInputOk" placeholder="**** ">
      </div>

      <div  class="btn_wrap">
        <div class="row">
          <div class="col">
            <button @click="cancel()" class="btn btn-style-1 btn-style-1-gray">취소</button>
          </div>
          <div class="col">
            <button @click="change()" class="btn btn-style-1 ">저장</button>
          </div>

        </div>
      </div>

    </div>


  </main>

</template>

<script>
import api from "@/api/api";
import Popup from "@/components/common/Alert";
import utils from "@/utils/utils";
import {mapState} from "vuex";

export default {
  name: "PasswordChange",
  components: {Popup},
  data() {
    return {
      userData: null,
      guardPhone: '',
      guardPwd: '',
      newGuardPwd: '',
      newGuardPwdok: '',

    }
  },
  methods: {
    cancel() {
      //api.back();
      this.$router.go(-1);
    },
    // openPopup(msg, ok, cancel, doAction) {
    //   let v= {
    //     msg: msg,
    //     btnO:ok,
    //     btnC:cancel,
    //     doAction: doAction
    //   }
    //   this.showAlert(v);
    // },
    nextStep() {
      this.hideAlert();
      this.$router.go(-1);
    },

    change() {
      if(this.newGuardPwd != this.newGuardPwdok) {
        this.openPopup('비밀번호 확인이 상이합니다.', true, false, this.hideAlert);
        return false;
      }
      const params = {guardPwd: this.guardPwd, newGuardPwd: this.newGuardPwd};

      api.changePwd(params)
          .then(res => {
            if(res.data.status === "SUCCESS") {
              let result = res.data.data;
              if(result == 1)
                this.openPopup('비밀번호가 변경 되었습니다.', true, false, this.nextStep);
              else if(result == -1) {
                this.openPopup('비밀번호가 일치하지 않습니다.', true, false, this.hideAlert);
              }
            }else{
              this.openPopup('오류가 발생했습니다.', true, false, this.hideAlert);
            }
          })
          // .catch(e=> {
          //   this.openPopup('오류가 발생했습니다.', true, false, this.hideAlert);
          // })
          // .finally(() => {
          //
          // });
    }
  },
  computed:{
    ...mapState("guardStore", ['guardInfo'] )


  },
  created() {
    this.guardPhone = this.guardInfo.guardPhone;
  }
}
</script>

<style scoped>

</style>