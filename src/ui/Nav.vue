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
          <a
            href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
            class="btn"
          >
            Explore
          </a>
        </div>
        <div class="btndiv">
          <router-link to="/skills" class="btn">
            Skills
          </router-link>
        </div>
      </div>
      <Search v-if="$route.name != 'Home'" />
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
          <router-link to="/login" class="btn">
            Log in
          </router-link>
          <a href="/register" class="btn">
            Register
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  components: {
    Search,
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
</style>
