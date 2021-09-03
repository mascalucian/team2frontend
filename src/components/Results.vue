<template>
  <div>
    <Search :query="query" />
    <h3>You searched for:</h3>
    <h1>{{ query }}</h1>
    <router-link to="/">Go back</router-link>
  </div>
</template>

<script>
import Search from "./Search.vue";
export default {
  data() {
    return {
      query: "",
    };
  },
  components: {
    Search,
  },
  created() {
    this.query = this.$route.params.query;
  },
  beforeRouteUpdate(to, from, next) {
    this.query = to.params.query;
    next();
  },
};
</script>

<style scoped lang="scss"></style>
