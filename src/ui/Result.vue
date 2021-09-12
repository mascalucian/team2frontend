<template
  ><a
    :href="'https://udemy.com' + course.url"
    target="_blank"
    id="wrapper"
    :class="{ recommended: isRecommended }"
  >
    <img class="course-img" :src="course.courseImage" />
    <div id="details-wrapper">
      <h3>{{ course.title }}</h3>
      <div class="details">
        <div class="details-left">
          <p>{{ course.headline }}</p>
          <div id="instructor-prices">
            <span id="price"
              ><h4>{{ course.price }}</h4></span
            >
          </div>
        </div>

        <div class="badge-instructor">
          <div class="badge" v-if="isRecommended">
            <i class="fas fa-medal"></i>
            <p>Recommendations: {{ recommendations.length }}</p>
            <div class="badge-tooltip">
              <h6>Recommended by:</h6>
              <ul>
                <li
                  v-for="recommendation in recommendations"
                  :key="recommendation.id"
                >
                  {{ recommendation.name }}
                  gave rating {{ recommendation.rating }}: "{{
                    recommendation.feedback
                  }}"
                </li>
              </ul>
            </div>
          </div>
          <div class="instructor">
            <img class="instructor-img" :src="course.instructors[0].photo" />
            <h5>{{ course.instructors[0].name }}</h5>
            <h6>{{ course.instructors[0].title }}</h6>
          </div>
        </div>
      </div>
    </div>
  </a></template
>

<script>
export default {
  data() {
    return {
      isRecommended: false,
    };
  },
  props: {
    course: {
      required: true,
      type: Object,
    },
    recommendations: {
      required: false,
      type: Array,
    },
  },
  created() {
    if (this.recommendations[0]) {
      this.isRecommended = true;
    }
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
  height: 20rem;
  color: black;
  &:hover {
    background-color: #d1d7dc;
  }
  .course-img {
    height: 100%;
    object-fit: contain;
    width: 260px;
    display: inline-block;
    margin-right: 1.6rem;
  }
  #details-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    height: 100%;
  }
  .details {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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
  #price {
    h4 {
      margin: 0;
      width: 100%;
    }
    color: #b4690e;
    font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
      segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
      segoe ui symbol;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02rem;
    font-size: 1.4rem;
    text-align: left;
  }
}

.instructor-img {
  height: 4rem;
  width: 4rem !important;
  object-fit: cover;
  width: 1rem;
  display: inline-block;
  border-radius: 50%;
  margin: 0;
}

.recommended {
  background-color: rgb(185, 255, 167) !important;
  border: 1px solid green;

  &:hover {
    background-color: rgb(223, 255, 214) !important;
  }
}

.badge-instructor {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.instructor {
  margin-top: auto !important;
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  h5,
  h6 {
    margin: 0;
    text-align: center;
  }
}

.badge {
  text-align: center;
  i {
    font-size: 3rem;
    color: rgb(255, 253, 128);
    text-shadow: 2px 2px black;
  }
  p {
    font-size: 1rem !important;
  }
  position: relative;
}

.badge-tooltip {
  height: 0;
  text-align: left;
  width: 20rem;
  border-radius: 20px;
  position: absolute;
  top: 6rem;
  right: 0;
  background-color: white;
  opacity: 0;

  max-height: 20rem;
  overflow: auto;
  z-index: 100;
  border: 1px solid $c-u-gr;
  padding-right: 1rem;
  transition: all 0.4s ease;
  h6 {
    margin: 0;
    font-size: large;
    text-align: center;
    margin-top: 1rem;
  }
}

.badge:hover > .badge-tooltip {
  height: auto;
  opacity: 1;
}

.details-left {
  flex-grow: 1;
}
</style>
