<template
  ><div>
    <form class="search" @submit.prevent="search()">
      <input
        class="input"
        placeholder="Search for anything"
        v-model="searchQuery"
      />
      <button type="submit" class="fas fa-search" :disabled="!searchQuery" />
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
        params: { query: this.searchQuery, page: 1 },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  height: 50px;
  width: 38.5vw;
  min-width: 340px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  border: 7px solid black;
  border-radius: 40px;
  background-color: #ba9bc9;
  align-items: center;
}
.input {
  background-color: transparent;
  border: none;
  padding: 20px;
  width: 80vw;
  font-size: 20px;
}
.input:focus {
  outline: none;
}
.submit {
  background-image: url("https://cdn.iconscout.com/icon/free/png-256/search-1399-475061.png");
  height: 20px;
  width: 20px;
  padding: 15px;
  background-size: cover;
  border: none;
  background-color: transparent;
  color: rgba(240, 240, 240, 0.411);
}
button {
  background: none;
  outline: none;
  border: none;
}
</style>
