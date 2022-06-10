<template>
  <main class="container px-0 position-relative dash-map-h">
<!--    <div v-for="shoes in shoesList">-->
      <div class="sticky-top shadow w-100">
        <div class="list-group userlist">
          <a @click="move('control')" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <img src="/static/images/GPS/OK.svg" alt="기지국" width="44" height="56" class=" flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h4 class="mb-0">{{shoes.nickName}} <small class="opacity-75">{{shoes.shoesId}}</small></h4>
                <p class="mb-0 mt-1">{{shoes.rangeName}} - {{shoes.radius}}m</p>
              </div>
            </div>
            <div class="battery"><img :src="shoes.batteryImg" :alt='"배터리" + shoes.battery + "칸"' width="32" height="32"></div>
          </a>
        </div>
      </div>

      <div id="find-location" class="container-fluid px-0 dash-map-h">
<!--        <div style="position: absolute; top:50%; left: 50%;">-->
<!--          <a class="Gpoint_OK" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"-->
<!--             title="2021-03-09  13:36:23 </br> 경기도 일산동구 고봉로 32-19 40호1">-->
<!--            4-->
<!--          </a>-->
<!--        </div>-->

        <GoogleMap :center="{ lat: shoes.lat, lng: shoes.lon }" :markers="shoes.markers" />

      </div>
<!--    </div>-->
  </main>


</template>

<script>
import Dashboard from "@/views/shoes/dashboard";
export default Dashboard;
</script>

<style scoped>

</style>