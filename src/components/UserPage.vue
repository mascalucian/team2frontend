<template>
  <main>
    <div>
      <div class="banner background-tint">
        <div>
          <a href="/#/skills"><img src="../assets/home.png" class="home" /></a>
        </div>
      </div>
      <div class="alignment">
        <div class="main-container">
          <div class="user-data">
            <div class="skeleton avatar avatar-loading" v-if="!user"></div>
            <Avatar :name="user?.userName" :size="200" class="avatar" v-if="user" />
            <h2 :class="{ '.skeleton-text': !user }">{{ user?.email }}</h2>
            <div class="roles">
              <Role v-for="role in user?.roles" :key="role" :role="role" :size="45" />
            </div>
          </div>
          <div class="user-recommends">
            <h1 class="recommended" v-if="user">Recommended courses:</h1>
            <h3 class="nrrec" v-if="user">
              {{
                recommendations.length
                  ? recommendations.length + " recommendations made."
                  : "No recommendations made yet."
              }}
            </h3>
            <div v-if="!user" class="skeleton-parent">
              <SkeletonRecommendation />
              <SkeletonRecommendation v-for="index in nrSkeletons" :key="index" />
            </div>

            <div
              v-else
              class="recommendation"
              v-for="recommendation in recommendations"
              :key="recommendation.id"
            >
              <Avatar v-if="user" :name="user?.userName" :size="50" class="avatarsmall" />
              <p>
                {{ user?.userName }} recommended the course
                {{ recommendation.courseTitle }} for skill
                <router-link
                  :to="`/results/${recommendation.skillName}/1?skillId=${recommendation.skillId}`"
                  ><strong>{{ recommendation.skillName }}</strong></router-link
                >
                giving a {{ recommendation.rating }} star rating and feedback:<br />{{
                  recommendation.feedback
                }}
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { inject } from "vue";
import { useSignalR } from "@quangdao/vue-signalr";
import Avatar from "../ui/Avatar.vue";
import Role from "../ui/Role.vue";
import SkeletonRecommendation from "../ui/skeleton/SkeletonRecommendation.vue";
export default {
  data() {
    return {
      user: undefined,
      loader: undefined,
      recommendations: [],
      nrSkeletons: 1,
    };
  },
  components: {
    Avatar,
    Role,
    SkeletonRecommendation,
  },
  methods: {
    loadData(id) {
      this.$http
        .all([
          this.$http.get("/users/" + id).then((result) => {
            this.user = result.data;
          }),
          this.$http.get("/Recomandations/user/" + id).then((result) => {
            this.recommendations = result.data;
          }),
        ])
        .then(() => {
          // this.loader.hide();
        });
    },
  },
  beforeMount() {
    this.loadData(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.id);
    next();
  },
  created() {
    const signalr = useSignalR();
    signalr.on("RecommendationAdded", (data) => {
      if (data.recomandation.userId == this.$route.params.id)
        this.recommendations.push(data.recomandation);
    });
  },
  mounted() {
    const recommendationWrapper = document.querySelector(".user-recommends");
    const recommendation = document.querySelector(".recommendation");

    var height = recommendation.offsetHeight;
    height += parseInt(
      window.getComputedStyle(recommendation).getPropertyValue("margin-top")
    );
    height += parseInt(
      window.getComputedStyle(recommendation).getPropertyValue("margin-bottom")
    );

    this.nrSkeletons = Math.floor(recommendationWrapper.offsetHeight / height) - 1;
  },
};
</script>

<style scoped lang="scss">
main {
  flex-grow: 1;
  & > div {
    height: 100% !important;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
.recommendation {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 150px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  a {
    color: black;
    text-decoration: none;
    &:hover {
      color: $c-u-pur;
      text-decoration: underline;
    }
  }
}
.home {
  width: 100px;
  -webkit-filter: drop-shadow(2px 2px 5px rgb(255, 255, 255));
  filter: drop-shadow(2px 2px 5px rgb(255, 255, 255));
}
.nrrec {
  font-size: 2rem;
  color: black;
}
.avatar {
  margin-top: 15%;
}
.avatarsmall {
  margin-right: 10px;
}
.user-data {
  padding: 2rem;
  min-width: 40%;
  background: rgb(112, 54, 103);
  background: linear-gradient(34deg, rgb(65, 5, 88) 0%, rgb(60, 12, 194) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -10px 0px 10px 1px black;
}
.user-recommends {
  padding: 2rem;
  min-width: 60%;
  background-color: white;
  box-shadow: -2px 0px 10px 1px black;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100% !important;
  flex-grow: 1;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.alignment {
  height: 100% !important;
  flex-grow: 1;
  width: 100vw;
  background-color: pink;
}
.background-tint {
  background-color: #5624d0;
  background-blend-mode: multiply;
}
.banner {
  width: 100vw;
  background-image: url("https://thumbs.dreamstime.com/b/vector-education-pattern-educattion-seamless-background-vector-education-pattern-educattion-seamless-background-vector-113988685.jpg");
  min-height: 25%;
  height: 20vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
h1 {
  color: #ffffff;
  font-size: 3rem;
  font-family: "Signika", sans-serif;
  text-align: center;
  padding: 2rem 0;
  margin: 0;
}
h2 {
  word-wrap: break-word;
  width: 100%;
  color: #ffffff;
  font-size: 2rem;
  font-family: "Signika", sans-serif;
  text-align: center;
  padding: 1rem 0;
  margin: 0;
  &:empty {
    opacity: 0.7;
    margin: 0.83em 0;
    height: 2rem;
    width: 100%;
    animation: skeleton-loading 0.3s linear infinite alternate;
  }
}
.recommended {
  color: black;
}
@media screen and (max-width: 946px) {
  .user-data {
    width: 100%;
  }
  .user-recommends {
    width: 100%;
  }
  .main-container {
    flex-direction: column;
  }
  .banner {
    min-height: 20%;
    max-height: 20%;
  }
  .alignment {
    min-height: 80%;
  }
  .nrrec {
    margin-top: -20px;
  }
  h1 {
    padding-top: 0px;
  }
}

.skeleton-parent {
  width: 100% !important;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.vld-parent {
  height: 100%;
}

.roles {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  width: 100%;
}

.skeleton {
  opacity: 0.7;
  animation: skeleton-loading 0.3s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 70%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.avatar-loading {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}

.avatar-loading-small {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.skeleton-text {
  opacity: 0.7;
  height: 1rem;
  width: 100%;
  animation: skeleton-loading 1s linear infinite alternate;
  margin: 0.2rem;
}
</style>
