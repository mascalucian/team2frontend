<template>
  <div class="wrapper">
    <div class="avatar" :style="{ backgroundColor: '#' + getBackgroundColor(name) }">
      <p>{{ name[0] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    getBackgroundColor(name) {
      let asciiSum = name
        .split("")
        .map((x) => x.charCodeAt(0))
        .reduce((a, b) => a + b);
      let hexString = asciiSum.toString(16);
      return hexString;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .avatar {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50% !important;
    display: table;
  }
  p {
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    font-size: 6em;
    color: white;
  }
}
</style>
