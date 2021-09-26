<template>
  <main>
    <BaseDialog v-if="showDialog" @close="closeDialog()">
      <template v-slot:header>
        <h1 class="modal-heading">{{ selectedParentSkill.name }} skillset</h1>
      </template>
      <template v-slot:body>
        <EditSkills
          :parent="selectedParentSkill"
          :parentSkills="selectedParentSkills"
        ></EditSkills>
      </template>
    </BaseDialog>
    <header>
      <h1>
        {{ !parent ? "Skillsets" : "Skills for " + parent.name }}
      </h1>
      <div id="add-skill">
        <h3>
          Add
          {{ !parent ? "skillset" : "skill" }}
        </h3>
        <form @submit.prevent="addSkill()">
          <input type="text" v-model="newSkill" @keyup.escape="newSkill = ''" />
          <div class="error-parent">
            <input type="submit" value="Submit" :disabled="!newSkill" />
            <p>{{ errorMessage }}</p>
          </div>
        </form>
      </div>

      <h4>
        Recommended {{ !parent ? "skillsets" : "skills" }} for
        {{ !parent ? "our company" : parent.name }}
      </h4>
    </header>

    <section class="vld-parent">
      <loading
        v-model:active="isLoading"
        :is-full-page="false"
        :background-color="'none'"
      ></loading>
      <Skill
        v-for="(skill, index) in parent ? skills : skillParents"
        :key="skill.id"
        :skill="skill"
        @delete-skill="deleteSkill"
        @edit-skill="editSkill"
        @select="select"
        :index="index"
      />
      <h3 v-if="skills.length == 0" class="empty-message">
        There are no skills currently available.
      </h3>
    </section>
  </main>
</template>

<script>
import { inject } from "vue";
import { useSignalR } from "@quangdao/vue-signalr";
import Skill from "../ui/Skill.vue";
import BaseDialog from "../ui/BaseDialog.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
// import { mapGetters } from "vuex";

export default {
  components: {
    Skill,
    Loading,
    BaseDialog,
  },
  data() {
    return {
      newSkill: "",
      skills: [],
      isLoading: true,
      errorMessage: "",
      skillParents: [],
      showDialog: false,
      selectedParentSkill: undefined,
      selectedParentSkills: [],
    };
  },
  // computed: {
  //   ...mapGetters(["isAdmin"]),
  // },
  props: {
    parent: {
      type: Object,
      required: false,
      default: undefined,
    },
    parentSkills: {
      type: Array,
      required: false,
    },
  },
  methods: {
    addSkill() {
      this.errorMessage = "";
      this.$http
        .post("/Skills", {
          name: this.newSkill,
          parentId: this.parent?.id || 0,
        })
        .then(() => {
          this.newSkill = "";
        })
        .catch((error) => {
          this.errorMessage = "Invalid skill name.";
        });
    },
    select(skill) {
      if (skill.parentId == 0) {
        this.selectedParentSkill = skill;
        this.selectedParentSkills = this.skills.filter((_) => _.parentId == skill.id);
        this.showDialog = true;
      }
    },
    closeDialog() {
      this.selectedParentSkill = undefined;
      this.selectedParentSkills = this.selectedParentSkills.splice(0);
      this.showDialog = false;
    },
    deleteSkill(id) {
      this.$http
        .delete(`/Skills/${id}`)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    editSkill(name, id) {
      console.log(name + id);
      this.$http
        .put(`/Skills/${id}`, {
          id: id,
          name: name,
          parentId: this.parent?.id || 0,
        })
        .then(() => {
          // this.fetchSkills();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchSkills() {
      this.skills = this.skills.splice(0);
      if (this.parent) {
        this.skills = this.skills.splice(0);
        this.skills = this.parentSkills;
        this.isLoading = false;
      } else {
        this.isLoading = true;
        this.$http
          .get("/Skills")
          .then((response) => {
            this.isLoading = false;
            this.skills = response.data;
            this.skillParents = this.skills.filter((_) => _?.parentId == 0);
          })
          .catch((error) => {
            this.isLoading = false;
            console.log(error);
          });
      }
    },
  },
  created() {
    this.fetchSkills();
    const signalr = useSignalR();
    signalr.on("SkillCreated", (data) => {
      if (!this.parent) {
        if (data.parentId == 0) this.skillParents.push(data);
        //parent skill added
        else this.skills.push(data); //subskill added in another parent
      } else if (data.parentId == this.parent?.id) this.skills.push(data); //subskill added in current parent
    });
    signalr.on("SkillUpdated", (data) => {
      if (!this.parent) {
        if (data.parentId == 0) {
          let index = this.skillParents.findIndex((_) => _.id == data.id);
          this.skillParents[index] = data;
          this.skillParents.push(this.skillParents.splice(index, 1)[0]);
        }
        //parent skill added
        else {
          let index = this.skills.findIndex((_) => _.id == data.id);
          this.skills[index] = data;
          this.skills.push(this.skills.splice(index, 1)[0]);
        }
      } else if (data.parentId == this.parent?.id) {
        let index = this.skills.findIndex((_) => _.id == data.id);
        this.skills[index] = data;
        this.skills.push(this.skills.splice(index, 1)[0]);
      } //subskill added in current parent
    });
    signalr.on("SkillDeleted", (data) => {
      if (!this.parent) {
        if (data.parentId == 0) {
          let index = this.skillParents.findIndex((_) => _.id == data.id);
          this.skillParents.splice(index, 1);
        }
        //parent skill added
        else {
          let index = this.skills.findIndex((_) => _.id == data.id);
          this.skills.splice(index, 1);
        } //subskill added in another parent
      } else if (data.parentId == this.parent?.id) {
        let index = this.skills.findIndex((_) => _.id == data.id);
        this.skills.splice(index, 1);
      } //subskill added in current parent
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
form {
  display: flex;
  flex-direction: row;
  align-items: center;
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

.error-parent {
  position: relative;
  p {
    position: absolute;
    bottom: -1.5rem;
    width: 150%;
    text-align: center;
    color: red;
    margin: 0;
    font-size: small;
  }
}

.modal-heading {
  background-color: $c-u-bl;
  color: white;
  font-family: $f-u-bm;
  margin: 0;
  padding: 2rem 0 1rem 2rem;
}

.empty-message {
  color: $c-u-bl;
  font-family: $f-u-bm;
  text-align: center;
  padding: 2rem 0;
}
</style>
