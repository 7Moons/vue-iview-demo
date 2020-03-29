<template>
  <div class="about">
    <h1>This is about page</h1>
  </div>
</template>

<script>
export default {
  name: "about_page",
  created() {
    console.log("------About创建------");
  },
  destroyed() {
    console.log("------About销毁------");
  }
};
</script>
