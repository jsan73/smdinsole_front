<template>
  <div class="modal modal-alert d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalChoice">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-body p-4 text-center">
          <!-- <h5 class="mb-0">비밀번호 확인</h5>-->
          <p class="mb-5 mt-5"><span v-html="msg"></span></p>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button v-if="btnC" @click="close" type="button" class="btn btn-lg fs-6 text-decoration-none col-6 m-0 rounded-0 border-right kksColorMain" >
            {{ types[alertType].left }}</button>
          <button v-if="!btnC" @click="ok" type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-12 m-0 rounded-0 " data-bs-dismiss="modal">{{ types[alertType].right }}</button>
          <button v-else-if="btnC" @click="ok" type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 " data-bs-dismiss="modal">{{ types[alertType].right }}</button>
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
    alertType:0
  },
  data() {
    return {
      types:[
        {left:"취소", right:"확인"},
        {left:"아니오", right:"예"},
      ]
    };
  },
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