<template>
  <main class="main" >
    <div class="signIn">
      <h1 class="text-center pb-5"><img src="/static/images/kokasin_logo.svg" alt="kt꼬까신"></h1>
      <div class="mb-4">
        <label for="guardPhone" class="form-label kksColorPrimary fw-bold">보호자 핸드폰번호</label>
        <input type="text" class="form-control" id="guardPhone" v-model="guardPhone" placeholder="핸드폰번호 입력">
      </div>
      <div class="mb-4">
        <label for="guardPwd" class="form-label kksColorPrimary fw-bold">비밀번호</label>
        <input type="password" class="form-control" id="guardPwd" v-model="guardPwd" placeholder="**** ">
      </div>
      <div class="mb-4">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="PwdCheck">
          <label class="form-check-label" for="PwdCheck">
            비밀번호를 저장합니다.
          </label>
        </div>
      </div>
      <div class="btn_wrap">
        <button class="btn btn-style-1" v-on:click="login">입장하기</button>
      </div>
    </div>
  </main>
</template>

<script>
import Login from "@/views/guard/login";
export default Login;
</script>
