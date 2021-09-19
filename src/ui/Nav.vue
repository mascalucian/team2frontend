<template>
  <div>
    <div class="headerflex">
      <div class="leftside">
        <div class="titlediv">
          <router-link to="/" class="companyname">
            Principal Leryon Services SRL
          </router-link>
        </div>
        <div class="btndiv">
          <router-link to="/skills" class="btn"> Skills </router-link>
        </div>
      </div>
      <Search v-if="$route.name != 'Home'" />
      <div class="rightside">
        <div class="btndiv" v-if="!isLoggedin">
          <router-link to="/login" class="btn"> Log in </router-link>
        </div>
        <div class="btndiv" v-if="!isLoggedin">
          <router-link to="/register" class="btn"> Register </router-link>
        </div>
        <router-link
          :to="'/user/' + getUserData.id"
          class="account-button"
          v-if="isLoggedin"
          ><Avatar :name="getUserData.userName" :size="40" />
          <p>{{ getUserData.userName }}</p>
        </router-link>

        <div class="btndiv" v-if="isLoggedin">
          <button type="button" @click.stop.prevent="logout()" class="btn">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import Avatar from "../ui/Avatar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Search,
    Avatar,
  },
  computed: {
    ...mapGetters(["isLoggedin", "getUserData"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.headerflex {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  background-color: whitesmoke;
  border-bottom: 1px solid #d1d7dc;
  box-shadow: 0px 1px 5px #888888;
}

a {
  font-size: 1.15em !important;
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
  color: black !important;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 16px;
}
.btndiv {
  padding-left: 12px;
  text-align: center;
}
.btn {
  text-decoration: none;
  color: black;
  font-size: 14px;
  margin: 0 0.25em;
}
.btn:hover,
.router-link-active {
  color: rgb(150, 7, 150);
}
.account-button {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  p {
    margin: 0 2rem 0 0.7rem;
  }
}

@media screen and (max-width: 925px) {
  .headerflex {
    height: 160px;
    align-content: center;
  }
}
@media screen and (max-width: 653px) {
  .headerflex {
    height: 240px;
    align-content: center;
    flex-direction: column;
    padding-bottom: 20px;
  }
}
</style>
