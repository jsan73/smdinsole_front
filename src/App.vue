<template>
  <div id="app">
    {{layout}}
    <router-view v-if="layout === 'Main' || isSkipToken"></router-view>
    <component :is="layout" v-else></component>
<!--    <template v-if="!isSkipToken">-->
<!--      <portal-target name="modal"/>-->
<!--      &lt;!&ndash; 로딩 공통 &ndash;&gt;-->
<!--      <div class="loading_wrap" v-if="loading">-->
<!--        <div></div>-->
<!--        <div></div>-->
<!--        <div></div>-->
<!--        <div></div>-->
<!--      </div>-->
<!--    </template>-->
  </div>
</template>

<script>
import app from "./app";

export default app;
</script>


