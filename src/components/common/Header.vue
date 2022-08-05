<template>
  <header id="header">
  <div class="pagetitle">
    <h2 class="text-center">{{ title }}</h2>
    <div class="iconL" v-if="!isMain"><a href="#"><img src="/static/images/Pre_arr.svg" alt="pre" width=" " height=" " class=" flex-shrink-0" @click="backHandler()"></a></div>
    <div v-if="logout" class="iconR"><a href="#" @click="goLogout"><img src="../../../public/static/images/logout.svg" alt="logout" width=" " height=" " class=" flex-shrink-0"></a></div>
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
    ...mapActions("guardStore", ["commitToken", "commitAutoLogin"]),

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
      this.commitAutoLogin('N');
      window.location.href = "/login"
      //this.$router.replace('/login');
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