<template>
  <div>
    <GmapMap :center='center' :zoom='12' :options='options' style='width:100%;  height: 400px;'>
      <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :label="m.label" />
<!--      <GmapCircle :center="center" :options="circleOption"></GmapCircle>-->
      <GmapCircle :key2="index" v-for="(c, index) in circles" :center="c.center" :options="c.option"></GmapCircle>

      <gmap-polyline v-if="polyLines && polyLines.length > 0" :path="polyLines" :editable="false"
                     v-bind:options="{
                        strokeColor: '#0a816f',
                        strokeOpacity: 0.5,
                        strokeWeight: 5,
                       // geodesic: true
                    }"
                     ref="polyline">
      </gmap-polyline>
    </GmapMap>

  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props:{
    center: {lat: 0, lng: 0},
    markers:Array,
    circles:Array,
    polyLines:Array,
  },
  mounted() {
    //this.geolocate();
    // console.log("CENTER");
    // console.log(this.center);
    // console.log("Circle");
    // console.log(this.circles);
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