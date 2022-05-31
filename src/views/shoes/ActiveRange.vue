<template>
  <main class="container px-0">
    <div class="sticky-top shadow w-100">
      <div class="list-group userlist">
        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">

          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h4 class="mb-0">KKS inslol <small class="opacity-75">MA001</small></h4>

            </div>
          </div>

        </a>
      </div>
    </div>

    <!--활동범위 1-->
    <div id="find-location" class="position-relative">
      <div class="w-100 px-0 position-absolute">
        <div class="row bg-black opacity-75 mx-0">
          <div class="col">
            <p class="text-white my-3">집</p>
          </div>
          <div class="col text-end my-1">
            <a href=""><img src="../../../public/static/images/Del.svg"></a>
            <a href=""><img src="../../../public/static/images/Edit.svg"></a>
          </div>
        </div>
      </div>
      <div id="map" class="map-h">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d789.5919287307592!2d126.76617352924507!3d37.66406656036401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c855b9bb7dda3%3A0x9dd8accf7a175f5b!2z7Yis7Lm07Y6YKDJUV09DQUZGRSk!5e0!3m2!1sko!2skr!4v1650868469212!5m2!1sko!2skr"
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="w-100 mb-4">
        <ul class="radius_info">
          <li class="radius_info_item"><img src="../../../public/static/images/location.svg"> 경기도 고양시 일산동구 고봉로 32-19</li>
          <li class="radius_info_item"><img src="../../../public/static/images/Radius.svg"> 반경 : 1000m</li>
        </ul>
      </div>
    </div>
    <!--활동범위 2
    <div id="find-location" class="position-relative">
        <div class="w-100 px-0 position-absolute">
            <div class="row bg-black opacity-75 mx-0">
                <div class="col">
                    <p class="text-white my-3">집</p>
                </div>
                <div class="col text-end my-1">
                    <a href=""><img src="images/Del.svg"></a>
                    <a href=""><img src="images/Edit.svg"></a>
                </div>
            </div>
        </div>
        <div id="map" class="map-h">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d789.5919287307592!2d126.76617352924507!3d37.66406656036401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c855b9bb7dda3%3A0x9dd8accf7a175f5b!2z7Yis7Lm07Y6YKDJUV09DQUZGRSk!5e0!3m2!1sko!2skr!4v1650868469212!5m2!1sko!2skr"
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="w-100 mb-4">
            <ul class="radius_info">
                <li class="radius_info_item"><img src="images/location.svg"> 경기도 고양시 일산동구 고봉로 32-19</li>
                <li class="radius_info_item"><img src="images/Radius.svg"> 반경 : 1000m</li>
            </ul>
        </div>
    </div>
    -->

    <div class="container pb-4">
      <button type="submit" class="btn btn-style-1">활동범위 추가 +</button>
    </div>

  </main>
</template>

<script>
export default {
  name: "ActiveRange"
}
</script>

<style scoped>

</style>