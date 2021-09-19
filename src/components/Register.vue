<template>
  <div id="wrapper">
    <Form id="register" v-slot="{ handleSubmit }" :validation-schema="registerSchema">
      <form action="#" @submit.prevent="handleSubmit($event, register)">
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
            <ErrorMessage name="username" class="error-message" />
          </div>

          <div class="data-input">
            <i class="fas fa-envelope"></i>
            <Field class="text-box" name="email" v-model="email" placeholder="Email *" />
            <ErrorMessage name="email" class="error-message" />
          </div>
          <div class="data-input">
            <i class="fas fa-key"></i>
            <Field
              class="text-box pass"
              v-bind:type="[showPassword ? 'text' : 'password']"
              name="password"
              v-model="password"
              placeholder="Password *"
            />
            <ErrorMessage name="password" class="error-message" />
            <i
              class="fa eye"
              :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
              aria-hidden="true"
              v-on:click="showPassword = !showPassword"
            ></i>
          </div>

          <div class="data-input">
            <i class="fas fa-key"></i>
            <Field
              class="text-box pass"
              v-bind:type="[showConfirmedPassword ? 'text' : 'password']"
              name="confirmedPassword"
              v-model="confirmedPassword"
              placeholder="Confirm Password *"
            />
            <ErrorMessage name="confirmedPassword" class="error-message" />
            <i
              class="fa eye"
              :class="[showConfirmedPassword ? 'fa-eye' : 'fa-eye-slash']"
              aria-hidden="true"
              v-on:click="showConfirmedPassword = !showConfirmedPassword"
            ></i>
          </div>

          <button type="submit" class="button">Sign up</button>
          <div id="loaderWrapper" ref="loaderWrapper" class="vld-parent">
            <div v-if="message && !loader" :class="isMessageError ? 'error' : 'success'">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>

        <div id="text">
          <p>
            Already have an account?
            <router-link to="/login" class="link">Log in</router-link>
          </p>
        </div>
      </form>
    </Form>
  </div>
</template>

<script lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import { mapGetters } from "vuex";
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
      email: yup.string().email("Email format is invalid").required("No email provided."),
      password: yup
        .string()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password needs: 8 characters, one uppercase, one number, one special character"
        ),
      confirmedPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password."),
    });
    return {
      username: "",
      password: "",
      confirmedPassword: "",
      email: "",
      showPassword: false,
      showConfirmedPassword: false,
      message: "",
      isMessageError: false,
      registerSchema,
      loader: undefined,
    };
  },
  computed: {
    ...mapGetters(
      ["isLoggedin", "getErrorMessage"] // -> this.someGetter
    ),
  },
  methods: {
    async register() {
      this.loader = this.$loading.show({
        container: this.$refs.loaderWrapper,
        isFullPage: false,
        backgroundColor: "none",
        loader: "bars",
      });
      this.$store.commit("setErrorMessage", "");
      await this.$store.dispatch("register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      this.loader.hide();
      this.loader = undefined;
      if (this.getErrorMessage) {
        this.message = this.getErrorMessage;
        this.isMessageError = true;
        return;
      }
      this.message = "Success!";
      this.isMessageError = false;
      await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      setTimeout(() => {
        if (this.$route.params.returnUrl)
          this.$router.push({ path: this.$route.params.returnUrl });
        else this.$router.push({ name: "Home" });
      }, 2000);
    },
  },
  unmounted() {
    this.$store.commit("setErrorMessage", "");
  },
  created() {
    if (this.isLoggedin) {
      this.$router.go(-1);
    }
  },
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
    height: fit-content;
    width: 25em;
    margin-top: 6em;
    margin-bottom: auto;
    background-color: whitesmoke;
    color: black;
    border-radius: 20px;
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
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
      top: -70px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
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
        // width: 65%;
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
        margin: 1.2em 0 0.5em 0;
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

.error {
  color: red;
}
.success {
  color: green;
}
.error,
.success {
}

@media screen and (max-width: 925px) {
  #wrapper {
    margin-top: 5em;
  }
}
@media screen and (max-width: 653px) {
  #wrapper {
    margin-top: 10em;
  }
}

input {
  z-index: 10 !important;
}

.vld-parent {
  height: 2rem;
  z-index: 10 !important;
  width: 100%;
  padding: 0 4rem;
  text-align: center;
}
</style>
