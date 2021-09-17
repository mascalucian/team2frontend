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
            v-model="username"
            placeholder="Username"
          />
        </div>
        <ErrorMessage name="username" />
        <div class="data-input">
          <i class="fas fa-key"></i>
          <Field
            class="text-box"
            name="password"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <ErrorMessage name="password" />
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
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6)
        .max(25),
    });
    return {
      username: "",
      password: "",
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
  background-color: #838bc5;
  #login {
    font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
      segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
      segoe ui symbol;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 370px;
    width: 350px;
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
