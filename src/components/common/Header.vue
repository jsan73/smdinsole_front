<template>
  <header id="header">
  <div class="pagetitle">
    <h2 class="text-center">{{ title }}</h2>
    <div class="iconL"><img src="/static/images/Pre_arr.svg" alt="pre" width=" " height=" " class=" flex-shrink-0"></div>
  </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props:{
    title:String
  }
}
</script>

<style scoped>

</style>