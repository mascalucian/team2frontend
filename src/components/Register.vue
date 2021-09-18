<template>
  <div id="wrapper">
    <Form id="register" :validation-schema="registerSchema">
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
            placeholder="Username *"
          />
        </div>
        <ErrorMessage name="username" class="error-message" />
        <div class="data-input">
          <i class="fas fa-envelope"></i>
          <Field
            class="text-box"
            name="email"
            v-model="email"
            placeholder="Email *"
          />
        </div>
        <ErrorMessage name="email" class="error-message" />
        <div class="data-input">
          <i class="fas fa-key"></i>
          <Field
            class="text-box"
            type="password"
            name="password"
            v-model="password"
            placeholder="Password *"
          />
        </div>
        <ErrorMessage name="password" class="error-message" />
        <div class="data-input">
          <i class="fas fa-key"></i>
          <Field
            class="text-box"
            type="password"
            name="confirmedPassword"
            v-model="confirmedPassword"
            placeholder="Confirm Password *"
          />
        </div>
        <ErrorMessage name="confirmedPassword" class="error-message" />
        <button type="submit" class="button">Sign up</button>
      </div>
      <div id="text">
        <p>
          Already have an account?
          <router-link to="/login" class="link">Log in</router-link>
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
    const registerSchema = yup.object().shape({
      username: yup.string().required("No username provided"),
      email: yup
        .string()
        .email()
        .required("No email provided."),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Must contain: 8 characters, one uppercase, one lowercase, one number, one special case character"
      // ),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    });
    return {
      username: "",
      password: "",
      confirmedPassword: "",
      email: "",
      registerSchema,
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
  #register {
    //overflow-y: scroll;
    font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto,
      segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji,
      segoe ui symbol;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: fit-content;
    width: 350px;
    margin-top: 6em;
    margin-bottom: auto;
    background-color: whitesmoke;
    color: black;
    border-radius: 20px;
    .logo {
      position: relative;
      top: -85px;
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
      position: relative;
      top: -60px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
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
        i {
          background: $l-violet;
          color: white;
          padding: 0.4em;
          border: 0;
          border-radius: 0.25rem 0 0 0.25rem;
        }
      }
      .error-message {
        width: 55%;
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
        margin: 1em 0 0.5em 0;
        border-radius: 25px;
        &:hover {
          cursor: pointer;
          background-color: $d-violet;
        }
      }
    }
    #text {
      position: relative;
      top: -40px;
      p {
        margin: 0;
      }
      .link {
        text-decoration: none;
      }
    }
  }
}
</style>
