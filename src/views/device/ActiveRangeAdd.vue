<template>
  <!-- main -->
  <main class="main">

    <div class="radiusAdd" >
      <div class="mb-4 px-3">
        <label for="RadiusNameInput" class="form-label fw-bold kksColorPrimary ">안심존 명칭</label>
        <input type="text" class="form-control" v-model="activeRange.rangeName" id="RadiusNameInput" name="RadiusNameInput" placeholder="입력" >
      </div>
      <div class="mb-4 px-3">
        <label for="autocomplete" class="form-label  fw-bold kksColorPrimary ">안심존 주소</label>
        <input type="text" id="autocomplete" v-model="activeRange.rangeAddress" class="form-control"  placeholder="주소입력" >
      </div>

      <div class="mb-4 px-3">
        <div class="row">
          <div class="col">
            <img src="../../../public/static/images/Radius.svg">
            <a @click="geolocate" class="kksColorMain">현재 위치로 설정</a>

          </div>
          <div class="col">
            <button type="button" @click="fillInAddress" class="btn btn-style-1 btn-sm w-50 float-end">검색</button>
          </div>

        </div>
      </div>
<!--      <div class="" style="width:100%; height:150px; background-color:burlywood;">-->
        <GoogleMap :center="center" :circles="circles" :markers="markers" />

<!--      </div>-->
      <div class="py-5 px-3">
<!--        <div class="progress" style="height:5px">-->
<!--          <div class="progress-bar bg-c-red" style="width:40%; height:5px"></div>-->
          <input type="range"
                 v-bind:value="calcRangeBar"
                 v-on:change="radius=$event.target.value/100"
                 class="form-range"
                 min="10"
                 max="2000"
                 step="10" id="customRange2" style="width:100%; height:5px">

<!--        </div>-->
      </div>
      <div class="mb-4 px-4 row">
        <div class="col-4 ps-1 fw-bold kksColorPrimary ">
          안심존 범위
        </div>
        <div class="col-8 border-bottom text-end">
          <input type="text" v-model="radius" class="form-control w-75 d-inline-block border-0 text-end" id="RadiusInput" placeholder=""><b>km</b>
        </div>

      </div>
      <div class="mb-2 px-4 row">
        <div class="col px-1">
          <button type="button" class="btn btn-style-2" :class="[radius==1?'selected':'']" @click="toggleRadius(100)">1km</button>
        </div>
        <div class="col px-1">
          <button type="button" class="btn btn-style-2" :class="[radius==2?'selected':'']" @click="toggleRadius(200)">2km</button>
        </div>
        <div class="col px-1">
          <button type="button" class="btn btn-style-2" :class="[radius==3?'selected':'']" @click="toggleRadius(300)">3km</button>
        </div>
      </div>
      <div class="mb-4 px-4 row">
        <div class="col px-1">
          <button type="button" class="btn btn-style-2" :class="[radius==5?'selected':'']" @click="toggleRadius(500)">5km</button>
        </div>
        <div class="col px-1">
          <button type="button" class="btn btn-style-2" :class="[radius==10?'selected':'']" @click="toggleRadius(1000)">10km</button>
        </div>
        <div class="col px-1">
          <button type="button" class="btn btn-style-2" :class="[radius==20?'selected':'']" @click="toggleRadius(2000)">20km</button>
        </div>
      </div>

      <div  class="p-3">
        <div class="row">
          <div class="col">
            <button type="button" @click="cancel" class="btn btn-style-1 btn-style-1-gray">취소</button>
          </div>
          <div class="col">
            <button type="button" @click="saveRange" class="btn btn-style-1 ">저장</button>
          </div>

        </div>
      </div>
    </div>

  </main>
</template>

<script>
import api from "@/api/api";
import {mapState} from 'vuex';
export default {
  name: "ActiveRangeAdd",
  data() {
    return {
      rangeNo:0,
      center:{lat: 0, lng: 0},
      //range: [1,2,3,5,10,20],
      markers:[],
      rangeValue:0,
      radius:1,
      circles:[],

      address:null,
      activeRange: {
        rangeNo:0,
        lat:'',
        lng: '',
        radius:1,
        rangeAddress:'',
        rangeName: '',
        deviceNo:0
      }
    };
  },

  mounted() {
    this.rangeNo = this.$route.query.rangeNo;
    if(this.rangeNo > 0) {
      this.$emit('change', "안심존 수정");
      this.getActiveRange();
    }else{
      this.geolocate();
    }
  },
  computed:{
    ...mapState("guardStore", ['choiceDevice'] ),
    calcRangeBar() {
      return this.radius *100;
    }
  },
  watch:{
    radius(){
      this.addCircle()
    }
  },
  methods: {
    setMap(lat, lng) {
      this.center = {
        lat: lat,
        lng: lng,
      };
      this.markers = [];
      const icon = {
        url : "/static/images/Pin_OK.svg"
      }
      this.markers.push({position: this.center, icon:icon});

      this.addCircle();
    },
    addCircle() {
      let option ={
        fillColor: '#0000FF',
        fillOpacity: 0.3,
        strokeWeight: 1,
        strokeColor: '#0000FF',
        radius: this.radius * 1000
      }
      this.circles = [];
      this.circles.push({center: this.center, option:option})
    },
    async getActiveRange() {
      const res = await api.getActiveRange(this.choiceDevice.deviceNo, this.rangeNo);
      if(res.data.status === "SUCCESS") {
          this.activeRange = res.data.data;
          this.radius = this.activeRange.radius / 1000;
          this.setMap(this.activeRange.lat, this.activeRange.lng);
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.setMap(position.coords.latitude, position.coords.longitude);
      });
    },

    toggleRadius(radius) {
      this.radius = radius / 100;
    },
    fillInAddress() {
      // Get the place details from the autocomplete object.
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode( { 'address': this.activeRange.rangeAddress}, async function(results, status) {
        if (status == 'OK') {
          this.setMap(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        } else if(status =="ZERO_RESULTS"){
          alert('Geocode was not successful for the following reason: ' + status);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      }.bind(this));
    },
    async saveRange() {
      this.activeRange.lat = this.center.lat;
      this.activeRange.lng = this.center.lng;
      this.activeRange.radius = this.radius*1000;
      this.activeRange.deviceNo = this.choiceDevice.deviceNo;

      let res;
      if(this.activeRange.rangeNo > 0) {
        res = await api.updActiveRange(this.activeRange);

      }else {
        res = await api.insActiveRange(this.activeRange);

      }
      console.log(res.data);
      if(res.data.status === "SUCCESS") {
        this.openPopup("안심존이 저장 되었습니다.", true, false, this.nextStep)
      }else{
        this.openPopup("안심존 저장에 실패하였습니다.", true, false, this.hideAlert)
      }
    },

    nextStep(){
      this.hideAlert();
      this.cancel();
    },
    cancel() {
      this.$router.go(-1);
    }
  },

  created() {
    // this.rangeNo = this.$route.query.rangeNo;
    // if(this.rangeNo > 0) {
    //   this.$emit('change', "활동범위 수정");
    //   this.getActiveRange();
    // }else{
    //   this.geolocate();
    // }
  }
}
</script>

<style>

</style>