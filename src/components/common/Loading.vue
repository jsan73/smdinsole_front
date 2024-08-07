<template>
  <div class="loading_wrap">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
.loading_wrap {margin:auto;position:absolute;left:0;top:0;right:0;bottom:0;display:flex;width:26px;height:29px;z-index:99;}
.loader {width:26px;height:29px;background-image:url("/public/static/images/loading_circle.svg");background-repeat:no-repeat;background-size:100% 100%;border:0;animation:spin 1.5s linear infinite;}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>