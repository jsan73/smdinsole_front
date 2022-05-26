<template>
  <main class="container px-0 position-relative dash-map-h">
    <div class="sticky-top shadow w-100">
      <div class="list-group userlist">
        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <img src="/static/images/GPS/OK.svg" alt="기지국" width="44" height="56" class=" flex-shrink-0">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h4 class="mb-0">KKS01 <small class="opacity-75">A001</small></h4>
              <p class="mb-0 mt-1">활동범위 - 2km</p>
            </div>
          </div>
          <div class="battery"><img src="/static/images/battery/2.svg" alt="배터리2칸" width="32" height="32"></div>
        </a>
      </div>
    </div>

    <div id="find-location" class="container-fluid px-0 dash-map-h">
      <div style="position: absolute; top:50%; left: 50%;">
        <a class="Gpoint_OK" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"
           title="2021-03-09  13:36:23 </br> 경기도 일산동구 고봉로 32-19 40호1">
          4
        </a>

        <!-- <a href="#" data-bs-toggle="tooltip" title="Some tooltip text!">Hover over me</a> -->

      </div>

      <div id="map" class="h-100">

      </div>
    </div>
  </main>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCvfYHH4Xc2Du8bmOaMtAzpfQlvo560PSg"></script>
<script>
export default {
  name: "Dashboard",
  mounted() {
    this.initMap();
    this.setMarker(this.mapCenter, "ce");
    this.setMarker(this.bands, "1");
    this.setMarker(this.bands2, "2");
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), { //getElementById로 map id 속성의 요소를 가져온다.
        center: this.mapCenter, //center로 할 위도, 경도를 지정한다.
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
  data() {
    return {
      map: null,
      mapCenter: { lat: 35.105696, lng: 129.042857 },
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