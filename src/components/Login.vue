<template>
  <div id="wrapper">
    <Form id="login" :validation-schema="loginSchema">
      <router-link to="/" class="logo">
        <img class="logo-img" src="../assets/udemi.png" />
      </router-link>
      <div class="data">
        <div class="data-input">
          <i class="fas fa-user"></i>
          <Field
            class="text-box"
            name="username"
            type="text"
            v-model="username"
            placeholder="Username"
          />
          <ErrorMessage name="username" class="error-message" />
        </div>

        <div class="data-input">
          <i class="fas fa-key"></i>
          <Field
            class="text-box pass"
            name="password"
            v-bind:type="[showPassword ? 'text' : 'password']"
            v-model="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" class="error-message" />
          <i
            class="fa eye"
            :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
            aria-hidden="true"
            v-on:click="showPassword = !showPassword"
          ></i>
        </div>

        <button type="submit" class="button">Log in</button>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link to="/register" class="link">Sign up</router-link>
        </p>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
// import axios from "axios";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    const loginSchema = yup.object().shape({
      username: yup.string().required("No username provided"),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    });
    return {
      username: "",
      password: "",
      showPassword: false,
      loginSchema,
    };
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
  background-color: $d-violet;
  #login {
    font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
      segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
      segoe ui symbol;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: fit-content;
    width: 25em;
    margin-top: auto;
    margin-bottom: auto;
    background-color: whitesmoke;
    color: black;
    border-radius: 20px;
    .logo {
      position: absolute;
      top: 145px;
      height: 170px;
      width: 170px;
      border-radius: 50%;
      background: whitesmoke;
      padding: 10px;
      display: flex;
      align-items: center;
      border: 10px solid $d-violet;
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
        justify-content: center;
        padding: 0.75em;
        margin: 0.55em;
        input {
          width: 15em;
          outline: none;
          border: 1px solid grey;
          border-radius: 0 0.25rem 0.25rem 0;
          &:focus,
          &:focus + .eye,
          &:hover,
          &:hover + .eye {
            border-color: #40abdd;
          }
        }
        i {
          background: $l-violet;
          color: white;
          padding: 0.4em;
          border: 0;
          border-radius: 0.25rem 0 0 0.25rem;
        }
        .eye {
          background-color: white;
          color: rgb(168, 167, 167);
          border: 1px solid grey;
          border-left: none;
          border-radius: 0 0.25rem 0.25rem 0;
          &:focus,
          &:hover {
            border-color: #40abdd;
          }
        }
        .fa-eye-slash {
          padding: 6.4px 5px;
        }
        .pass {
          width: 13em;
          border-right: none;
          border-radius: 0;
        }
      }
      .error-message {
        position: absolute;
        margin-top: 3em;
        font-size: 13px;
        text-align: center;
        color: rgb(228, 11, 11);
      }
      .button {
        background-color: $l-violet;
        border: none;
        color: white;
        font-weight: 600;
        padding: 0.75em 1.5em;
        margin: 1em 0 1.35em 0;
        border-radius: 25px;
        &:hover {
          cursor: pointer;
          background-color: $d-violet;
        }
      }
    }
    .link {
      text-decoration: none;
    }
  }
}
</style>
