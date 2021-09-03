<template
  ><div>
    <form @submit.prevent="search()">
      <input placeholder="Search.." v-model="searchQuery" />
      <input type="submit" value="Search" />
    </form></div
></template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "Results",
        params: { query: this.searchQuery },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
