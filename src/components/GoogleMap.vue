<template>
  <div>
    <GmapMap :center='center' :zoom='16' :options='options' style='width:100%;  height: 400px;'>
      <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" />
    </GmapMap>

  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  mounted() {
    //this.geolocate();
  },
  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.geoCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("geolocate");
        console.log(position.coords.latitude);
      }, error => {
        console.log(error);
      });
    },
    setMarker(Points, Label) {//지도에 마커를 찍는 함수.
      const markers = new google.maps.Marker({
        position: Points,
        map: this.map,
        label: {
          text: Label,
          color: "#FFF",
        },
      });
    },
  },
  props:{
    center: {lat: Number, lng: Number},
    markers:Array,
  },
  data() {
    return {
      geoCenter:{lat: 0, lng: 0},
      options: {
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          position: 9
        },
        streetViewControlOptions: {
          position: 6
        },
        mapTypeControlOptions: {
          position: 6
        },
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null

    };
  },
  created() {
    //this.geolocate();
  }
}
</script>

<style scoped>

</style>