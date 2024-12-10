<template>
  <div class="position-absolute loading_wrap" style="z-index: 210;">
    <div class="spinner-border text-primary"
         style="width: 5rem; height: 5rem; border:.5em solid currentColor; border-right-color: transparent; "
         role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
.loading_wrap {margin:auto;position:absolute;left:0;top:0;right:0;bottom:0;display:flex;width: 5rem; height: 5rem;z-index:210;}


</style>