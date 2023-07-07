<template>
<!--  <div>-->
    <GmapMap :center='center' :zoom='zoom' :options='options' :style='styles' id="gmap">
      <GmapMarker v-if="!custom" :key="index" v-for="(m, index) in markers" :icon="m.icon" :position="m.position"
                  :draggable=false :label="m.label" @click="toggleInfoWindow(m, index)" @dragend="ondragend($event.latLng)"
      />
      <gmap-custom-marker v-if="custom"
          :key="index" v-for="(m, index) in markers"
          :marker="m.position"
          @click.native="toggleInfoWindow(m, index)"
      >
<!--        <img :src="m.icon.url" />-->
        <div class='Gpoint_OK' :style="{'background-image':'url(' + m.icon.url + ')'}" >{{ index +1}}</div>
<!--        <my-component></my-component>-->
      </gmap-custom-marker>

      <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false">
          <p v-html="infoContent"></p>
      </gmap-info-window>
      <GmapCircle :key="'c' + index" v-for="(c, index) in circles" :center="c.center" :options="c.option"></GmapCircle>
      <gmap-polyline v-if="polyLines && polyLines.length > 0" :path="polyLines" :editable="false"
                     v-bind:options="{
                        strokeColor: '#4299B6',
                        strokeOpacity: 0.5,
                        // strokeWeight: 5,
                       // geodesic: true
                    }"
                     ref="polyline">
      </gmap-polyline>
    </GmapMap>

<!--  </div>-->
</template>

<script>
import utils from "@/utils/utils";
import GmapCustomMarker from "vue2-gmap-custom-marker";

export default {
  name: "GoogleMap",
  props:{
    center: {lat: 0, lng: 0},
    markers:Array,
    circles:Array,
    polyLines:Array,
    zoom:Number,
    styles:String,
    custom: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'gmap-custom-marker': GmapCustomMarker
  },
  mounted() {
    //this.geolocate();
    // console.log("CENTER");
    // console.log(this.center);
    // console.log("Circle");
    // console.log(this.circles);
    if(utils.isEmpty(this.styles)) this.styles = "width:100%;  height: 500px;"
  },
  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.geoCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      }, error => {
        console.log(error);
      });
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position;
      //this.infoContent = this.getInfoWindowContent(marker.position);
      // console.log(marker);
      this.getInfoWindowContent(marker.position, marker.content);

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
    ondragend(event) {
      console.log(event)
      this.$emit("markerPosition", event);
    },

    getInfoWindowContent(map, content) {
//        this.getAddress(map.lat, map.lng);
//       const service = new window.google.maps.places.PlacesService(document.getElementById("map"));
// //      return "aaaaa"
//
//       service.getDetails(request, function (place, status) {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           return {place}
//
//         }
//       })

      var geocoder = new window.google.maps.Geocoder();
      var rel = new window.google.maps.LatLng(map.lat, map.lng);
      geocoder.geocode({'latLng':rel}, async function(results, status) {
        if (status == 'OK') {
          // let addr0 = results[0]['address_components'][4]['long_name']
          // let addr1 = results[0]['address_components'][3]['long_name']
          // let addr2 = results[0]['address_components'][2]['long_name']
          // let addr3 = results[0]['address_components'][1]['long_name']
          // let addr4 = results[0]['address_components'][0]['long_name']
          // //this.activeRange.rangeAddress = addr1 + " " + addr2;
          // this.infoContent = addr0 + " " + addr1 + " " + addr2 + " " + addr3 + " " + addr4;
//          this.infoContent = "<a class='Gpoint_OK' data-bs-toggle='tooltip'  data-bs-placement='bottom' data-bs-html='true' title='2021-03-09 13:36:23 </br> 경기도 일산동구 고봉로 32-19 40호1'>1</a>"
          this.infoContent = content + "<br>" + results[0]['formatted_address'].replace("대한민국 ", '');
        }else{
          this.$toast.bottom("주소 정보가 없습니다.");
        }
      }.bind(this));

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
         disableDefaultUI:true,

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
    //this.zoom = 15
  }
}
</script>

<style>

/*구글맵 푸터 삭제*/
a[href^="http://maps.google.com/maps"]{display:none !important}
a[href^="https://maps.google.com/maps"]{display:none !important}

.gmnoprint a, .gmnoprint span, .gm-style-cc {
  display:none;
}
.gmnoprint div {
  background:none !important;
}

</style>