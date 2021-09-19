<template>
  <main>
    <div v-if="user">
      <div class="banner background-tint">
        <div>
          <a href="/#/skills"><img src="../assets/home.png" class="home" /></a>
        </div>
      </div>
      <div class="alignment">
        <div class="main-container">
          <div class="user-data">
            <Avatar :name="user?.userName" :size="200" class="avatar" />
            <h1>{{ user?.userName }}</h1>
            <h2>{{ user?.email }}</h2>
            <p
              v-for="role in user?.roles"
              :key="role"
              class="role"
              :class="role == 'Admin' ? 'role-admin' : 'role-user'"
            >
              {{ role + (role == "Admin" ? " 🔧" : " 😩") }}
            </p>
            <h2 class="nrrec">
              {{
                recommendations.length
                  ? recommendations.length + " recommendations made."
                  : "No recommendations made yet."
              }}
            </h2>
          </div>
          <div class="user-recommends">
            <h1 class="recommended">Recommended courses:</h1>
            <div
              class="user-recommendations-wrapper recommendation"
              v-for="recommendation in recommendations"
              :key="recommendation.id"
            >
              <Avatar :name="user?.userName" :size="50" class="avatarsmall" />
              <p>
                {{ user?.userName }} recommended the course
                {{ recommendation.courseTitle }} for skill
                <router-link
                  :to="`/results/${recommendation.skillName}/1?skillId=${recommendation.skillId}`"
                  >{{ recommendation.skillName }}</router-link
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
    <div v-else class="vld-parent" ref="loaderWrapper"></div>
  </main>
</template>

<script>
import { inject } from "vue";
import { useSignalR } from "@quangdao/vue-signalr";
import { mapGetters } from "vuex";
import Avatar from "../ui/Avatar.vue";
export default {
  data() {
    return {
      user: undefined,
      loader: undefined,
      recommendations: [],
    };
  },
  computed: {
    ...mapGetters(["getUserData"]),
  },
  components: {
    Avatar,
  },
  methods: {
    loadData(id) {
      this.loader = this.$loading.show({
        container: this.$refs.loaderWrapper,
        isFullPage: false,
        backgroundColor: "none",
        loader: "bars",
      });
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
          this.loader.hide();
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
};
</script>

<style scoped>
.recommendation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 150px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.home {
  width: 100px;
  -webkit-filter: drop-shadow(2px 2px 5px rgb(255, 255, 255));
  filter: drop-shadow(2px 2px 5px rgb(255, 255, 255));
}
.nrrec {
  font-size: 30px;
}
.avatar {
  margin-top: 15%;
}
.avatarsmall {
  margin-right: 10px;
}
.user-data {
  width: 40%;
  background: rgb(112, 54, 103);
  background: linear-gradient(34deg, rgb(65, 5, 88) 0%, rgb(60, 12, 194) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -10px 0px 10px 1px black;
}
.user-recommends {
  width: 60%;
  background-color: white;
  box-shadow: -2px 0px 10px 1px black;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.alignment {
  width: 100vw;
  background-color: pink;
  min-height: 60%;
}
.background-tint {
  background-color: #5624d0;
  background-blend-mode: multiply;
}
.banner {
  width: 100vw;
  background-image: url("https://thumbs.dreamstime.com/b/vector-education-pattern-educattion-seamless-background-vector-education-pattern-educattion-seamless-background-vector-113988685.jpg");
  min-height: 40%;
  max-height: 40%;
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
  color: #ffffff;
  font-size: 2rem;
  font-family: "Signika", sans-serif;
  text-align: center;
  padding: 1rem 0;
  margin: 0;
}
.recommended {
  color: black;
}
@media screen and (max-width: 946px) {
  .user-data {
    width: 100%;
    min-height: 40%;
  }
  .user-recommends {
    width: 100%;

    min-height: 60%;
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

.vld-parent {
  height: 100%;
}
/* .user-recommendations-wrapper {
} */

.role {
  display: inline-block;
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 40px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.26);
}

.role-admin {
  background-color: steelblue;
}
.role-user {
  background-color: indianred;
}
</style>
