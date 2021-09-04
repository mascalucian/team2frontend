<template
  ><div>
    <img :src="course.img" />
    <div>
      <h3>{{ course.title }}</h3>
      <p>{{ course.headline }}</p>
      <div id="instructor-prices">
        <span>{{ course.price }}</span>
        <span>
          <img :src="course.instructor - image" />
          <h5>{{ course.instructor - name }}</h5>
          <h6>{{ course.instructor - title }}</h6>
        </span>
      </div>
    </div>
  </div></template
>

<script>
export default {
  props: {
    course: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped></style>
