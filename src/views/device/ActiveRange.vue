<template>
  <main class="container px-0">
    <div class="sticky-top shadow w-100">
      <div class="list-group userlist">
        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">

          <div class="d-flex gap-2 w-100 justify-content-between">
              <h4 class="mb-0">{{device.nickName}}</h4>
          </div>

        </a>
      </div>
    </div>

    <!--활동범위 1-->
    <div v-for="range in rangeList" id="find-location" class="position-relative">
      <div class="w-100 px-0">
<!--        <div class="w-100 px-0 position-absolute">-->
        <div class="row bg-black opacity-75 mx-0">
          <div class="col">
            <p class="text-white my-3">{{ range.rangeName }}</p>
          </div>
          <div class="col text-end my-1">
            <a @click="delRange(range)"><img src="../../../public/static/images/Del.svg"></a>
            <a @click="updRange(range.rangeNo)"><img src="../../../public/static/images/Edit.svg"></a>
          </div>
        </div>
      </div>
      <div id="map" class="map-h">
        <GoogleMap :center="range.center" :markers="range.markers" :circles="range.circles" :zoom="range.zoom" :styles="styles" />
      </div>
      <div class="w-100 mb-4">
        <ul class="radius_info">
          <li class="radius_info_item"><img src="../../../public/static/images/location.svg"> {{range.rangeAddress}}</li>
          <li class="radius_info_item"><img src="../../../public/static/images/Radius.svg"> 범위 : {{range.radius / 1000}}km</li>
        </ul>
      </div>
    </div>

    <div class="container pb-4">
      <button type="button" @click="addRange" class="btn btn-style-1">안심존 추가 +</button>
    </div>

  </main>
</template>

<script>
import api from "@/api/api";
import {mapState} from "vuex";
import utils from "@/utils/utils";

export default {
  name: "ActiveRange",
  data() {
    return {
      device:'',
      rangeList: [],
      markers:[],
      circles:[],
      styles:'width:100%;  height: 400px;'

      // rangeList: {
      //   latitude: 0,
      //   longitude: 0,
      //   radius: 0,
      //   rangeAddress: "",
      //   rangeName: "",
      //   deviceNo: 0
      // }
    };
  },

  methods: {
    addMarker(range, marker, content) {
      const icon = {
        url : "/static/images/Pin_OK.svg"
      }
      const date = {
        map : content
      }
      range.push({position: marker, icon: icon, date:date});
    },
    addCercle(range, center, radius) {
      let option ={
        fillColor: '#7BFF70',
        fillOpacity: 0.1,
        // strokeWeight: 5,
        strokeColor: '#7BD6CE',
        strokeOpacity: 0.9,
        radius: radius
      }
      range.push({center: center, option:option})
    },
    async selActiveRangeList() {
      let res = await api.selActiveRangeList(this.choiceDevice.deviceNo);
      if(res.data.status === "SUCCESS") {
        this.rangeList = res.data.data

        this.rangeList.forEach(range => {
          let center = {lat:range.lat, lng:range.lng};
          range["center"] = center;
          range["markers"] = [];
          range["circles"] = [];
          this.addMarker(range["markers"], center, range.rangeName);
          this.addCercle(range["circles"], center, range.radius);

          const zl = utils.getGmapZoomLevel(range.lat, range.radius);

          range["zoom"] = zl;

          this.getLocInfo(range["markers"]);
          //range["markers"] = marker;
        });

        // this.rList = this.rangeList;
      }
    },
    getLocInfo(markers) {
      var geocoder = new window.google.maps.Geocoder();
      for(let i = 0; i < markers.length; i++) {
        var rel = new window.google.maps.LatLng(markers[i].position.lat, markers[i].position.lng);
        geocoder.geocode({'latLng': rel}, async function (results, status) {
          if (status == 'OK') {
            markers[i].addr = results[0]['formatted_address'].replace("대한민국 ", '');
          } else {
            markers[i].addr = "주소 정보가 없습니다.";
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
    },
    async getDeviceInfo() {
      let res = await api.getDeviceInfo(this.choiceDevice.deviceIMEI);
      if(res.data.status === "SUCCESS") {
        this.device = res.data.data;
      }
    },
    addRange() {
      this.$router.push('rangeadd');
    },
    delRange(range) {
      if (this.rangeList == 1) {
        this.openPopup("하나 이상의 안심존은 필수 입니다.", true, false, this.hideAlert);
      }else if(range.baseYn == 'Y') {
        this.openPopup("[" + range.rangeName + "] 안심존은 수정만 가능 합니다.", true, false, this.hideAlert);
      }else {
        this.openPopup("[" + range.rangeName + "] 안심존을 삭제 하시겠습니까?", true, true, this.doDelete, range.rangeNo);
      }
    },
    async doDelete(rangeNo) {
      const res = await api.delActiveRange(rangeNo);
      if(res.data.status === "SUCCESS") {
        if(res.data.data == 1) {
          this.openPopup("안심존이 삭제 되었습니다.", true, false, this.hideAlert);
          await this.selActiveRangeList();
        }else{
          this.openPopup("오류로 인해 삭제되지 않았습니다.", true, false, this.hideAlert);
        }
      }
    },
    updRange(rangeNo) {
      this.$router.push("rangeadd?rangeNo=" + rangeNo);
    }
  },
  mounted() {
    this.getDeviceInfo();
    this.selActiveRangeList();
  },
  computed:{
    ...mapState("guardStore", ['choiceDevice'] ),

  },
}
</script>

<style scoped>

</style>