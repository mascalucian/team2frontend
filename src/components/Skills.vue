<template>
  <main>
    <header>
      <h1>Skills</h1>
      <h4>Recommended skills for our company:</h4>
    </header>
    <section>
      <article
        v-for="skill in testSkills"
        :key="skill.id"
        @click.stop="goToSkill(skill)"
      >
        <i class="fab " :class="getFaIcon(skill.name)"> </i>
        <h2>{{ skill.name }}</h2>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      testSkills: [
        {
          id: 1,
          name: "Javascript",
        },
        {
          id: 2,
          name: "PHP",
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
          name: "Java",
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
  h4 {
    padding: 1rem 0;
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
  i {
    margin: 2rem 0;
    font-size: 5rem;
  }
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
