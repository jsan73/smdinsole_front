<template>
  <!-- main -->
  <main class="main">

    <div class="pwModi" >
      <div class="mb-4">
        <label for="NameInput" class="form-label kksColorPrimary fw-bold">이름</label>
        <input type="text" v-model="guardName" class="form-control" id="NameInput" name="PhoneInput" placeholder="보호자" >
      </div>
      <div class="mb-4">
        <label for="PhoneInput" class="form-label kksColorPrimary fw-bold">핸드폰 번호</label>
        <input type="text" v-model="guardPhone" class="form-control" id="PhoneInput" name="PhoneInput" placeholder="핸드폰번호 입력" >
      </div>

      <div  class="btn_wrap">
        <div class="row">
          <div class="col">
            <button @click="cancel()" class="btn btn-style-1 btn-style-1-gray">취소</button>
          </div>
          <div class="col">
            <button @click="add()" class="btn btn-style-1 ">저장</button>
          </div>

        </div>
      </div>

    </div>


  </main>
</template>

<script>
export default {
  name: "GuardianAdd",
  methods: {
    cancel() {
      //api.back();
      this.$router.go(-1);
    },
    add(){

    }
  }
}
</script>

<style scoped>

</style>