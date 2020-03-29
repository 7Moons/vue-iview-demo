<template>
  <div class="home">
    <h1>This is home page</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "home_page",
  created() {
    console.log("------Home创建------");
  },
  destroyed() {
    console.log("------Home销毁------");
  }
};
</script>
