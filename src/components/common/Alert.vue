<template>
  <div class="modal modal-alert d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalChoice">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-body p-4 text-center">
          <p class="mb-5 mt-5"><span v-html="msg"></span></p>
          <p v-if="alertType === 3" class="mb-5 mt-5">남은 시간 : {{ sec_count }}초</p>

        </div>
        <div class="modal-footer flex-nowrap p-0" v-if="alertType !== 3">
          <button v-if="btnC" @click="close" type="button" class="btn btn-lg fs-6 text-decoration-none col-6 m-0 rounded-0 border-right kksColorMain" >
            {{ types[alertType].left }}</button>
          <button v-if="!btnC && btnO" @click="ok" type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-12 m-0 rounded-0 " data-bs-dismiss="modal">{{ types[alertType].right }}</button>
          <button v-else-if="btnC" @click="ok" type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 " data-bs-dismiss="modal">{{ types[alertType].right }}</button>
        </div>
        <div class="modal-footer flex-nowrap p-0" v-if="alertType === 3">
          <button @click="close2" type="button" class="btn btn-lg fs-6 text-decoration-none col-12 m-0 rounded-0" >
            {{ types[alertType].left }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/utils";

export default {
  name: "Alert",
  props: {
    btnC: false,
    btnO: false,
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
        {left:"취소", right:"다시 시도"},
        {left:"취소", right:"취소"},
      ],
      btn_retry : false,
      btn_cancel : false,
      retry_msg : '',
      sec_count : 60,
      timer_interval:null,
    };
  },
  watch: {
    alertType(val) {
      if(val === 3) {
        this.sec_count = 60;
        this.start_timer();
      }
    },
    sec_count(val) {
      if(val <= 0){
        clearInterval(this.timer_interval)
      }
    },

  },
  methods: {
    // showAlert() {
    //   this.visible = true;
    // },
    close() {
      this.$emit("close");
    },
    close2() {
      this.hideAlert()
    },
    // cancel(){
    //   this.$emit('update:visible', false);
    // },
    ok(){
        this.$emit("doAction", this.doActionParam);
    },

    // ok_retry(){
    //   this.sec_count = 60;
    //   this.start_timer();
    // },

    start_timer(){
      this.timer_interval = setInterval(() => {
        this.sec_count--;
        if(this.sec_count % 5 === 0) {
          this.$emit("doAction", this.doActionParam)
        }

      }, 1000)
    },

  },
  created() {
    console.log("Alert Start")
    if(this.alertType === 3)
      this.start_timer();
  },
  destroyed() {
    console.log("Alert Destoryed")
    clearInterval(this.timer_interval)
  }
}
</script>

<style scoped>

</style>