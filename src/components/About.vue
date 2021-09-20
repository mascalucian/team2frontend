<template>
  <main>
    <header>
      <h1>Welcome to UDEMI. The best Udemy search engine.</h1>
      <h3>
        Currently running API on
        <strong>{{ apiVersion.toLowerCase() || "🐮" }}</strong>
      </h3>
    </header>
    <section>
      <header>
        <h4>
          Developed using ASP.Net, Entity Framework, VueJS 3, Visual Studio 2019, Visual
          Studio Code, PostgreSQL, Heroku and Docker.
        </h4>
      </header>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      apiVersion: undefined,
    };
  },
  created() {
    this.$http.get("/api/Health").then((response) => {
      this.apiVersion = response.data.version;
    });
  },
};
</script>

<style lang="scss" scoped>
main > header {
  background-color: $c-u-bl;
  color: white;
  font-family: $f-u-bm;
  margin: 0 !important;
  padding: 2rem 0;
  text-align: center;
}
strong {
  color: $c-u-pur;
}
section {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > header {
    width: 50%;
    color: black;
    font-weight: bold;
    font-size: 1.5rem !important;
    text-align: center;
    line-height: 300%;
  }
}
</style>
