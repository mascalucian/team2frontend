<template>
  <div class="searchflex">
    <img src="../assets/udemi.png" alt="" />
    <div class="searchdiv">
      <Search />
    </div>
  </div>
</template>

<script>
import Search from "./Search.vue";
export default {
  components: {
    Search,
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
    segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
    segoe ui symbol;
}

.searchflex {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    // min-width: 8em;
    max-width: 30em;
  }
}
.leftside {
  display: flex;
  align-items: center;
  left: 0;
}
.rightside {
  display: flex;
  align-items: center;
  right: 0;
}
.titlediv {
  width: 180px;
  padding: 10px;
}
.companyname {
  text-decoration: none;
  color: black;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 16px;
}
.btndiv {
  padding-left: 12px;
}
.btn {
  text-decoration: none;
  color: black;
  font-size: 14px;
}
.btn:hover {
  color: rgb(150, 7, 150);
}
.searchdiv {
  padding: 20px;
}
img {
  width: 40vw;
  min-width: 340px;
}
</style>
