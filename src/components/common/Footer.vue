<template>
  <footer id="footer">
  <div class="fixed-bottom" style="background-color: #2CBBB6; z-index: 2000; min-height: 72px;">
    <ul class="d-flex ps-0 mb-0 justify-content-evenly">
      <li class="col text-center pt-2">
        <a @click="move('/shoes/range')">
          <img src="/static/images/radius-pin.svg" alt="">
          <p class="pt-1 text-white mb-2" >활동범위</p>
        </a>
      </li>
      <li class="col text-center pt-2">
        <a>
          <img src="/static/images/refresh.svg" alt="">
          <p class="pt-1 text-white mb-2" @click="move('/location')">현재위치</p>
        </a>
      </li>
      <li class="col text-center pt-2">
        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
          <img src="/static/images/notifications.svg" alt="">
          <p class="pt-1 text-white mb-2">알림설정</p>
        </a>
      </li>
      <li class="col text-center pt-2">
        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2" aria-controls="offcanvasBottom2">
          <img src="/static/images/clock.svg" alt="">
          <p class="pt-1 text-white mb-2">위치기록</p>
        </a>
      </li>
    </ul>
  </div>

  <div class="offcanvas offcanvas-bottom" data-bs-backdrop="false" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">알림 설정</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <!--
      <ul class="offcanvas_List form-check">
      <li><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
      <label class="form-check-label" for="flexRadioDefault1">내일 아침 9시까지 알림 해제</label></li>
      <li>3시간 알림 해제</li>
      <li>6시간 알림 해제</li>
      <li>12시간 알림 해제</li>
      <li>다음 설정시까지 알림 해제</li>
      </ul>
      -->

      <div class="offcanvas-body">
        <p class="m-4 text-center">내일 오전 9시까지 <br>알람이 해제됩니다.</p>
        <div class="m-4 text-center">
          <button type="button" class="btn btn-style-1 btn-sm w-50">지금 알림 설정하기</button>
        </div>
      </div>

      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
        <label class="form-check-label" for="exampleRadios1">
          내일 아침 9시까지 알림 해제
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
        <label class="form-check-label" for="exampleRadios2">
          3시간 알림 해제
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" >
        <label class="form-check-label" for="exampleRadios3">
          6시간 알림 해제
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4" >
        <label class="form-check-label" for="exampleRadios4">
          12시간 알림 해제
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="option5" >
        <label class="form-check-label" for="exampleRadios5">
          다음 설정시까지 알림 해제
        </label>
      </div>




    </div>

  </div>
  <div class="offcanvas offcanvas-bottom" data-bs-backdrop="false" tabindex="-1" id="offcanvasBottom2" aria-labelledby="offcanvasBottomLabel2">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel2">위치기록 보기</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <!--
                  <ul class="offcanvas_List">
                      <li class="">오늘</li>
                      <li class="">1일전</li>
                      <li class="">2일전</li>
                      <li class="">3일전</li>
                      <li class="">4일전</li>
                      <li class="">5일전</li>
                  </ul>
      -->
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="locatonHistory" id="locatonHistory1" value="option1">
        <label class="form-check-label" for="locatonHistory1">
          오늘
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="locatonHistory" id="locatonHistory2" value="option2">
        <label class="form-check-label" for="locatonHistory2">
          1일전
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="locatonHistory" id="locatonHistory3" value="option3">
        <label class="form-check-label" for="locatonHistory3">
          2일전
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="locatonHistory" id="locatonHistory4" value="option4">
        <label class="form-check-label" for="locatonHistory4">
          3일전
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="locatonHistory" id="locatonHistory5" value="option5">
        <label class="form-check-label" for="locatonHistory5">
          4일전
        </label>
      </div>
      <div class="form-check offcanvas_List">
        <input class="form-check-input" type="radio" name="locatonHistory" id="locatonHistory6" value="option6">
        <label class="form-check-label" for="locatonHistory6">
          5일전
        </label>
      </div>
    </div>
  </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    move(url) {
      var path = window.location.pathname;
      if(path === "/main") {
        this.$router.push(url);
      } else {
        //this.$router.replace(url);
        this.$router.push(url);
      }
    }
  }
}
</script>

<style scoped>

</style>