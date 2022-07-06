<template>
  <div class="sticky-top shadow w-100">
    <div class="list-group userlist">
      <a @click="move" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <img :src="gpsImg" width="44" height="56" class=" flex-shrink-0">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h4 class="mb-0">{{device.nickName}} <small class="opacity-75">{{device.deviceIMEI}}</small></h4>
            <p class="mb-0 mt-1">{{range.rangeName}} - {{range.radius}}m</p>
          </div>
        </div>
        <div class="battery"><img :src="batteryImg" width="32" height="32"></div>
      </a>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/utils";

export default {
  name: "DeviceHeader",
  props:{
    device:{
      nickName:'',
      deviceIMEI:'',
    },
    range:{
      rangeName:'',
      radius:1,
    },
    status:{
      battery:0,
      status:0,
    }
  },
  data() {
    return {
      batteryImg : '/static/images/battery/0.svg',
      gpsImg : '/static/images/GPS/OK.svg'
    }
  },
  watch: {
    status() {
      switch (this.status.battery) {
        case 0:
          this.batteryImg = "/static/images/battery/Warn.svg";
          break;
        case 1:
        case 2:
        case 3:
          this.batteryImg = "/static/images/battery/" + this.status.battery + ".svg";
          break;
        case 4:
          // 충전중
          this.batteryImg = "/static/images/battery/Chg.svg";
          break;
        case 5:
          // 충전완료
          this.batteryImg = "/static/images/battery/Complete.svg";
          break;
        default:
          this.batteryImg = "/static/images/battery/0.svg";
      }

      //(GPS:4, CELL:5, SAVE-WIFI:6,없음:7)
      switch (this.status.status) {
        case 4:
          this.gpsImg = "/static/images/GPS/NET.svg";
          break;
        case 5:
        case 6:
          this.gpsImg = "/static/images/GPS/OK.svg";
          break;
        case 7:
          this.gpsImg = "/static/images/GPS/NO.svg";
          break;
        default:
          this.gpsImg = "/static/images/GPS/NO.svg";
      }

    }
  },
  methods:{
    move(){
      this.$emit("clickAction");
    }
  }
}
</script>

<style scoped>

</style>