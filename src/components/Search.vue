<template
  ><div>
    <form class="search" @submit.prevent="search()">
      <input class="input" placeholder="Search for anything" v-model="searchQuery" />
      <input class="submit" type="submit" value="" :disabled="!searchQuery"/>
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

<style lang="scss" scoped>

.search {
  height: 50px;
  width:40vw;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 40px;
  background-color: rgba(240, 240, 240, 0.411);
  align-items: center;
}
.input {
  background-color: transparent;
  border: none;
  padding: 20px;
}
.submit {
  background-image: url("https://cdn.iconscout.com/icon/free/png-256/search-1399-475061.png");
  height:20px;
  width: 20px;
  padding: 15px;
  background-size:cover;
  border: none;
  background-color: transparent;
  color:rgba(240, 240, 240, 0.411);

}

</style>
