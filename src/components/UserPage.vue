<template>
  <div class="banner background-tint">
    <div>
      <a href="/#/skills"><img src="../assets/home.png" class="home" /></a>
    </div>
  </div>
  <div class="alignment">
    <div class="main-container">
      <div class="user-data">
        <Avatar :name="'Lucian'" :size="200" />
        <h1>Lucian Masca</h1>
        <h1 class="nrrec">0 recommendations made.</h1>
      </div>
      <div class="user-recommends">
        <h1 class="recommended">Recommended courses:</h1>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from "../ui/Avatar.vue";
export default {
  data() {
    return {};
  },
  components: {
    Avatar,
  },
};
</script>

<style scoped>
.home {
  width: 100px;
  -webkit-filter: drop-shadow(2px 2px 5px rgb(255, 255, 255));
  filter: drop-shadow(2px 2px 5px rgb(255, 255, 255));
}
.nrrec {
  font-size: 30px;
}
.avatar {
  width: 200px;
  height: 200px;
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
  font-size: 48px;
  font-family: "Signika", sans-serif;
  padding-bottom: 10px;
  text-align: center;
  padding-top: 30px;
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
</style>
