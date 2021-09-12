<template>
  <i class="fab " :class="getFaIcon(skillName)"> </i>
  <h2>{{ skillName }}</h2>
</template>

<script>
export default {
  props: {
    skillName: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToSkill(skill) {
      this.$router.push({
        name: "Results",
        params: { query: skill.name, page: 1 },
        query: {
          skillId: skill.id,
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
i {
  margin: 2rem 0;
  font-size: 5rem;
}
</style>
