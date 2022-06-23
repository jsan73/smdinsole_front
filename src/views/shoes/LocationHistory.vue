<template>
  <div>
  <main class="container px-0 position-relative h-100">
    <ShoesHeader :shoes="shoes" @clickAction={}></ShoesHeader>

    <div id="find-location" class="container-fluid px-0 h-100">
      <GoogleMap :center="center" :markers="markers" :poly-lines="polyLines"/>
    </div>
  </main>
  <div class="fixed-bottom location-wrap">
    <p class="text-center text-white mb-0">{{ displayDay }}</p>
  </div>
  </div>
</template>

<script>
import ShoesHeader from "@/views/shoes/ShoesHeader";
import {mapState} from "vuex";
import api from "@/api/api";
import utils from "@/utils/utils";

export default {
  name: "LocationHistory",
  components: {ShoesHeader},
  data() {
    return {
      locationDay:0,
      shoes:'',
      center : {
        lat:0,
        lng:0,
      },
      markers:[],
      history:'',
      polyLines:[],
      locDate:'',
      displayDay:''
    }
  },
  mounted() {
    this.locationDay = this.$route.query.locationDay;
  },
  methods: {
    addMarker(marker, label) {
      this.markers.push({position: marker, label:label});
    },
    async selectHistory(shoesNo) {
      const params ={days: this.locationDay};
      let res = await api.selectHistory(shoesNo, params);
      if(res.data.status === "SUCCESS") {
        this.history = res.data.data;
        this.history.forEach((loc, index) =>{
          if(index == 0) this.locDate = loc.reportDate.substring(0,8);
          this.addMarker(
              {
                      lat:loc.latitude,
                      lng:loc.longitude
              },
              {
                      text: (index + 1).toString(),
                      color: "#FFF",
              });
          this.polyLines.push({lat:loc.latitude, lng:loc.longitude});
        })
        this.center = this.markers[this.markers.length-1].position;
        this.displayDay = this.makeDay();
      }
    },
    async getShoesInfo() {
      let res = await api.getShoesDashInfo(this.choiceDevice.shoesNo);
      if(res.data.status === "SUCCESS") {
        this.shoes = res.data.data;
        this.selectHistory(this.shoes.shoesNo);
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
      console.log(this.locDate);
      const dayname = days[date.getDay()];
      const year = date.getFullYear().toString();
      const mm = date.getMonth() + 1;
      let dd = date.getDate();
      const month =  mm < 10? "0" + mm : mm.toString();
      const day =  dd < 10? "0" + dd : dd.toString();

      return (this.locationDay==0)? "[오늘]":"" +  year + "-" + month + "-" + day + "(" + dayname + ")  위치기록";

    }
  },
  created() {
    this.getShoesInfo();
  },
  computed:{
    ...mapState("guardStore", ['choiceDevice'] ),

  },
}
</script>

<style scoped>

</style>