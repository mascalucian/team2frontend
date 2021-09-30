<template>
  <div class="wrapper">
    <div class="bigcontainer">
      <div class="title">
        <h1>How would you rate the course?</h1>
      </div>
      <div class="stars">
        <form id="feedback-form" @submit.prevent="submit()" class="formflex">
          <div>
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
            <input type="text" name="feedback" v-model="recomandation.feedback" />
          </div>

          <div class="stars">
            <button
              class="submitbtn"
              :disabled="
                recomandation.authorName == '' ||
                recomandation.feedback == '' ||
                message != ''
              "
            >
              Recommend course
            </button>
            <h3 v-if="message" class="success">{{ message }}</h3>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/auth.service.js";

export default {
  data() {
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
    };
  },
  methods: {
    submit() {
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
          console.log(error);
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
  display: flex;
  justify-content: center;
  color: white;
  height: 100%;
}
.bigcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
  height: 90%;
  min-width: 400px;
  background-color: #5624d0;
  border-radius: 20px;
  margin: auto;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
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
  margin-top: 10px;
  margin-bottom: 10px;
}

div.stars {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  position: relative;
  .success {
    position: absolute;
    bottom: -4rem;
    color: yellowgreen;
    font-size: 1.5rem;
  }
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
</style>
