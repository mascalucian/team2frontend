<template>
  <div id="wrapper">
    <form id="login">
      <div class="logo">
        <img class="logo-img" src="../assets/udemi.png" />
      </div>
      <div class="data">
        <div class="data-input">
          <i class="fas fa-user"></i>
          <input
            type="text"
            class="text-box"
            placeholder="Username *"
            required
          />
        </div>
        <div class="data-input">
          <i class="fas fa-key"></i>
          <input
            type="password"
            class="text-box"
            placeholder="Password *"
            required
          />
        </div>
        <div class="data-input">
          <i class="fas fa-key"></i>
          <input
            type="password"
            class="text-box"
            placeholder="Confirm Password *"
            required
          />
        </div>
        <div class="data-input">
          <i class="fas fa-envelope"></i>
          <input type="email" class="text-box" placeholder="Email *" required />
        </div>
        <button type="submit" class="button">Log in</button>
      </div>
      <div>
        <p>
          Already have an account?
          <router-link to="/login" class="link">Log in</router-link>
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
    height: 450px;
    width: 350px;
    margin-top: auto;
    margin-bottom: auto;
    background-color: whitesmoke;
    color: black;
    border-radius: 20px;
    .logo {
      position: absolute;
      top: 100px;
      height: 170px;
      width: 170px;
      border-radius: 50%;
      background: whitesmoke;
      padding: 10px;
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
    .data {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 5em;
      .data-input {
        display: flex;
        padding: 0.25em;
        margin: 0.55em;
        input {
          outline: none;
          border: 1px solid grey;
          border-radius: 0 0.25rem 0.25rem 0;
          &:focus,
          &:hover {
            border-color: #40abdd;
          }
        }
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
        margin: 1em 0 1.35em 0;
        border-radius: 25px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .link {
      text-decoration: none;
    }
  }
}
</style>
