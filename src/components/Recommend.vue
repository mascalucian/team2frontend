<template>
  <div class="wrapper">
    <div class="bigcontainer">
      <div class="icon">
        <i class="fas fa-thumbs-up"></i>
      </div>

      <div class="title">
        <h1>
          How would you rate the course: <em>{{ recomandation.courseTitle }}</em
          >?
        </h1>
      </div>
      <div class="stars">
        <Form v-slot="{ handleSubmit }" :validation-schema="recommendationSchema">
          <form
            id="feedback-form"
            @submit.prevent="handleSubmit($event, submit)"
            class="formflex"
          >
            <div class="star-parent">
              <input
                class="star star-5"
                id="star-5"
                type="radio"
                name="star"
                value="5"
                v-model="picked"
              />
              <label class="star star-5" for="star-5"></label>
              <input
                class="star star-4"
                id="star-4"
                type="radio"
                name="star"
                value="4"
                v-model="picked"
              />
              <label class="star star-4" for="star-4"></label>
              <input
                class="star star-3"
                id="star-3"
                type="radio"
                name="star"
                value="3"
                v-model="picked"
              />
              <label class="star star-3" for="star-3"></label>
              <input
                class="star star-2"
                id="star-2"
                type="radio"
                name="star"
                value="2"
                v-model="picked"
              />
              <label class="star star-2" for="star-2"></label>
              <input
                class="star star-1"
                id="star-1"
                type="radio"
                name="star"
                value="1"
                v-model="picked"
              />
              <label class="star star-1" for="star-1"></label>
            </div>
            <div class="inputbox">
              <label for="feedback">Feedback: </label>
              <Field v-slot="{ field }" name="feedback" v-model="recomandation.feedback">
                <textarea v-bind="field" autofocus></textarea>
              </Field>
              <ErrorMessage name="feedback" />
            </div>

            <div class="submit-parent">
              <input type="submit" class="submitbtn" value="Recommend course" />
              <div class="message" :class="isError ? 'error' : 'success'">
                {{ message }}
              </div>
              <div class="vld-parent loader-parent">
                <loading
                  v-model:active="isLoading"
                  :is-full-page="false"
                  :background-color="'none'"
                  :loader="'bars'"
                  :height="50"
                  :width="50"
                  :color="'#5624d0'"
                ></loading>
              </div>
            </div></form
        ></Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "../services/auth.service.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    const recommendationSchema = yup.object({
      feedback: yup
        .string()
        .min(5, "Please enter at least 5 characters.")
        .max(100, "Maximum lenght is 100 characters.")
        .required("Feedback is required."),
    });
    return {
      picked: 1,
      message: "",
      recomandation: {
        feedback: "",
        rating: 5,
        courseId: undefined,
        skillId: undefined,
        courseTitle: this.$route.query.courseTitle || undefined,
      },
      userProfile: null,
      isLoading: false,
      isError: false,
      recommendationSchema,
    };
  },
  components: {
    Loading,
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    submit() {
      this.isError = false;
      this.isLoading = true;
      this.$http
        .post(`/Recomandations`, {
          courseId: this.recomandation.courseId,
          courseTitle: this.recomandation.courseTitle,
          userName: this.userProfile.name,
          feedback: this.recomandation.feedback,
          rating: this.picked,
          skillId: this.recomandation.skillId,
          userId: this.userProfile?.sub,
        })
        .then(() => {
          console.log(this.recomandation);
          this.message = "Recommended successfully!";
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        })
        .catch((error) => {
          this.message = error;
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  async created() {
    this.userProfile = await AuthService.getProfile();
    this.recomandation.courseId = this.$route.params.courseId;
    this.recomandation.skillId = this.$route.query.skillId;
    this.recomandation.courseTitle = this.$route.query.courseTitle;
    console.log(this.$route.query);
  },
};
</script>

<style scoped lang="scss">
[role="alert"] {
  width: 100%;
  color: rgba(255, 0, 0, 0.74);
  display: block;
  text-align: center;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  font-size: 1rem;
  line-height: 2rem;
  font-family: $f-u-bm;
  font-weight: bolder;
}

.loader-parent {
  width: 100%;
  height: 60px !important;
  position: relative;
}

.submit-parent {
  flex-grow: 1;
  width: 100%;
  text-align: center;
  position: relative;
}
.star-parent {
  background: $c-pur1;
  padding: 2rem 4rem;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  border: 0;
  font-size: 1rem;
}
.formflex {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.wrapper {
  // aspect-ratio: 2/1;
  width: 100%;
  display: flex;
  justify-content: center;
  color: black;
  padding: 5rem;
  flex-grow: 1;
  background-repeat: no-repeat;
  background-position: fixed;
  background-size: contain;
  background-image: url("../assets/svg/background-waves.svg");
  background-color: black;
}
.bigcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
  background-color: white;
  border-radius: 20px;
  margin: auto;
  padding: 2rem;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    text-align: center;
    word-wrap: break-word;
    padding: 2rem 4rem;
  }
  margin-bottom: 1rem;
}
.submitbtn {
  padding: 20px;
  background-color: #e59819;
  border: none;
  color: white;
  font-family: $f-u-bm;
  color: white;
  border-radius: 30px;
  padding: 0.3rem 1.5rem;
  vertical-align: center;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.7rem;
  box-shadow: 0px 1px 5px #888888;
  &:hover,
  :active,
  :focus-visible {
    box-shadow: 0 2px 7px 4px rgb(0 0 0 / 26%);
    background-color: yellowgreen;
  }
  &:disabled {
    background-color: transparent !important;
    box-shadow: inherit !important;
    color: gray !important;
    cursor: default;
  }
}
.inputbox {
  min-width: 300px;
  width: 40vw;
  padding: 2rem 0;
  padding-bottom: 3rem;
  position: relative;
  label {
    font-size: larger;
    font-family: $f-u-bm;
    font-weight: bolder;
  }
  textarea {
    margin-top: 0.5rem !important;
    display: block;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    max-height: 10rem;
    min-height: 5rem;
    font-family: $f-u-bm;
    font-size: large;
    padding: 0.5rem;
    border-radius: 5px;
  }
}

div.stars {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

input.star {
  display: none;
}

label.star {
  float: right;
  padding: 5px;
  font-size: 36px;
  color: white;
  transition: all 0.2s;
}

input.star:checked ~ label.star:before {
  content: "\f005";
  color: #e59819;
  transition: all 0.25s;
}

input.star-5:checked ~ label.star:before {
  color: #e59819;
  text-shadow: 0 0 20px #952;
}

input.star-1:checked ~ label.star:before {
  color: #e59819;
}

label.star:hover {
  transform: rotate(-15deg) scale(1.3);
}

label.star:before {
  content: "\f006";
  font-family: FontAwesome;
}

.icon {
  margin-top: 2rem;
  color: $c-pur1;
  font-size: 6rem;
  i {
    line-height: 8rem;
  }
}

.message {
  font-size: 2rem;
  width: 100%;
  padding: 1rem;
  height: 2rem;
  &:empty {
    height: 2rem !important;
  }
}

.success {
  color: forestgreen;
}
.error {
  color: maroon;
}
@media screen and (max-width: 600px) {
  .wrapper {
    padding: 2rem 0;
  }
  .bigcontainer {
    padding: 1rem;
    width: 87%;
  }
  .title > h1 {
    padding: 5% 5%;
    font-size: large;
  }
  .star-parent {
    padding: 5%;
  }
}
</style>
