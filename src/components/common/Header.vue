<template>
  <header id="header">
  <div class="pagetitle">
    <h2 class="text-center">{{ title }}</h2>
    <div class="iconL" ><a href="#"><img src="/static/images/Pre_arr.svg" alt="pre" width=" " height=" " class=" flex-shrink-0" @click="backHandler()"></a></div>
    <div v-if="logout" class="iconR"><a href="#"><img src="../../../public/static/images/logout.svg" alt="logout" width=" " height=" " class=" flex-shrink-0"></a></div>
  </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props:{
    title:String,
    logout:false
  },
  methods: {
    //뒤로가기
    backHandler(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>