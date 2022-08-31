<template>
  <div class="sticky-top shadow w-100">
    <div class="list-group userlist">
      <a @click="move" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <img :src="getNetImg" width="44" height="56" class=" flex-shrink-0">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h4 class="mb-0">{{device.nickName}}</h4>
            <p class="mb-0 mt-1">{{range.rangeName}} - {{calRadius}} km</p>
          </div>
        </div>
        <div class="battery"><img :src="getBatteryImg" width="32" height="32"></div>
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
      nickName: {
        type:String,
        default : ''
      },
      deviceIMEI:'',
    },
    range:{
      rangeName: {
        type:String,
        default : ''
      },
      radius: {
        type:Number,
        default : 1

      }
    },
    status:{
      battery:0,
      status:0,
    }
  },
  data() {
    return {
      // batteryImg : '/static/images/battery/0.svg',
      // gpsImg : '',
      radius : 1
    }
  },
  computed : {
    calRadius() {
      console.log(this.range)
      if(this.range.radius) {
        return this.range.radius / 1000
      }else return 1
    },
    getBatteryImg() {
      let batteryImg = '';
      switch (this.status.battery) {
        case 0:
          batteryImg = "/static/images/battery/Warn.svg";
          break;
        case 1:
        case 2:
        case 3:
          batteryImg = "/static/images/battery/" + this.status.battery + ".svg";
          break;
        case 4:
          // 충전중
          batteryImg = "/static/images/battery/Chg.svg";
          break;
        case 5:
          // 충전완료
          batteryImg = "/static/images/battery/Complete.svg";
          break;
        default:
          batteryImg = "/static/images/battery/0.svg";
      }
      return batteryImg
    },
    getNetImg() {
      let netImg = '';
      switch (this.status.status) {
        case 4:
          netImg = "/static/images/GPS/NET.svg";
          break;
        case 5:
        case 6:
          netImg = "/static/images/GPS/OK.svg";
          break;
        case 7:
          netImg = "/static/images/GPS/NO.svg";
          break;
        default:
          netImg = "/static/images/GPS/NO.svg";
      }
      return netImg
    }


  },
  // watch: {
  //   range() {
  //     this.radius = this.range.radius / 1000
  //   },
  //   status() {
  //
  //     switch (this.status.battery) {
  //       case 0:
  //         this.batteryImg = "/static/images/battery/Warn.svg";
  //         break;
  //       case 1:
  //       case 2:
  //       case 3:
  //         this.batteryImg = "/static/images/battery/" + this.status.battery + ".svg";
  //         break;
  //       case 4:
  //         // 충전중
  //         this.batteryImg = "/static/images/battery/Chg.svg";
  //         break;
  //       case 5:
  //         // 충전완료
  //         this.batteryImg = "/static/images/battery/Complete.svg";
  //         break;
  //       default:
  //         this.batteryImg = "/static/images/battery/0.svg";
  //     }
  //
  //     //(GPS:4, CELL:5, SAVE-WIFI:6,없음:7)
  //     switch (this.status.status) {
  //       case 4:
  //         this.gpsImg = "/static/images/GPS/NET.svg";
  //         break;
  //       case 5:
  //       case 6:
  //         this.gpsImg = "/static/images/GPS/OK.svg";
  //         break;
  //       case 7:
  //         this.gpsImg = "/static/images/GPS/NO.svg";
  //         break;
  //       default:
  //         this.gpsImg = "/static/images/GPS/NO.svg";
  //     }
  //
  //   }
  // },
  methods:{
    move(){
      this.$emit("clickAction");
    }
  }
}
</script>

<style scoped>

</style>