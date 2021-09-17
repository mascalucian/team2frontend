<template>
  <div id="wrapper">
    <form id="login">
      <div class="logo">
        <img class="logo-img" src="../assets/udemi.png" />
      </div>
      <div class="input-group">
        <div class="input-group-1">
          <i class="fas fa-user"></i>
          <input type="text" class="text-box" placeholder="Username" />
        </div>
        <div class="input-group-2">
          <i class="fas fa-key"></i>
          <input type="password" class="text-box" placeholder="Password" />
        </div>
        <button type="submit" class="button">Log in</button>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link to="/register">Sign up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
// import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #838bc5;
  #login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // width: 22em;
    // height: 25em;
    // margin-bottom: 100px;
    height: 400px;
    width: 350px;
    margin-top: auto;
    margin-bottom: auto;
    background-color: whitesmoke;
    color: black;
    border-radius: 25px;
    .logo {
      position: absolute;
      top: 130px;
      height: 170px;
      width: 170px;
      border-radius: 50%;
      background: whitesmoke;
      padding: 10px;
      //text-align: center;
      display: flex;
      align-items: center;
      border: 10px solid #838bc5;
      &-img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        object-fit: fill;
      }
    }
    .input-group {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      // margin-bottom: 130px;
      &-1,
      &-2 {
        display: flex;
        padding: 0.25em;
        margin: 0.25em;
      }
      i {
        background: #ba9bc9;
        color: white;
        padding: 0.4em;
        border: 0;
        border-radius: 0.25rem 0 0 0.25rem;
      }
      .button {
        background-color: #ba9bc9;
        border: none;
        color: white;
        padding: 0.75em 1.5em;
        border-radius: 25px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
