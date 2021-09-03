<template
  ><div>
    <form @submit.prevent="search()">
      <input placeholder="Search.." v-model="searchQuery" />
      <input type="submit" value="Search" :disabled="!searchQuery" />
    </form></div
></template>

<script>
export default {
  data() {
    return {
      searchQuery: this.query || "",
    };
  },
  props: {
    query: {
      type: String,
      required: false,
    },
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
