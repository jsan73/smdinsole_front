<template>
  <div class="modal modal-alert d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalChoice">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-body p-4 text-center">
          <!-- <h5 class="mb-0">비밀번호 확인</h5>-->
          <p class="mb-5 mt-5">{{msg}}</p>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button v-if="btnC" @click="close" type="button" class="btn btn-lg fs-6 text-decoration-none col-6 m-0 rounded-0 border-right kksColorMain" >취소</button>
          <button v-if="!btnC" @click="ok" type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-12 m-0 rounded-0 " data-bs-dismiss="modal">확인</button>
          <button v-else-if="btnC" @click="ok" type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 " data-bs-dismiss="modal">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    btnC:false,
    btnO:false,
    msg:"",
    // callback함수 인자
    doActionParam:[String, Number, Boolean, Array, Object],
  },
  // data() {
  //   return {
  //     visible:false,
  //   };
  // },
  methods: {
    // showAlert() {
    //   this.visible = true;
    // },
    close() {
      this.$emit("close");
    },
    // cancel(){
    //   this.$emit('update:visible', false);
    // },
    ok(){
        this.$emit("doAction", this.doActionParam);
    }
  }
}
</script>

<style scoped>

</style>