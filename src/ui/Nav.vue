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
        <div class="btndiv">
          <router-link to="/about" class="btn"> About </router-link>
        </div>
        <div class="btndiv" v-if="isAdmin">
          <router-link to="/users" class="btn"> Users </router-link>
        </div>
      </div>
      <Search v-if="$route.name != 'Home'" />
      <div class="rightside">
        <!-- <div class="btndiv" v-if="!isLoggedin">
          <router-link to="/register" class="btn"> Register </router-link>
        </div> -->
        <router-link
          :to="'/user/' + userProfile?.sub"
          class="account-button"
          v-if="isSignedIn"
          ><Avatar :name="userProfile?.name" :size="40" />
          <p>{{ userProfile.name.split("@")[0] }}</p>
        </router-link>

        <div class="btndiv" v-if="isSignedIn">
          <button type="button" @click.prevent="logout" class="btn">Logout</button>
        </div>
        <div class="btndiv" v-else>
          <button type="button" @click.prevent="login" class="btn">Log in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import Avatar from "../ui/Avatar.vue";
import AuthService from "../services/auth.service.js";
export default {
  data() {
    return {
      isSignedIn: false,
      userProfile: null,
      isAdmin: false,
    };
  },
  components: {
    Search,
    Avatar,
  },
  methods: {
    login() {
      AuthService.signIn();
    },
    logout() {
      AuthService.signOut();
    },
  },
  async created() {
    this.isAdmin = (await AuthService.getRole())?.includes("Admin");
    this.userProfile = await AuthService.getProfile();
    this.isSignedIn = await AuthService.getSignedIn();
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

a,
button {
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

.btndiv {
  padding-left: 12px;
  text-align: center;
}
.btn {
  text-decoration: none !important;
  color: black !important;
  margin: 0 0.25em !important;
  font-family: inherit;
  outline: none;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
.btn:hover,
.router-link-active,
button:hover {
  color: rgb(150, 7, 150) !important;
}

.account-button {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black !important;
  p {
    margin: 0 2rem 0 0.7rem;
  }
}
.companyname {
  text-decoration: none;
  color: black !important;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 16px;
  &.router-link-active {
    color: black;
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
