<template>
  <div id="wrapper">
    <div>
    <div class="headerflex">
      <div class="leftside">
        <div class="titlediv">
          <a 
          href="/" 
          class="companyname"> 
          Principal Leryon Services SRL
          </a>
        </div>
        <div class="btndiv">
          <a 
          href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
          class="btn">
            Explore
          </a>
        </div>
      </div>
      <Search :query="query" />
      <div class="rightside">
        <div class="btndiv">
          <a 
          href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
          class="btn">
            Teach
          </a>
        </div>
        <div class="btndiv">
          <a 
          href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
          class="btn">
            My learning
          </a>
        </div>
      </div>
    </div>
  </div>
    
    <div id="results-wrapper">
      <Result v-for="result in testResults" :key="result" :course="result" />
    </div>
    <router-link to="/">Go back</router-link>
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
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.leftside {
  display: flex;
  align-items: center;
  left:0;
}
.rightside {
  display: flex;
  align-items: center;
  right:0;
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
  letter-spacing: -.02rem;
  font-size: 16px;
}
.btndiv {
  padding-left: 12px;
}
.btn {
  text-decoration: none;
  color:black;
  font-size: 14px;
}
.btn:hover {
  color:rgb(150, 7, 150);
}
.searchdiv {
  padding: 20px;
}
</style>
