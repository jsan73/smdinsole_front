<template>
  <div style='width:100%;  height: 400px;' id="map"></div>
</template>

<script>
export default {
  name: "GoogleMap2",
  mounted() {
    this.initMap();
    this.setMarker(this.center, "ce");
    this.setMarker(this.bands, "1");
    this.setMarker(this.bands2, "2");
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), { //getElementById로 map id 속성의 요소를 가져온다.
        center: this.center, //center로 할 위도, 경도를 지정한다.
        zoom: 17, //zoom size를 지정.
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: true,
        mapTypeControl: true,
        fuulscreenControl: true,
        zoomControl: true,
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
    circleOption:{
      fillColor: '#0000FF',
      fillOpacity: 0.3,
      strokeWeight: 1,
      strokeColor: '#0000FF',
      radius: 1000
    },
  },
  data() {
    return {
      map: null,
      //mapCenter: { lat: 35.105696, lng: 129.042857 },
      bands: {
        lat: 35.106187,
        lng: 129.042943,
      },
      bands2: {
        lat: 35.105556,
        lng: 129.04393,
      },
    };
  },
}
</script>

<style scoped>

</style>