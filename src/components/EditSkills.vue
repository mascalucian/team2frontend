<template>
  <main>
    <header>
      <h1>Skills</h1>
      <div id="add-skill">
        <h3>Add skill:</h3>
        <form @submit.prevent="addSkill()">
          <input type="text" v-model="newSkill" @keyup.escape="newSkill = ''" />
          <input type="submit" value="Submit" :disabled="!newSkill" />
        </form>
      </div>

      <h4>Recommended skills for our company:</h4>
    </header>

    <section class="vld-parent">
      <loading
        v-model:active="isLoading"
        :is-full-page="false"
        :background-color="'none'"
      ></loading>
      <article v-for="skill in skills" :key="skill.id">
        <Skill
          v-bind:skillName="skill.name"
          v-bind:skillId="skill.id"
          @delete-skill="deleteSkill"
          @edit-skill="editSkill"
        />
      </article>
    </section>
  </main>
</template>

<script>
import { inject } from "vue";
import { useSignalR } from "@quangdao/vue-signalr";
import Skill from "../ui/Skill.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Skill,
    Loading,
  },
  data() {
    return {
      newSkill: "",
      skills: [],
      isLoading: true,
    };
  },
  setup() {},
  methods: {
    addSkill() {
      this.$http
        .post("/Skills", {
          name: this.newSkill,
        })
        .then(() => {
          this.newSkill = "";
          this.fetchSkills();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteSkill(id) {
      var canDelete = confirm("Are you sure you want to delete the skill?");
      if (canDelete) {
        this.$http
          .delete(`/Skills/${id}`)
          .then(() => {
            this.fetchSkills();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    editSkill(name, id) {
      this.$http
        .put(`/Skills/${id}`, {
          id: id,
          name: name,
        })
        .then(() => {
          this.fetchSkills();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchSkills() {
      this.skills = this.skills.splice(0);
      this.isLoading = true;
      this.$http
        .get("/Skills")
        .then((response) => {
          this.isLoading = false;
          this.skills = response.data;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
  created() {
    this.fetchSkills();
    const signalr = useSignalR();
    signalr.on("SkillCreated", (data) => {
      this.skills.push(data);
    });
    signalr.on("SkillUpdated", (data) => {
      let index = this.skills.findIndex((_) => _.id == data.id);
      this.skills[index] = data;
      this.skills.push(this.skills.splice(index, 1)[0]);
    });
    signalr.on("SkillDeleted", (data) => {
      let index = this.skills.findIndex((_) => _.id == data.id);
      this.skills.splice(index, 1);
    });
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: $c-u-bl;
  color: white;
  font-family: $f-u-bm;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: $f-u-bm;
    margin: 0;
    margin-left: 2rem;
  }
  h1 {
    padding: 2rem 0 1rem 0;
  }
  h3 {
    padding-right: 0.5em;
  }
  h4 {
    padding: 1rem 0;
  }
  #add-skill {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
article {
  width: 20rem;
  background-color: $c-u-pur;
  color: white;
  margin: 3%;
  text-align: center;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 11px 1px rgb(0 0 0 / 26%);
  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 7px 4px rgb(0 0 0 / 26%);
    background-color: $c-u-bl;
  }
  h2 {
    font-size: xx-large;
    font-weight: bolder;
  }
}

form {
  input[type="text"] {
    height: 2rem;
    border-radius: 25px;
    outline: none;
    text-indent: 1rem;
  }
  input[type="submit"] {
    margin-left: 3rem;
    height: 2rem;
    border-radius: 25px;
    font-family: $f-u-bm;
    padding: 0 1rem;
    background-color: $c-u-pur;
    color: white;
    border: 0;
    box-shadow: 0 2px 11px 1px rgb(0 0 0 / 26%);
    cursor: pointer;
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
}
</style>
