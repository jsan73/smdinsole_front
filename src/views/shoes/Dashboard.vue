<template>
  <main class="container px-0 position-relative dash-map-h">
<!--    <div v-for="shoes in shoesList">-->

      <ShoesHeader :shoes="shoes" @clickAction="moveControl"></ShoesHeader>
      <div id="find-location" class="container-fluid px-0 dash-map-h">
<!--        <div style="position: absolute; top:50%; left: 50%;">-->
<!--          <a class="Gpoint_OK" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"-->
<!--             title="2021-03-09  13:36:23 </br> 경기도 일산동구 고봉로 32-19 40호1">-->
<!--            4-->
<!--          </a>-->
<!--        </div>-->

        <GoogleMap :center="center" :markers="markers" :circles="circles"/>

      </div>
<!--    </div>-->
  </main>


</template>

<script>
import Dashboard from "@/views/shoes/dashboard";
import ShoesHeader from "@/views/shoes/ShoesHeader";
export default Dashboard;
</script>

<style scoped>

</style>