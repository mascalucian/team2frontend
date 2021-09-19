<template>
  <div
    id="avatar-wrapper"
    :style="{ width: size + 'px', height: size + 'px', minWidth: size + 'px' }"
  >
    <div
      id="avatar"
      :style="{
        backgroundColor: '#' + getBackgroundColor(name),
        fontSize: size / 2 + 'px',
        lineHeight: size + 'px',
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
    },
    size: {
      type: Number,
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
#avatar-wrapper {
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
