<template>
  <div id="app">
    <router-view v-if="layout === 'Main' || isSkipToken"></router-view>
    <component :is="layout" v-else></component>
    <template v-if="!isSkipToken">
      <portal-target name="modal"/>
      <!-- 로딩 공통 -->
      <div class="loading_wrap" v-if="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </template>
  </div>
</template>

<script>
import app from "./app";

export default app;
</script>

<style lang="scss">
//@import "@/assets/scss/rion.scss";

.pagelist {
  position: fixed;
  bottom: 5rem;
  left: 0;
  vertical-align: middle;
  padding: 1rem;
  //background-color: $bdc_main_light2;
  //color: $tc_white;
  z-index: 999;
  pointer-events: auto;
}
</style>
