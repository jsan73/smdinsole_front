<template>
  <main class="container px-0 position-relative dash-map-h">
    <div class="sticky-top shadow w-100">
      <div class="list-group userlist">
        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <img src="../../../public/static/images/GPS/OK.svg" alt="기지국" width="44" height="56" class=" flex-shrink-0">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h4 class="mb-0">KKS01 <small class="opacity-75">A001</small></h4>
              <p class="mb-0 mt-1">활동범위 - 2km</p>
            </div>
          </div>
          <div class="battery"><img src="../../../public/static/images/battery/2.svg" alt="배터리2칸" width="32" height="32"></div>
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
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d789.5919287307592!2d126.76617352924507!3d37.66406656036401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c855b9bb7dda3%3A0x9dd8accf7a175f5b!2z7Yis7Lm07Y6YKDJUV09DQUZGRSk!5e0!3m2!1sko!2skr!4v1650868469212!5m2!1sko!2skr"
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: "ShoesLocation"
}
</script>

<style scoped>

</style>