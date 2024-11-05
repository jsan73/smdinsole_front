<template>
  <header id="header">
  <div class="pagetitle">
    <h2 class="text-center">{{ title }}</h2>
    <div class="iconL" v-if="!isMain"><a href="#"><img src="/static/images/Pre_arr.svg" alt="pre" width=" " height=" " class=" flex-shrink-0" @click="backHandler()"></a></div>
    <div class="iconR" v-if="isMain"><a @click="moveControl"><img src="/static/images/cog.svg" alt="설정" width=" " height=" " class=" flex-shrink-0"></a></div>
  </div>
  </header>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Header",
  data() {
    return {
      isMain : false
    }
  },
  props:{
    title:String,
    logout:false,
    menuId:''
  },
  methods: {
    ...mapActions("guardStore", ["commitToken", "commitAutoLogin", "commitChoiceDevice"]),

    //뒤로가기
    backHandler(){
      if("TermPrivacy" == this.menuId) {
        const payload = {method: 'closeWebView'}; //, url: process.env.VUE_APP_SERVER_URL +"/termprivacy"};
        this._callNative(payload);
      }else {
        this.$router.go(-1);
      }
    },
    goLogout() {
      this.commitToken('');
      let choiceDevice = {
        "deviceNo":0
      }
      this.commitChoiceDevice(choiceDevice);
      this.commitAutoLogin('N');
      window.location.href = "/login"
      //this.$router.replace('/login');
    },
    moveControl(){
      this.$router.push('control');
    }

  },
  watch: {
    menuId() {
      if(this.menuId == "Main") this.isMain = true;
      else this.isMain = false;
    }
  },

}
</script>

<style scoped>

</style>