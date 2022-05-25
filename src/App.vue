<template>
  <div id="app">
    {{layout}}
    <router-view v-if="layout === 'Main'"></router-view>
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


