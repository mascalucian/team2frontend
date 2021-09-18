<template>
  <div id="wrapper">
    <div
      id="avatar"
      :style="{
        backgroundColor: '#' + getBackgroundColor(name),
      }"
      ref="avatar"
    >
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
      fontSize: "20",
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
    getFontSize() {
      const avatarDiv = this.$refs.avatar;
      var height = avatarDiv.offsetHeight;
      avatarDiv.style.fontSize = height / 2 + "px";
      avatarDiv.style.lineHeight = height + "px";
    },
  },
  mounted() {
    this.getFontSize();
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  #avatar {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50% !important;
    display: table;
  }
  p {
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    color: white;
    font-family: "Roboto", sans-serif;
  }
}
</style>
