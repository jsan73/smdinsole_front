<template>
  <!-- main -->
  <main class="main">

    <div class="container d-flex px-0">
      <table class="table table-hover align-middle">
        <thead class="table-light">
        <tr>
          <th scope="col" class="ps-3" style="width: 32%;">이름</th>
          <th scope="col" style="width: 50%;">핸드폰번호</th>
          <th scope="col" class="ps-3"  style="width: 18%;">삭제</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="guard in guardList">
          <td class="ps-3">{{guard.guardName}}</td>
          <td>{{ telForm(guard.guardPhone,1) }}</td>
          <td><img v-show="guard.masterGuardNo > 0" @click="delGuard(guard.guardNo)" src="../../../public/static/images/bin.svg" alt="삭제"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="btn_wrap">
      <div class="row">
        <div class="col">
          <button type="button" @click="addGuard" class="btn btn-style-1">보호자 추가 +</button>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import api from "@/api/api";
import utils from "@/utils/utils"
import Popup from "@/components/common/Alert";
export default {
  name: "GuardianList",
  data() {
    return {
      guardList:null,
      guardInfo:{
        guardNo:0,
        guardPhone:'',
        guardName:'',
        masterGuardNo:0
      }
    }
  },
  methods: {
    selectGuardList() {
      api.selectGuardList()
      .then(res => {
        if(res.data.status === "SUCCESS") {
          this.guardList = res.data.data;
        }
      })
    },
    addGuard() {
      this.$router.push('guardianadd');
    },
    delGuard(guardNo) {
      this.openPopup("삭제 하시겠습니까?.", true,true, this.doDelGuard, guardNo);
    },
    doDelGuard(guardNo) {
      api.delGuardian(guardNo)
      .then((res => {
        if(res.data.status === "SUCCESS") {
          this.openPopup("삭제 되었습니다.", true,false, this.hideAlert);
          this.selectGuardList();
        }
      }))
    },
    telForm(str) {
      return utils.telForm(str,1);
    }
  },
  created() {
    this.selectGuardList();

  }
}
</script>

<style scoped>

</style>