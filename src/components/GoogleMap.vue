<template>
  <div>
    <GmapMap :center='center' :zoom='12' :options='options' style='width:100%;  height: 400px;'>
      <GmapMarker :key="index" v-for="(m, index) in markers" :icon="m.icon" :position="m.position" :label="m.label" @click="toggleInfoWindow(m, index)"/>
<!--      <GmapCircle :center="center" :options="circleOption"></GmapCircle>-->
      <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false">
          <div v-html="infoContent"></div>
      </gmap-info-window>

      <GmapCircle :key="'o-${index}'" v-for="(c, index) in circles" :center="c.center" :options="c.option"></GmapCircle>

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
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);


      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getInfoWindowContent(map) {

       const service = new window.google.maps.places.PlacesService(map);
      return "aaaaa"
      //
      // service.getDetails(request, function (place, status) {
      //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      //     return {place}
      //
      //   }
      // })
    }
    // setMarker(Points, Label) {//지도에 마커를 찍는 함수.
    //   const markers = new google.maps.Marker({
    //     position: Points,
    //     map: this.map,
    //     label: {
    //       text: Label,
    //       color: "#FFF",
    //     },
    //   });
    // },
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
      existingPlace: null,

      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
    };
  },
  created() {
    //this.geolocate();
  }
}
</script>

<style scoped>

</style>