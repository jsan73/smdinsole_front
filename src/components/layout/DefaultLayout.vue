<template>
  <main id="wrap">
    <Header ref="header" :title="menu_title" :logout="logout" :menuId="menuId"></Header>
    <router-view v-on:change="setChange"></router-view>
    <Footer ref="footer" v-if="is_footer"></Footer>
  </main>

</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      menu_title: "",
      is_footer:false,
      logout:false,
      menuId:""
    };
  },
  watch: {
    $route() {
      this.init();
    }
  },
  mounted() {
    this.init();

  },
  methods:{
    init() {
      this.menu_title = this.$route.meta.title;
      this.is_footer = this.$route.meta.footer;
      this.logout = this.$route.meta.logout;
      this.menuId = this.$route.name;
    },
    setChange(title) {
      this.menu_title = title;
      this.menuId = this.$route.name;
    }
  }

}
</script>

<style scoped>

</style>