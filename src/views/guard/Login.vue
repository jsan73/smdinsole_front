<template>
  <main class="main" >
    <div class="signIn">
      <h1 class="text-center pb-5"><img src="../../../public/static/images/kokasin_logo.svg" alt="kt꼬까신"></h1>
      <div class="mb-4">
        <label for="guardPhone" class="form-label kksColorPrimary fw-bold">보호자 핸드폰번호</label>
        <input type="number" pattern="\d*" maxlength="11" class="form-control" id="guardPhone" v-model="guardPhone" placeholder="핸드폰번호 입력"
               oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
      </div>
      <div class="mb-4">
        <label for="guardPwd" class="form-label kksColorPrimary fw-bold">비밀번호</label>
        <input type="password" maxlength="15" class="form-control" id="guardPwd" v-model="guardPwd" placeholder="**** ">
      </div>

      <div class="mb-4" v-if="checkGuard">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="PwdCheck" v-model="autoLogin" true-value="Y" false-value="N">
          <label class="form-check-label" for="PwdCheck">
            비밀번호를 저장합니다.
          </label>
        </div>
      </div>


      <div class="mb-4" v-if="!checkGuard">
        <label for="loginPwOk" class="form-label kksColorPrimary fw-bold">비밀번호확인</label>
        <input type="password" maxlength="15" class="form-control" id="loginPwOk" v-model="cnfGuardPwd" placeholder="**** " >
      </div>
      <div class="mb-4 row" v-if="!checkGuard">
        <div class="col-10">
          <input type="checkbox" id="agree_" class="form-check-input" v-model="mktAgree" true-value="Y" false-value="N">
          <label for="agree_"><span class="">약관 및 개인정보 수집 동의</span></label>
        </div>
        <div class="col-2 text-end">
          <a @click="goTerm"><img src="../../../public/static/images/Next_arr_b.svg" alt="더보기"></a>
        </div>
      </div>


      <div class="btn_wrap" v-if="checkGuard">
        <button class="btn btn-style-1" v-on:click="login">입장하기</button>
      </div>

      <div class="btn_wrap" v-if="!checkGuard">
        <button class="btn btn-style-1" v-on:click="regist">가입하기</button>
      </div>
    </div>
  </main>
</template>

<script>
import Login from "@/views/guard/login";
export default Login;
</script>
