<template>
  <div
    id="wrapper"
    @mouseenter="isAdmin ? (showButtons = true) : ''"
    @mouseleave="
      isAdmin ? ((showButtons = false), cancelEdit(), (deleteConfirm = false)) : ''
    "
    @keyup.escape="cancelEdit()"
  >
    <div id="delete" :style="[!showButtons ? { visibility: 'hidden' } : '']">
      <i
        :style="[deleteConfirm ? { visibility: 'hidden' } : '']"
        class="event fas fa-trash-alt fa-lg"
        @click.stop.prevent="/*deleteSkill(skill.Id)*/ deleteConfirm = true"
      ></i>
      <div :class="[deleteConfirm ? 'show' : '']" class="delete-confirm">
        Delete skill?
        <i class="fas fa-times fa-lg" @click.stop.prevent="deleteConfirm = false"></i>
        <i class="fas fa-check fa-lg" @click.stop.prevent="deleteSkill()"></i>
      </div>
    </div>
    <div id="route">
      <i
        class="fab"
        :class="getFaIcon(skill.name)"
        @click.stop="goToSkill(skill)"
        :style="dropDelay"
      >
      </i>
      <div id="skill-name" class="event">
        <input
          ref="nameInput"
          type="text"
          v-if="edit"
          v-model="name"
          @keydown.enter="editSkill()"
          @keyup.escape="cancelEdit()"
        />
        <h2 v-else>
          {{ skill.name }}
        </h2>
        <i
          v-if="!edit"
          class="fas fa-pen fa-lg"
          @click="startEdit()"
          :style="[!showButtons ? { visibility: 'hidden' } : '']"
        ></i>
        <i
          v-if="edit"
          id="save-button"
          class="fas fa-save fa-lg"
          @click="editSkill(name, skill.Id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      edit: false,
      name: this.skill.name,
      showButtons: false,
      dropDelay: `--order: ${this.index}`,
      deleteConfirm: false,
    };
  },
  props: {
    skill: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isAdmin"]),
  },
  methods: {
    deleteSkill() {
      this.$emit("delete-skill", this.skill.id);
    },
    editSkill() {
      this.edit = false;
      this.$emit("edit-skill", this.name, this.skill.id);
    },
    goToSkill() {
      if (this.skill.parentId == 0) {
        this.$emit("select", this.skill);
      } else {
        console.log(this.skill);
        this.$router.push({
          name: "Results",
          params: { query: this.skill.name, page: 1 },
          query: {
            skillId: this.skill.id,
          },
        });
      }
    },

    startEdit() {
      this.edit = true;
      this.$nextTick(() => {
        const input = this.$refs.nameInput;
        input.focus();
      });
    },
    cancelEdit() {
      this.name = this.skill.name;
      this.edit = false;
    },
    getFaIcon(name) {
      let filterName = name.toUpperCase();
      if (filterName.indexOf("JAVASCRIPT") > -1 || filterName.indexOf("JS") > -1)
        return "fa-js";
      else if (filterName.indexOf("java".toUpperCase()) > -1) return "fa-java";
      else if (filterName.indexOf("amazong".toUpperCase()) > -1) return "fa-amazon";
      else if (filterName.indexOf("android".toUpperCase()) > -1) return "fa-android";
      else if (filterName.indexOf("angular".toUpperCase()) > -1) return "fa-angular";
      else if (filterName.indexOf("app store".toUpperCase()) > -1) return "fa-app-store";
      else if (
        filterName.indexOf("apple".toUpperCase()) > -1 ||
        filterName.indexOf("mac".toUpperCase()) > -1
      )
        return "fa-apple";
      else if (filterName.indexOf("atlassian".toUpperCase()) > -1) return "fa-atlassian";
      else if (filterName.indexOf("bitbucket".toUpperCase()) > -1) return "fa-bitbucket";
      else if (filterName.indexOf("bootstrap".toUpperCase()) > -1) return "fa-bootstrap";
      else if (filterName.indexOf("css".toUpperCase()) > -1) return "fa-css3-alt";
      else if (filterName.indexOf("docker".toUpperCase()) > -1) return "fa-docker";
      else if (filterName.indexOf("figma".toUpperCase()) > -1) return "fa-figma";
      else if (filterName.indexOf("github".toUpperCase()) > -1) return "fa-github";
      else if (filterName.indexOf("gitkraken".toUpperCase()) > -1) return "fa-gitkraken";
      else if (filterName.indexOf("gitlab".toUpperCase()) > -1) return "fa-gitlab";
      else if (filterName.indexOf("git".toUpperCase()) > -1) return "fa-git-alt";
      else if (filterName.indexOf("html".toUpperCase()) > -1) return "fa-html5";
      else if (filterName.indexOf("jenkins".toUpperCase()) > -1) return "fa-jenkins";
      else if (filterName.indexOf("jira".toUpperCase()) > -1) return "fa-jira";
      else if (filterName.indexOf("less".toUpperCase()) > -1) return "fa-less";
      else if (filterName.indexOf("node".toUpperCase()) > -1) return "fa-node";
      else if (filterName.indexOf("php".toUpperCase()) > -1) return "fa-php";
      else if (filterName.indexOf("python".toUpperCase()) > -1) return "fa-python";
      else if (filterName.indexOf("raspberry pi".toUpperCase()) > -1)
        return "fa-raspberry-pi";
      else if (filterName.indexOf("react".toUpperCase()) > -1) return "fa-react";
      else if (filterName.indexOf("rust".toUpperCase()) > -1) return "fa-rust";
      else if (filterName.indexOf("sass".toUpperCase()) > -1) return "fa-sass";
      else if (filterName.indexOf("sourcetree".toUpperCase()) > -1)
        return "fa-sourcetree";
      else if (filterName.indexOf("unity".toUpperCase()) > -1) return "fa-unity";
      else if (filterName.indexOf("vue".toUpperCase()) > -1) return "fa-vuejs";
      else if (filterName.indexOf("wordpress".toUpperCase()) > -1) return "fa-wordpress";
      else if (filterName.indexOf("sql".toUpperCase()) > -1) return "fas fa-database";
      else if (filterName.indexOf("backend".toUpperCase()) > -1) return "fas fa-terminal";
      else if (filterName.indexOf("frontend".toUpperCase()) > -1)
        return "far fa-window-maximize";
      return "fas fa-pencil-alt";
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  z-index: 500;
  cursor: pointer;
  &:hover,
  :active,
  :focus-visible {
    color: yellowgreen;
  }
}
#wrapper {
  width: 20rem !important;
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
    display: inline-block;
    font-size: xx-large;
    font-weight: bolder;
    padding: 0 2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  #delete {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    z-index: 502;
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
      width: 100%;
      padding: 2rem 0 1.5rem 0;
      font-size: 5rem;
      opacity: 0;
      animation: dropIcon 5s ease forwards;
      animation-delay: calc(var(--order) * 200ms);
      &:hover,
      :active,
      :focus-visible {
        color: inherit;
      }

      @keyframes dropIcon {
        20% {
          opacity: 0;
          transform: translateY(-50%);
        }

        30%,
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
    #skill-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 4.5em;
      position: relative;
      h2 {
        position: relative;
      }
      input[type="text"] {
        color: white;
        background-color: transparent;
        outline: none;
        border: 0;
        font-size: 1.5em;
        font-weight: bold;
        text-decoration: underline;
        text-align: center;
        font-family: sf pro display, -apple-system, BlinkMacSystemFont, Roboto, segoe ui,
          Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
        padding: 0 2rem;
        width: 73%;
        position: relative;
      }
      i {
        font-size: 1.5rem;
        position: absolute;
        right: 0;
      }
    }
  }
}

#save-button {
  position: absolute;
  right: 3rem !important;
}

.delete-confirm {
  width: 0;
  position: absolute;
  overflow: hidden;
  margin: 0;
  white-space: nowrap;
  z-index: 501;
  text-align: left;
  i {
    margin: 0 0.4rem !important;
    cursor: pointer;
    &.fa-times {
      &:hover,
      :active,
      :focus-visible {
        color: red;
      }
    }
    &.fa-check {
      &:hover,
      :active,
      :focus-visible {
        color: greenyellow;
      }
    }
  }
}

.show {
  animation: grow 1s forwards;
}

@keyframes grow {
  from {
    width: 0;
  }
  to {
    width: 10rem;
  }
}
</style>
