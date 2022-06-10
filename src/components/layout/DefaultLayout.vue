<template>
  <main id="wrap">
    <Header ref="header" :title="menu_title" :logout="logout"></Header>
    <router-view></router-view>
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
      this.menu_title = this.$route.meta.title;
      this.is_footer = this.$route.meta.footer;
      this.logout = this.$route.meta.logout;
    }
  },
  mounted() {
    this.menu_title = this.$route.meta.title;
    this.is_footer = this.$route.meta.footer;
    this.logout = this.$route.meta.logout;
  }

}
</script>

<style scoped>

</style>