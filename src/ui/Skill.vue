<template>
  <div id="wrapper">
    <div id="delete">
      <i
        class="event fas fa-trash-alt fa-lg "
        v-on:click="deleteSkill(skillId)"
      ></i>
    </div>
    <div id="route">
      <i
        class="fab "
        :class="getFaIcon(skillName)"
        @click.stop="goToSkill(skill)"
      >
      </i>
      <div id="skill-name" class="event">
        <input
          type="text"
          v-if="edit"
          v-model="name"
          @keydown.enter="
            editSkill(name, skillId);
            edit = !edit;
          "
        />
        <h2 v-else v-on:click="edit = !edit">
          {{ skillName }}
        </h2>
        <i
          v-if="edit"
          class="fas fa-save fa-lg"
          v-on:click="
            editSkill(name, skillId);
            edit = !edit;
          "
        ></i>
        <i v-else class="fas fa-pen fa-lg" v-on:click="edit = !edit"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      name: this.skillName,
    };
  },
  props: {
    skillName: {
      type: String,
      required: true,
    },
    skillId: {
      required: true,
    },
  },
  methods: {
    deleteSkill(id) {
      this.$emit("delete-skill", id);
    },
    editSkill(name, id) {
      this.$emit("edit-skill", name, id);
    },
    goToSkill() {
      this.$router.push({
        name: "Results",
        params: { query: this.skillName, page: 1 },
        query: {
          skillId: this.skillId,
        },
      });
    },
    getFaIcon(name) {
      let filterName = name.toUpperCase();
      if (
        filterName.indexOf("JAVASCRIPT") > -1 ||
        filterName.indexOf("JS") > -1
      )
        return "fa-js";
      else if (filterName.indexOf("java".toUpperCase()) > -1) return "fa-java";
      else if (filterName.indexOf("amazong".toUpperCase()) > -1)
        return "fa-amazon";
      else if (filterName.indexOf("angular".toUpperCase()) > -1)
        return "fa-angular";
      else if (filterName.indexOf("app store".toUpperCase()) > -1)
        return "fa-app-store";
      else if (
        filterName.indexOf("apple".toUpperCase()) > -1 ||
        filterName.indexOf("mac".toUpperCase()) > -1
      )
        return "fa-apple";
      else if (filterName.indexOf("atlassian".toUpperCase()) > -1)
        return "fa-atlassian";
      else if (filterName.indexOf("bitbucket".toUpperCase()) > -1)
        return "fa-bitbucket";
      else if (filterName.indexOf("bootstrap".toUpperCase()) > -1)
        return "fa-bootstrap";
      else if (filterName.indexOf("css".toUpperCase()) > -1)
        return "fa-css3-alt";
      else if (filterName.indexOf("docker".toUpperCase()) > -1)
        return "fa-docker";
      else if (filterName.indexOf("figma".toUpperCase()) > -1)
        return "fa-figma";
      else if (filterName.indexOf("github".toUpperCase()) > -1)
        return "fa-github";
      else if (filterName.indexOf("gitkraken".toUpperCase()) > -1)
        return "fa-gitkraken";
      else if (filterName.indexOf("gitlab".toUpperCase()) > -1)
        return "fa-gitlab";
      else if (filterName.indexOf("git".toUpperCase()) > -1)
        return "fa-git-alt";
      else if (filterName.indexOf("html".toUpperCase()) > -1) return "fa-html5";
      else if (filterName.indexOf("jenkins".toUpperCase()) > -1)
        return "fa-jenkins";
      else if (filterName.indexOf("jira".toUpperCase()) > -1) return "fa-jira";
      else if (filterName.indexOf("less".toUpperCase()) > -1) return "fa-less";
      else if (filterName.indexOf("node".toUpperCase()) > -1) return "fa-node";
      else if (filterName.indexOf("php".toUpperCase()) > -1) return "fa-php";
      else if (filterName.indexOf("python".toUpperCase()) > -1)
        return "fa-python";
      else if (filterName.indexOf("raspberry pi".toUpperCase()) > -1)
        return "fa-raspberry-pi";
      else if (filterName.indexOf("react".toUpperCase()) > -1)
        return "fa-react";
      else if (filterName.indexOf("rust".toUpperCase()) > -1) return "fa-rust";
      else if (filterName.indexOf("sass".toUpperCase()) > -1) return "fa-sass";
      else if (filterName.indexOf("sourcetree".toUpperCase()) > -1)
        return "fa-sourcetree";
      else if (filterName.indexOf("unity".toUpperCase()) > -1)
        return "fa-unity";
      else if (filterName.indexOf("vue".toUpperCase()) > -1) return "fa-vuejs";
      else if (filterName.indexOf("wordpress".toUpperCase()) > -1)
        return "fa-wordpress";
      else if (filterName.indexOf("sql".toUpperCase()) > -1)
        return "fas fa-database";
      else if (filterName.indexOf("backend".toUpperCase()) > -1)
        return "fas fa-terminal";
      else if (filterName.indexOf("frontend".toUpperCase()) > -1)
        return "far fa-window-maximize";
      return "fas fa-pencil-alt";
    },
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  #delete {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    i {
      margin: 0.45em 0.75em 0 0;
    }
  }
  #route {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .fab {
      margin: 3rem 0 1.5rem 0;
      font-size: 5rem;
    }
    #skill-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      h2 {
        padding-right: 0.5em;
      }
    }
  }
  .event {
    position: relative;
    &:hover {
      cursor: wait;
    }
  }
}
</style>
