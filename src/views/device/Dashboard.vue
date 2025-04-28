<template>
  <div>
<!--    <Loading v-if="loading_yn === 'Y'"></Loading>-->
    <main class="container px-0 position-relative dash-map-h justify-content-center">

        <DeviceHeader :device="device" :status="location" :range="range" @clickAction="moveControl"></DeviceHeader>
        <div id="find-location" class="container-fluid px-0 dash-map-h">
          <div id="map" class="h-100">
            <GoogleMap :center="center" :markers="markers" :circles="circles" :zoom="15" :styles="styles" @markerPosition="sendLocation2" />

          </div>
        </div>
  <!--      <Loading v-if="loading_yn === 'Y'"></Loading>-->

    </main>
  <Footer ref="footer" @reload="reload" @reqloc="reqloc" ></Footer>
  </div>
</template>

<script>
import Dashboard from "@/views/device/dashboard";
// import DeviceHeader from "@/views/device/DeviceHeader";
export default Dashboard;
</script>

<style scoped>

</style>