<template>
  <main id="wrap">
    <Header ref="header"></Header>
    <router-view></router-view>
    <Footer ref="footer"></Footer>
  </main>

</template>

<script>
export default {
  name: "DefaultLayout"
}
</script>

<style scoped>

</style>