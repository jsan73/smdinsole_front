<template>
  <div class="sticky-top shadow w-100">
    <div class="list-group userlist">
      <a @click="move" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <img src="/static/images/GPS/OK.svg" alt="기지국" width="44" height="56" class=" flex-shrink-0">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h4 class="mb-0">{{shoes.nickName}} <small class="opacity-75">{{shoes.shoesId}}</small></h4>
            <p class="mb-0 mt-1">{{shoes.rangeName}} - {{shoes.radius}}m</p>
          </div>
        </div>
        <div class="battery"><img :src="batteryImg" :alt='"배터리" + shoes.battery + "칸"' width="32" height="32"></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoesHeader",
  props:{
    shoes:{
      nickName:'',
      shoesId:'',
      rangeName:'',
      radius:1,
      battery:0,

    }
  },
  data() {
    return {
      batteryImg : '/static/images/battery/0.svg'
    }
  },
  watch: {
    shoes() {
      this.batteryImg = "/static/images/battery/" + this.shoes.battery + ".svg";
    }
  },
  methods:{
    move(){
      this.$emit("clickAction");
    }
  }
}
</script>

<style scoped>

</style>