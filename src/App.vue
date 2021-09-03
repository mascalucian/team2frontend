<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
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
}

#app {
  height: 100%;
  flex-grow: 1;
}
</style>
