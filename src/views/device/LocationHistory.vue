<template>
  <div>
    <main class="container px-0 position-relative h-100">
      <DeviceHeader :device="device" :status="location" :range="range" ></DeviceHeader>

      <div id="find-location" class="container-fluid px-0  dash-map-h">
        <GoogleMap :center="center" :markers="markers" :poly-lines="polyLines" :zoom="zoom" :styles="styles" :custom="true"/>
      </div>
    </main>
    <div class="fixed-bottom location-wrap">
      <p class="text-center text-white mb-0">{{ displayDay }}</p>
    </div>
  </div>
</template>

<script>
import DeviceHeader from "@/views/device/DeviceHeader";
import {mapState} from "vuex";
import api from "@/api/api";
import utils from "@/utils/utils";

export default {
  name: "LocationHistory",
  components: {DeviceHeader},
  data() {
    return {
      locationDay:0,
      device:'',
      location:'',
      range:'',
      center : {
        lat:0,
        lng:0,
      },
      markers:[],
      history:'',
      polyLines:[],
      locDate:'',
      displayDay:'',
      zoom:15,
      styles:'width:100%;  height: 500px;'
    }
  },
  mounted() {
    this.locationDay = this.$route.query.locationDay;
  },
  methods: {
    addMarker(marker, icon, label, content) {
      this.markers.push({position: marker, icon:icon, label:label, content:content});
    },
    async selectHistory(deviceNo) {
      const params ={days: this.locationDay};
      let res = await api.selectHistory(deviceNo, params);
      if(res.data.status === "SUCCESS") {
        let lats = [];
        let lngs = [];
        this.history = res.data.data;

        this.history.forEach((loc, index) =>{
          if(index === 0) this.locDate = loc.reportDate.substring(0,8);
          let iconUrl = utils.getPinImage(loc.status);
          this.addMarker(
              {
                      lat:loc.lat,
                      lng:loc.lng
              },
              {
                url : iconUrl
              },
              {
                      text: (index + 1).toString(),
                      color: "#FFFF",
              }, loc.reportDate.replace('T', ' '));
          this.polyLines.push({lat:loc.lat, lng:loc.lng});
          lats.push(loc.lat);
          lngs.push(loc.lng);
        })
        if(this.markers.length > 0) {
          this.center = this.markers[this.markers.length - 1].position;
          this.displayDay = this.makeDay();
          let minLat = Math.min(...lats)
          let maxLat = Math.max(...lats)

          let minLng = Math.min(...lngs)
          let maxLng = Math.max(...lngs)

          // let zoomRadius = 1500;
          let zoomRadius = utils.getDistanceFromLatLonInKm(minLat, maxLng, maxLat, minLng);
          // if(dist > 3000) zoomRadius = dist / 2
          this.zoom = utils.getGmapZoomLevel(( maxLat + minLat) / 2, zoomRadius/2)
          this.center = utils.getCenter(minLat, maxLng, maxLat, minLng);
        }else{
          this.displayDay = "위치기록이 없습니다."
        }

      }
    },
    async getLastLocation(deviceNo) {
      const res = await api.getLocation(deviceNo);
      if(res.data.status === "SUCCESS") {
        this.location = res.data.data
      }
    },
    async getActiveRange(deviceNo) {
      const res = await api.selActiveRangeList(deviceNo);
      if(res.data.status === "SUCCESS") {
        const rangeList = res.data.data
        if(utils.isNotEmpty(rangeList) && rangeList.length > 0) {
          this.range = rangeList[0];
        }
      }
    },
    async getDeviceInfo() {
      let res = await api.getDeviceDashInfo(this.choiceDevice.deviceNo);
      if(res.data.status === "SUCCESS") {
        this.device = res.data.data;
        this.selectHistory(this.device.deviceNo);
        this.getLastLocation(this.device.deviceNo);
        this.getActiveRange(this.device.deviceNo);
      }
    },
    makeDay() {
      const days = [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토'
      ];
      const date = new Date(utils.convertFromStrToDate(this.locDate));

      const dayname = days[date.getDay()];
      const year = date.getFullYear().toString();
      const mm = date.getMonth() + 1;
      let dd = date.getDate();
      const month =  mm < 10? "0" + mm : mm.toString();
      const day =  dd < 10? "0" + dd : dd.toString();

      return (this.locationDay===0)? "[오늘]":"" +  year + "-" + month + "-" + day + "(" + dayname + ")  위치기록";

    }
  },
  created() {
    this.getDeviceInfo();
  },
  computed:{
    ...mapState("guardStore", ['choiceDevice'] ),

  },
}
</script>

<style scoped>

</style>