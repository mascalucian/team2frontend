<template
  ><a :href="'https://principalgroup.udemy.com' + course.url" target="_blank">
    <img :src="course.img" />
    <div>
      <h3>{{ course.title }}</h3>
      <p>{{ course.headline }}</p>
      <div id="instructor-prices">
        <span>{{ course.price }}</span>
        <span>
          <img :src="course.instructor.img" />
          <h5>{{ course.instructor.name }}</h5>
          <h6>{{ course.instructor.title }}</h6>
        </span>
      </div>
    </div>
  </a></template
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
