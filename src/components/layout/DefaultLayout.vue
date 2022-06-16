<template>
  <main id="wrap">
    <Header ref="header" :title="menu_title" :logout="logout"></Header>
    <router-view v-on:change="setTitle"></router-view>
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
      logout:false
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
    },
    setTitle(title) {
      this.menu_title = title;
    }
  }

}
</script>

<style scoped>

</style>