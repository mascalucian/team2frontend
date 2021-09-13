<template>
  <main>
    <header>
      <h1>
        Skills
      </h1>
      <div id="add-skill">
        <h3>
          Add skill:
        </h3>
        <form v-on:submit="addSkill()">
          <input type="text" v-model="newSkill" />
        </form>
      </div>

      <h4>Recommended skills for our company:</h4>
    </header>

    <section>
      <article v-for="skill in testSkills" :key="skill.id">
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
import Skill from "../ui/Skill.vue";

export default {
  components: {
    Skill,
  },
  data() {
    return {
      newSkill: "",
      testSkills: [
        {
          id: 1,
          name: "Javascript",
        },
        {
          id: 2,
          name: "Docker",
        },
        {
          id: 3,
          name: "Angular",
        },
        {
          id: 4,
          name: "Node",
        },
        {
          id: 5,
          name: "Java Tips",
        },
        {
          id: 6,
          name: "CSS",
        },
        {
          id: 7,
          name: "SQL",
        },
      ],
    };
  },
  methods: {
    addSkill() {
      var id = this.testSkills.length + 1;
      var name =
        this.newSkill.charAt(0).toUpperCase() +
        this.newSkill.toLowerCase().slice(1);
      this.testSkills.push({ id, name });
      this.newSkill = "";
      console.log(this.testSkills);
    },
    deleteSkill(id) {
      var canDelete = confirm("Are you sure you want to delete the skill?");
      if (canDelete) {
        var skillObj = this.testSkills.find((skill) => skill.id === id);
        this.testSkills.splice(this.testSkills.indexOf(skillObj), 1);
        console.log(skillObj);
      }
    },
    editSkill(name, id) {
      var skillToEdit = this.testSkills.find((skill) => skill.id === id);
      var index = this.testSkills.indexOf(skillToEdit);
      this.testSkills[index].name = name;
      console.log(name);
      console.log(index);
      console.log(skillToEdit);
      console.log(this.testSkills);
    },
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
</style>
