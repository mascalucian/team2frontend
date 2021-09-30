<template>
  <div>
    <form class="search" @submit.prevent="search()">
      <input class="input" placeholder="Search for anything" v-model="searchQuery" />
      <button type="submit" class="fas fa-search fa-lg" :disabled="!searchQuery" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: this.$route.params.query || "",
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "Results",
        params: { query: this.searchQuery, page: 1 },
      });
    },
  },
  watch: {
    $route(to) {
      this.searchQuery = to.params.query;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  flex-grow: 1;
}
.search {
  margin: auto;
  position: relative;
  max-width: 30rem;
  min-width: 15vw;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 40px;
  background-color: transparent;
  align-items: center;
  width: 100% !important;
}
.input {
  background-color: transparent;
  color: black;
  border: none;
  padding: 1rem;
  width: 100%;
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
  position: absolute;
  right: 20px;
  color: black;
  background: none;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
}

div {
  padding: 0 2vw;
}
</style>
