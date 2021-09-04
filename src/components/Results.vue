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

    <div id="results-wrapper">
      <Result v-for="result in testResults" :key="result" :course="result" />
    </div>
    <footer>
      <router-link to="/">Go back</router-link>
      <h4>Page: {{ $route.params.page }}</h4>
      <button @click.prevent="first()" :disabled="$route.params.page == '1'">
        <i class="fas fa-angle-double-left"></i>
      </button>
      <button @click.prevent="prev()" :disabled="$route.params.page == '1'">
        <i class="fas fa-angle-left"></i>
      </button>
      <button @click.prevent="next()">
        <i class="fas fa-angle-right"></i>
      </button>
      <!-- <button @click.prevent="last()">
        <i class="fas fa-angle-double-right"></i>
      </button> -->
    </footer>
  </div>
</template>

<script>
import Search from "./Search.vue";
import Result from "../ui/Result.vue";
export default {
  data() {
    return {
      query: "",
      testResults: [
        {
          title: "filmora 9. Make videos for youtube, instagram and facebook.",
          headline:
            "Make videos for social media, make thumbnails, instagram labels, record your pc screen, add watermarks and more",
          url:
            "/course/filmora-9-make-videos-for-youtube-instagram-and-facebook/",
          img: "https://img-c.udemycdn.com/course/480x270/4261278_2827.jpg",
          price: "€19.99",
          instructor: {
            name: "Benjamin Rios",
            title: "International Marketer",
            img: "https://img-c.udemycdn.com/user/100x100/80056564_2a28.jpg",
          },
        },
        {
          title: "Oracle E-Business Suite R12.1 Receivables Essentials 1Z0-518",
          headline:
            "Oracle E-Business Suite R12.1 Receivables Essentials 1Z0-518",
          url:
            "/course/oracle-e-business-suite-r121-receivables-essentials-1z0-518/",
          img: "https://img-c.udemycdn.com/course/480x270/4261288_25d9.jpg",
          price: "€19.99",
          instructor: {
            name: "Farah Essrir",
            title: "Ingénierie",
            img: "https://img-c.udemycdn.com/user/100x100/170532358_dd6b.jpg",
          },
        },
        {
          title: "You Tube Advertising Professional",
          headline:
            "The A-Z of Marketing on You Tube. For a Career in YouTube Marketing. adding to your skills or Starting Your own You Tu",
          url: "/course/you-tube-advertising-professional/",
          img: "https://img-c.udemycdn.com/course/480x270/4261292_3f54.jpg",
          price: "€24.99",
          instructor: {
            name: "Renier Beukes",
            title: "Business coach // Entrepreneur // SOFTWARE ENGINEER",
            img: "https://img-c.udemycdn.com/user/100x100/41026714_385f_3.jpg",
          },
        },
      ],
    };
  },
  components: {
    Search,
    Result,
  },
  methods: {
    next() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: parseInt(this.$route.params.page) + 1,
        },
      });
    },
    prev() {
      this.$router.push({
        name: "Results",
        params: {
          query: this.query,
          page: parseInt(this.$route.params.page) - 1,
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
  },
  created() {
    this.query = this.$route.params.query;
  },
  beforeRouteUpdate(to, from, next) {
    this.query = to.params.query;
    next();
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
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
    flex-grow: 0.5;
    padding-left: 2rem;
  }
}
</style>
