<template>
  <Nav />
  <router-view></router-view>
</template>

<script>
import Nav from "./ui/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style>
*,
*:before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
    segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
    segoe ui symbol;
}

#app {
  padding-top: 80px;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

* {
  box-sizing: border-box;
}
</style>
