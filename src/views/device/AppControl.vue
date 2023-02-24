<template>
  <!-- main -->
  <main>


    <div class="list-group">
      <a @click="move('changepwd')" class="list-group-item list-group-item-action d-flex py-3" aria-current="true">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <h3>비밀번호 변경</h3>
          <i class="bi-chevron-right text-primary fs-3"></i>
        </div>
      </a>
      <a @click="move('guardianlist')" class="list-group-item list-group-item-action d-flex py-3" aria-current="true">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <h3>사용자 관리</h3>
          <i class="bi-chevron-right text-primary fs-3"></i>
        </div>
      </a>
      <a @click="goLogout" class="list-group-item list-group-item-action d-flex py-3" aria-current="true">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <h3>로그아웃</h3>
          <i class="bi-chevron-right text-primary fs-3"></i>
        </div>
      </a>
    </div>



<!--    <layer-modal :visible.sync="modalVisible" :device="this.modalDevice"></layer-modal>-->

  </main>
</template>

<script>
import api from "@/api/api";
import {mapState, mapActions} from 'vuex';
import deviceModal from './DeviceModal';
import utils from "@/utils/utils";


export default {

  name: "AppControl",
  // data() {
  //   return {
  //     deviceList:[],
  //     choiceDeviceNo:0,
  //     selectDevice:'',
  //     modalVisible:false,
  //     modalDevice: {},
  //     masterGuardNo:0
  //   }
  // },
  // components:{
  //   layerModal : deviceModal
  // },
  methods: {
    ...mapActions("guardStore", ["commitToken", "commitAutoLogin", "commitChoiceDevice"]),
    //  ...mapActions("guardStore", ['commitChoiceDevice']),
    // async selDeviceList() {
    //   const res = await api.selDeviceList();
    //   if(res.data.status === "SUCCESS") {
    //     this.deviceList = res.data.data
    //
    //     for(let device of this.deviceList) {
    //       if(this.choiceDeviceNo === 0 || device.deviceNo === this.choiceDeviceNo){
    //         this.choiceDeviceNo = device.deviceNo;
    //         this.selectDevice = device;
    //       }
    //       this.getActiveRange(device);
    //     }
    //   }
    // },
    // async getActiveRange(device) {
    //   const res = await api.selActiveRangeList(device.deviceNo);
    //   if(res.data.status === "SUCCESS") {
    //     const rangeList = res.data.data
    //     if(utils.isNotEmpty(rangeList) && rangeList.length > 0) {
    //       device.rangeName = rangeList[0].rangeName;
    //       device.radius = rangeList[0].radius;
    //     }
    //   }
    // },
    // showModal(device) {
    //   this.modalVisible = true;
    //   this.modalDevice = device;
    //
    // },
    goLogout() {
      this.commitToken('');
      let choiceDevice = {
        "deviceNo":0
      }
      this.commitChoiceDevice(choiceDevice);
      this.commitAutoLogin('N');
      window.location.href = "/login"
      //this.$router.replace('/login');
    },
    move(url) {
      this.$router.push(url);
    }
  },
  // watch:{
  //   selectDevice() {
  //     this.choiceDeviceNo = this.selectDevice.deviceNo;
  //     this.commitChoiceDevice(this.selectDevice);
  //
  //   },
  //
  // },
  // computed:{
  //   ...mapState("guardStore", ['choiceDevice','guardInfo'] )
  //
  //
  // },
  created() {
    // this.choiceDeviceNo = this.choiceDevice.deviceNo;
    // let userInfo = utils.getGuard(this.guardInfo.token);
    // this.masterGuardNo = userInfo.masterGuardNo;
    //
    // this.selDeviceList();
  }
}
</script>

<style scoped>

</style>