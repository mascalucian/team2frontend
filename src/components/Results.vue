<template>
  <div>
    <h3>You searched for:</h3>
    <h1>{{ query }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  created() {
    this.query = this.$route.params.query;
  },
};
</script>

<style lang="scss" scoped></style>
