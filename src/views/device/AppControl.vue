<template>
  <!-- main -->
  <main class="main">
    <div class="userlistCheck">
      <h3 class="pb-2">사용 단말기 목록</h3>
      <ul class="list-group">
        <li v-for="device in deviceList" class="list-group-item d-flex justify-content-between align-items-start">
          <input class="form-check-input" v-model="choiceDevice"  type="radio" :name="device.deviceId" :id="device.deviceIMEI" :value="device">
          <label class="form-check-label" :for="device.deviceIMEI">
          </label>
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ device.nickName }} <small class="opacity-75">{{ device.deviceIMEI }}</small></div>
            <div v-if="device.radius > 0">{{ device.rangeName }} - {{device.radius/1000}}km</div>
          </div>
          <span class="badge"><img v-if="masterGuardNo === 0" src="../../../public/static/images/pen.svg" alt="수정" width="38" height="38" @click="showModal(device)"></span>
        </li>

      </ul>
    </div>

    <div class="d-flex w-100 justify-content-between border-bottom border-1 pt-3 pb-1">
      <h3 class="ps-3">비밀번호 변경</h3>
      <span class="pe-3">
    <a @click="move('changepwd')"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-right"
                    viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </svg></a>
    </span>
    </div>
    <div v-if="masterGuardNo === 0" class="d-flex w-100 justify-content-between border-bottom border-1 pt-3 pb-1">
      <h3 class="ps-3">보호자 관리</h3>
      <span class="pe-3">
        <a @click="move('guardianlist')"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-right"
                        viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg></a>
    </span>
    </div>

    <layer-modal :visible.sync="modalVisible" :device="this.modalDevice"></layer-modal>

  </main>
</template>

<script>
import api from "@/api/api";
import {mapState, mapActions} from 'vuex';
import deviceModal from './DeviceModal';

let _storage = window.sessionStorage;
let _userKey = process.env.VUE_APP_PJT + ":" + process.env.VUE_APP_USER_KEY;
export default {

  name: "AppControl",
  data() {
    return {
      deviceList:[],
      choiceDeviceNo:0,
      choiceDevice:'',
      modalVisible:false,
      modalDevice: {},
      masterGuardNo:0
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

        for(var device of this.deviceList) {
          if(this.choiceDeviceNo === 0 || device.deviceNo === this.choiceDeviceNo){
            this.choiceDeviceNo = device.deviceNo;
            this.choiceDevice = device;
          }
        }
      }
    },
    showModal(device) {
      this.modalVisible = true;
      this.modalDevice = device;

    },

    move(url) {
      this.$router.push(url);
    }
  },
  watch:{
    choiceDevice() {
      this.choiceDeviceNo = this.choiceDevice.deviceNo;
      this.commitChoiceDevice(this.choiceDevice);

    },

  },
  computed:{
    ...mapState("guardStore", ['choiceDevice'] ),

  },
  created() {
    this.choiceDeviceNo = this.choiceDevice.deviceNo;
    this.selDeviceList();
    let userInfo = JSON.parse(_storage.getItem(_userKey));
    this.masterGuardNo = userInfo.masterGuardNo;

  }
}
</script>

<style scoped>

</style>