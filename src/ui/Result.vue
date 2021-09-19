<template>
  <a
    :href="'https://udemy.com' + course.url"
    target="_blank"
    id="wrapper"
    :class="{ recommended: isRecommended }"
    @mouseenter="showButtons = true"
    @mouseleave="showButtons = false"
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
              <h6>Average rating: {{ avgRating }}</h6>
              <span class="stars-wrapper">
                <i class="far fa-star star"></i>
                <i class="far fa-star star"></i>
                <i class="far fa-star star"></i>
                <i class="far fa-star star"></i>
                <i class="far fa-star star"></i>
                <span class="stars-filled" :style="{ width: filledStarsWidth + 'px' }">
                  <i class="fas fa-star star"></i>
                  <i class="fas fa-star star"></i>
                  <i class="fas fa-star star"></i>
                  <i class="fas fa-star star"></i>
                  <i class="fas fa-star star"></i>
                </span>
              </span>
              <h6>Recommended by:</h6>
              <ul>
                <li
                  v-for="recommendation in recommendations"
                  :key="recommendation.id"
                  class="result-recommendation"
                  @click.stop.prevent="goToUser(recommendation.userId)"
                >
                  <Avatar :name="recommendation.userName" :size="30" />
                  <div class="result-recommendation-details">
                    <p>
                      {{ recommendation.userName }} gave rating
                      {{ recommendation.rating }}
                    </p>
                    <em>"{{ recommendation.feedback }}"</em>
                  </div>
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
    <button
      id="result-menu"
      v-if="showButtons && $route.query.skillId"
      @click.stop.prevent="goToRecommend()"
    >
      Recommend this!
    </button>
  </a>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
  components: {
    Avatar,
  },
  data() {
    return {
      isRecommended: false,
      avgRating: undefined,
      filledStarsWidth: undefined,
      showButtons: false,
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
  methods: {
    goToRecommend() {
      this.$router.push({
        name: "Recommend",
        params: {
          courseId: this.course.id,
        },
        query: {
          skillId: this.$route.query.skillId,
        },
      });
    },
    goToUser(id) {
      this.$router.push({
        name: "UserPage",
        params: {
          id,
        },
      });
    },
  },
  created() {
    if (this.recommendations[0]) {
      this.isRecommended = true;
      this.avgRating =
        this.recommendations.reduce(function (a, b) {
          return a + b.rating;
        }, 0) / this.recommendations.length;
      //console.log(this.avgRating);
      this.avgRating = (Math.round(this.avgRating * 100) / 100).toFixed(1);
    }
  },
  mounted() {
    if (this.isRecommended) {
      let starWidth = document.querySelector(".stars-filled").offsetWidth;
      this.filledStarsWidth = (starWidth * this.avgRating) / 5;
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
  position: relative;
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
    font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto, segoe ui,
      Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
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
    font-family: sf pro text, -apple-system, BlinkMacSystemFont, Roboto, segoe ui,
      Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
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
    font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto, segoe ui,
      Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
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
  position: relative;
  i {
    font-size: 3rem;
    color: rgb(255, 253, 128);
    text-shadow: 2px 2px black;
  }
  p {
    font-size: 1rem !important;
  }
  .stars-wrapper {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    position: relative;
    padding-top: 1rem;
  }

  .stars-filled {
    white-space: nowrap;
    padding-top: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    overflow: clip;
    height: 2rem;
    box-sizing: content-box;
    text-align: left;
  }

  .star {
    color: #e59819;
    text-shadow: none;
    font-size: 2rem;
  }
}

.badge-tooltip {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 0;
  text-align: left;
  width: 20rem;
  border-radius: 20px;
  position: absolute;
  top: 6rem;
  right: 0;
  background-color: white;
  opacity: 0;

  max-height: 50vh;
  z-index: 1000 !important;
  border: 1px solid $c-u-gr;
  padding-right: 1rem;
  transition: all 0.4s ease;
  ul {
    overflow: auto;
  }
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

#result-menu {
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  font-size: 1.7rem;
  border: 0;
  background-color: rgba($c-u-pur, 0.3);
  font-family: $f-u-bm;
  color: white;
  border-radius: 30px;
  padding: 0.3rem 1rem;
  cursor: pointer;
  box-shadow: 0 2px 11px 1px rgb(0 0 0 / 26%);
  transition: all 0.4s ease;
  z-index: 100;
  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 7px 4px rgb(0 0 0 / 26%);
    background-color: rgba($c-u-pur, 0.8);
  }
}

ul {
  list-style: none;
  padding: 5%;
  width: 100%;
}
.result-recommendation {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
  &-details {
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
  }
  em {
    padding-top: 0.35rem !important;
    font-size: 0.8rem !important;
    margin: 0 !important;
    font-weight: lighter !important;
    font-variation-settings: "MONO" 1, "CASL" 1 !important;
  }
  p {
    font-size: 1rem !important;
    margin: 0 !important;
    font-weight: normal !important;
    font-variation-settings: "MONO" 1, "CASL" 1 !important;
  }
  &:hover,
  :active,
  :focus-visible {
    background-color: $c-u-gr;
  }
}
</style>
