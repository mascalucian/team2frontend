<template>
  <div id="wrapper">
    <div>
      <div class="headerflex">
        <div class="leftside">
          <div class="titlediv">
            <a href="/" class="companyname">
              Principal Leryon Services SRL
            </a>
          </div>
          <div class="btndiv">
            <a
              href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
              class="btn"
            >
              Explore
            </a>
          </div>
        </div>
        <Search :query="query" />
        <div class="rightside">
          <div class="btndiv">
            <a
              href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
              class="btn"
            >
              Teach
            </a>
          </div>
          <div class="btndiv">
            <a
              href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
              class="btn"
            >
              My learning
            </a>
          </div>
        </div>
      </div>
    </div>

    <div id="results-wrapper" class="vld-parent">
      <loading
        v-model:active="isLoading"
        :is-full-page="false"
        :background-color="'none'"
      ></loading>
      <Result v-for="result in results" :key="result.id" :course="result" />
      <div v-if="message && !isLoading" id="error-message">
        {{ message }}
      </div>
    </div>
    <footer v-if="!message">
      <router-link to="/">Go back</router-link>
      <h4>Page: {{ page }} of {{ maxPage }}</h4>
      <button
        @click.prevent="first()"
        :disabled="$route.params.page == '1' || isLoading"
      >
        <i class="fas fa-angle-double-left"></i>
      </button>
      <button
        @click.prevent="prev()"
        :disabled="$route.params.page == '1' || isLoading"
      >
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
import axios from "axios";
import Search from "./Search.vue";
import Result from "../ui/Result.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      query: "",
      page: 1,
      results: [],
      isLoading: true,
      message: "",
      maxPage: undefined,
    };
  },
  components: {
    Search,
    Result,
    Loading,
  },
  methods: {
    async fetchCourses() {
      this.message = "";
      this.isLoading = true;
      this.results.splice(0);
      axios
        .get(
          `https://localhost:5001/UdemyCourse/${encodeURIComponent(
            this.query
          )}/${this.page}`
        )
        .then((response) => {
          this.results = response.data.courses;
          this.isLoading = false;
          this.maxPage = Math.ceil(response.data.numberOfCoursesFound / 12);
          if (response.data.numberOfCoursesFound == 0) {
            if (response.data.wasOverFullFiled)
              this.message = "Page not found.";
            if (response.data.noSearchFound) this.message = "No results found.";
          }
        })
        .finally(() => {
          this.$forceUpdate();
        });
    },
    next() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: parseInt(this.page) + 1,
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
      });
    },
    first() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: 1,
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
      });
    },
  },
  created() {
    this.query = this.$route.params.query;
    this.page = this.$route.params.page;
    this.fetchCourses();
  },
  beforeRouteUpdate(to, from, next) {
    this.query = to.params.query;
    this.page = to.params.page;
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
