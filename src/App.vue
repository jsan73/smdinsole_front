<template>
  <div id="app">
    <router-view v-if="layout === 'Main'"></router-view>
    <component :is="layout" v-else></component>
    <Alert v-if="alertData.show"
           :msg="alertData.msg"
           :btnC="alertData.btnC"
           :btnO="alertData.btnO"
           @doAction="alertData.doAction"
           :doActionParam="alertData.doActionParam"
           @close="this.hideAlert"
           :alertType="alertData.alertType"
           ref="refAlert"
    />
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


