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
          <div id="account-button-user-name">
            <p>{{ userProfile?.name }}</p>
            <div class="roles" v-if="typeof userProfile?.role !== 'string'">
              <Role
                v-for="role in userProfile?.role"
                :key="role"
                :role="role"
                :size="30"
              />
            </div>
            <div class="roles" v-else>
              <Role :role="userProfile?.role" :size="30" />
            </div>
          </div>
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
import Role from "../ui/Role.vue";
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
    Role,
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
  text-align: center;
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
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  color: black !important;
}
#account-button-user-name {
  display: flex;
  flex-direction: column;

  p {
    color: black !important;
    margin: 0 1rem;
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

.roles {
  padding: 0.2rem;
  display: flex;
  flex-wrap: wrap;
}
@media screen and (max-width: 1206px) {
  .headerflex {
    align-content: center;
    justify-content: space-evenly;
  }
}
@media screen and (max-width: 1183px) {
  .headerflex {
    height: 160px;
    align-content: center;
  }
}
@media screen and (max-width: 795px) {
  .headerflex {
    justify-content: flex-start;
  }
  #account-button-user-name {
    display: none;
  }
}
@media screen and (max-width: 653px) {
  .headerflex {
    height: 180px;
    align-items: center;
    flex-direction: column;
    padding: 0;
    justify-content: space-evenly;
  }
  .account-button {
    margin: 0.6rem;
  }
  .titlediv {
    padding: 0;
  }

  .btndiv {
    padding: 0;
  }
}
@media screen and (max-width: 600px) {
  .leftside {
    margin-top: 0.21rem;
  }
}
</style>
