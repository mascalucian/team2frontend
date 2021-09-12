<template>
  <main>
    <header>
      <h1>Skills</h1>
      <h4>Recommended skills for our company:</h4>
    </header>
    <section>
      <article v-for="skill in testSkills" :key="skill.id">
        <h4>Icon Placeholder</h4>
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
          name: "Java",
        },
        {
          id: 3,
          name: "Angular",
        },
        {
          id: 4,
          name: "Node",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: 20rem;
}
</style>
