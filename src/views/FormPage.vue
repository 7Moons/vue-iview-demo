<template>
  <div class="form">
    <h1>This is form page</h1>
    <Input v-model="text"></Input>
  </div>
</template>

<script>
export default {
  name: "form_page",
  data() {
    return {
      text: ""
    };
  },

  created() {
    console.log("------Form创建------");
  },

  destroyed() {
    console.log("------Form销毁------");
  }
};
</script>
