<template>
  <!-- main -->
  <main>
    <div class="userlistCheck">
      <ul class="list-group">

        <li v-for="device in deviceList" class="list-group-item d-flex justify-content-between align-items-start">
          <input class="form-check-input" v-model="selectDevice"  type="radio" :name="device.deviceId" :id="device.deviceIMEI" :value="device">
          <label class="form-check-label" :for="device.deviceIMEI">
          </label>
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ device.nickName }} <small v-if="device.nickName == ''" class="opacity-75">{{ device.deviceIMEI }}</small></div>
            <div v-if="device.radius > 0">{{ device.rangeName }} - {{device.radius/1000}}km</div>
          </div>
          <span class="badge"><img v-if="masterGuardNo == guardNo" src="../../../public/static/images/pen.svg" alt="수정" width="38" height="38" @click="showModal(device)"></span>
        </li>

      </ul>
    </div>

    <div class="btn_wrap" style="width: 100%; padding:1.5rem;">
      <div class="row">
        <div class="col">
          <button @click="selectConfirmDevice" class="btn btn-style-1">확인</button>
        </div>

      </div>
    </div>



    <layer-modal :visible.sync="modalVisible" :device="this.modalDevice" z-index="999999"></layer-modal>

  </main>
</template>

<script>
import api from "@/api/api";
import {mapState, mapActions} from 'vuex';
import deviceModal from './DeviceModal';
import utils from "@/utils/utils";


export default {

  name: "DeviceControl",
  data() {
    return {
      deviceList:[],
      choiceDeviceNo:0,
      selectDevice:'',
      modalVisible:false,
      modalDevice: {},
      masterGuardNo:0,
      guardNo:0
    }
  },
  components:{
    layerModal : deviceModal
  },
  methods: {
     ...mapActions("guardStore", ['commitChoiceDevice']),
    async selDeviceList() {
      const res = await api.selDeviceList();
      if(res.data.status === "SUCCESS") {
        this.deviceList = res.data.data

        for(let device of this.deviceList) {
          if(this.choiceDeviceNo === 0 || device.deviceNo === this.choiceDeviceNo){
            this.choiceDeviceNo = device.deviceNo;
            this.selectDevice = device;
          }
          this.getActiveRange(device);
        }
      }
    },
    async getActiveRange(device) {
      const res = await api.selActiveRangeList(device.deviceNo);
      if(res.data.status === "SUCCESS") {
        const rangeList = res.data.data
        if(utils.isNotEmpty(rangeList) && rangeList.length > 0) {
          device.rangeName = rangeList[0].rangeName;
          device.radius = rangeList[0].radius;
        }
      }
    },
    showModal(device) {
      this.modalVisible = true;
      this.modalDevice = device;

    },

    move(url) {
      this.$router.push(url);
    },
    selectConfirmDevice() {
      this.choiceDeviceNo = this.selectDevice.deviceNo;
      this.masterGuardNo = this.selectDevice.masterGuardNo;
      this.commitChoiceDevice(this.selectDevice);
      this.$router.go(-1);
    },
  },
  watch:{
    // selectDevice() {
    //   this.choiceDeviceNo = this.selectDevice.deviceNo;
    //   this.commitChoiceDevice(this.selectDevice);
    //
    // },

  },
  computed:{
    ...mapState("guardStore", ['choiceDevice','guardInfo'] )


  },
  created() {
    this.choiceDeviceNo = this.choiceDevice.deviceNo;
    let userInfo = utils.getGuard(this.guardInfo.token);
    this.masterGuardNo = this.choiceDevice.masterGuardNo;
    this.guardNo = userInfo.guardNo;

    this.selDeviceList();
  }
}
</script>

<style scoped>

</style>