<template
  ><a :href="'https://udemy.com' + course.url" target="_blank" id="wrapper">
    <img :src="course.courseImage" />
    <div id="details-wrapper">
      <h3>{{ course.title }}</h3>
      <p>{{ course.headline }}</p>
      <div id="instructor-prices">
        <span id="price"
          ><h4>{{ course.price }}</h4></span
        >
        <span>
          <img :src="course.instructors[0].photo" />
          <h5>{{ course.instructors[0].name }}</h5>
          <h6>{{ course.instructors[0].title }}</h6>
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

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  text-decoration: none;
  padding: 1.6rem;
  margin: 0.5em;

  border-radius: 10px;
  box-shadow: 0px 1px 5px #888888;
  height: 17rem;
  color: black;
  &:hover,
  :active,
  :focus-visible {
    background-color: #d1d7dc;
  }
  img {
    height: 100%;
    object-fit: contain;
    width: 260px;
    display: inline-block;
    margin-right: 1.6rem;
  }
  #details-wrapper {
    display: inline-block;
    flex-grow: 1;
  }
  h3 {
    font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
      segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
      segoe ui symbol;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02rem;
    font-size: 1rem;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    margin: 0;
  }
  p {
    font-family: sf pro text, -apple-system, BlinkMacSystemFont, Roboto,
      segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
      segoe ui symbol;
    font-weight: 400;
    line-height: 1.4;
    font-size: 1.2rem;
  }
  #instructor-prices {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      width: 10rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
    h5,
    h6 {
      margin: 0;
      text-align: center;
    }
    img {
      height: 4rem;
      object-fit: cover;
      width: 4rem;
      display: inline-block;
      border-radius: 50%;
      margin: 0;
    }
    #price {
      h4 {
        margin: 0;
        width: 100%;
      }
      color: #b4690e;
      font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
        segoe ui, Helvetica, Arial, sans-serif, apple color emoji,
        segoe ui emoji, segoe ui symbol;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02rem;
      font-size: 1.4rem;
      text-align: left;
    }
  }
}
</style>
