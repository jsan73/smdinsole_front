<template>
  <div class="sticky-top shadow w-100">
    <div class="list-group userlist">
      <a @click="move" class="list-group-item list-group-item-action d-flex gap-3 py-3" style="height:10vh;" aria-current="true">
        <img :src="gpsImg" width="44" height="56" class=" flex-shrink-0">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h4 class="mb-0">{{device.nickName}}</h4>
            <p class="mb-0 mt-1">{{range.rangeName}} - {{calRadius}} km</p>
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
      batteryImg : this.getBatteryImg(),
      gpsImg : this.getNetImg(),
      radius : 1,

    }
  },
  computed : {
    calRadius() {
      if(this.range.radius) {
        return this.range.radius / 1000
      }else return 1
    },

  },
  watch: {
    status() {
      // console.log("battery : " + this.status.battery)
      this.batteryImg = utils.getBatteryImage(this.status.battery, this.status.reportDate);
      this.gpsImg = utils.getNetImg(this.status.status, this.status.reportDate);
    }
  },
  methods:{
    getBatteryImg() {
      // console.log("battery : " + this.status.battery)
      return utils.getBatteryImage(this.status.battery, this.status.reportDate);
    },
    getNetImg() {
      return utils.getNetImg(this.status.status, this.status.reportDate);

    },
    move(){
      this.$emit("clickAction");
    }
  },

}
</script>

<style scoped>

</style>