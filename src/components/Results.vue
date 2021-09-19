<template>
  <div id="wrapper">
    <div id="results-wrapper" class="vld-parent" ref="resultsWrapper">
      <Result
        v-for="result in results"
        :key="result.id"
        :course="result"
        :recommendations="getRecommendationsForCourse(result)"
      />
      <div v-if="message && !isLoading" id="error-message">
        {{ message }}
      </div>
    </div>
    <footer v-if="!message">
      <router-link to="/">Go back</router-link>
      <h4>Page: {{ page }} of {{ maxPage }}</h4>
      <button @click.prevent="first()" :disabled="$route.params.page == '1' || isLoading">
        <i class="fas fa-angle-double-left"></i>
      </button>
      <button @click.prevent="prev()" :disabled="$route.params.page == '1' || isLoading">
        <i class="fas fa-angle-left"></i>
      </button>
      <button @click.prevent="next()" :disabled="isLoading || page == maxPage">
        <i class="fas fa-angle-right"></i>
      </button>
      <button @click.prevent="last()" :disabled="isLoading || page == maxPage">
        <i class="fas fa-angle-double-right"></i>
      </button>
    </footer>
  </div>
</template>

<script>
import { inject } from "vue";
import { useSignalR } from "@quangdao/vue-signalr";
import Result from "../ui/Result.vue";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      query: "",
      page: 1,
      results: [],
      loader: undefined,
      message: "",
      maxPage: undefined,
      skillId: undefined,
      recommendations: [],
    };
  },
  components: {
    Result,
  },
  methods: {
    async fetchCourses() {
      this.message = "";
      this.loader = this.$loading.show({
        container: this.$refs.resultsWrapper,
        isFullPage: false,
        backgroundColor: "none",
        color: "black",
      });
      this.results.splice(0);
      if (this.skillId) {
        await this.$http
          .get(`/Recomandations/${this.skillId}`)
          .then((response) => {
            this.recommendations = response.data;
          })
          .catch(() => {
            this.recommendations.splice(0);
          });
      }
      this.$http
        .get(`/UdemyCourse/${encodeURIComponent(this.query)}/${this.page}`)
        .then((response) => {
          this.results = response.data.courses;
          this.loader.hide();
          this.maxPage = Math.ceil(response.data.numberOfCoursesFound / 12);
          if (response.data.numberOfCoursesFound == 0) {
            if (response.data.wasOverFullFiled) this.message = "Page not found.";
            if (response.data.noSearchFound) this.message = "No results found.";
          }
          if (this.$route.query.skillId) {
            console.log("Searched by Skill");
            this.results = this.results.sort((a, b) => {
              return this.hasRecommendations(a) === this.hasRecommendations(b)
                ? 0
                : this.hasRecommendations(a) > this.hasRecommendations(b)
                ? -1
                : 1;
            });
          }
        })
        .finally(() => {
          this.$forceUpdate();
        });
    },
    getRecommendationsForCourse(course) {
      return this.recommendations.filter((_) => {
        return _.courseId == course.id;
      });
    },
    hasRecommendations(course) {
      return this.recommendations.filter((_) => {
        return _.courseId == course.id;
      }).length;
    },
    next() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: parseInt(this.page) + 1,
        },
        query: {
          skillId: this.skillId,
        },
      });
    },
    prev() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: parseInt(this.page) - 1,
        },
        query: {
          skillId: this.skillId,
        },
      });
    },
    first() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: 1,
        },
        query: {
          skillId: this.skillId,
        },
      });
    },
    last() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: parseInt(this.maxPage),
        },
        query: {
          skillId: this.skillId,
        },
      });
    },
  },
  created() {
    const signalr = useSignalR();
    signalr.on("RecommendationAdded", (data) => {
      console.log("OK");
      this.recommendations.push(data);
    });
    this.query = this.$route.params.query;
    this.page = this.$route.params.page;
    this.skillId = this.$route.query.skillId;
    this.fetchCourses();
  },
  beforeRouteUpdate(to, from, next) {
    this.query = to.params.query;
    this.page = to.params.page;
    this.skillId = to.query.skillId;
    if (!this.skillId) {
      this.recommendations.splice(0);
    }
    next();
    this.fetchCourses();
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  flex-grow: 1;
  position: relative;
}
#results-wrapper {
  padding: 4.8rem 2.4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.headerflex {
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #d1d7dc;
  box-shadow: 0px 1px 5px #888888;
  a {
    font-size: 1.15em !important;
  }
}

#error-message {
  text-align: center;
  color: black;
  font-size: 2rem;
}

.searchflex {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.leftside {
  display: flex;
  align-items: center;
  left: 0;
}
.rightside {
  display: flex;
  align-items: center;
  right: 0;
}
.titlediv {
  width: 180px;
  padding: 10px;
}
.companyname {
  text-decoration: none;
  color: black;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 16px;
}
.btndiv {
  padding-left: 12px;
}
.btn {
  text-decoration: none;
  color: black;
  font-size: 14px;
}
.btn:hover {
  color: rgb(150, 7, 150);
}
.searchdiv {
  padding: 20px;
}
footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid #d1d7dc;
  background-color: white;
  padding: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h4 {
    display: inline-block;
    margin: 0;
    color: black;
    margin: auto 0;
  }
  button {
    background: none;
    outline: none;
    border: 0;
    cursor: pointer;
    height: 100% !important;
    font-size: 1.5rem;
    padding: 0.5rem 0.75rem;
    &:hover,
    :focus-visible {
      color: $c-u-pur;
    }
    &:disabled {
      color: $c-u-gr;
      cursor: default;
    }
  }

  a {
    text-decoration: none;
    margin-right: 38%;
    padding-left: 2rem;
  }
}
</style>
