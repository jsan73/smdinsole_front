<template>
  <main class="container px-0 position-relative dash-map-h">
<!--    <div v-for="device in deviceList">-->

      <DeviceHeader :device="device" :status="location" :range="range" @clickAction="moveControl"></DeviceHeader>
      <div id="find-location" class="container-fluid px-0 dash-map-h">
<!--        <div style="position: absolute; top:50%; left: 50%;">-->
<!--          <a class="Gpoint_OK" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" title="2021-03-09  13:36:23 <br> 경기도 일산동구 고봉로 32-19 40호1">-->
<!--            4-->
<!--          </a>-->
<!--        </div>-->
        <div id="map" class="h-100">
          <GoogleMap :center="center" :markers="markers" :circles="circles" :zoom="15" :styles="styles" @markerPosition="sendLocation2" />
        </div>

<!--        <div>-->
<!--          <button type="button" @click="sendLocation">현재 위치 전송</button>-->
<!--        </div>-->
      </div>
<!--    </div>-->

  </main>


</template>

<script>
import Dashboard from "@/views/device/dashboard";
import DeviceHeader from "@/views/device/DeviceHeader";
export default Dashboard;
</script>

<style scoped>

</style>