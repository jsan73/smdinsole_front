<template>
  <div v-if="visible" class="modal modal-alert  d-block bg-secondary" tabindex="-1" role="dialog" id="modalChoice">
    <div class="namePop shadow" role="document">
      <div class="namePop-header">
        <h5 class="namePop-title">사용 단말기 정보</h5>
        <button type="button" @click="$emit('update:visible', !visible)" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="namePop-body">
        <h6 class="mt-5 ps-3">등록된 단말기의 사용명칭을 변경합니다.</h6>
        <div class="my-4 px-3">
          <label for="AdrInput" class="form-label  fw-bold kksColorPrimary ">사용명칭</label>
          <input type="text" class="form-control" id="AdrInput" placeholder="KKS insole" v-model="device.nickName">
        </div>

      </div>

    </div><div class="p-3 namePop-footer">
    <div class="row">
      <div class="col">
        <button type="button" @click="$emit('update:visible', !visible)" class="btn btn-style-1 btn-style-1-gray">취소</button>
      </div>
      <div class="col">
        <button type="button" @click="modifyDevice" class="btn btn-style-1 ">저장</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "DeviceModal",
  props: {
    visible:false,
    device:null
  },

  methods: {
    async modifyDevice() {

      if(this.device != null) {
       // this.device.nickName = this.nickname;
        const res = await api.updDeviceNickName(this.device);
        if(res.data.status === "SUCCESS") {

          console.log("수정완료");
        }
      }
      this.$emit('update:visible', false);
    }
  },
  created() {
    this.nickname = this.device.nickname;
  }
}
</script>

<style scoped>

</style>