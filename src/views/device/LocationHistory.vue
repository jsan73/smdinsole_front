<template>
  <div>
    <main class="container px-0 position-relative h-100">
      <DeviceHeader :device="device" :status="location" :range="range" ></DeviceHeader>

      <div id="find-location" class="container-fluid px-0  dash-map-h">
        <GoogleMap ref="googleMap" :center="center" :markers="markers" :poly-lines="polyLines" :zoom="zoom" :styles="styles" :custom="true"/>
      </div>
    </main>
    <div :class="location_class"><!-- 확대시 클래스 class="locationlist-wrap locationlist-up" 로 추가함 -->
      <div class="locationlist-wrap-header">
        <div style="display: block; text-align: center;" @click="changeClass">
          <a  class="locationlist-bar"><span class="visually-hidden">더보기..</span> </a>
        </div>
        <h5 class="offcanvas-title" id="offcanvasBottomLabel2">{{ displayDay }}</h5>
      </div>
      <div style="overflow: auto;">
        <!-- 위치기록 시작 -->
        <!-- 위치기록이 없을때-->
        <div class="list-group userlist rounded-0" v-if="this.markers.length === 0">
          <a href="" class="list-group-item d-flex gap-3 py-2">
            <p class="w-100 text-center mt-2">위치기록이 없습니다.</p>
          </a>
        </div>
        <!-- 위치기록이 없을때- //-->

        <div class="list-group userlist rounded-0"  v-for="(marker, index) in this.markers" v-if="index < list_count ">
          <a @click="showMap(marker, index)" class="list-group-item d-flex gap-3 py-2">
            <div>
              <img :src="marker.icon.pinUrl" width="36" height="46" class=" flex-shrink-0">
            </div>

            <div class=" w-100">
              <div class="d-flex justify-content-between">
                <div class="">
                  <h6 class="mb-0">{{ markers.length - index }}. {{ marker.reqLoc }}</h6>
                </div>
                <div class="date">
                  <p class="mb-0">{{marker.date.list}}</p>
                </div>
              </div>
              <div class="d-flex w-100">
                <p class="mb-0 addr" style="max-width: 420px;">{{marker.addr}}</p>
              </div>
            </div>
          </a>
        </div>


        <!--  위치기록 //-->
      </div>
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
      markerList:[],
      history:'',
      polyLines:[],
      locDate:'',
      displayDay:'',
      list_count: 3,
      list_mod: 'LIMIT',
      location_class: 'locationlist-wrap',
      zoom:15,
      styles:'width:100%; height: 55vh;'
    }
  },
  mounted() {
    this.locationDay = this.$route.query.locationDay;
  },
  watch: {
    list_mod() {
      if(this.locationDay == 0) {
        this.markers = [];
        this.selectHistory(this.device.deviceNo);
        this.getLastLocation(this.device.deviceNo);
      }else{
        if(this.list_mod === 'LIMIT'){
          this.list_count = 3;
        }else {
          this.list_count = this.markers.length;
        }
      }
    }
  },
  methods: {
    changeClass() {
      if(this.list_mod === 'LIMIT'){
        this.location_class = 'locationlist-wrap locationlist-up'
        this.list_mod = 'FULL'
        // this.list_count = this.markers.length;
      }else{
        this.location_class = 'locationlist-wrap'
        this.list_mod = 'LIMIT'
      }
    },
    showMap(marker, index) {
      this.$refs.googleMap.toggleInfoWindow(marker, index);
    },
    addMarker(marker, icon, date, reqLoc) {
      this.markers.push({position: marker, icon:icon, date:date, reqLoc:reqLoc, addr:''});
    },
    async selectHistory(deviceNo) {
      const params ={days: this.locationDay};
      let res = await api.selectHistory(deviceNo, params);
      if(res.data.status === "SUCCESS") {
        let lats = [];
        let lngs = [];
        this.history = res.data.data;

        this.history.forEach((loc, index) =>{
          // console.log(loc)
          if(index === 0) this.locDate = loc.reportDate.substring(0,8);
          let iconUrl = utils.getPinImage(loc.status);
          this.addMarker(
              {
                      lat:loc.lat,
                      lng:loc.lng
              },
              {
                url : "/static/images/Pin_NET.svg",
                pinUrl: utils.getPinImage(loc.status)
              },
              {
                map : utils.convertFromStrToDate(loc.reportDate),
                list : utils.convertFromStrToDate(loc.reportDate, 2)
              },

              (loc.reqLoc !== null && loc.reqLoc > "0")? "현재위치":"주기기록"

          );

          this.polyLines.push({lat:loc.lat, lng:loc.lng});
          lats.push(loc.lat);
          lngs.push(loc.lng);
        })
        this.displayDay = this.makeDay()

        if(this.list_mod === 'LIMIT'){
          this.list_count = 3;
        }else {
          this.list_count = this.markers.length;
        }

        if(this.markers.length > 0) {
          this.center = this.markers[this.markers.length - 1].position;
          // this.displayDay = this.makeDay();
          this.zoom = 18
          if (this.markers.length > 1) {
            // Marker들을 지도안에 모두 표시될 수 있도록 지도의 zoom 조절
            let minLat = Math.min(...lats)
            let maxLat = Math.max(...lats)

            let minLng = Math.min(...lngs)
            let maxLng = Math.max(...lngs)

            let zoomRadius = utils.getDistanceFromLatLonInKm(minLat, maxLng, maxLat, minLng);
            this.zoom = utils.getGmapZoomLevel((maxLat + minLat) / 2, zoomRadius / 2)
            // console.log("zoom ", this.zoom)
            this.center = utils.getCenter(minLat, maxLng, maxLat, minLng);
          }
          this.getLocInfo()
        }
        // }else{
        //   this.displayDay = "위치기록이 없습니다."
        // }

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
    // makeDay() {
    //   const days = [
    //     '일',
    //     '월',
    //     '화',
    //     '수',
    //     '목',
    //     '금',
    //     '토'
    //   ];
    //   const date = new Date(utils.convertFromStrToDate(this.locDate));
    //
    //   const dayname = days[date.getDay()];
    //   const year = date.getFullYear().toString();
    //   const mm = date.getMonth() + 1;
    //   let dd = date.getDate();
    //   const month =  mm < 10? "0" + mm : mm.toString();
    //   const day =  dd < 10? "0" + dd : dd.toString();
    //
    //   return (this.locationDay===0)? "[오늘]":"" +  year + "-" + month + "-" + day + "(" + dayname + ")  위치기록";
    //
    // },
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
      // const date = new Date(utils.convertFromStrToDate(this.locDate));
      const date = new Date();
      date.setDate(date.getDate() - this.locationDay);

      const dayname = days[date.getDay()];
      const year = date.getFullYear().toString();
      const mm = date.getMonth() + 1;
      let dd = date.getDate();
      const month =  mm < 10? "0" + mm : mm.toString();
      const day =  dd < 10? "0" + dd : dd.toString();

      return (this.locationDay===0)? "[오늘]":"" +  year + "-" + month + "-" + day + " (" + dayname + ")  위치기록";

    },
    getLocInfo() {
      var geocoder = new window.google.maps.Geocoder();
      for(let i = 0; i < this.markers.length; i++) {
        var rel = new window.google.maps.LatLng(this.markers[i].position.lat, this.markers[i].position.lng);
        geocoder.geocode({'latLng': rel}, async function (results, status) {
          if (status == 'OK') {
            this.markers[i].addr = results[0]['formatted_address'].replace("대한민국 ", '');
            // console.log(this.markers[i].addr)
          } else {
            this.markers[i].addr = "주소 정보가 없습니다.";
          }
        }.bind(this));
      }
      // this.markers.forEach(m => {
      //
      //   var rel = new window.google.maps.LatLng(m.position.lat, m.position.lng);
      //   geocoder.geocode({'latLng': rel}, async function (results, status) {
      //     if (status == 'OK') {
      //       m.addr = results[0]['formatted_address'].replace("대한민국 ", '');
      //       console.log(this.markers)
      //     } else {
      //       m.addr = "주소 정보가 없습니다.";
      //     }
      //   }.bind(this));
      // });
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